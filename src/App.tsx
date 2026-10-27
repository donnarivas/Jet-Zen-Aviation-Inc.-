import React, { useEffect, useRef, useState } from 'react';
import { FileCheck, Award, Plane, Sliders, Camera, Upload } from 'lucide-react';
import {
  INITIAL_CRM_DEALS,
  QUALIFICATIONS_AND_DUTIES,
  RECOMMENDATION_LETTERS,
  CrmCharterDeal,
} from './data/jetzenData';
import { HeroAviationBlueprint } from './components/JetZenArtwork';
import { CandidateCredentialsSection } from './components/CandidateCredentialsSection';
import { BrokerCrmSection } from './components/BrokerCrmSection';
import { FleetConfiguratorSection } from './components/FleetConfiguratorSection';
import { RoleAndEarningsSection } from './components/RoleAndEarningsSection';
import {
  CandidateApplicationSection,
  DealSheetModal,
} from './components/CandidateApplicationModal';
import { loadCandidateMedia, saveCandidateMedia } from './utils/mediaStorage';

export default function App() {
  // JetZen ML Broker CRM Pipeline State
  const [deals, setDeals] = useState<CrmCharterDeal[]>(INITIAL_CRM_DEALS);
  const [adminHoursSavedTotal, setAdminHoursSavedTotal] =
    useState<number>(14.5);
  const [selectedDealForModal, setSelectedDealForModal] =
    useState<CrmCharterDeal | null>(null);

  // Header Candidate Portrait Upload State
  const [headerPhotoUrl, setHeaderPhotoUrl] = useState<string | null>(null);
  const headerPhotoInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    let active = true;
    loadCandidateMedia('header-portrait').then((saved) => {
      if (active && saved && saved.mediaType === 'image') {
        setHeaderPhotoUrl(saved.url);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const handleHeaderPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setHeaderPhotoUrl(objectUrl);
    saveCandidateMedia('header-portrait', file, 'image');
    showBanner(`Header candidate portrait updated (${file.name}).`);
    e.target.value = '';
  };

  // Qualification & Duties Self-Check State (All 20 verified by Donna's credentials)
  const [checkedQualIds, setCheckedQualIds] = useState<string[]>(
    QUALIFICATIONS_AND_DUTIES.map((q) => q.id)
  );

  // Live Action Status Banner
  const [statusBanner, setStatusBanner] = useState<string | null>(null);

  const showBanner = (msg: string) => {
    setStatusBanner(msg);
    setTimeout(() => {
      setStatusBanner((prev) => (prev === msg ? null : prev));
    }, 4500);
  };

  const handleAdvanceDealWithMl = (dealId: string) => {
    setDeals((prev) =>
      prev.map((deal) => {
        if (deal.id !== dealId) return deal;
        const nextStage: CrmCharterDeal['stage'] =
          deal.stage === 'ML Sourcing'
            ? 'Quote Dispatched'
            : deal.stage === 'Quote Dispatched'
              ? 'Contract & Compliance'
              : 'Flight Confirmed';

        const newAutoTask =
          nextStage === 'Quote Dispatched'
            ? 'ML Multi-Option Proposal Dispatched to Principal'
            : nextStage === 'Contract & Compliance'
              ? 'Part 135 Charter Contract & Cabotage Compliance Cleared'
              : 'Flight Brief, Tail Assignment & FBO Ramp Manifest Released';

        return {
          ...deal,
          stage: nextStage,
          mlAutoTasksCompleted: [
            ...deal.mlAutoTasksCompleted,
            newAutoTask,
          ],
        };
      })
    );
    setAdminHoursSavedTotal((prev) => Number((prev + 2.3).toFixed(1)));
    showBanner(
      `JetZen ML CRM automated workflow step for Trip #${dealId} (+2.3 broker admin hours saved).`
    );
  };

  const handlePushQuoteToCrm = (newDeal: CrmCharterDeal) => {
    setDeals((prev) => [newDeal, ...prev]);
    setAdminHoursSavedTotal((prev) => Number((prev + 2.3).toFixed(1)));
    showBanner(
      `Proposal #${newDeal.id} (${newDeal.preferredAircraft} · ${newDeal.routeSummary}) added to JetZen ML CRM Pipeline.`
    );
    const el = document.getElementById('broker-crm');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleToggleQualification = (id: string) => {
    setCheckedQualIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#0F141C]">
      {/* Hidden File Input for Header Photo Upload */}
      <input
        ref={headerPhotoInputRef}
        type="file"
        accept="image/*"
        onChange={handleHeaderPhotoUpload}
        className="hidden"
        aria-label="Upload header candidate photo"
      />

      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-sm border-b border-[#E2D9CC]">
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark + Uploadable Header Profile Photo */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => headerPhotoInputRef.current?.click()}
              title="Click to upload candidate header photo"
              data-testid="navbar-photo-upload-btn"
              className="relative w-10 h-10 border border-[#0F141C] bg-[#0F141C] text-[#FAF8F5] overflow-hidden flex items-center justify-center group shrink-0"
            >
              {headerPhotoUrl ? (
                <img
                  src={headerPhotoUrl}
                  alt="Donna Aseret Rivas Portrait"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="font-display text-sm font-semibold tracking-wider text-[#D4AF7A]">
                  DR
                </span>
              )}
              <span className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Camera className="w-3.5 h-3.5 text-white" />
              </span>
            </button>
            <a
              href="#top"
              className="font-display text-2xl font-bold tracking-tight text-[#0F141C] whitespace-nowrap shrink-0"
            >
              Donna A. Rivas × JetZen
            </a>
          </div>

          {/* Zone 2: 4 concise single-line text navigation links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#575049]"
          >
            <a
              href="#endorsement-letters"
              className="hover:text-[#0F141C] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              7 Endorsements
            </a>
            <a
              href="#executive-resume"
              className="hover:text-[#0F141C] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Executive CV
            </a>
            <a
              href="#role-earnings"
              className="hover:text-[#0F141C] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              20-Point Fit Matrix
            </a>
            <a
              href="#broker-crm"
              className="hover:text-[#0F141C] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              ML CRM Demo
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => scrollToSection('apply-now')}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#0F141C] hover:bg-[#1E293B] transition-colors whitespace-nowrap shrink-0"
            >
              View Candidate Dossier
            </button>
          </div>
        </div>
      </header>

      {/* Live Action Status Banner */}
      {statusBanner && (
        <div
          role="status"
          className="bg-[#0F141C] text-[#FAF8F5] text-xs py-2.5 px-6 border-b border-[#242E3D]"
        >
          <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-4">
            <span>{statusBanner}</span>
            <button
              type="button"
              onClick={() => setStatusBanner(null)}
              className="text-[#D4AF7A] underline whitespace-nowrap shrink-0"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      <main id="top" className="flex-1">
        {/* Hero Section: 2-Column Split (items-stretch) + Full-Width 4-Column Candidate Pedigree Strip Below */}
        <section className="pt-10 pb-16 border-b border-[#E2D9CC]">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left 6 Columns: Distinguished Candidate Proposition */}
              <div className="lg:col-span-6 flex flex-col justify-between py-2">
                <div>
                  {/* Uploadable Header Portrait Card + Candidate Metadata */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-5 pb-5 border-b border-[#E2D9CC]">
                    <div
                      onClick={() => headerPhotoInputRef.current?.click()}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          headerPhotoInputRef.current?.click();
                        }
                      }}
                      data-testid="hero-header-photo-frame"
                      className="relative w-24 h-24 sm:w-28 sm:h-28 border-2 border-[#0F141C] bg-[#EFE9E0] overflow-hidden shrink-0 cursor-pointer group flex flex-col items-center justify-center text-center"
                    >
                      {headerPhotoUrl ? (
                        <>
                          <img
                            src={headerPhotoUrl}
                            alt="Donna Aseret Rivas, MLS, BSBA — Executive Portrait"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-[#0F141C]/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-[#FAF8F5] text-[11px] font-semibold p-2">
                            <Camera className="w-4 h-4 text-[#D4AF7A] mb-1" />
                            <span>Change Photo</span>
                          </div>
                        </>
                      ) : (
                        <div className="p-2 flex flex-col items-center justify-center">
                          <span className="font-display text-2xl font-bold text-[#0F141C]">
                            DR
                          </span>
                          <span className="mt-1 text-[10px] font-semibold text-[#9E3B33] flex items-center gap-1">
                            <Upload className="w-3 h-3" />
                            Upload Photo
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#6E655C]">
                        <span className="whitespace-nowrap font-semibold text-[#0F141C]">
                          Candidate: Donna Aseret Rivas, MLS, BSBA
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="whitespace-nowrap">
                          Role: Private Jet Charter Broker (Remote)
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono-tabular text-[#9E3B33] whitespace-nowrap font-semibold">
                          7 Signed Faculty & Executive LORs
                        </span>
                      </div>
                      <p className="text-xs text-[#575049]">
                        Pepperdine University Caruso School of Law (MLS) · Georgetown University · Harvard Extension School · Cal Poly Pomona (BSBA)
                      </p>
                      <button
                        type="button"
                        onClick={() => headerPhotoInputRef.current?.click()}
                        data-testid="hero-header-photo-upload-btn"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#EFE9E0] hover:bg-[#0F141C] text-[#0F141C] hover:text-[#FAF8F5] border border-[#D5C7B4] text-[11px] font-semibold transition-colors"
                      >
                        <Camera className="w-3.5 h-3.5 text-[#9E3B33] group-hover:text-[#D4AF7A]" />
                        <span>
                          {headerPhotoUrl
                            ? 'Replace Header Portrait Photo'
                            : 'Upload Header Portrait Photo'}
                        </span>
                      </button>
                    </div>
                  </div>

                  <h1
                    className="font-display font-semibold text-[#0F141C] tracking-tight leading-[1.08]"
                    style={{
                      fontSize: 'clamp(2.35rem, 4vw, 3.65rem)',
                      textWrap: 'balance',
                    }}
                  >
                    Distinguished Fit for JetZen Private Jet Charter Broker.
                  </h1>

                  <p className="mt-5 text-[15px] md:text-base text-[#4A453E] leading-relaxed max-w-[62ch]">
                    Combining consultative luxury and performance automotive sales experience (<strong>Maserati & Chevrolet</strong>, <strong>Jared The Galleria of Jewelry & JCPenney Fine Jewelry</strong>), legal intake and outbound channel expansion (Carey & Danis LLC), and graduate/executive credentials from <strong>Pepperdine University, Caruso School of Law (MLS)</strong>, <strong>Georgetown University</strong>, <strong>Harvard Extension School</strong>, and <strong>Cal Poly Pomona (BSBA)</strong>—backed by 7 signed Letters of Recommendation and a live JetZen ML Charter Broker CRM prototype.
                  </p>
                </div>

                {/* Primary & Secondary Interactive Dossier Controls */}
                <div className="mt-8 pt-6 border-t border-[#E2D9CC] space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => scrollToSection('endorsement-letters')}
                      className="px-6 py-3 bg-[#9E3B33] hover:bg-[#842F28] text-white text-xs font-semibold tracking-wide transition-colors flex items-center gap-2 whitespace-nowrap shrink-0"
                    >
                      <FileCheck className="w-4 h-4" />
                      <span>
                        Inspect {RECOMMENDATION_LETTERS.length} Signed Letters & Cover Letter
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => scrollToSection('executive-resume')}
                      className="px-5 py-3 bg-[#FAF8F5] border border-[#0F141C] hover:bg-[#0F141C] hover:text-white text-[#0F141C] text-xs font-semibold transition-colors flex items-center gap-2 whitespace-nowrap shrink-0"
                    >
                      <Award className="w-4 h-4" />
                      <span>View Complete Executive CV</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => scrollToSection('broker-crm')}
                      className="px-4 py-3 text-xs font-semibold text-[#4A453E] hover:text-[#0F141C] underline underline-offset-4 flex items-center gap-1.5 whitespace-nowrap shrink-0"
                    >
                      <Plane className="w-3.5 h-3.5" />
                      <span>Live ML Broker CRM Demo</span>
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#575049]">
                    <span>
                      Job Description Fit Verification:{' '}
                      <strong className="font-mono-tabular text-[#0F141C]">
                        {checkedQualIds.length} / {QUALIFICATIONS_AND_DUTIES.length}
                      </strong>{' '}
                      Qualifications & Duties Substantiated
                    </span>
                    <button
                      type="button"
                      onClick={() => scrollToSection('fleet-configurator')}
                      className="text-[#9E3B33] font-semibold hover:underline flex items-center gap-1"
                    >
                      <Sliders className="w-3.5 h-3.5" />
                      <span>Test Part 135 Aircraft & Margin Desk</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right 6 Columns: Bespoke Aviation Great-Circle & Fuselage Blueprint */}
              <div className="lg:col-span-6 flex">
                <HeroAviationBlueprint />
              </div>
            </div>

            {/* Full-Width 4-Column Candidate Proof Pillars Below Hero Split */}
            <div className="mt-10 pt-8 border-t border-[#E2D9CC] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <p className="text-xs text-[#6E655C]">
                  Executive Academic Pedigree
                </p>
                <p className="font-display text-2xl font-semibold text-[#0F141C] mt-1">
                  Georgetown · Harvard · CPP
                </p>
                <p className="text-xs text-[#4A453E] mt-1">
                  Strategic Management Certificate, French E1b & BSBA Marketing/Finance
                </p>
              </div>

              <div>
                <p className="text-xs text-[#6E655C]">
                  Verified Third-Party Proof
                </p>
                <p className="font-mono-tabular text-2xl font-semibold text-[#0F141C] mt-1">
                  7 Signed LOR PDFs
                </p>
                <p className="text-xs text-[#4A453E] mt-1">
                  Endorsed for Sales Consultancy, Discretion, Finance & Tenacity
                </p>
              </div>

              <div>
                <p className="text-xs text-[#6E655C]">
                  High-Ticket & Outbound Sales
                </p>
                <p className="font-display text-2xl font-semibold text-[#0F141C] mt-1">
                  Luxury, Auto & Legal
                </p>
                <p className="text-xs text-[#4A453E] mt-1">
                  Carey & Danis LLC, Chevrolet Automotive & JCPenney Fine Jewelry
                </p>
              </div>

              <div>
                <p className="text-xs text-[#6E655C]">
                  Target Role Alignment
                </p>
                <p className="font-mono-tabular text-2xl font-semibold text-[#9E3B33] mt-1">
                  20 / 20 Requirements
                </p>
                <p className="text-xs text-[#4A453E] mt-1">
                  100% Remote Ready · $35,000 – $450,000/yr Pay Band
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 01 & 02: 7 Signed Letters of Recommendation Vault, Letter of Application & Full Executive Resume */}
        <CandidateCredentialsSection />

        {/* Section 03: 20-Point Job Description Fit Matrix + $35k-$450k Earnings Simulator */}
        <RoleAndEarningsSection
          checkedQualIds={checkedQualIds}
          onToggleQualification={handleToggleQualification}
          onOpenApplyModal={() => scrollToSection('apply-now')}
        />

        {/* Section 04: Interactive Proof-of-Work — JetZen Custom ML Broker CRM */}
        <BrokerCrmSection
          deals={deals}
          onAdvanceDealWithMl={handleAdvanceDealWithMl}
          onInspectDeal={(deal) => setSelectedDealForModal(deal)}
          adminHoursSavedTotal={adminHoursSavedTotal}
        />

        {/* Section 05: Interactive Aircraft Selection & Charter Mission Configurator */}
        <FleetConfiguratorSection onPushQuoteToCrm={handlePushQuoteToCrm} />

        {/* Section 06: Direct Candidate Dossier & Process Improvement Pitch */}
        <CandidateApplicationSection
          checkedQualCount={checkedQualIds.length}
          totalQualCount={QUALIFICATIONS_AND_DUTIES.length}
          onApplicationSubmitted={(name) =>
            showBanner(
              `Candidate Application & Innovation Pitch verified for ${name}.`
            )
          }
        />
      </main>

      {/* Quiet Executive Aviation Footer */}
      <footer className="bg-[#FAF8F5] border-t border-[#E2D9CC] py-12 text-xs text-[#6E655C]">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="font-display text-lg font-bold text-[#0F141C]">
              Donna Aseret Rivas, BSBA — Candidate Portal for JetZen Private Jet Charter Broker
            </p>
            <p className="mt-1">
              donnaarivas10@gmail.com · Georgetown Strategic Management · Harvard Extension · Cal Poly Pomona BSBA
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <a href="#endorsement-letters" className="hover:text-[#0F141C]">
              7 Signed LORs
            </a>
            <a href="#executive-resume" className="hover:text-[#0F141C]">
              Executive Resume
            </a>
            <a href="#role-earnings" className="hover:text-[#0F141C]">
              20-Point Fit Matrix
            </a>
            <a href="#broker-crm" className="hover:text-[#0F141C]">
              ML Broker CRM Demo
            </a>
          </div>
        </div>
      </footer>

      {/* Deal Sheet Modal */}
      <DealSheetModal
        deal={selectedDealForModal}
        onClose={() => setSelectedDealForModal(null)}
        onAdvanceDeal={handleAdvanceDealWithMl}
      />
    </div>
  );
}
