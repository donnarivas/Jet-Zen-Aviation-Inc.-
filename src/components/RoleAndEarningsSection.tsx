import React, { useState } from 'react';
import { CheckSquare, Square, ShieldCheck } from 'lucide-react';
import { QUALIFICATIONS_AND_DUTIES } from '../data/jetzenData';
import { calculateBrokerCompensation } from '../utils/jetzenLogic';

interface RoleAndEarningsSectionProps {
  checkedQualIds: string[];
  onToggleQualification: (id: string) => void;
  onOpenApplyModal: () => void;
}

export const RoleAndEarningsSection: React.FC<RoleAndEarningsSectionProps> = ({
  checkedQualIds,
  onToggleQualification,
  onOpenApplyModal,
}) => {
  const [monthlyFlights, setMonthlyFlights] = useState<number>(8);
  const [avgTripValueUsd, setAvgTripValueUsd] = useState<number>(48000);
  const [avgMarginPct, setAvgMarginPct] = useState<number>(14);
  const [activeTab, setActiveTab] = useState<'all' | 'qualification' | 'duty'>(
    'all'
  );

  const comp = calculateBrokerCompensation({
    monthlyFlights,
    avgTripValueUsd,
    avgMarginPct,
  });

  const visibleItems = QUALIFICATIONS_AND_DUTIES.filter(
    (item) => activeTab === 'all' || item.category === activeTab
  );

  return (
    <section
      id="role-earnings"
      aria-labelledby="earnings-heading"
      className="scroll-mt-20 py-20 border-b border-[#E2D9CC] bg-[#FAF8F5]"
    >
      <div className="max-w-[1200px] mx-auto px-6 space-y-20">
        {/* Part 1: Complete Job Description Qualifications (9) & Duties (11) Evidence Matrix */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <p className="text-xs text-[#6E655C] mb-1">
                03. Line-by-Line Job Description Fit Matrix (20 / 20 Verified)
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#0F141C]">
                How Donna Rivas Proves Every JetZen Qualification & Duty
              </h2>
              <p className="text-xs text-[#575049] mt-1">
                Each of the 9 Qualifications and 11 Duties from the JetZen job description is mapped directly to Donna’s resume and faculty/partner endorsements ({checkedQualIds.length} of {QUALIFICATIONS_AND_DUTIES.length} verified).
              </p>
            </div>

            <div className="flex items-center gap-1 p-1 bg-[#EFE9E0] border border-[#E2D9CC] shrink-0">
              {[
                { id: 'all', label: 'All 20 Requirements' },
                { id: 'qualification', label: '9 Qualifications' },
                { id: 'duty', label: '11 Core Duties' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() =>
                    setActiveTab(t.id as 'all' | 'qualification' | 'duty')
                  }
                  className={`px-3.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                    activeTab === t.id
                      ? 'bg-[#0F141C] text-[#FAF8F5]'
                      : 'text-[#575049] hover:text-[#0F141C]'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {visibleItems.map((item) => {
              const isChecked = checkedQualIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  className={`p-5 border transition-colors flex flex-col justify-between ${
                    isChecked
                      ? 'bg-[#FAF8F5] border-[#0F141C]'
                      : 'bg-[#FAF8F5] border-[#E2D9CC]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#6E655C] mb-2">
                      <span>
                        {item.category === 'qualification'
                          ? 'Job Qualification'
                          : 'Broker Duty'}
                      </span>
                      <button
                        type="button"
                        onClick={() => onToggleQualification(item.id)}
                        className="flex items-center gap-1 text-xs font-semibold text-[#0F141C] hover:text-[#9E3B33]"
                      >
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-[#9E3B33]" />
                        ) : (
                          <Square className="w-4 h-4 text-[#6E655C]" />
                        )}
                        <span>{isChecked ? 'Verified Fit' : 'Verify'}</span>
                      </button>
                    </div>

                    <h3 className="text-sm font-semibold text-[#0F141C]">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#575049] mt-1 leading-relaxed">
                      {item.summary}
                    </p>

                    <div className="mt-3 p-3 bg-[#F5F0E8] border border-[#E2D9CC] text-xs text-[#262320] space-y-1">
                      <div className="font-semibold text-[#9E3B33] flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                        <span>Donna’s Verified Evidence:</span>
                      </div>
                      <p className="leading-snug">{item.donnaEvidence}</p>
                      <p className="text-[11px] text-[#6E655C] pt-1">
                        Endorsed by: <strong>{item.substantiatingAuthor}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-[#EFE9E0] text-[11px] text-[#6E655C]">
                    <strong className="text-[#0F141C]">JetZen CRM Link:</strong>{' '}
                    {item.crmIntegrationNote}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Part 2: Broker Compensation & Book of Business Simulator ($35,000 - $450,000/yr) */}
        <div className="pt-12 border-t border-[#E2D9CC] grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <p className="text-xs text-[#6E655C] mb-2">
                Full-Time Remote Target Production ($35,000.00 – $450,000.00 / Year)
              </p>
              <h2
                id="earnings-heading"
                className="font-display text-3xl font-semibold text-[#0F141C] tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                Donna’s Year-1 Book-of-Business & Earnings Projection
              </h2>
              <p className="mt-3 text-[15px] text-[#4A453E] leading-relaxed">
                By combining creative outbound channel expansion (proven at Carey & Danis LLC) with JetZen’s ML CRM automation, model the monthly charter flight velocity and gross margin trajectory across the $35,000 – $450,000/yr compensation scale.
              </p>
            </div>

            <div className="mt-8 bg-[#F5F0E8] border border-[#D8CFC2] p-6 space-y-6">
              <div>
                <div className="flex justify-between text-xs font-semibold text-[#0F141C] mb-2">
                  <label htmlFor="sim-flights-range">
                    Monthly Chartered Flights Closed
                  </label>
                  <span className="font-mono-tabular">
                    {monthlyFlights} Flights / Mo
                  </span>
                </div>
                <input
                  id="sim-flights-range"
                  type="range"
                  min={2}
                  max={18}
                  value={monthlyFlights}
                  onChange={(e) => setMonthlyFlights(Number(e.target.value))}
                  className="w-full accent-[#0F141C]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-[#0F141C] mb-2">
                  <label htmlFor="sim-tripval-range">
                    Average Charter Trip Revenue
                  </label>
                  <span className="font-mono-tabular">
                    ${avgTripValueUsd.toLocaleString()} / Leg
                  </span>
                </div>
                <input
                  id="sim-tripval-range"
                  type="range"
                  min={20000}
                  max={95000}
                  step={2500}
                  value={avgTripValueUsd}
                  onChange={(e) => setAvgTripValueUsd(Number(e.target.value))}
                  className="w-full accent-[#0F141C]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-[#0F141C] mb-2">
                  <label htmlFor="sim-margin-range">
                    Average Realized Charter Margin
                  </label>
                  <span className="font-mono-tabular">{avgMarginPct}%</span>
                </div>
                <input
                  id="sim-margin-range"
                  type="range"
                  min={10}
                  max={18}
                  value={avgMarginPct}
                  onChange={(e) => setAvgMarginPct(Number(e.target.value))}
                  className="w-full accent-[#9E3B33]"
                />
              </div>
            </div>
          </div>

          {/* Right 6 Columns: Live Earnings Readout Card */}
          <div className="lg:col-span-6 bg-[#0F141C] text-[#FAF8F5] border border-[#242E3D] p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-[#94A3B8] border-b border-[#263244] pb-3">
                <span>Full-Time · Work Location: Remote</span>
                <span className="font-mono-tabular text-[#D4AF7A]">
                  Pay Scale: $35,000 – $450,000 / yr
                </span>
              </div>

              <div className="mt-6">
                <p className="text-xs text-[#94A3B8]">
                  Projected Annual Broker Compensation
                </p>
                <div className="flex items-baseline gap-3 mt-1">
                  <span
                    data-testid="projected-annual-pay"
                    className="font-mono-tabular text-4xl md:text-5xl font-semibold text-[#FAF8F5]"
                  >
                    ${comp.projectedAnnualPayUsd.toLocaleString()}
                  </span>
                  <span className="text-xs text-[#D4AF7A]">/ year</span>
                </div>
                <p className="text-xs text-[#CBD5E1] mt-2">
                  Tier Bracket: <strong>{comp.payBandStatus}</strong>
                </p>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[#263244]">
                <div>
                  <span className="text-[11px] text-[#94A3B8] block">
                    Annual Charter Volume
                  </span>
                  <span className="font-mono-tabular text-base font-semibold text-[#FAF8F5]">
                    ${comp.annualCharterVolumeUsd.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-[#94A3B8] block">
                    Annual Gross Margin
                  </span>
                  <span className="font-mono-tabular text-base font-semibold text-[#D4AF7A]">
                    ${comp.annualGrossMarginUsd.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-[#94A3B8] block">
                    ML Admin Time Saved
                  </span>
                  <span className="font-mono-tabular text-base font-semibold text-[#FAF8F5]">
                    {comp.monthlyAdminHoursSavedByMl} hrs / mo
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#263244] space-y-4">
              <div className="text-xs text-[#CBD5E1]">
                <span className="text-[#94A3B8]">Role Benefits:</span>{' '}
                Flexible schedule · Paid time off · Professional development assistance · Employee assistance program (EAP)
              </div>
              <button
                type="button"
                onClick={onOpenApplyModal}
                className="w-full py-3 px-4 bg-[#9E3B33] hover:bg-[#842F28] text-white text-xs font-semibold tracking-wide transition-colors whitespace-nowrap"
              >
                Review Donna’s Process Improvement Pitch & Dossier
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
