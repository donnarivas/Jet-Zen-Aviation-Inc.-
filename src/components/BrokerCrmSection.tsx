import React, { useState } from 'react';
import { Search, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { CrmCharterDeal } from '../data/jetzenData';
import { filterCrmDeals } from '../utils/jetzenLogic';

interface BrokerCrmSectionProps {
  deals: CrmCharterDeal[];
  onAdvanceDealWithMl: (dealId: string) => void;
  onInspectDeal: (deal: CrmCharterDeal) => void;
  adminHoursSavedTotal: number;
}

const STAGE_FILTERS = [
  'all',
  'ML Sourcing',
  'Quote Dispatched',
  'Contract & Compliance',
  'Flight Confirmed',
] as const;

export const BrokerCrmSection: React.FC<BrokerCrmSectionProps> = ({
  deals,
  onAdvanceDealWithMl,
  onInspectDeal,
  adminHoursSavedTotal,
}) => {
  const [stageFilter, setStageFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredDeals = filterCrmDeals(deals, stageFilter, searchQuery);

  const totalPipelineRetail = deals.reduce(
    (sum, d) => sum + d.quotedRetailPrice,
    0
  );
  const totalGrossMargin = deals.reduce(
    (sum, d) => sum + (d.quotedRetailPrice - d.wholesaleCost),
    0
  );

  return (
    <section
      id="broker-crm"
      aria-labelledby="crm-heading"
      className="scroll-mt-20 py-20 border-b border-[#E2D9CC] bg-[#FAF8F5]"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-xs text-[#6E655C] mb-2">
              01. Custom-Built Machine Learning Broker CRM
            </p>
            <h2
              id="crm-heading"
              className="font-display text-3xl md:text-4xl font-semibold text-[#0F141C] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Less Time on Administrative Hassles. More Time Closing Charter Lift.
            </h2>
            <p className="mt-3 text-[15px] text-[#4A453E] leading-relaxed">
              At JetZen, you step into a custom-built CRM engineered explicitly for Private Jet Charter Brokers. Our machine-learning workflow automates Part 135 safety verification, empty-leg arbitrage matching, FBO slot requests, and contract documentation—freeing you to build high-net-worth relationships.
            </p>
          </div>

          {/* Live CRM Telemetry Summary Strip */}
          <div className="bg-[#0F141C] text-[#FAF8F5] border border-[#242E3D] p-5 grid grid-cols-3 gap-6 shrink-0">
            <div>
              <span className="text-[11px] text-[#94A3B8] block">
                Active Book Pipeline
              </span>
              <span
                data-testid="crm-pipeline-total"
                className="font-mono-tabular text-lg font-semibold text-[#FAF8F5]"
              >
                ${totalPipelineRetail.toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-[#94A3B8] block">
                Net Broker Margin
              </span>
              <span className="font-mono-tabular text-lg font-semibold text-[#D4AF7A]">
                ${totalGrossMargin.toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-[#94A3B8] block">
                ML Admin Time Saved
              </span>
              <span
                data-testid="crm-admin-hours-saved"
                className="font-mono-tabular text-lg font-semibold text-[#FAF8F5]"
              >
                {adminHoursSavedTotal.toFixed(1)} hrs/wk
              </span>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-1 p-1 bg-[#EFE9E0] border border-[#E2D9CC] overflow-x-auto">
            {STAGE_FILTERS.map((stage) => {
              const active = stageFilter === stage;
              return (
                <button
                  key={stage}
                  type="button"
                  onClick={() => setStageFilter(stage)}
                  className={`px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-[#0F141C] text-[#FAF8F5]'
                      : 'text-[#575049] hover:text-[#0F141C]'
                  }`}
                >
                  {stage === 'all' ? 'All Active Trips' : stage}
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#6E655C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ICAO, aircraft, or account..."
              aria-label="Search CRM charter deals"
              className="w-full pl-9 pr-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#D5C7B4] text-[#0F141C] focus:outline-none focus:border-[#0F141C]"
            />
          </div>
        </div>

        {/* CRM Deal Cards Grid */}
        {filteredDeals.length === 0 ? (
          <div className="bg-[#F5F0E8] border border-[#E2D9CC] p-12 text-center">
            <p className="text-sm font-semibold text-[#0F141C]">
              No active charter trips match "{searchQuery || stageFilter}"
            </p>
            <button
              type="button"
              onClick={() => {
                setStageFilter('all');
                setSearchQuery('');
              }}
              className="mt-3 px-4 py-2 bg-[#0F141C] text-white text-xs font-semibold"
            >
              Reset CRM Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {filteredDeals.map((deal) => {
              const grossMarginUsd = deal.quotedRetailPrice - deal.wholesaleCost;
              const brokerCommission = Math.round(grossMarginUsd * 0.35);

              return (
                <article
                  key={deal.id}
                  data-testid="crm-deal-card"
                  className="bg-[#FAF8F5] border border-[#D8CFC2] p-6 flex flex-col justify-between"
                >
                  <div>
                    {/* Unboxed Clean Metadata Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#6E655C] pb-3 border-b border-[#EFE9E0]">
                      <span className="font-mono-tabular font-semibold text-[#0F141C]">
                        {deal.id} · {deal.clientType}
                      </span>
                      <span className="text-[#9E3B33] font-medium">
                        Stage: {deal.stage}
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-[#0F141C] mt-3">
                      {deal.routeSummary}
                    </h3>
                    <p className="text-xs text-[#575049] mt-1">
                      {deal.clientCode} · {deal.confidentialityTier}
                    </p>

                    <div className="mt-3 pt-3 border-t border-[#EFE9E0] text-xs text-[#4A453E] space-y-1">
                      <p>
                        <span className="text-[#6E655C]">Aircraft & Pax:</span>{' '}
                        <strong>{deal.preferredAircraft}</strong> ({deal.paxCount} PAX ·{' '}
                        <span className="font-mono-tabular">{deal.distanceNm} NM</span>)
                      </p>
                      <p className="font-mono-tabular">
                        <span className="font-sans text-[#6E655C]">Departure:</span>{' '}
                        {deal.departureDate}
                      </p>
                      <p className="text-[#1E3A8A] font-medium">
                        ML Engine: {deal.mlMatchScore}
                      </p>
                    </div>

                    {/* Automated ML Admin Tasks Completed */}
                    <div className="mt-4 bg-[#F5F0E8] border border-[#E2D9CC] p-3 space-y-1.5">
                      <div className="text-[11px] font-semibold text-[#0F141C]">
                        ML Automated Admin Tasks (Zero Broker Busywork):
                      </div>
                      {deal.mlAutoTasksCompleted.map((task, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-1.5 text-[11px] text-[#4A453E]"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#15803D] shrink-0 mt-0.5" />
                          <span>{task}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#E2D9CC] space-y-4">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-[11px] text-[#6E655C] block">
                          Client Charter Quote ({deal.brokerMarginPct}% Margin)
                        </span>
                        <span className="font-mono-tabular text-base font-semibold text-[#0F141C]">
                          ${deal.quotedRetailPrice.toLocaleString()}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] text-[#6E655C] block">
                          Your Est. Commission
                        </span>
                        <span className="font-mono-tabular text-sm font-semibold text-[#9E3B33]">
                          +${brokerCommission.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        disabled={deal.stage === 'Flight Confirmed'}
                        onClick={() => onAdvanceDealWithMl(deal.id)}
                        className={`py-2 px-3 text-xs font-semibold transition-colors whitespace-nowrap ${
                          deal.stage === 'Flight Confirmed'
                            ? 'bg-[#E2D9CC] text-[#6E655C] cursor-default'
                            : 'bg-[#0F141C] hover:bg-[#1E293B] text-white'
                        }`}
                      >
                        {deal.stage === 'Flight Confirmed'
                          ? 'Flight Released'
                          : 'Run ML Auto-Step'}
                      </button>

                      <button
                        type="button"
                        onClick={() => onInspectDeal(deal)}
                        className="py-2 px-3 border border-[#D5C7B4] hover:border-[#0F141C] text-[#0F141C] text-xs font-semibold flex items-center justify-center gap-1 whitespace-nowrap"
                      >
                        <span>Deal Sheet</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
