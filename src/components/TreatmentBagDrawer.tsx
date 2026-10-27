import React, { useState } from 'react';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { BagItem, calculateBagTotals } from '../utils/clinicLogic';
import { TREATMENTS, RewardPerk } from '../data/clinicData';

interface TreatmentBagDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bag: BagItem[];
  appliedReward: RewardPerk | null;
  onRemoveReward: () => void;
  onUpdateQuantity: (treatmentId: string, mode: 'single' | 'package', delta: number) => void;
  onToggleMode: (treatmentId: string, currentMode: 'single' | 'package') => void;
  onCheckoutConfirm: (pointsEarned: number, orderCode: string) => void;
}

export const TreatmentBagDrawer: React.FC<TreatmentBagDrawerProps> = ({
  isOpen,
  onClose,
  bag,
  appliedReward,
  onRemoveReward,
  onUpdateQuantity,
  onToggleMode,
  onCheckoutConfirm,
}) => {
  const [confirmedOrderCode, setConfirmedOrderCode] = useState<string | null>(
    null
  );
  const [paymentOption, setPaymentOption] = useState<'full' | 'financing'>(
    'full'
  );

  if (!isOpen) return null;

  const totals = calculateBagTotals(bag, TREATMENTS, appliedReward);

  const handleCompleteOrder = () => {
    const code = `LA-${Math.floor(10000 + Math.random() * 90000)}`;
    setConfirmedOrderCode(code);
    onCheckoutConfirm(totals.pointsToEarn, code);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="bag-drawer-title"
      className="fixed inset-0 z-50 flex justify-end bg-black/50"
    >
      <div className="bg-[#FAF8F5] border-l border-[#181615] w-full max-w-md h-full flex flex-col justify-between p-6 overflow-y-auto">
        <div>
          <div className="flex items-center justify-between border-b border-[#E2D9CC] pb-4">
            <div>
              <p className="text-xs text-[#6E655C]">
                Clinical Treatment Plan & Skincare Bag
              </p>
              <h2
                id="bag-drawer-title"
                className="font-display text-2xl font-semibold text-[#181615]"
              >
                Your Treatment Bag ({totals.totalItemsCount})
              </h2>
            </div>
            <button
              type="button"
              onClick={() => {
                setConfirmedOrderCode(null);
                onClose();
              }}
              aria-label="Close treatment bag"
              className="p-2 text-[#575049] hover:text-[#181615]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {confirmedOrderCode ? (
            <div
              data-testid="order-confirmation-box"
              className="mt-8 bg-[#F5F0E8] border border-[#181615] p-6 space-y-4"
            >
              <div className="text-xs text-[#9E3B33] font-semibold">
                Clinical Order Confirmed · Receipt #{confirmedOrderCode}
              </div>
              <h3 className="font-display text-2xl font-semibold text-[#181615]">
                Treatment Package & Skincare Reserved
              </h3>
              <p className="text-xs text-[#575049] leading-relaxed">
                Your treatment credits have been linked to your LaserAway Patient Chart, and your LA Premiere Points balance has been updated immediately.
              </p>
              <button
                type="button"
                onClick={() => {
                  setConfirmedOrderCode(null);
                  onClose();
                }}
                className="w-full py-2.5 px-4 bg-[#181615] text-white text-xs font-semibold"
              >
                Return to Studio Dashboard
              </button>
            </div>
          ) : bag.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <p className="text-sm font-semibold text-[#181615]">
                Your Treatment Bag is Empty
              </p>
              <p className="text-xs text-[#575049] max-w-xs mx-auto">
                Add single sessions, multi-session clinical bundles, or LaserAway Beauty® medical skincare to calculate package savings and 0% APR monthly plans.
              </p>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {bag.map((item) => {
                const treatment = TREATMENTS.find(
                  (t) => t.id === item.treatmentId
                );
                if (!treatment) return null;
                const unitPrice =
                  item.mode === 'package'
                    ? treatment.packagePrice
                    : treatment.singlePrice;

                return (
                  <div
                    key={`${item.treatmentId}-${item.mode}`}
                    className="bg-[#FAF8F5] border border-[#E2D9CC] p-4 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-[11px] text-[#6E655C]">
                          {treatment.categoryLabel} · {item.selectedZone}
                        </p>
                        <h3 className="text-sm font-semibold text-[#181615]">
                          {treatment.title}
                        </h3>
                      </div>
                      <span className="font-mono-tabular text-sm font-semibold text-[#181615]">
                        ${(unitPrice * item.quantity).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#EFE9E0]">
                      <button
                        type="button"
                        onClick={() =>
                          onToggleMode(item.treatmentId, item.mode)
                        }
                        className="text-xs text-[#9E3B33] hover:underline font-medium"
                      >
                        {item.mode === 'package'
                          ? `${treatment.packageSessions}-Session Bundle (Switch to Single)`
                          : `Single Session (Upgrade to ${treatment.packageSessions}-Pack)`}
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateQuantity(item.treatmentId, item.mode, -1)
                          }
                          aria-label={`Decrease quantity of ${treatment.title}`}
                          className="w-7 h-7 flex items-center justify-center border border-[#D5C7B4] text-[#181615] hover:bg-[#EFE9E0]"
                        >
                          {item.quantity === 1 ? (
                            <Trash2 className="w-3.5 h-3.5" />
                          ) : (
                            <Minus className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <span className="font-mono-tabular text-xs font-semibold w-5 text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateQuantity(item.treatmentId, item.mode, 1)
                          }
                          aria-label={`Increase quantity of ${treatment.title}`}
                          className="w-7 h-7 flex items-center justify-center border border-[#D5C7B4] text-[#181615] hover:bg-[#EFE9E0]"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {bag.length > 0 && !confirmedOrderCode && (
          <div className="pt-6 border-t border-[#E2D9CC] space-y-4">
            {/* Financing Toggle */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-[#EFE9E0] border border-[#E2D9CC]">
              <button
                type="button"
                onClick={() => setPaymentOption('full')}
                className={`py-1.5 px-2 text-xs font-semibold ${
                  paymentOption === 'full'
                    ? 'bg-[#181615] text-white'
                    : 'text-[#575049]'
                }`}
              >
                Pay in Full
              </button>
              <button
                type="button"
                onClick={() => setPaymentOption('financing')}
                className={`py-1.5 px-2 text-xs font-semibold ${
                  paymentOption === 'financing'
                    ? 'bg-[#181615] text-white'
                    : 'text-[#575049]'
                }`}
              >
                0% APR 12-Mo Plan
              </button>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#575049]">
                <span>Clinical Subtotal</span>
                <span className="font-mono-tabular">
                  ${totals.subtotal.toLocaleString()}
                </span>
              </div>
              {totals.packageSavings > 0 && (
                <div className="flex justify-between text-[#9E3B33]">
                  <span>Multi-Session Bundle Savings</span>
                  <span className="font-mono-tabular">
                    -${totals.packageSavings.toLocaleString()}
                  </span>
                </div>
              )}
              {appliedReward && (
                <div className="flex justify-between text-[#9E3B33]">
                  <span>
                    LaserLove Certificate ({appliedReward.title})
                    <button
                      type="button"
                      onClick={onRemoveReward}
                      className="ml-1.5 underline text-[#575049]"
                    >
                      Remove
                    </button>
                  </span>
                  <span className="font-mono-tabular">
                    -${totals.rewardDiscount.toLocaleString()}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-[#575049]">
                <span>LA Premiere Points Earned</span>
                <span className="font-mono-tabular font-semibold text-[#181615]">
                  +{totals.pointsToEarn.toLocaleString()} pts
                </span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-[#181615] pt-2 border-t border-[#E2D9CC]">
                <span>
                  {paymentOption === 'financing'
                    ? 'Due Today (0% APR Monthly)'
                    : 'Total Due'}
                </span>
                <span
                  data-testid="bag-final-total"
                  className="font-mono-tabular text-base"
                >
                  {paymentOption === 'financing'
                    ? `$${totals.monthlyFinancing}/mo`
                    : `$${totals.finalTotal.toLocaleString()}`}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCompleteOrder}
              className="w-full py-3 px-4 bg-[#9E3B33] hover:bg-[#842F28] text-white text-xs font-semibold tracking-wide transition-colors whitespace-nowrap"
            >
              Confirm Treatment Package & Credit +{totals.pointsToEarn.toLocaleString()} Pts
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
