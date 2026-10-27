import React, { useState } from 'react';
import {
  DiagnosticInput,
  generateSkinDiagnostic,
} from '../utils/clinicLogic';
import { TreatmentItem } from '../data/clinicData';

interface SkinDiagnosticSectionProps {
  onBookTreatment: (treatment: TreatmentItem, preselectedZone?: string) => void;
  onAddBundleToBag: (primary: TreatmentItem, skincare: TreatmentItem, zone: string) => void;
}

const FITZPATRICK_OPTIONS: {
  value: DiagnosticInput['fitzpatrickType'];
  label: string;
  desc: string;
  swatchHex: string[];
}[] = [
  {
    value: 'I-II',
    label: 'Fitzpatrick I–II',
    desc: 'Fair / ivory tone · Burns easily, minimal epidermal melanin',
    swatchHex: ['#F7E7DA', '#EDD3BE'],
  },
  {
    value: 'III-IV',
    label: 'Fitzpatrick III–IV',
    desc: 'Warm beige / olive / golden tone · Tans gradually, moderate melanin',
    swatchHex: ['#D8B292', '#B98862'],
  },
  {
    value: 'V-VI',
    label: 'Fitzpatrick V–VI',
    desc: 'Rich brown / deep espresso tone · Requires 1064nm Nd:YAG wavelength calibration',
    swatchHex: ['#8C5A3C', '#4F3020'],
  },
];

const CONCERN_OPTIONS: {
  value: DiagnosticInput['primaryConcern'];
  label: string;
  detail: string;
  defaultZone: string;
}[] = [
  {
    value: 'unwanted-hair',
    label: 'Permanent Hair Reduction',
    detail: 'Dual-wavelength follicular photothermolysis',
    defaultZone: 'Brazilian & Full Legs',
  },
  {
    value: 'fine-lines-volume',
    label: 'Expression Lines & Facial Balancing',
    detail: 'Botox® neuromodulators & structural hyaluronic sculpting',
    defaultZone: 'Glabella, Forehead & Lip Couture',
  },
  {
    value: 'texture-pigmentation',
    label: 'Melasma, Pores & Tone Radiance',
    detail: '1927nm Clear + Brilliant® Perméa fractional resurfacing',
    defaultZone: 'Full Face & Neck',
  },
  {
    value: 'body-sculpting',
    label: 'Non-Surgical Body Contouring',
    detail: 'CoolSculpting® Elite dual-applicator cryolipolysis',
    defaultZone: 'Lower Abdomen & Flanks',
  },
];

