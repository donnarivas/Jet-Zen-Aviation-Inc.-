import React, { useState } from 'react';
import {
  AIRCRAFT_FLEET,
  CHARTER_ROUTES,
  CrmCharterDeal,
} from '../data/jetzenData';
import { calculateCharterMissionQuote } from '../utils/jetzenLogic';
import { AircraftSilhouetteCard } from './JetZenArtwork';

interface FleetConfiguratorSectionProps {
  onPushQuoteToCrm: (newDeal: CrmCharterDeal) => void;
}

export const FleetConfiguratorSection: React.FC<
  FleetConfiguratorSectionProps
> = ({ onPushQuoteToCrm }) => {
  const [selectedRouteId, setSelectedRouteId] = useState(CHARTER_ROUTES[0].id);
  const [selectedAircraftId, setSelectedAircraftId] = useState(
    'gulfstream-g550'
  );
  const [paxCount, setPaxCount] = useState<number>(8);
  const [brokerMarginPct, setBrokerMarginPct] = useState<number>(14);
  const [clientAccountName, setClientAccountName] = useState<string>(
    'Vanguard Global Partners'
  );

  const calc = calculateCharterMissionQuote({
    routeId: selectedRouteId,
    aircraftId: selectedAircraftId,
    paxCount,
    brokerMarginPct,
  });

  const handleDispatchQuote = () => {
    const newDeal: CrmCharterDeal = {
      id: `JZ-${Math.floor(4100 + Math.random() * 899)}`,
      clientCode: clientAccountName.trim() || 'Private Principal Account',
      clientType: 'UHNW Principal',
      routeSummary: `${calc.route.originCode} (${calc.route.originCity.split(',')[0]}) → ${calc.route.destCode} (${calc.route.destCity.split(',')[0]})`,
      distanceNm: calc.route.distanceNm,
      paxCount,
      preferredAircraft: calc.aircraft.model,
      departureDate: '2026-11-18 · 09:00 Local',
      wholesaleCost: calc.wholesaleOperatorCost,
      quotedRetailPrice: calc.quotedClientPrice,
      brokerMarginPct,
      stage: 'Quote Dispatched',
      mlMatchScore: calc.isNonstopCapable
        ? 'Nonstop Range Verified · ARGUS Platinum Tail Assigned'
        : '1 Tech Fuel Stop Auto-Routed via Gander (CYQX)',
      mlAutoTasksCompleted: [
        `Origin FBO (${calc.route.originFbo}) & Destination FBO (${calc.route.destFbo}) Notified`,
        'Part 135 Crew Rest & Insurance Certificate Verified',
        '7.5% FET & Segment Fees Calculated Automatically',
      ],
      confidentialityTier: 'NDA Strict · Tail Masked',
    };
    onPushQuoteToCrm(newDeal);
  };

  return (
    <section
      id="fleet-configurator"
      aria-labelledby="fleet-heading"
      className="scroll-mt-20 py-20 border-b border-[#E2D9CC] bg-[#F5F0E8]"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="max-w-2xl mb-12">
          <p className="text-xs text-[#6E655C] mb-2">
            02. Aircraft Selection, Flight Coordination & Financial Acumen
          </p>
          <h2
            id="fleet-heading"
            className="font-display text-3xl md:text-4xl font-semibold text-[#0F141C] tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            Bespoke Charter Solution & Margin Desk
          </h2>
          <p className="mt-3 text-[15px] text-[#4A453E] leading-relaxed">
            Demonstrating core JetZen broker duties: match client itineraries and passenger counts to range-capable aircraft, evaluate FBO pairs, and structure profitable wholesale-to-retail charter quotes.
          </p>
        </div>

        {/* 4 Aircraft Class Comparison Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {AIRCRAFT_FLEET.map((jet) => {
            const isSelected = jet.id === selectedAircraftId;
            const canFlyNonstop = jet.maxRangeNm >= calc.route.distanceNm;

            return (
              <div
                key={jet.id}
                className={`bg-[#FAF8F5] border flex flex-col justify-between transition-colors ${
                  isSelected
                    ? 'border-[#0F141C] ring-1 ring-[#0F141C]'
                    : 'border-[#D8CFC2]'
                }`}
              >
                <div>
                  <AircraftSilhouetteCard
                    category={jet.category}
                    rangeNm={jet.maxRangeNm}
                    cruiseKnots={jet.cruiseKnots}
                  />
                  <div className="p-4">
                    <div className="flex items-center justify-between text-[11px] text-[#6E655C]">
                      <span>{jet.categoryLabel}</span>
                      <span className="font-mono-tabular">
                        Up to {jet.maxPax} PAX
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-[#0F141C] mt-1">
                      {jet.model}
                    </h3>
                    <p className="text-xs text-[#575049] mt-1 leading-snug">
                      {jet.description}
                    </p>
                    <p className="text-[11px] font-mono-tabular mt-2 text-[#4A453E]">
                      Cabin: {jet.cabinHeightFt}ft H · {jet.baggageCuFt} cu ft bag
                    </p>
                  </div>
                </div>

                <div className="px-4 pb-4 pt-3 border-t border-[#EFE9E0] space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono-tabular font-semibold text-[#0F141C]">
                      ${jet.hourlyRateUsd.toLocaleString()}/hr
                    </span>
                    <span
                      className={`text-[11px] font-medium ${
                        canFlyNonstop ? 'text-[#15803D]' : 'text-[#9E3B33]'
                      }`}
                    >
                      {canFlyNonstop ? 'Nonstop Capable' : 'Requires Fuel Stop'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedAircraftId(jet.id)}
                    aria-pressed={isSelected}
                    className={`w-full py-2 px-3 text-xs font-semibold transition-colors whitespace-nowrap ${
                      isSelected
                        ? 'bg-[#0F141C] text-white'
                        : 'border border-[#0F141C] text-[#0F141C] hover:bg-[#0F141C] hover:text-white'
                    }`}
                  >
                    {isSelected ? 'Selected for Quote' : `Select ${jet.model.split(' ').slice(-1)[0]}`}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Mission Configurator & Financial Desk */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 7 Columns: Route, Pax, FBO, and Margin Controls */}
          <div className="lg:col-span-7 bg-[#FAF8F5] border border-[#D8CFC2] p-6 md:p-8 space-y-6">
            <div>
              <label
                htmlFor="mission-route-select"
                className="block text-sm font-semibold text-[#0F141C] mb-1.5"
              >
                1. Select Charter Itinerary & FBO Pair
              </label>
              <select
                id="mission-route-select"
                value={selectedRouteId}
                onChange={(e) => setSelectedRouteId(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#C7BBAE] text-[#0F141C]"
              >
                {CHARTER_ROUTES.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.originCode} ({r.originCity}) → {r.destCode} ({r.destCity}) ·{' '}
                    {r.distanceNm.toLocaleString()} NM
                  </option>
                ))}
              </select>
              <p className="text-xs text-[#575049] mt-2">
                Origin FBO: <strong>{calc.route.originFbo}</strong> · Arrival FBO:{' '}
                <strong>{calc.route.destFbo}</strong>
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#EFE9E0]">
              <div>
                <div className="flex justify-between text-xs font-semibold text-[#0F141C] mb-2">
                  <label htmlFor="mission-pax-range">
                    2. Passenger Manifest Count
                  </label>
                  <span className="font-mono-tabular">{paxCount} PAX</span>
                </div>
                <input
                  id="mission-pax-range"
                  type="range"
                  min={2}
                  max={14}
                  value={paxCount}
                  onChange={(e) => setPaxCount(Number(e.target.value))}
                  className="w-full accent-[#0F141C]"
                />
                <div className="flex justify-between text-[11px] text-[#6E655C] font-mono-tabular mt-1">
                  <span>2 PAX</span>
                  <span>8 PAX</span>
                  <span>14 PAX</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-[#0F141C] mb-2">
                  <label htmlFor="mission-margin-range">
                    3. Target Gross Margin (%)
                  </label>
                  <span className="font-mono-tabular text-[#9E3B33]">
                    {brokerMarginPct}%
                  </span>
                </div>
                <input
                  id="mission-margin-range"
                  type="range"
                  min={8}
                  max={20}
                  value={brokerMarginPct}
                  onChange={(e) => setBrokerMarginPct(Number(e.target.value))}
                  className="w-full accent-[#9E3B33]"
                />
                <div className="flex justify-between text-[11px] text-[#6E655C] font-mono-tabular mt-1">
                  <span>8% Competitive</span>
                  <span>14% Standard</span>
                  <span>20% Peak/Urgent</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#EFE9E0]">
              <label
                htmlFor="client-account-input"
                className="block text-xs font-semibold text-[#0F141C] mb-1.5"
              >
                4. Principal / Corporate Account Reference (Discreet Manifest)
              </label>
              <input
                id="client-account-input"
                type="text"
                value={clientAccountName}
                onChange={(e) => setClientAccountName(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#C7BBAE] text-[#0F141C]"
              />
            </div>
          </div>

          {/* Right 5 Columns: Live Cost-Benefit & Charter Quote Ledger */}
          <div
            data-testid="mission-quote-card"
            className="lg:col-span-5 bg-[#0F141C] text-[#FAF8F5] border border-[#242E3D] p-6 md:p-8 space-y-5"
          >
            <div className="border-b border-[#263244] pb-4">
              <div className="text-xs text-[#94A3B8] font-mono-tabular">
                {calc.route.originCode} → {calc.route.destCode} ·{' '}
                {calc.route.distanceNm.toLocaleString()} NM · {calc.blockHours}{' '}
                Block Hrs
              </div>
              <h3 className="font-display text-2xl font-semibold text-[#FAF8F5] mt-1">
                {calc.aircraft.model} Charter Proposal
              </h3>
              <p className="text-xs text-[#D4AF7A] mt-1">
                {calc.aircraft.part135Safety} ·{' '}
                {calc.isNonstopCapable
                  ? 'Nonstop Range Envelope Verified'
                  : `Requires ${calc.fuelStopsRequired} Technical Refuel Stop`}
              </p>
            </div>

            {calc.paxCapacityWarning && (
              <div className="p-3 bg-[#9E3B33]/25 border border-[#9E3B33] text-xs text-[#FCA5A5]">
                {calc.paxCapacityWarning}
              </div>
            )}

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-[#CBD5E1]">
                <span>
                  Part 135 Wholesale Operator Cost ({calc.blockHours} hrs)
                </span>
                <span className="font-mono-tabular">
                  ${calc.wholesaleOperatorCost.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-[#CBD5E1]">
                <span>JetZen Gross Charter Margin ({brokerMarginPct}%)</span>
                <span className="font-mono-tabular text-[#D4AF7A]">
                  +${calc.grossBrokerMarginUsd.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-[#CBD5E1]">
                <span>7.5% Federal Excise Tax & FBO Ramp Handling</span>
                <span className="font-mono-tabular">
                  ${calc.fetTaxAndFboFees.toLocaleString()}
                </span>
              </div>

              <div className="pt-3 border-t border-[#263244] flex items-baseline justify-between">
                <span className="text-sm font-semibold text-[#FAF8F5]">
                  All-In Client Charter Quote
                </span>
                <span
                  data-testid="mission-total-quote"
                  className="font-mono-tabular text-2xl font-semibold text-[#FAF8F5]"
                >
                  ${calc.quotedClientPrice.toLocaleString()}
                </span>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-[#D4AF7A]">
                <span>Your Broker Commission (35% of Margin)</span>
                <span
                  data-testid="mission-broker-commission"
                  className="font-mono-tabular font-semibold"
                >
                  +${calc.estimatedBrokerCommissionUsd.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleDispatchQuote}
              className="w-full py-3 px-4 bg-[#9E3B33] hover:bg-[#842F28] text-white text-xs font-semibold tracking-wide transition-colors whitespace-nowrap"
            >
              Push Charter Proposal to JetZen ML CRM Pipeline
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
