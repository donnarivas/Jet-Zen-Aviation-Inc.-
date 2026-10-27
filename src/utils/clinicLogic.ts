import {
  TREATMENTS,
  TreatmentCategory,
  TreatmentItem,
  RewardPerk,
} from '../data/clinicData';

export interface BagItem {
  treatmentId: string;
  mode: 'single' | 'package';
  selectedZone: string;
  quantity: number;
}

export interface BagTotals {
  subtotal: number;
  packageSavings: number;
  rewardDiscount: number;
  finalTotal: number;
  monthlyFinancing: number;
  pointsToEarn: number;
  totalItemsCount: number;
}

export interface DiagnosticInput {
  fitzpatrickType: 'I-II' | 'III-IV' | 'V-VI';
  primaryConcern: 'unwanted-hair' | 'fine-lines-volume' | 'texture-pigmentation' | 'body-sculpting';
  targetZone: string;
  downtimePreference: 'zero' | 'minimal-24h' | 'flexible';
}

export interface DiagnosticRecommendation {
  primaryTreatment: TreatmentItem;
  supportingSkincare: TreatmentItem;
  laserSafetyNote: string;
  recommendedCadence: string;
  estimatedPackageSavings: number;
  combinedProtocolPoints: number;
}

export interface TierStatus {
  currentTier: 'Insider' | 'Icon' | 'VIP Platinum';
  nextTier: 'Icon' | 'VIP Platinum' | null;
  pointsToNextTier: number;
  progressPercent: number;
  multiplierLabel: string;
}

export function filterTreatments(
  treatments: TreatmentItem[],
  category: TreatmentCategory,
  searchQuery: string
): TreatmentItem[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();
  return treatments.filter((item) => {
    const matchesCategory = category === 'all' || item.category === category;
    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;
    return (
      item.title.toLowerCase().includes(normalizedQuery) ||
      item.subtitle.toLowerCase().includes(normalizedQuery) ||
      item.categoryLabel.toLowerCase().includes(normalizedQuery) ||
      item.targetZones.some((z) => z.toLowerCase().includes(normalizedQuery))
    );
  });
}

export function calculateBagTotals(
  bag: BagItem[],
  treatments: TreatmentItem[],
  appliedReward: RewardPerk | null
): BagTotals {
  let subtotal = 0;
  let packageSavings = 0;
  let pointsToEarn = 0;
  let totalItemsCount = 0;

  for (const item of bag) {
    const treatment = treatments.find((t) => t.id === item.treatmentId);
    if (!treatment || item.quantity <= 0) continue;

    totalItemsCount += item.quantity;
    if (item.mode === 'package') {
      const unitCost = treatment.packagePrice;
      const regularEquivalent = treatment.singlePrice * treatment.packageSessions;
      subtotal += unitCost * item.quantity;
      packageSavings += Math.max(0, regularEquivalent - unitCost) * item.quantity;
      pointsToEarn += treatment.pointsEarned * item.quantity;
    } else {
      subtotal += treatment.singlePrice * item.quantity;
      pointsToEarn += Math.round(treatment.singlePrice * 1.2) * item.quantity;
    }
  }

  const rewardDiscount = appliedReward ? Math.min(subtotal, appliedReward.dollarValue) : 0;
  const finalTotal = Math.max(0, subtotal - rewardDiscount);
  const monthlyFinancing = finalTotal > 0 ? Math.ceil(finalTotal / 12) : 0;

  return {
    subtotal,
    packageSavings,
    rewardDiscount,
    finalTotal,
    monthlyFinancing,
    pointsToEarn,
    totalItemsCount,
  };
}

export function calculateLoyaltyTier(points: number): TierStatus {
  const safePoints = Math.max(0, points);
  if (safePoints >= 20000) {
    return {
      currentTier: 'VIP Platinum',
      nextTier: null,
      pointsToNextTier: 0,
      progressPercent: 100,
      multiplierLabel: '2.0x Points per $1 + Complimentary Quarterly Clear + Brilliant®',
    };
  }
  if (safePoints >= 10000) {
    const progress = Math.min(100, Math.round(((safePoints - 10000) / 10000) * 100));
    return {
      currentTier: 'Icon',
      nextTier: 'VIP Platinum',
      pointsToNextTier: 20000 - safePoints,
      progressPercent: progress,
      multiplierLabel: '1.5x Points per $1 + Priority Nurse Scheduling & Birthday Syringe Perk',
    };
  }
  const progress = Math.min(100, Math.round((safePoints / 10000) * 100));
  return {
    currentTier: 'Insider',
    nextTier: 'Icon',
    pointsToNextTier: 10000 - safePoints,
    progressPercent: progress,
    multiplierLabel: '1.0x Points per $1 + Exclusive App Bundle Pricing',
  };
}

