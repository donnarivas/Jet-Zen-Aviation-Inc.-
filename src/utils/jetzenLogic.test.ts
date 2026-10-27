import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateCharterMissionQuote,
  calculateBrokerCompensation,
  filterCrmDeals,
  filterRecommendationLetters,
  filterResumeEntries,
  validateCandidateApplication,
} from './jetzenLogic';
import {
  INITIAL_CRM_DEALS,
  RECOMMENDATION_LETTERS,
  DONNA_RESUME_ENTRIES,
} from '../data/jetzenData';

test('filterRecommendationLetters filters all 7 letters by category and search query', () => {
  assert.equal(RECOMMENDATION_LETTERS.length, 7);

  const financeLetters = filterRecommendationLetters(
    RECOMMENDATION_LETTERS,
    'finance-strategy',
    ''
  );
  assert.equal(financeLetters.length, 2);

  const harvardSearch = filterRecommendationLetters(
    RECOMMENDATION_LETTERS,
    'all',
    'Harvard'
  );
  assert.equal(harvardSearch.length, 1);
  assert.equal(harvardSearch[0].authorName, 'Anne Taieb');
});

test('filterResumeEntries filters Donna Rivas education and experience entries', () => {
  const edu = filterResumeEntries(DONNA_RESUME_ENTRIES, 'education');
  assert.equal(edu.length, 4);

  const exp = filterResumeEntries(DONNA_RESUME_ENTRIES, 'experience');
  assert.equal(exp.length, 4);
});

test('calculateCharterMissionQuote flags fuel stops on transatlantic route for light jets and nonstop for G550', () => {
  const lightJetQuote = calculateCharterMissionQuote({
    routeId: 'kteb-eggw',
    aircraftId: 'phenom-300e',
    paxCount: 8,
    brokerMarginPct: 14,
  });
  assert.equal(lightJetQuote.isNonstopCapable, false);
  assert.equal(lightJetQuote.fuelStopsRequired, 1);
  assert.ok(lightJetQuote.paxCapacityWarning !== null);

  const heavyJetQuote = calculateCharterMissionQuote({
    routeId: 'kteb-eggw',
    aircraftId: 'gulfstream-g550',
    paxCount: 10,
    brokerMarginPct: 14,
  });
  assert.equal(heavyJetQuote.isNonstopCapable, true);
  assert.equal(heavyJetQuote.fuelStopsRequired, 0);
  assert.equal(heavyJetQuote.paxCapacityWarning, null);
});

test('calculateBrokerCompensation stays within $35,000 to $450,000 JD pay scale and computes ML hours saved', () => {
  const entryBroker = calculateBrokerCompensation({
    monthlyFlights: 2,
    avgTripValueUsd: 25000,
    avgMarginPct: 10,
  });
  assert.ok(entryBroker.projectedAnnualPayUsd >= 35000);
  assert.equal(entryBroker.monthlyAdminHoursSavedByMl, 5);

  const topBroker = calculateBrokerCompensation({
    monthlyFlights: 16,
    avgTripValueUsd: 75000,
    avgMarginPct: 15,
  });
  assert.equal(topBroker.projectedAnnualPayUsd, 450000);
  assert.equal(
    topBroker.payBandStatus,
    'Top-Decile Senior Broker ($275k–$450k+)'
  );
});

test('filterCrmDeals and validateCandidateApplication work accurately', () => {
  const confirmed = filterCrmDeals(INITIAL_CRM_DEALS, 'Flight Confirmed', '');
  assert.equal(confirmed.length, 1);

  const valid = validateCandidateApplication({
    fullName: 'Donna Rivas',
    email: 'donnaarivas10@gmail.com',
    phone: '212-555-0144',
    yearsAviationSales: '5+ Years Consultative & Luxury Sales',
    networkStrength: 'Georgetown, Harvard & Southern California Corporate Network',
    processImprovementIdea:
      'Automate empty-leg push alerts matched to principal home airports.',
  });
  assert.equal(valid.valid, true);
});
