import {
  AIRCRAFT_FLEET,
  AircraftSpec,
  CHARTER_ROUTES,
  CharterRoute,
  CrmCharterDeal,
  LorFilterCategory,
  RecommendationLetter,
  ResumeEntry,
} from '../data/jetzenData';

export interface MissionQuoteCalculation {
  route: CharterRoute;
  aircraft: AircraftSpec;
  isNonstopCapable: boolean;
  fuelStopsRequired: number;
  blockHours: number;
  wholesaleOperatorCost: number;
  fetTaxAndFboFees: number;
  quotedClientPrice: number;
  grossBrokerMarginUsd: number;
  estimatedBrokerCommissionUsd: number;
  paxCapacityWarning: string | null;
}

export interface BrokerCompensationProjection {
  monthlyFlights: number;
  avgTripValueUsd: number;
  avgMarginPct: number;
  annualCharterVolumeUsd: number;
  annualGrossMarginUsd: number;
  projectedAnnualPayUsd: number;
  payBandStatus:
    | 'Base Ramp ($35k–$120k)'
    | 'Mid-Market Producer ($120k–$275k)'
    | 'Top-Decile Senior Broker ($275k–$450k+)';
  monthlyAdminHoursSavedByMl: number;
}

export interface CandidateApplicationInput {
  fullName: string;
  email: string;
  phone: string;
  yearsAviationSales: string;
  networkStrength: string;
  processImprovementIdea: string;
}

export function filterRecommendationLetters(
  letters: RecommendationLetter[],
  category: LorFilterCategory,
  searchQuery: string
): RecommendationLetter[] {
  const q = searchQuery.trim().toLowerCase();
  return letters.filter((lor) => {
    const matchesCategory =
      category === 'all' || lor.filterCategory === category;
    if (!matchesCategory) return false;
    if (!q) return true;
    return (
      lor.authorName.toLowerCase().includes(q) ||
      lor.institution.toLowerCase().includes(q) ||
      lor.headlineQuote.toLowerCase().includes(q) ||
      lor.jetzenQualificationsProved.some((item) =>
        item.toLowerCase().includes(q)
      )
    );
  });
}

export function filterResumeEntries(
  entries: ResumeEntry[],
  filterType: 'all' | 'education' | 'experience'
): ResumeEntry[] {
  if (filterType === 'all') return entries;
  return entries.filter((entry) => entry.type === filterType);
}

export function calculateCharterMissionQuote(params: {
  routeId: string;
  aircraftId: string;
  paxCount: number;
  brokerMarginPct: number;
}): MissionQuoteCalculation {
  const route =
    CHARTER_ROUTES.find((r) => r.id === params.routeId) || CHARTER_ROUTES[0];
  const aircraft =
    AIRCRAFT_FLEET.find((a) => a.id === params.aircraftId) || AIRCRAFT_FLEET[0];

  const safePax = Math.max(1, params.paxCount);
  const safeMargin = Math.min(30, Math.max(5, params.brokerMarginPct));

  const isNonstopCapable = aircraft.maxRangeNm >= route.distanceNm;
  const fuelStopsRequired = isNonstopCapable
    ? 0
    : Math.ceil(route.distanceNm / aircraft.maxRangeNm) - 1;

  const cruiseHours = route.distanceNm / aircraft.cruiseKnots;
  const blockHours = Number(
    (cruiseHours + 0.35 + fuelStopsRequired * 0.65).toFixed(1)
  );

  const wholesaleOperatorCost = Math.round(
    blockHours * aircraft.hourlyRateUsd + fuelStopsRequired * 1850
  );
  const grossBrokerMarginUsd = Math.round(
    wholesaleOperatorCost * (safeMargin / 100)
  );
  const fetTaxAndFboFees = Math.round(
    (wholesaleOperatorCost + grossBrokerMarginUsd) * 0.075 + 1250
  );
  const quotedClientPrice =
    wholesaleOperatorCost + grossBrokerMarginUsd + fetTaxAndFboFees;

  const estimatedBrokerCommissionUsd = Math.round(grossBrokerMarginUsd * 0.35);

  const paxCapacityWarning =
    safePax > aircraft.maxPax
      ? `Exceeds ${aircraft.model} max capacity (${aircraft.maxPax} PAX). Upgrade cabin class or split into 2 aircraft.`
      : null;

  return {
    route,
    aircraft,
    isNonstopCapable,
    fuelStopsRequired,
    blockHours,
    wholesaleOperatorCost,
    fetTaxAndFboFees,
    quotedClientPrice,
    grossBrokerMarginUsd,
    estimatedBrokerCommissionUsd,
    paxCapacityWarning,
  };
}

