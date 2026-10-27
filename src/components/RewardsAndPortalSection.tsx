import React from 'react';
import {
  PatientAppointment,
  REWARD_PERKS,
  RewardPerk,
} from '../data/clinicData';
import { calculateLoyaltyTier } from '../utils/clinicLogic';

interface RewardsAndPortalSectionProps {
  pointsBalance: number;
  welcomeBonusClaimed: boolean;
  onClaimWelcomeBonus: () => void;
  appliedReward: RewardPerk | null;
  redeemedPerkIds: string[];
  onRedeemPerk: (perk: RewardPerk) => void;
  appointments: PatientAppointment[];
  onCancelAppointment: (appointmentId: string) => void;
  onOpenBookingModal: (treatmentId?: string) => void;
}

export const RewardsAndPortalSection: React.FC<RewardsAndPortalSectionProps> = ({
  pointsBalance,
  welcomeBonusClaimed,
  onClaimWelcomeBonus,
  appliedReward,
  redeemedPerkIds,
  onRedeemPerk,
  appointments,
  onCancelAppointment,
  onOpenBookingModal,
}) => {
  const tierInfo = calculateLoyaltyTier(pointsBalance);

  return (
    <section
      id="rewards-portal"
      aria-labelledby="rewards-heading"
      className="scroll-mt-20 py-20 bg-[#FAF8F5] border-b border-[#E6DEC8]"
    >
      <div className="max-w-[1200px] mx-auto px-6 space-y-16">
        {/* LaserLove / LA Premiere Loyalty Header & Balance */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-5 bg-[#181615] text-[#FAF8F5] p-8 flex flex-col justify-between border border-[#2C2825]">
            <div>
              <div className="flex items-center justify-between text-xs text-[#C7BBAE] border-b border-[#332E2A] pb-3">
                <span>LaserLove · LA Premiere Loyalty</span>
                <span className="font-mono-tabular">Member #LA-88412</span>
              </div>
              <div className="mt-6">
                <p className="text-xs text-[#C7BBAE]">Available Premiere Points Balance</p>
                <div className="flex items-baseline gap-3 mt-1">
                  <span
                    data-testid="loyalty-points-balance"
                    className="font-mono-tabular text-4xl font-semibold tracking-tight text-[#FAF8F5]"
                  >
                    {pointsBalance.toLocaleString()}
                  </span>
                  <span className="text-sm text-[#D4AF7A]">
                    pts · {tierInfo.currentTier} Tier
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between text-xs text-[#C7BBAE] mb-2">
                  <span>Tier Status: {tierInfo.currentTier}</span>
                  <span className="font-mono-tabular">
                    {tierInfo.nextTier
                      ? `${tierInfo.pointsToNextTier.toLocaleString()} pts to ${tierInfo.nextTier}`
                      : 'Top Tier Unlocked (VIP Platinum)'}
                  </span>
                </div>
                <div className="w-full h-2 bg-[#332E2A] overflow-hidden">
                  <div
                    className="h-full bg-[#D4AF7A] transition-transform duration-200 origin-left"
                    style={{
                      transform: `scaleX(${Math.max(0.05, tierInfo.progressPercent / 100)})`,
                    }}
                  />
                </div>
                <p className="text-xs text-[#C7BBAE] mt-3 leading-relaxed">
                  {tierInfo.multiplierLabel}
                </p>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-[#332E2A] flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-[#FAF8F5]">
                  New App Check-In Bonus
                </p>
                <p className="text-xs text-[#C7BBAE]">
                  {welcomeBonusClaimed
                    ? '5,000 Pt First-Login Bonus Credited to Account'
                    : 'Claim +5,000 Premiere Points for activating your digital chart'}
                </p>
              </div>
              <button
                type="button"
                disabled={welcomeBonusClaimed}
                onClick={onClaimWelcomeBonus}
                className={`px-4 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  welcomeBonusClaimed
                    ? 'bg-[#332E2A] text-[#9E9489] cursor-default'
                    : 'bg-[#9E3B33] hover:bg-[#842F28] text-white'
                }`}
              >
                {welcomeBonusClaimed ? '5,000 Pts Claimed' : 'Claim +5,000 Pts'}
              </button>
            </div>
          </div>

          {/* Right 7 Columns: Redeemable Clinical Certificates */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="mb-6">
              <p className="text-xs text-[#6E655C] mb-1">
                03. LaserLove Rewards & Instant Certificates
              </p>
              <h2
                id="rewards-heading"
                className="font-display text-3xl font-semibold text-[#181615]"
                style={{ textWrap: 'balance' }}
              >
                Redeem Points Toward Treatments & Medical Skincare
              </h2>
              <p className="text-sm text-[#575049] mt-1">
                Redeemed certificates automatically apply to your Treatment Bag or attach to your next in-studio check-in.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {REWARD_PERKS.map((perk) => {
                const isApplied = appliedReward?.id === perk.id;
                const isAlreadyRedeemed = redeemedPerkIds.includes(perk.id);
                const canAfford = pointsBalance >= perk.pointsCost;

                return (
                  <div
                    key={perk.id}
                    className="bg-[#FAF8F5] border border-[#E2D9CC] p-5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-[#6E655C] mb-2">
                        <span className="font-mono-tabular font-semibold text-[#9E3B33]">
                          {perk.pointsCost.toLocaleString()} pts
                        </span>
                        <span className="font-mono-tabular">
                          ${perk.dollarValue} Clinical Value
                        </span>
                      </div>
                      <h3 className="text-sm font-semibold text-[#181615]">
                        {perk.title}
                      </h3>
                      <p className="text-xs text-[#575049] mt-1.5 leading-relaxed">
                        {perk.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#EFE9E0] flex items-center justify-between">
                      <span className="text-xs text-[#6E655C]">
                        {isApplied
                          ? 'Active in Bag'
                          : isAlreadyRedeemed
                            ? 'Redeemed to Chart'
                            : 'Instant Voucher'}
                      </span>
                      <button
                        type="button"
                        disabled={!canAfford && !isAlreadyRedeemed}
                        onClick={() => onRedeemPerk(perk)}
                        className={`px-3.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                          isApplied
                            ? 'bg-[#181615] text-white'
                            : canAfford
                              ? 'border border-[#181615] text-[#181615] hover:bg-[#181615] hover:text-white'
                              : 'border border-[#E2D9CC] text-[#A39A90] cursor-not-allowed'
                        }`}
                      >
                        {isApplied
                          ? 'Applied to Bag'
                          : isAlreadyRedeemed
                            ? 'Apply to Bag'
                            : canAfford
                              ? `Redeem (${perk.pointsCost.toLocaleString()} pts)`
                              : 'Insufficient Points'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* My Appointments & Clinical Treatment Ledger */}
        <div
          id="my-appointments"
          className="scroll-mt-20 pt-12 border-t border-[#E6DEC8]"
        >
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs text-[#6E655C] mb-1">
                04. Patient Chart & Clinical Schedule
              </p>
              <h2 className="font-display text-3xl font-semibold text-[#181615]">
                Upcoming Visits & Dosimetry Ledger
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onOpenBookingModal()}
              className="px-4 py-2.5 bg-[#9E3B33] hover:bg-[#842F28] text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
            >
              Schedule New Appointment
            </button>
          </div>

          {appointments.length === 0 ? (
            <div className="bg-[#F5F0E8] border border-[#E2D9CC] p-8 text-center">
              <p className="text-sm font-semibold text-[#181615]">
                No Active Appointments Scheduled
              </p>
              <p className="text-xs text-[#575049] mt-1">
                Book an in-clinic laser session or virtual Registered Nurse consultation to earn LA Premiere points.
              </p>
              <button
                type="button"
                onClick={() => onOpenBookingModal()}
                className="mt-4 px-4 py-2 bg-[#181615] text-white text-xs font-semibold"
              >
                Book First Visit
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {appointments.map((apt) => (
                <div
                  key={apt.id}
                  data-testid="appointment-card"
                  className="bg-[#FAF8F5] border border-[#E2D9CC] p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#6E655C] pb-3 border-b border-[#EFE9E0]">
                      <span>
                        {apt.visitType} · Status: <strong className="text-[#181615]">{apt.status}</strong>
                      </span>
                      <span className="font-mono-tabular text-[#9E3B33]">
                        +{apt.pointsAwarded} pts
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-semibold text-[#181615] mt-3">
                      {apt.treatmentTitle}
                    </h3>

                    <div className="mt-2 text-xs text-[#575049] space-y-1">
                      <p>
                        <span className="text-[#6E655C]">Clinic Studio:</span>{' '}
                        {apt.clinicName}
                      </p>
                      <p>
                        <span className="text-[#6E655C]">Clinician:</span>{' '}
                        {apt.nurseName}
                      </p>
                      <p className="font-mono-tabular">
                        <span className="font-sans text-[#6E655C]">Date & Time:</span>{' '}
                        {apt.date} · {apt.timeSlot}
                      </p>
                    </div>

                    {apt.clinicalNotes && (
                      <p className="mt-3 pt-3 border-t border-[#EFE9E0] text-xs text-[#575049]">
                        {apt.clinicalNotes}
                      </p>
                    )}
                  </div>

                  <div className="mt-5 pt-3 border-t border-[#E2D9CC] flex items-center justify-between">
                    <span className="text-xs text-[#6E655C] font-mono-tabular">
                      Chart Ref #{apt.id.toUpperCase()}
                    </span>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => onOpenBookingModal(apt.treatmentId)}
                        className="text-xs font-semibold text-[#181615] hover:text-[#9E3B33] underline underline-offset-4 whitespace-nowrap"
                      >
                        {apt.status === 'Completed' ? 'Book Next Session' : 'Reschedule'}
                      </button>
                      {apt.status === 'Confirmed' && (
                        <button
                          type="button"
                          onClick={() => onCancelAppointment(apt.id)}
                          aria-label={`Cancel appointment for ${apt.treatmentTitle}`}
                          className="text-xs text-[#6E655C] hover:text-[#9E3B33] whitespace-nowrap"
                        >
                          Cancel Visit
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
