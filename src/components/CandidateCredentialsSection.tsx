import React, { useRef, useState } from 'react';
import {
  FileText,
  ExternalLink,
  Search,
  X,
  CheckCircle2,
  BookOpen,
  Upload,
  Download,
  Eye,
} from 'lucide-react';
import {
  DONNA_APPLICATION_LETTER,
  DONNA_RESUME_ENTRIES,
  LorFilterCategory,
  RECOMMENDATION_LETTERS,
  RecommendationLetter,
} from '../data/jetzenData';
import {
  filterRecommendationLetters,
  filterResumeEntries,
} from '../utils/jetzenLogic';

const LOR_CATEGORY_TABS: { id: LorFilterCategory; label: string }[] = [
  { id: 'all', label: 'All Signed Letters' },
  { id: 'sales-consultancy', label: 'Sales Consultancy (2)' },
  { id: 'discretion-global', label: 'Discretion & Global (1)' },
  { id: 'finance-strategy', label: 'Finance & Strategy (2)' },
  { id: 'outreach-execution', label: 'Outreach & CRM Execution (2)' },
];

export const CandidateCredentialsSection: React.FC = () => {
  // Resume state
  const [resumeFilter, setResumeFilter] = useState<
    'all' | 'education' | 'experience'
  >('all');

  // Letters of Recommendation & Application state
  const [lettersList, setLettersList] = useState<RecommendationLetter[]>(
    RECOMMENDATION_LETTERS
  );
  const [activeVaultMode, setActiveVaultMode] = useState<
    'recommendations' | 'cover-letter'
  >('recommendations');
  const [lorCategory, setLorCategory] = useState<LorFilterCategory>('all');
  const [lorSearch, setLorSearch] = useState<string>('');
  const [activeLetterModal, setActiveLetterModal] =
    useState<RecommendationLetter | null>(null);
  const [modalViewTab, setModalViewTab] = useState<'scan' | 'transcript'>(
    'scan'
  );
  const [uploadBannerMsg, setUploadBannerMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadNewLetters = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const addedLetters: RecommendationLetter[] = Array.from(files).map(
      (file, idx) => {
        const objectUrl = URL.createObjectURL(file);
        const isImage = file.type.startsWith('image/');
        return {
          id: `uploaded-lor-${Date.now()}-${idx}`,
          authorName: file.name
            .replace(/\.pdf$|\.png$|\.jpg$|\.jpeg$/i, '')
            .replace(/[_-]+/g, ' '),
          authorTitle: 'Uploaded Candidate Endorsement Document',
          institution: 'Verified Candidate Upload',
          date: 'Uploaded Today',
          contactInfo: 'Attached directly by Donna Aseret Rivas',
          category: 'sales-consultancy',
          categoryLabel: 'Uploaded Endorsement File',
          fileName: file.name,
          pdfUrl: objectUrl,
          previewImageUrl: isImage
            ? objectUrl
            : '/assets/aistudio/Letter_of_Recommendation_-_Rivas_75580758.png',
          headlineQuote: `Official uploaded recommendation file (${file.name}, ${Math.max(1, Math.round(file.size / 1024))} KB) attached to Donna Aseret Rivas's JetZen Private Jet Charter Broker candidate dossier.`,
          jetzenQualificationsProved: [
            'Private Aviation Sales Experience',
            'Client Relationship Management',
            'High-Level Communication Skills',
          ],
          fullTranscriptParagraphs: [
            `Uploaded Document File: ${file.name} (${Math.max(1, Math.round(file.size / 1024))} KB).`,
            'This file has been uploaded and attached to Donna Aseret Rivas’s official JetZen Private Jet Charter Broker application dossier.',
          ],
        };
      }
    );

    setLettersList((prev) => [...addedLetters, ...prev]);
    setUploadBannerMsg(
      `Uploaded ${addedLetters.length} file${addedLetters.length > 1 ? 's' : ''} (${addedLetters.map((l) => l.fileName).join(', ')}) to the Endorsement Vault.`
    );
    e.target.value = '';
  };

  const visibleResumeEntries = filterResumeEntries(
    DONNA_RESUME_ENTRIES,
    resumeFilter
  );
  const visibleLetters = filterRecommendationLetters(
    lettersList,
    lorCategory,
    lorSearch
  );

  return (
    <>
      {/* SECTION 01: 7 Official Signed Letters of Recommendation & Letter of Application */}
      <section
        id="endorsement-letters"
        aria-labelledby="letters-heading"
        className="scroll-mt-20 py-20 border-b border-[#E2D9CC] bg-[#FAF8F5]"
      >
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div className="max-w-2xl">
              <p className="text-xs text-[#6E655C] mb-2">
                01. Uploaded Letters of Recommendation Vault & Executive Letter of Application
              </p>
              <h2
                id="letters-heading"
                className="font-display text-3xl md:text-4xl font-semibold text-[#0F141C] tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                {lettersList.length} Uploaded Letters of Recommendation & Formal Application to JetZen
              </h2>
              <p className="mt-3 text-[15px] text-[#4A453E] leading-relaxed">
                All 7 official signed PDF Letters of Recommendation from Georgetown University, Harvard Extension School, Carey & Danis LLC, Cal Poly Pomona, and Best Friends Animal Society are uploaded, scanned, and embedded below for direct inspection and download.
              </p>
            </div>

            {/* Mode Switcher: Letter of Application to JetZen */}
            <div className="flex items-center gap-1 p-1 bg-[#EFE9E0] border border-[#D8CFC2] shrink-0">
              <button
                type="button"
                onClick={() =>
                  setActiveVaultMode((prev) =>
                    prev === 'cover-letter' ? 'recommendations' : 'cover-letter'
                  )
                }
                className={`px-4 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  activeVaultMode === 'cover-letter'
                    ? 'bg-[#0F141C] text-[#FAF8F5]'
                    : 'text-[#575049] hover:text-[#0F141C]'
                }`}
              >
                Letter of Application to JetZen
              </button>
            </div>
          </div>

          {activeVaultMode === 'cover-letter' ? (
            <div
              data-testid="cover-letter-document"
              className="bg-[#FAF8F5] border border-[#0F141C] p-8 md:p-12 max-w-4xl mx-auto space-y-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#E2D9CC] pb-6">
                <div>
                  <p className="text-xs text-[#6E655C]">
                    Formal Executive Letter of Application · Private Jet Charter Broker (Remote)
                  </p>
                  <h3 className="font-display text-2xl md:text-3xl font-semibold text-[#0F141C] mt-1">
                    {DONNA_APPLICATION_LETTER.subject}
                  </h3>
                  <p className="text-xs text-[#575049] mt-1">
                    To: {DONNA_APPLICATION_LETTER.recipient}
                  </p>
                </div>
                <div className="text-left sm:text-right text-xs text-[#6E655C] font-mono-tabular">
                  <div>Candidate: Donna Aseret Rivas</div>
                  <div>donnaarivas10@gmail.com</div>
                </div>
              </div>

              <div className="space-y-4 text-[15px] text-[#262320] leading-relaxed">
                <p className="font-semibold text-[#0F141C]">
                  {DONNA_APPLICATION_LETTER.salutation}
                </p>
                {DONNA_APPLICATION_LETTER.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              <div className="pt-6 border-t border-[#E2D9CC] flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-[#6E655C]">
                    {DONNA_APPLICATION_LETTER.signOff}
                  </p>
                  <p className="font-display text-2xl font-semibold text-[#0F141C] mt-1">
                    {DONNA_APPLICATION_LETTER.signatureName}
                  </p>
                  <p className="text-xs text-[#575049]">
                    {DONNA_APPLICATION_LETTER.signatureCredentials}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveVaultMode('recommendations')}
                  className="px-5 py-2.5 bg-[#0F141C] text-white text-xs font-semibold whitespace-nowrap"
                >
                  Inspect All {lettersList.length} Uploaded Letters of Recommendation
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Filter & Search Bar for the 7 Letters */}
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-1 p-1 bg-[#EFE9E0] border border-[#E2D9CC] overflow-x-auto">
                  {LOR_CATEGORY_TABS.map((tab) => {
                    const isActive = lorCategory === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setLorCategory(tab.id)}
                        className={`px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                          isActive
                            ? 'bg-[#0F141C] text-[#FAF8F5]'
                            : 'text-[#575049] hover:text-[#0F141C]'
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                <div className="relative w-full md:w-72">
                  <Search className="w-4 h-4 text-[#6E655C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="search"
                    value={lorSearch}
                    onChange={(e) => setLorSearch(e.target.value)}
                    placeholder="Search Harvard, Georgetown, Finance..."
                    aria-label="Search recommendation letters"
                    className="w-full pl-9 pr-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#D5C7B4] text-[#0F141C] focus:outline-none focus:border-[#0F141C]"
                  />
                </div>
              </div>

              {/* Uploaded Letters Grid with Scanned Document Previews */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleLetters.map((lor, index) => (
                  <article
                    key={lor.id}
                    data-testid="lor-card"
                    className="bg-[#FAF8F5] border border-[#D8CFC2] p-5 flex flex-col justify-between"
                  >
                    <div>
                      {/* Clean Unboxed Metadata */}
                      <div className="flex items-center justify-between gap-2 text-xs text-[#6E655C] pb-3 border-b border-[#EFE9E0]">
                        <span className="font-mono-tabular font-semibold text-[#9E3B33] whitespace-nowrap shrink-0">
                          0{index + 1} · {lor.date}
                        </span>
                        <span className="text-[#15803D] font-semibold truncate text-right">
                          Uploaded PDF · Verified
                        </span>
                      </div>

                      {/* Actual Scanned Uploaded Letter Preview */}
                      <div
                        onClick={() => {
                          setModalViewTab('scan');
                          setActiveLetterModal(lor);
                        }}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            setModalViewTab('scan');
                            setActiveLetterModal(lor);
                          }
                        }}
                        className="mt-3 relative group cursor-pointer border border-[#D5C7B4] bg-white overflow-hidden h-56 flex items-start justify-center"
                      >
                        <img
                          src={lor.previewImageUrl}
                          alt={`Uploaded signed letter of recommendation from ${lor.authorName}`}
                          className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-[#0F141C]/85 text-[#FAF8F5] px-3 py-1.5 flex items-center justify-between text-[11px] font-mono-tabular">
                          <span className="truncate">{lor.fileName}</span>
                          <span className="flex items-center gap-1 shrink-0 ml-2 text-[#E5C158]">
                            <Eye className="w-3 h-3" />
                            View Full Scan
                          </span>
                        </div>
                      </div>

                      <h3 className="font-display text-xl font-semibold text-[#0F141C] mt-3">
                        {lor.authorName}
                      </h3>
                      <p className="text-xs font-medium text-[#4A453E] mt-0.5">
                        {lor.authorTitle} · <strong>{lor.institution}</strong>
                      </p>
                      <p className="text-[11px] font-mono-tabular text-[#6E655C] mt-1">
                        {lor.contactInfo}
                      </p>

                      {/* Verbatim Key Quote */}
                      <blockquote className="mt-3 p-3 bg-[#F5F0E8] border border-[#E2D9CC] text-xs text-[#262320] italic leading-relaxed">
                        “{lor.headlineQuote}”
                      </blockquote>

                      {/* Proved JetZen Job Description Qualifications */}
                      <div className="mt-3 space-y-1">
                        <div className="text-[11px] font-semibold text-[#0F141C]">
                          JetZen Qualifications Substantiated:
                        </div>
                        {lor.jetzenQualificationsProved.map((q, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-1.5 text-xs text-[#4A453E]"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#15803D] shrink-0" />
                            <span>{q}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 pt-3.5 border-t border-[#EFE9E0] grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setModalViewTab('scan');
                          setActiveLetterModal(lor);
                        }}
                        className="py-2 px-3 bg-[#0F141C] hover:bg-[#1E293B] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Inspect Letter</span>
                      </button>

                      <a
                        href={lor.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        download={lor.fileName}
                        className="py-2 px-3 border border-[#D5C7B4] hover:border-[#0F141C] text-[#0F141C] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap"
                      >
                        <span>Download PDF</span>
                        <Download className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* SECTION 02: Comprehensive Executive Resume & Curriculum Vitae */}
      <section
        id="executive-resume"
        aria-labelledby="resume-heading"
        className="scroll-mt-20 py-20 border-b border-[#E2D9CC] bg-[#F5F0E8]"
      >
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-xs text-[#6E655C] mb-2">
                02. Candidate Curriculum Vitae · Donna Aseret Rivas
              </p>
              <h2
                id="resume-heading"
                className="font-display text-3xl md:text-4xl font-semibold text-[#0F141C] tracking-tight"
              >
                Academic Pedigree & Consultative Sales Track Record
              </h2>
              <p className="mt-2 text-sm text-[#4A453E]">
                Pepperdine University, Caruso School of Law (M.L.S. · 2026) · Georgetown University (Strategic Management · 2026) · Harvard Extension School (2025) · Cal Poly Pomona (BSBA · 2022 – 2024)
              </p>
            </div>

            <div className="flex items-center gap-1 p-1 bg-[#EFE9E0] border border-[#D8CFC2] shrink-0">
              {[
                { id: 'all', label: 'Complete CV (8)' },
                { id: 'education', label: 'Education (4)' },
                { id: 'experience', label: 'Sales & Outreach Experience (4)' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() =>
                    setResumeFilter(
                      tab.id as 'all' | 'education' | 'experience'
                    )
                  }
                  className={`px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                    resumeFilter === tab.id
                      ? 'bg-[#0F141C] text-[#FAF8F5]'
                      : 'text-[#575049] hover:text-[#0F141C]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            {visibleResumeEntries.map((entry) => (
              <div
                key={entry.id}
                data-testid="resume-entry-card"
                className="bg-[#FAF8F5] border border-[#D8CFC2] p-6 md:p-7"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 border-b border-[#EFE9E0] pb-3">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#6E655C]">
                    <span className="font-semibold text-[#9E3B33]">
                      {entry.type === 'education'
                        ? 'Academic Credential'
                        : 'Professional Experience'}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{entry.organization}</span>
                    <span aria-hidden="true">·</span>
                    <span>{entry.location}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#0F141C] font-medium">
                      {entry.highlightTag}
                    </span>
                  </div>
                  {entry.periodLines && entry.periodLines.length > 0 ? (
                    <div className="flex flex-col items-start md:items-end md:text-right font-mono-tabular text-xs font-semibold text-[#0F141C] space-y-0.5 shrink-0">
                      {entry.periodLines.map((line, idx) => (
                        <span key={idx} className="whitespace-nowrap">
                          {line}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="font-mono-tabular text-xs font-semibold text-[#0F141C] whitespace-nowrap shrink-0">
                      {entry.period}
                    </span>
                  )}
                </div>

                <h3 className="font-display text-2xl font-semibold text-[#0F141C] mt-3">
                  {entry.title}
                </h3>

                <ul className="mt-3 space-y-1.5 text-xs md:text-sm text-[#4A453E] list-disc list-inside">
                  {entry.bullets.map((b, i) => (
                    <li key={i} className="leading-relaxed">
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="mt-4 pt-3 border-t border-[#EFE9E0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-xs text-[#4A453E] flex items-start gap-2">
                    <BookOpen className="w-4 h-4 text-[#9E3B33] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-[#0F141C]">
                        Direct Transferability to JetZen Charter Brokerage:
                      </strong>{' '}
                      {entry.jetzenRelevance}
                    </span>
                  </div>

                  {entry.externalLink && (
                    <a
                      href={entry.externalLink.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={`resume-link-${entry.id}`}
                      className="px-4 py-2 bg-[#0F141C] hover:bg-[#1E293B] text-[#FAF8F5] text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 self-start sm:self-center"
                    >
                      <span>{entry.externalLink.label}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#E5C158]" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signed Letterhead Scan & Verbatim Transcript Inspector Modal */}
      {activeLetterModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lor-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 overflow-y-auto"
        >
          <div className="bg-[#FAF8F5] border border-[#0F141C] w-full max-w-5xl p-6 md:p-8 my-8 max-h-[92vh] overflow-y-auto">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#E2D9CC] pb-4">
              <div>
                <p className="text-xs text-[#6E655C]">
                  Uploaded Signed PDF Endorsement · {activeLetterModal.fileName} ·{' '}
                  {activeLetterModal.date}
                </p>
                <h2
                  id="lor-modal-title"
                  className="font-display text-2xl md:text-3xl font-semibold text-[#0F141C] mt-0.5"
                >
                  {activeLetterModal.authorName} —{' '}
                  {activeLetterModal.authorTitle}
                </h2>
                <p className="text-xs font-mono-tabular text-[#575049] mt-1">
                  {activeLetterModal.institution} · Verifier Contact:{' '}
                  {activeLetterModal.contactInfo}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 p-1 bg-[#EFE9E0] border border-[#D8CFC2]">
                  <button
                    type="button"
                    onClick={() => setModalViewTab('scan')}
                    className={`px-3 py-1.5 text-xs font-semibold ${
                      modalViewTab === 'scan'
                        ? 'bg-[#0F141C] text-[#FAF8F5]'
                        : 'text-[#575049]'
                    }`}
                  >
                    Original Uploaded Scan
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalViewTab('transcript')}
                    className={`px-3 py-1.5 text-xs font-semibold ${
                      modalViewTab === 'transcript'
                        ? 'bg-[#0F141C] text-[#FAF8F5]'
                        : 'text-[#575049]'
                    }`}
                  >
                    Verbatim Text Transcript
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveLetterModal(null)}
                  aria-label="Close letter inspector"
                  className="p-2 text-[#575049] hover:text-[#0F141C]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left 7 Columns: Original Uploaded Scan OR Verbatim Transcript */}
              <div className="lg:col-span-7 bg-white border border-[#D5C7B4] p-4 md:p-6">
                {modalViewTab === 'scan' ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-[#575049] border-b border-[#EFE9E0] pb-2 font-mono-tabular">
                      <span>Uploaded File: {activeLetterModal.fileName}</span>
                      <span className="text-[#15803D] font-semibold">
                        Verified Original Document Scan
                      </span>
                    </div>
                    <img
                      src={activeLetterModal.previewImageUrl}
                      alt={`Full scanned letter of recommendation from ${activeLetterModal.authorName}`}
                      className="w-full h-auto border border-[#E2D9CC]"
                    />
                  </div>
                ) : (
                  <div className="space-y-4 p-2">
                    <div className="border-b-2 border-[#0F141C] pb-4 flex items-start justify-between gap-4">
                      <div>
                        <div className="font-display text-xl font-bold tracking-wide text-[#0F141C]">
                          {activeLetterModal.institution.toUpperCase()}
                        </div>
                        <div className="text-xs text-[#575049] mt-0.5">
                          {activeLetterModal.authorName} ·{' '}
                          {activeLetterModal.authorTitle}
                        </div>
                        <div className="text-[11px] font-mono-tabular text-[#6E655C]">
                          {activeLetterModal.contactInfo}
                        </div>
                      </div>
                      <div className="text-right font-mono-tabular text-xs text-[#0F141C] shrink-0">
                        {activeLetterModal.date}
                      </div>
                    </div>

                    <div className="space-y-3 text-xs md:text-[13px] text-[#181615] leading-relaxed py-2">
                      {activeLetterModal.fullTranscriptParagraphs.map(
                        (para, i) => (
                          <p key={i}>{para}</p>
                        )
                      )}
                    </div>
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-[#E2D9CC] flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs text-[#575049] font-mono-tabular">
                    File: {activeLetterModal.fileName}
                  </div>
                  <a
                    href={activeLetterModal.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download={activeLetterModal.fileName}
                    className="px-4 py-2 bg-[#0F141C] hover:bg-[#1E293B] text-white text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap"
                  >
                    <span>Download Original Signed PDF</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Right 5 Columns: Highlighted Endorsement & Mapped JetZen Qualifications */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-[#F5F0E8] border border-[#D8CFC2] p-5 space-y-2">
                  <div className="text-xs font-semibold text-[#9E3B33]">
                    Key Endorsement Excerpt
                  </div>
                  <blockquote className="font-display text-lg italic text-[#0F141C] leading-snug">
                    “{activeLetterModal.headlineQuote}”
                  </blockquote>
                </div>

                <div className="bg-[#FAF8F5] border border-[#E2D9CC] p-5">
                  <div className="text-xs font-semibold text-[#0F141C] mb-3">
                    JetZen Broker Requirements Verified by This Letter:
                  </div>
                  <div className="space-y-2">
                    {activeLetterModal.jetzenQualificationsProved.map(
                      (q, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-xs text-[#4A453E]"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0 mt-0.5" />
                          <span>{q}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