export const SkinDiagnosticSection: React.FC<SkinDiagnosticSectionProps> = ({
  onBookTreatment,
  onAddBundleToBag,
}) => {
  const [fitzpatrickType, setFitzpatrickType] =
    useState<DiagnosticInput['fitzpatrickType']>('III-IV');
  const [primaryConcern, setPrimaryConcern] =
    useState<DiagnosticInput['primaryConcern']>('texture-pigmentation');
  const [targetZone, setTargetZone] = useState<string>('Full Face & Neck');
  const [downtimePreference, setDowntimePreference] =
    useState<DiagnosticInput['downtimePreference']>('zero');
  const [bundleAddedNotice, setBundleAddedNotice] = useState(false);

  const recommendation = generateSkinDiagnostic({
    fitzpatrickType,
    primaryConcern,
    targetZone,
    downtimePreference,
  });

  const handleConcernSelect = (concern: typeof CONCERN_OPTIONS[number]) => {
    setPrimaryConcern(concern.value);
    setTargetZone(concern.defaultZone);
  };

  const handleAddBundle = () => {
    onAddBundleToBag(
      recommendation.primaryTreatment,
      recommendation.supportingSkincare,
      targetZone
    );
    setBundleAddedNotice(true);
    setTimeout(() => setBundleAddedNotice(false), 3000);
  };

  return (
    <section
      id="skin-diagnostic"
      aria-labelledby="diagnostic-heading"
      className="scroll-mt-20 py-20 border-b border-[#E6DEC8] bg-[#F5F0E8]"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="max-w-2xl mb-12">
          <p className="text-xs text-[#6E655C] mb-2">
            02. Clinical Regimen & Wavelength Calibration
          </p>
          <h2
            id="diagnostic-heading"
            className="font-display text-3xl md:text-4xl font-semibold text-[#181615] tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            Personalized Fitzpatrick & Aesthetic Protocol Builder
          </h2>
          <p className="mt-3 text-[15px] text-[#575049] leading-relaxed">
            Calibrate your clinical pathway based on your melanin index, primary anatomical goal, and recovery window. Every protocol is reviewed in-studio by a LaserAway Registered Nurse before treatment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 7 Columns: Diagnostic Controls */}
          <div className="lg:col-span-7 bg-[#FAF8F5] border border-[#E2D9CC] p-6 md:p-8 space-y-8">
            {/* Step 1: Fitzpatrick Scale */}
            <div>
              <label className="block text-sm font-semibold text-[#181615] mb-1">
                1. Select Your Fitzpatrick Skin Tone Spectrum
              </label>
              <p className="text-xs text-[#6E655C] mb-4">
                Determines optical laser wavelength (755nm Alexandrite vs. 1064nm Nd:YAG) and thermal relaxation intervals.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {FITZPATRICK_OPTIONS.map((opt) => {
                  const isSelected = fitzpatrickType === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setFitzpatrickType(opt.value)}
                      aria-pressed={isSelected}
                      className={`text-left p-4 border transition-colors ${
                        isSelected
                          ? 'border-[#9E3B33] bg-[#9E3B33]/[0.05]'
                          : 'border-[#E2D9CC] bg-[#FAF8F5] hover:border-[#B89058]'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2.5">
                        {opt.swatchHex.map((hex) => (
                          <span
                            key={hex}
                            className="w-5 h-5 rounded-full border border-black/15 inline-block"
                            style={{ backgroundColor: hex }}
                          />
                        ))}
                      </div>
                      <div className="text-sm font-semibold text-[#181615]">
                        {opt.label}
                      </div>
                      <div className="text-xs text-[#575049] mt-1 leading-snug">
                        {opt.desc}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Primary Aesthetic Goal */}
            <div>
              <label className="block text-sm font-semibold text-[#181615] mb-1">
                2. Primary Clinical Aesthetic Goal
              </label>
              <p className="text-xs text-[#6E655C] mb-4">
                Select the primary indication you wish to address during your clinical series.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CONCERN_OPTIONS.map((item) => {
                  const isSelected = primaryConcern === item.value;
                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => handleConcernSelect(item)}
                      aria-pressed={isSelected}
                      className={`text-left p-4 border transition-colors ${
                        isSelected
                          ? 'border-[#9E3B33] bg-[#9E3B33]/[0.05]'
                          : 'border-[#E2D9CC] bg-[#FAF8F5] hover:border-[#B89058]'
                      }`}
                    >
                      <div className="text-sm font-semibold text-[#181615]">
                        {item.label}
                      </div>
                      <div className="text-xs text-[#575049] mt-1">
                        {item.detail}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Target Anatomical Zone & Recovery Tolerance */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-[#E6DEC8]">
              <div>
                <label
                  htmlFor="diagnostic-zone-select"
                  className="block text-sm font-semibold text-[#181615] mb-2"
                >
                  3. Target Treatment Zone
                </label>
                <select
                  id="diagnostic-zone-select"
                  value={targetZone}
                  onChange={(e) => setTargetZone(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#D5C7B4] text-[#181615] focus:outline-none focus:border-[#9E3B33]"
                >
                  {recommendation.primaryTreatment.targetZones.map((zone) => (
                    <option key={zone} value={zone}>
                      {zone}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#181615] mb-2">
                  4. Social Downtime Window
                </label>
                <div className="flex items-center gap-1 p-1 bg-[#EFE9E0] border border-[#E2D9CC]">
                  {[
                    { id: 'zero', label: 'Zero Downtime' },
                    { id: 'minimal-24h', label: '24h Mild Glow' },
                    { id: 'flexible', label: '48h Sculpt' },
                  ].map((dt) => (
                    <button
                      key={dt.id}
                      type="button"
                      onClick={() =>
                        setDowntimePreference(
                          dt.id as DiagnosticInput['downtimePreference']
                        )
                      }
                      className={`flex-1 py-1.5 px-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                        downtimePreference === dt.id
                          ? 'bg-[#181615] text-[#FAF8F5]'
                          : 'text-[#575049] hover:text-[#181615]'
                      }`}
                    >
                      {dt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right 5 Columns: Live Calibrated Clinical Prescription Output */}
          <div
            data-testid="diagnostic-result-card"
            className="lg:col-span-5 bg-[#FAF8F5] border border-[#181615] p-6 md:p-8 space-y-6"
          >
            <div className="border-b border-[#E2D9CC] pb-4">
              <div className="text-xs text-[#6E655C]">
                Calibrated Nurse Protocol · {fitzpatrickType} · {targetZone}
              </div>
              <h3 className="font-display text-2xl font-semibold text-[#181615] mt-1">
                {recommendation.primaryTreatment.title}
              </h3>
              <p className="text-xs text-[#575049] mt-1">
                {recommendation.primaryTreatment.wavelengthOrTech}
              </p>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <div className="text-xs font-semibold text-[#181615]">
                  Optical & Epidermal Safety Calibration
                </div>
                <p className="text-xs text-[#575049] mt-1 leading-relaxed">
                  {recommendation.laserSafetyNote}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E6DEC8]">
                <div className="text-xs font-semibold text-[#181615]">
                  Recommended Clinical Cadence
                </div>
                <p className="text-xs text-[#575049] mt-1">
                  {recommendation.recommendedCadence}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E6DEC8]">
                <div className="text-xs font-semibold text-[#181615]">
                  Paired Post-Procedure Barrier Lock
                </div>
                <p className="text-xs text-[#575049] mt-1">
                  {recommendation.supportingSkincare.title} ($
                  {recommendation.supportingSkincare.singlePrice})
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E2D9CC] flex items-baseline justify-between">
              <div>
                <span className="text-xs text-[#6E655C] block">
                  {recommendation.primaryTreatment.packageSessions}-Session Package Pricing
                </span>
                <span className="font-mono-tabular text-2xl font-semibold text-[#181615]">
                  ${recommendation.primaryTreatment.packagePrice.toLocaleString()}
                </span>
                <span className="text-xs text-[#9E3B33] ml-2 font-mono-tabular">
                  Save ${recommendation.estimatedPackageSavings.toLocaleString()}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-[#6E655C] block">LA Premiere Points</span>
                <span className="font-mono-tabular text-sm font-semibold text-[#181615]">
                  +{recommendation.combinedProtocolPoints.toLocaleString()} pts
                </span>
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={() =>
                  onBookTreatment(recommendation.primaryTreatment, targetZone)
                }
                className="w-full py-3 px-4 bg-[#9E3B33] hover:bg-[#842F28] text-white text-xs font-semibold tracking-wide transition-colors whitespace-nowrap"
              >
                Schedule Nurse Consultation for Protocol
              </button>
              <button
                type="button"
                onClick={handleAddBundle}
                className="w-full py-2.5 px-4 bg-transparent border border-[#181615] hover:bg-[#181615] hover:text-white text-[#181615] text-xs font-semibold transition-colors whitespace-nowrap"
              >
                {bundleAddedNotice
                  ? 'Added Complete Protocol + Skincare to Bag'
                  : 'Add Protocol + Recovery Skincare to Treatment Bag'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