export function generateSkinDiagnostic(input: DiagnosticInput): DiagnosticRecommendation {
  const skincare =
    TREATMENTS.find((t) => t.id === 'skincare-drenched-kit') || TREATMENTS[TREATMENTS.length - 1];

  let primaryId = 'skin-clear-brilliant';
  if (input.primaryConcern === 'unwanted-hair') {
    primaryId = 'lhr-full-leg-brazilian';
  } else if (input.primaryConcern === 'fine-lines-volume') {
    primaryId =
      input.downtimePreference === 'zero'
        ? 'injectable-botox-xeomin'
        : 'injectable-juvederm-galderma';
  } else if (input.primaryConcern === 'body-sculpting') {
    primaryId = 'body-coolsculpting-elite';
  } else {
    primaryId = 'skin-clear-brilliant';
  }

  const primaryTreatment =
    TREATMENTS.find((t) => t.id === primaryId) || TREATMENTS[0];

  let laserSafetyNote = '';
  if (input.fitzpatrickType === 'V-VI') {
    laserSafetyNote =
      'Calibrated for Fitzpatrick V–VI melanin density: uses 1064nm Nd:YAG bypass wavelength or non-ablative 1927nm low-fluence passes with continuous -20°C cryo-cooling to prevent post-inflammatory hyperpigmentation.';
  } else if (input.fitzpatrickType === 'III-IV') {
    laserSafetyNote =
      'Calibrated for Fitzpatrick III–IV olive/warm undertones: Skintel optical melanin reader dynamically balances 755nm/1064nm pulse duration with mineral SPF 50+ barrier lock.';
  } else {
    laserSafetyNote =
      'Calibrated for Fitzpatrick I–II high-contrast skin: high-affinity 755nm Alexandrite and 1927nm fractional thulium protocols with soothing peptide recovery.';
  }

  const recommendedCadence =
    input.primaryConcern === 'unwanted-hair'
      ? `6 sessions spaced every 4–6 weeks targeting ${input.targetZone || 'selected zone'}`
      : input.primaryConcern === 'fine-lines-volume'
        ? `Initial precision session for ${input.targetZone || 'facial architecture'} + 14-day symmetry check; maintenance every 3–4 months`
        : input.primaryConcern === 'body-sculpting'
          ? `2–4 dual-applicator cycles spaced 6 weeks apart for ${input.targetZone || 'target contour'}`
          : `5 Perméa fractional sessions spaced every 4 weeks for ${input.targetZone || 'full face & neck'}`;

  const estimatedPackageSavings = Math.max(
    0,
    primaryTreatment.singlePrice * primaryTreatment.packageSessions -
      primaryTreatment.packagePrice
  );

  return {
    primaryTreatment,
    supportingSkincare: skincare,
    laserSafetyNote,
    recommendedCadence,
    estimatedPackageSavings,
    combinedProtocolPoints: primaryTreatment.pointsEarned + skincare.pointsEarned,
  };
}

export function validateBookingInput(input: {
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  date: string;
  timeSlot: string;
}): { valid: boolean; error?: string } {
  if (!input.patientName || input.patientName.trim().length < 2) {
    return { valid: false, error: 'Please enter the patient full name (at least 2 characters).' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!input.patientEmail || !emailRegex.test(input.patientEmail.trim())) {
    return { valid: false, error: 'Please enter a valid patient email address for clinical confirmation.' };
  }
  if (!input.patientPhone || input.patientPhone.replace(/\D/g, '').length < 7) {
    return { valid: false, error: 'Please enter a valid phone number for SMS nurse check-in.' };
  }
  if (!input.date) {
    return { valid: false, error: 'Please select a preferred appointment date.' };
  }
  if (!input.timeSlot) {
    return { valid: false, error: 'Please select an available appointment time slot.' };
  }
  return { valid: true };
}