export function calculateBrokerCompensation(params: {
  monthlyFlights: number;
  avgTripValueUsd: number;
  avgMarginPct: number;
}): BrokerCompensationProjection {
  const flights = Math.max(1, params.monthlyFlights);
  const tripVal = Math.max(10000, params.avgTripValueUsd);
  const marginPct = Math.min(25, Math.max(5, params.avgMarginPct));

  const annualCharterVolumeUsd = flights * 12 * tripVal;
  const annualGrossMarginUsd = Math.round(
    annualCharterVolumeUsd * (marginPct / 100)
  );

  const baseDraw = 35000;
  const commissionPool = Math.round(annualGrossMarginUsd * 0.35);
  const projectedAnnualPayUsd = Math.min(
    450000,
    Math.max(baseDraw, baseDraw + commissionPool)
  );

  let payBandStatus: BrokerCompensationProjection['payBandStatus'] =
    'Base Ramp ($35k–$120k)';
  if (projectedAnnualPayUsd >= 275000) {
    payBandStatus = 'Top-Decile Senior Broker ($275k–$450k+)';
  } else if (projectedAnnualPayUsd >= 120000) {
    payBandStatus = 'Mid-Market Producer ($120k–$275k)';
  }

  const monthlyAdminHoursSavedByMl = Math.round(flights * 2.3);

  return {
    monthlyFlights: flights,
    avgTripValueUsd: tripVal,
    avgMarginPct: marginPct,
    annualCharterVolumeUsd,
    annualGrossMarginUsd,
    projectedAnnualPayUsd,
    payBandStatus,
    monthlyAdminHoursSavedByMl,
  };
}

export function filterCrmDeals(
  deals: CrmCharterDeal[],
  stageFilter: string,
  searchQuery: string
): CrmCharterDeal[] {
  const q = searchQuery.trim().toLowerCase();
  return deals.filter((deal) => {
    const matchesStage = stageFilter === 'all' || deal.stage === stageFilter;
    if (!matchesStage) return false;
    if (!q) return true;
    return (
      deal.id.toLowerCase().includes(q) ||
      deal.clientCode.toLowerCase().includes(q) ||
      deal.routeSummary.toLowerCase().includes(q) ||
      deal.preferredAircraft.toLowerCase().includes(q)
    );
  });
}

export function validateCandidateApplication(
  input: CandidateApplicationInput
): { valid: boolean; error?: string } {
  if (!input.fullName || input.fullName.trim().length < 2) {
    return { valid: false, error: 'Please enter your full name.' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!input.email || !emailRegex.test(input.email.trim())) {
    return { valid: false, error: 'Please enter a valid email address.' };
  }
  if (!input.phone || input.phone.replace(/\D/g, '').length < 7) {
    return { valid: false, error: 'Please enter a valid contact phone number.' };
  }
  if (!input.yearsAviationSales || input.yearsAviationSales.trim().length === 0) {
    return {
      valid: false,
      error: 'Please specify your private aviation or luxury sales experience.',
    };
  }
  if (
    !input.processImprovementIdea ||
    input.processImprovementIdea.trim().length < 10
  ) {
    return {
      valid: false,
      error:
        'Please share a brief workflow or client-building idea (at least 10 characters) as requested in the JetZen job description.',
    };
  }
  return { valid: true };
}
