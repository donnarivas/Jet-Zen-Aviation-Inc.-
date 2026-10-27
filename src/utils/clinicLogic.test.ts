import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterTreatments,
  calculateBagTotals,
  calculateLoyaltyTier,
  generateSkinDiagnostic,
  validateBookingInput,
} from './clinicLogic';
import { TREATMENTS, REWARD_PERKS } from '../data/clinicData';

test('filterTreatments filters accurately by category and search query', () => {
  const injectables = filterTreatments(TREATMENTS, 'injectables', '');
  assert.equal(injectables.length, 2);
  assert.ok(injectables.every((t) => t.category === 'injectables'));

  const searchResult = filterTreatments(TREATMENTS, 'all', 'Perméa');
  assert.equal(searchResult.length, 1);
  assert.equal(searchResult[0].id, 'skin-clear-brilliant');
});

test('calculateBagTotals computes package savings, reward discounts, and financing', () => {
  const bag = [
    {
      treatmentId: 'lhr-full-leg-brazilian',
      mode: 'package' as const,
      selectedZone: 'Brazilian & Bikini',
      quantity: 1,
    },
    {
      treatmentId: 'skincare-drenched-kit',
      mode: 'single' as const,
      selectedZone: 'Daily Post-Laser Barrier Care',
      quantity: 2,
    },
  ];
  const perk = REWARD_PERKS[0]; // $50 credit
  const totals = calculateBagTotals(bag, TREATMENTS, perk);

  // Package price 1390 + (2 * 148 = 296) = 1686
  assert.equal(totals.subtotal, 1686);
  // Single price 295 * 6 = 1770; savings = 1770 - 1390 = 380
  assert.equal(totals.packageSavings, 380);
  assert.equal(totals.rewardDiscount, 50);
  assert.equal(totals.finalTotal, 1636);
  assert.equal(totals.totalItemsCount, 3);
  assert.ok(totals.pointsToEarn > 1500);
});

test('calculateLoyaltyTier maps Insider, Icon, and VIP Platinum thresholds', () => {
  const insider = calculateLoyaltyTier(5000);
  assert.equal(insider.currentTier, 'Insider');
  assert.equal(insider.nextTier, 'Icon');
  assert.equal(insider.pointsToNextTier, 5000);

  const icon = calculateLoyaltyTier(12450);
  assert.equal(icon.currentTier, 'Icon');
  assert.equal(icon.nextTier, 'VIP Platinum');
  assert.equal(icon.pointsToNextTier, 7550);

  const vip = calculateLoyaltyTier(22000);
  assert.equal(vip.currentTier, 'VIP Platinum');
  assert.equal(vip.nextTier, null);
  assert.equal(vip.progressPercent, 100);
});

test('generateSkinDiagnostic calibrates protocol for Fitzpatrick V-VI and concern', () => {
  const rec = generateSkinDiagnostic({
    fitzpatrickType: 'V-VI',
    primaryConcern: 'unwanted-hair',
    targetZone: 'Full Legs',
    downtimePreference: 'zero',
  });
  assert.equal(rec.primaryTreatment.id, 'lhr-full-leg-brazilian');
  assert.ok(rec.laserSafetyNote.includes('1064nm Nd:YAG'));
  assert.ok(rec.estimatedPackageSavings > 0);
});

test('validateBookingInput enforces required clinical intake fields', () => {
  const invalidName = validateBookingInput({
    patientName: '',
    patientEmail: 'donna@example.com',
    patientPhone: '3105550199',
    date: '2026-11-10',
    timeSlot: '10:00 AM',
  });
  assert.equal(invalidName.valid, false);

  const valid = validateBookingInput({
    patientName: 'Donna Rivas',
    patientEmail: 'donna@example.com',
    patientPhone: '310-555-0199',
    date: '2026-11-10',
    timeSlot: '10:00 AM',
  });
  assert.equal(valid.valid, true);
});
