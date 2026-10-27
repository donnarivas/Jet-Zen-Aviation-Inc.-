import React, { useState } from 'react';
import { X } from 'lucide-react';
import { TreatmentItem } from '../data/clinicData';

interface TreatmentDetailModalProps {
  treatment: TreatmentItem | null;
  onClose: () => void;
  onAddToBag: (
    treatment: TreatmentItem,
    mode: 'single' | 'package',
    zone: string
  ) => void;
  onBookDirectly: (treatment: TreatmentItem, zone: string) => void;
}

export const TreatmentDetailModal: React.FC<TreatmentDetailModalProps> = ({
  treatment,
  onClose,
  onAddToBag,
  onBookDirectly,
}) => {
  const [selectedZone, setSelectedZone] = useState<string>('');
  const [pricingMode, setPricingMode] = useState<'package' | 'single'>(
    'package'
  );

  if (!treatment) return null;

  const activeZone = selectedZone || treatment.targetZones[0];
  const bundleSavings =
    treatment.singlePrice * treatment.packageSessions - treatment.packagePrice;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="detail-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 overflow-y-auto"
    >
      <div className="bg-[#FAF8F5] border border-[#181615] w-full max-w-2xl p-6 md:p-8 my-8">
        <div className="flex items-start justify-between gap-4 border-b border-[#E2D9CC] pb-4">
          <div>
            <p className="text-xs text-[#6E655C]">
              {treatment.categoryLabel} · {treatment.fitzpatrickSafe} ·{' '}
              {treatment.durationMinutes} Min Session
            </p>
            <h2
              id="detail-modal-title"
              className="font-display text-2xl md:text-3xl font-semibold text-[#181615] mt-1"
            >
              {treatment.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close protocol details"
            className="p-2 text-[#575049] hover:text-[#181615]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-6 space-y-6">
          <div>
            <div className="text-xs font-semibold text-[#181615]">
              Clinical Mechanism & Optical Specification
            </div>
            <p className="text-xs text-[#6E655C] font-mono-tabular mt-0.5">
              {treatment.wavelengthOrTech} · Recovery: {treatment.downtime}
            </p>
            <p className="text-sm text-[#575049] mt-2 leading-relaxed">
              {treatment.clinicalSummary}
            </p>
          </div>

          <div className="bg-[#F5F0E8] border border-[#E2D9CC] p-4">
            <div className="text-xs font-semibold text-[#181615] mb-2">
              In-Studio Registered Nurse Protocol Steps
            </div>
            <ol className="space-y-1.5 text-xs text-[#575049] list-decimal list-inside">
              {treatment.protocolSteps.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="detail-zone-select"
                className="block text-xs font-semibold text-[#181615] mb-1.5"
              >
                Select Anatomical Treatment Zone
              </label>
              <select
                id="detail-zone-select"
                value={activeZone}
                onChange={(e) => setSelectedZone(e.target.value)}
                className="w-full px-3 py-2.5 text-xs bg-[#FAF8F5] border border-[#D5C7B4] text-[#181615]"
              >
                {treatment.targetZones.map((zone) => (
                  <option key={zone} value={zone}>
                    {zone}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#181615] mb-1.5">
                Session Pricing Option
              </label>
              <div className="grid grid-cols-2 gap-2 p-1 bg-[#EFE9E0] border border-[#E2D9CC]">
                <button
                  type="button"
                  onClick={() => setPricingMode('package')}
                  className={`py-2 px-2 text-xs font-semibold whitespace-nowrap ${
                    pricingMode === 'package'
                      ? 'bg-[#181615] text-white'
                      : 'text-[#575049]'
                  }`}
                >
                  {treatment.packageSessions}-Pack (${treatment.packagePrice})
                </button>
                <button
                  type="button"
                  onClick={() => setPricingMode('single')}
                  className={`py-2 px-2 text-xs font-semibold whitespace-nowrap ${
                    pricingMode === 'single'
                      ? 'bg-[#181615] text-white'
                      : 'text-[#575049]'
                  }`}
                >
                  1 Session (${treatment.singlePrice})
                </button>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#E2D9CC] flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs text-[#6E655C] block">
                {pricingMode === 'package'
                  ? `${treatment.packageSessions}-Session Clinical Series (Save $${bundleSavings})`
                  : 'Single Studio Session'}
              </span>
              <span className="font-mono-tabular text-2xl font-semibold text-[#181615]">
                $
                {pricingMode === 'package'
                  ? treatment.packagePrice.toLocaleString()
                  : treatment.singlePrice.toLocaleString()}
              </span>
              <span className="text-xs text-[#9E3B33] font-mono-tabular ml-2">
                +{treatment.pointsEarned.toLocaleString()} Premiere Pts
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  onAddToBag(treatment, pricingMode, activeZone);
                  onClose();
                }}
                className="px-4 py-2.5 border border-[#181615] text-[#181615] hover:bg-[#181615] hover:text-white text-xs font-semibold transition-colors whitespace-nowrap"
              >
                Add to Treatment Bag
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onBookDirectly(treatment, activeZone);
                }}
                className="px-5 py-2.5 bg-[#9E3B33] hover:bg-[#842F28] text-white text-xs font-semibold transition-colors whitespace-nowrap"
              >
                Book Studio Session
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
