import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import {
  CLINIC_LOCATIONS,
  NURSE_SPECIALISTS,
  TREATMENTS,
  PatientAppointment,
} from '../data/clinicData';
import { validateBookingInput } from '../utils/clinicLogic';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTreatmentId?: string;
  initialZone?: string;
  onConfirmBooking: (appointment: PatientAppointment) => void;
}

const TIME_SLOTS = [
  '9:30 AM',
  '11:00 AM',
  '1:15 PM',
  '2:30 PM',
  '4:00 PM',
  '5:30 PM',
];

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialTreatmentId,
  initialZone,
  onConfirmBooking,
}) => {
  const [selectedTreatmentId, setSelectedTreatmentId] = useState(
    initialTreatmentId || TREATMENTS[0].id
  );
  const [selectedClinicId, setSelectedClinicId] = useState(
    CLINIC_LOCATIONS[0].id
  );
  const [selectedNurseId, setSelectedNurseId] = useState(
    NURSE_SPECIALISTS[0].id
  );
  const [visitType, setVisitType] = useState<
    'In-Clinic Treatment' | 'Virtual Nurse Consultation'
  >('In-Clinic Treatment');
  const [date, setDate] = useState('2026-11-12');
  const [timeSlot, setTimeSlot] = useState('2:30 PM');
  const [patientName, setPatientName] = useState('Donna Rivas');
  const [patientEmail, setPatientEmail] = useState('donna.rivas@example.com');
  const [patientPhone, setPatientPhone] = useState('310-555-0194');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (initialTreatmentId) {
      setSelectedTreatmentId(initialTreatmentId);
    }
  }, [initialTreatmentId]);

  if (!isOpen) return null;

  const selectedTreatment =
    TREATMENTS.find((t) => t.id === selectedTreatmentId) || TREATMENTS[0];
  const selectedClinic =
    CLINIC_LOCATIONS.find((c) => c.id === selectedClinicId) ||
    CLINIC_LOCATIONS[0];
  const selectedNurse =
    NURSE_SPECIALISTS.find((n) => n.id === selectedNurseId) ||
    NURSE_SPECIALISTS[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateBookingInput({
      patientName,
      patientEmail,
      patientPhone,
      date,
      timeSlot,
    });
    if (!validation.valid) {
      setErrorMsg(validation.error || 'Please verify all required fields.');
      return;
    }

    setErrorMsg(null);
    const newAppointment: PatientAppointment = {
      id: `apt-${Math.floor(1000 + Math.random() * 9000)}`,
      treatmentId: selectedTreatment.id,
      treatmentTitle: selectedTreatment.title,
      clinicName: selectedClinic.name,
      nurseName: selectedNurse.name,
      date,
      timeSlot,
      visitType,
      status: 'Confirmed',
      pointsAwarded: visitType === 'In-Clinic Treatment' ? 500 : 250,
      patientName: patientName.trim(),
      clinicalNotes: initialZone
        ? `Target Zone: ${initialZone} · ${selectedTreatment.wavelengthOrTech}`
        : `Protocol: ${selectedTreatment.wavelengthOrTech}`,
    };

    onConfirmBooking(newAppointment);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 overflow-y-auto"
    >
      <div className="bg-[#FAF8F5] border border-[#181615] w-full max-w-2xl p-6 md:p-8 my-8 relative">
        <div className="flex items-start justify-between gap-4 border-b border-[#E2D9CC] pb-4">
          <div>
            <p className="text-xs text-[#6E655C]">
              Instant Clinical Scheduling · Earn +500 LA Premiere Points
            </p>
            <h2
              id="booking-modal-title"
              className="font-display text-2xl md:text-3xl font-semibold text-[#181615] mt-0.5"
            >
              Reserve Studio Treatment or Nurse Consult
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close booking dialog"
            className="p-2 text-[#575049] hover:text-[#181615]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Visit Format Segmented Control */}
          <div>
            <label className="block text-xs font-semibold text-[#181615] mb-2">
              Appointment Format
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-[#EFE9E0] border border-[#E2D9CC]">
              {(
                [
                  'In-Clinic Treatment',
                  'Virtual Nurse Consultation',
                ] as const
              ).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setVisitType(type)}
                  className={`py-2 px-3 text-xs font-semibold transition-colors whitespace-nowrap ${
                    visitType === type
                      ? 'bg-[#181615] text-[#FAF8F5]'
                      : 'text-[#575049] hover:text-[#181615]'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="booking-treatment-select"
                className="block text-xs font-semibold text-[#181615] mb-1.5"
              >
                Clinical Treatment / Indication
              </label>
              <select
                id="booking-treatment-select"
                value={selectedTreatmentId}
                onChange={(e) => setSelectedTreatmentId(e.target.value)}
                className="w-full px-3 py-2.5 text-xs bg-[#FAF8F5] border border-[#D5C7B4] text-[#181615]"
              >
                {TREATMENTS.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title} (${t.singlePrice})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="booking-clinic-select"
                className="block text-xs font-semibold text-[#181615] mb-1.5"
              >
                LaserAway Flagship Studio
              </label>
              <select
                id="booking-clinic-select"
                value={selectedClinicId}
                onChange={(e) => setSelectedClinicId(e.target.value)}
                className="w-full px-3 py-2.5 text-xs bg-[#FAF8F5] border border-[#D5C7B4] text-[#181615]"
              >
                {CLINIC_LOCATIONS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.cityState})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="booking-nurse-select"
                className="block text-xs font-semibold text-[#181615] mb-1.5"
              >
                Aesthetic Registered Nurse / NP
              </label>
              <select
                id="booking-nurse-select"
                value={selectedNurseId}
                onChange={(e) => setSelectedNurseId(e.target.value)}
                className="w-full px-3 py-2.5 text-xs bg-[#FAF8F5] border border-[#D5C7B4] text-[#181615]"
              >
                {NURSE_SPECIALISTS.map((n) => (
                  <option key={n.id} value={n.id}>
                    {n.name} — {n.specialty}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="booking-date-input"
                className="block text-xs font-semibold text-[#181615] mb-1.5"
              >
                Preferred Date
              </label>
              <input
                id="booking-date-input"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 text-xs font-mono-tabular bg-[#FAF8F5] border border-[#D5C7B4] text-[#181615]"
              />
            </div>
          </div>

          {/* Time Slot Selector */}
          <div>
            <label className="block text-xs font-semibold text-[#181615] mb-2">
              Available Studio Time Windows
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setTimeSlot(slot)}
                  className={`py-2 px-2 text-xs font-mono-tabular border transition-colors whitespace-nowrap ${
                    timeSlot === slot
                      ? 'border-[#9E3B33] bg-[#9E3B33] text-white font-semibold'
                      : 'border-[#E2D9CC] bg-[#FAF8F5] text-[#181615] hover:border-[#181615]'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Patient Intake Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-[#E6DEC8]">
            <div>
              <label
                htmlFor="patient-name-input"
                className="block text-xs font-semibold text-[#181615] mb-1"
              >
                Patient Full Name
              </label>
              <input
                id="patient-name-input"
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="Full legal name"
                className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D5C7B4] text-[#181615]"
              />
            </div>
            <div>
              <label
                htmlFor="patient-email-input"
                className="block text-xs font-semibold text-[#181615] mb-1"
              >
                Confirmation Email
              </label>
              <input
                id="patient-email-input"
                type="email"
                value={patientEmail}
                onChange={(e) => setPatientEmail(e.target.value)}
                placeholder="patient@domain.com"
                className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D5C7B4] text-[#181615]"
              />
            </div>
            <div>
              <label
                htmlFor="patient-phone-input"
                className="block text-xs font-semibold text-[#181615] mb-1"
              >
                SMS Check-In Phone
              </label>
              <input
                id="patient-phone-input"
                type="tel"
                value={patientPhone}
                onChange={(e) => setPatientPhone(e.target.value)}
                placeholder="310-555-0194"
                className="w-full px-3 py-2 text-xs font-mono-tabular bg-[#FAF8F5] border border-[#D5C7B4] text-[#181615]"
              />
            </div>
          </div>

          {errorMsg && (
            <div
              role="alert"
              className="p-3 bg-[#9E3B33]/10 border border-[#9E3B33] text-xs text-[#9E3B33] font-medium"
            >
              {errorMsg}
            </div>
          )}

          <div className="pt-4 border-t border-[#E2D9CC] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-[#575049] hover:text-[#181615]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#9E3B33] hover:bg-[#842F28] text-white text-xs font-semibold tracking-wide transition-colors whitespace-nowrap"
            >
              Confirm Appointment & Earn +{visitType === 'In-Clinic Treatment' ? 500 : 250} Pts
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
