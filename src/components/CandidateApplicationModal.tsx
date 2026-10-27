import React, { useRef, useState } from 'react';
import {
  X,
  CheckCircle2,
  FileText,
  Upload,
  Download,
  Mail,
  Calendar,
  Briefcase,
  Send,
} from 'lucide-react';
import {
  CrmCharterDeal,
  RECOMMENDATION_LETTERS,
} from '../data/jetzenData';

interface CandidateApplicationSectionProps {
  checkedQualCount: number;
  totalQualCount: number;
  onApplicationSubmitted: (candidateName: string) => void;
}

interface AttachedPacketFile {
  id: string;
  fileName: string;
  authorName: string;
  institution: string;
  pdfUrl: string;
  previewImageUrl: string;
}

type HiringActionType = 'interview' | 'offer';

const CANDIDATE_DIRECT_EMAIL = 'donna.rivas@pepperdine.edu';

export const CandidateApplicationSection: React.FC<
  CandidateApplicationSectionProps
> = ({ checkedQualCount, totalQualCount, onApplicationSubmitted }) => {
  const [actionType, setActionType] = useState<HiringActionType>('interview');
  const [senderName, setSenderName] = useState(
    'JetZen Executive Hiring & Brokerage Leadership'
  );
  const [senderEmail, setSenderEmail] = useState('hiring@jetzen.com');
  const [proposedSchedule, setProposedSchedule] = useState(
    'Thursday · 11:00 AM PST · Remote Executive Video Interview (45 Min)'
  );
  const [compensationPackage, setCompensationPackage] = useState(
    'Private Jet Charter Broker (Full-Time Remote) · $35,000.00 – $450,000.00/yr + Full Access to Custom JetZen ML CRM'
  );
  const [customMessage, setCustomMessage] = useState(
    'Dear Donna, we reviewed your 7 signed Letters of Recommendation, Pepperdine Caruso School of Law MLS & Georgetown credentials, and your live JetZen ML Charter Broker CRM portal. We would love to invite you to interview / welcome you to the JetZen Private Jet Charter Broker team.'
  );

  const [attachedLetters, setAttachedLetters] = useState<AttachedPacketFile[]>(
    () =>
      RECOMMENDATION_LETTERS.map((lor) => ({
        id: lor.id,
        fileName: lor.fileName,
        authorName: lor.authorName,
        institution: lor.institution,
        pdfUrl: lor.pdfUrl,
        previewImageUrl: lor.previewImageUrl,
      }))
  );
  const packetFileInputRef = useRef<HTMLInputElement | null>(null);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [dispatchedInvitation, setDispatchedInvitation] = useState<{
    invitationId: string;
    actionType: HiringActionType;
    recipientEmail: string;
    senderName: string;
    senderEmail: string;
    proposedSchedule: string;
    compensationPackage: string;
    customMessage: string;
    mailtoUrl: string;
  } | null>(null);

  const buildMailtoUrl = (
    mode: HiringActionType,
    sender: string,
    replyEmail: string,
    schedule: string,
    comp: string,
    message: string
  ) => {
    const subject =
      mode === 'interview'
        ? 'JetZen Private Jet Charter Broker — Invitation to Interview (Donna Aseret Rivas, MLS, BSBA)'
        : 'JetZen Private Jet Charter Broker — Official Role Acceptance & Offer Invitation (Donna Aseret Rivas, MLS, BSBA)';

    const bodyLines = [
      `To: Donna Aseret Rivas, MLS, BSBA (${CANDIDATE_DIRECT_EMAIL})`,
      `From: ${sender} (${replyEmail})`,
      `Action: ${
        mode === 'interview'
          ? 'Official Invitation to Interview — Private Jet Charter Broker'
          : 'Official Invitation to Accept Role — Private Jet Charter Broker'
      }`,
      `Proposed Timing / Schedule: ${schedule}`,
      `Role & Compensation Structure: ${comp}`,
      '',
      'Message:',
      message,
      '',
      `Verified Candidate Dossier: ${checkedQualCount}/${totalQualCount} Qualifications & ${attachedLetters.length} Signed Letters of Recommendation Reviewed.`,
    ];

    return `mailto:${CANDIDATE_DIRECT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
  };

  const handlePacketFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const uploadedItems: AttachedPacketFile[] = Array.from(files).map(
      (file, i) => {
        const url = URL.createObjectURL(file);
        return {
          id: `packet-upload-${Date.now()}-${i}`,
          fileName: file.name,
          authorName: 'Candidate Uploaded Document',
          institution: `${Math.max(1, Math.round(file.size / 1024))} KB PDF/Doc`,
          pdfUrl: url,
          previewImageUrl:
            '/assets/aistudio/Letter_of_Recommendation_-_Rivas_75580758.png',
        };
      }
    );

    setAttachedLetters((prev) => [...prev, ...uploadedItems]);
    e.target.value = '';
  };

  const handleSwitchMode = (mode: HiringActionType) => {
    setActionType(mode);
    if (mode === 'interview') {
      setProposedSchedule(
        'Thursday · 11:00 AM PST · Remote Executive Video Interview (45 Min)'
      );
      setCustomMessage(
        'Dear Donna, we reviewed your 7 signed Letters of Recommendation, Pepperdine Caruso School of Law MLS & Georgetown credentials, and your live JetZen ML Charter Broker CRM portal. We would like to invite you to an executive interview for the Private Jet Charter Broker role.'
      );
    } else {
      setProposedSchedule(
        'Immediate Onboarding · 100% Remote Desk & Custom ML CRM Provisioning'
      );
      setCustomMessage(
        'Dear Donna, based on your distinguished academic pedigree (Pepperdine Caruso School of Law MLS, Georgetown, Harvard, Cal Poly Pomona), 7 signed endorsements, and consultative luxury sales record, we are delighted to invite you to accept the Private Jet Charter Broker role at JetZen.'
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !senderName.trim() ||
      !senderEmail.trim() ||
      !proposedSchedule.trim() ||
      !customMessage.trim()
    ) {
      setErrorMsg(
        'Please complete the sender details, schedule, and message before dispatching the invitation to donna.rivas@pepperdine.edu.'
      );
      return;
    }

    setErrorMsg(null);
    const mailtoUrl = buildMailtoUrl(
      actionType,
      senderName.trim(),
      senderEmail.trim(),
      proposedSchedule.trim(),
      compensationPackage.trim(),
      customMessage.trim()
    );

    setDispatchedInvitation({
      invitationId: `JZ-INV-${Math.floor(10000 + Math.random() * 89999)}`,
      actionType,
      recipientEmail: CANDIDATE_DIRECT_EMAIL,
      senderName: senderName.trim(),
      senderEmail: senderEmail.trim(),
      proposedSchedule: proposedSchedule.trim(),
      compensationPackage: compensationPackage.trim(),
      customMessage: customMessage.trim(),
      mailtoUrl,
    });

    onApplicationSubmitted(`Donna Aseret Rivas (${CANDIDATE_DIRECT_EMAIL})`);

    // Trigger direct email client invitation to donna.rivas@pepperdine.edu
    const link = document.createElement('a');
    link.href = mailtoUrl;
    link.click();
  };

  const currentMailtoHref = buildMailtoUrl(
    actionType,
    senderName,
    senderEmail,
    proposedSchedule,
    compensationPackage,
    customMessage
  );

  return (
    <section
      id="apply-now"
      aria-labelledby="apply-heading"
      className="scroll-mt-20 py-20 bg-[#F5F0E8] border-b border-[#E2D9CC]"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left 5 Columns: Ownership Callout + Uploaded 7 PDFs Packet */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="text-xs text-[#6E655C] mb-2">
                05. Direct Hiring Team Invitation Portal & Uploaded Recommendation Packet
              </p>
              <h2
                id="apply-heading"
                className="font-display text-3xl md:text-4xl font-semibold text-[#0F141C] tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                Take Ownership & Join JetZen as We Change the Game
              </h2>
              <p className="mt-3 text-[15px] text-[#4A453E] leading-relaxed">
                Above all, JetZen looks for a Private Jet Charter Broker who takes ownership of their book of business and brings a desire to improve and grow. All {attachedLetters.length} official Letters of Recommendation are uploaded and pre-attached to this candidate packet.
              </p>
            </div>

            <div className="bg-[#FAF8F5] border border-[#D8CFC2] p-6 space-y-3 text-xs">
              <div className="font-semibold text-[#0F141C] text-sm">
                Position & Candidate Packet Summary
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#EFE9E0]">
                <span className="text-[#6E655C]">Role Title</span>
                <span className="font-semibold text-[#0F141C]">
                  Private Jet Charter Broker
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#EFE9E0]">
                <span className="text-[#6E655C]">Direct Candidate Email</span>
                <span className="font-mono-tabular font-semibold text-[#0F141C]">
                  {CANDIDATE_DIRECT_EMAIL}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#EFE9E0]">
                <span className="text-[#6E655C]">Job Type & Location</span>
                <span className="font-semibold text-[#0F141C]">
                  Full-time · 100% Remote
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#EFE9E0]">
                <span className="text-[#6E655C]">Compensation Range</span>
                <span className="font-mono-tabular font-semibold text-[#9E3B33]">
                  $35,000.00 – $450,000.00 / yr
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#EFE9E0]">
                <span className="text-[#6E655C]">Qualification Alignment</span>
                <span className="font-mono-tabular font-semibold text-[#0F141C]">
                  {checkedQualCount} / {totalQualCount} Verified
                </span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-[#6E655C]">
                  Uploaded Letters of Recommendation
                </span>
                <span className="font-mono-tabular font-semibold text-[#15803D]">
                  {attachedLetters.length} / {attachedLetters.length} PDFs Uploaded
                </span>
              </div>
            </div>

            {/* Uploaded Letters of Recommendation File List */}
            <div
              data-testid="application-uploaded-pdfs-panel"
              className="bg-[#FAF8F5] border border-[#D8CFC2] p-5 space-y-3"
            >
              <div className="flex items-center justify-between gap-2 border-b border-[#EFE9E0] pb-2.5">
                <div>
                  <div className="text-xs font-semibold text-[#0F141C]">
                    Uploaded Letters of Recommendation ({attachedLetters.length} PDFs)
                  </div>
                  <div className="text-[11px] text-[#6E655C]">
                    Attached to Donna Aseret Rivas’s JetZen Dossier
                  </div>
                </div>
                <input
                  ref={packetFileInputRef}
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg"
                  multiple
                  onChange={handlePacketFileUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => packetFileInputRef.current?.click()}
                  className="px-3 py-1.5 bg-[#0F141C] text-white text-[11px] font-semibold flex items-center gap-1 whitespace-nowrap"
                >
                  <Upload className="w-3 h-3" />
                  <span>Upload File</span>
                </button>
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {attachedLetters.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-2.5 p-2 bg-[#F5F0E8] border border-[#E2D9CC] text-xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={item.previewImageUrl}
                        alt={item.fileName}
                        className="w-8 h-10 object-cover object-top border border-[#C7BBAE] bg-white shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="font-mono-tabular font-semibold text-[#0F141C] truncate text-[11px]">
                          {item.fileName}
                        </div>
                        <div className="text-[11px] text-[#575049] truncate">
                          {item.authorName} · {item.institution}
                        </div>
                      </div>
                    </div>
                    <a
                      href={item.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download={item.fileName}
                      className="px-2 py-1 border border-[#C7BBAE] hover:border-[#0F141C] text-[#0F141C] text-[11px] font-semibold flex items-center gap-1 shrink-0"
                    >
                      <Download className="w-3 h-3" />
                      <span>PDF</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right 7 Columns: Portal to Send an Invitation to Interview or Accept a Role directly to donna.rivas@pepperdine.edu */}
          <div className="lg:col-span-7 bg-[#FAF8F5] border border-[#0F141C] p-6 md:p-8">
            {dispatchedInvitation ? (
              <div
                data-testid="application-confirmation-dossier"
                className="space-y-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#E2D9CC] pb-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#15803D] font-semibold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>
                        {dispatchedInvitation.actionType === 'interview'
                          ? 'Interview Invitation Dispatched'
                          : 'Role Offer & Acceptance Invitation Dispatched'}{' '}
                        · #{dispatchedInvitation.invitationId}
                      </span>
                    </div>
                    <h3 className="font-display text-2xl font-semibold text-[#0F141C] mt-1">
                      Sent Directly to {dispatchedInvitation.recipientEmail}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setDispatchedInvitation(null)}
                    className="text-xs underline text-[#575049] hover:text-[#0F141C]"
                  >
                    Modify Invitation
                  </button>
                </div>

                <div className="space-y-3 text-xs text-[#4A453E]">
                  <p>
                    <strong className="text-[#0F141C]">
                      Direct Recipient:
                    </strong>{' '}
                    Donna Aseret Rivas, MLS, BSBA (
                    <span className="font-mono-tabular font-semibold text-[#9E3B33]">
                      {dispatchedInvitation.recipientEmail}
                    </span>
                    )
                  </p>
                  <p>
                    <strong className="text-[#0F141C]">From:</strong>{' '}
                    {dispatchedInvitation.senderName} (
                    {dispatchedInvitation.senderEmail})
                  </p>
                  <p>
                    <strong className="text-[#0F141C]">
                      {dispatchedInvitation.actionType === 'interview'
                        ? 'Interview Schedule & Format:'
                        : 'Role Onboarding & Start Timing:'}
                    </strong>{' '}
                    {dispatchedInvitation.proposedSchedule}
                  </p>
                  <p>
                    <strong className="text-[#0F141C]">
                      Role & Compensation Package:
                    </strong>{' '}
                    {dispatchedInvitation.compensationPackage}
                  </p>
                  <div className="p-4 bg-[#F5F0E8] border border-[#D8CFC2]">
                    <strong className="text-[#0F141C] block mb-1">
                      Invitation Message Sent to {dispatchedInvitation.recipientEmail}:
                    </strong>
                    {dispatchedInvitation.customMessage}
                  </div>
                  <div className="p-4 bg-[#FAF8F5] border border-[#E2D9CC]">
                    <strong className="text-[#0F141C] block mb-2">
                      Verified Candidate Dossier & {attachedLetters.length} Letters of Recommendation Attached:
                    </strong>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {attachedLetters.map((lor) => (
                        <div
                          key={lor.id}
                          className="flex items-center gap-1.5 text-[11px] font-mono-tabular text-[#15803D]"
                        >
                          <FileText className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{lor.fileName}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E2D9CC] flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs text-[#575049]">
                    Direct Email Dispatch Target:{' '}
                    <strong className="font-mono-tabular text-[#0F141C]">
                      {CANDIDATE_DIRECT_EMAIL}
                    </strong>
                  </span>
                  <a
                    href={dispatchedInvitation.mailtoUrl}
                    className="px-5 py-2.5 bg-[#9E3B33] hover:bg-[#842F28] text-white text-xs font-semibold flex items-center gap-2 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>
                      Re-Open Email in Client ({CANDIDATE_DIRECT_EMAIL})
                    </span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="border-b border-[#E2D9CC] pb-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <p className="text-xs text-[#9E3B33] font-semibold">
                      JetZen Executive Hiring & Decision Portal
                    </p>
                    <h3 className="font-display text-2xl font-semibold text-[#0F141C] mt-0.5">
                      Send Invitation to Interview or Accept Role
                    </h3>
                    <p className="text-xs text-[#6E655C] mt-1">
                      Dispatches your official interview invitation or role acceptance offer directly to{' '}
                      <strong className="font-mono-tabular text-[#0F141C]">
                        {CANDIDATE_DIRECT_EMAIL}
                      </strong>
                      .
                    </p>
                  </div>

                  {/* Mode Toggle: Invite to Interview vs. Accept Role / Extend Offer */}
                  <div className="flex items-center gap-1 p-1 bg-[#EFE9E0] border border-[#D8CFC2] shrink-0">
                    <button
                      type="button"
                      onClick={() => handleSwitchMode('interview')}
                      className={`px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                        actionType === 'interview'
                          ? 'bg-[#0F141C] text-[#FAF8F5]'
                          : 'text-[#575049] hover:text-[#0F141C]'
                      }`}
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Invite to Interview</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSwitchMode('offer')}
                      className={`px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                        actionType === 'offer'
                          ? 'bg-[#0F141C] text-[#FAF8F5]'
                          : 'text-[#575049] hover:text-[#0F141C]'
                      }`}
                    >
                      <Briefcase className="w-3.5 h-3.5" />
                      <span>Accept Role / Offer</span>
                    </button>
                  </div>
                </div>

                {/* Direct Recipient Banner (donna.rivas@pepperdine.edu) */}
                <div className="p-3.5 bg-[#F5F0E8] border border-[#D8CFC2] flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#9E3B33] shrink-0" />
                    <span className="text-[#4A453E]">
                      Direct Candidate Recipient:
                    </span>
                    <strong className="font-mono-tabular text-[#0F141C]">
                      {CANDIDATE_DIRECT_EMAIL}
                    </strong>
                  </div>
                  <span className="text-[11px] font-semibold text-[#15803D]">
                    Verified Pepperdine Caruso School of Law Address
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="invite-sender-name"
                      className="block text-xs font-semibold text-[#0F141C] mb-1"
                    >
                      Hiring Manager / Organization Name
                    </label>
                    <input
                      id="invite-sender-name"
                      type="text"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#C7BBAE] text-[#0F141C]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="invite-sender-email"
                      className="block text-xs font-semibold text-[#0F141C] mb-1"
                    >
                      Hiring Team Reply-To Email
                    </label>
                    <input
                      id="invite-sender-email"
                      type="email"
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-mono-tabular bg-[#FAF8F5] border border-[#C7BBAE] text-[#0F141C]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="invite-schedule"
                    className="block text-xs font-semibold text-[#0F141C] mb-1"
                  >
                    {actionType === 'interview'
                      ? 'Proposed Interview Date, Time & Remote Video Link'
                      : 'Role Acceptance Start Date & Remote Desk Provisioning'}
                  </label>
                  <input
                    id="invite-schedule"
                    type="text"
                    value={proposedSchedule}
                    onChange={(e) => setProposedSchedule(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#C7BBAE] text-[#0F141C]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="invite-compensation"
                    className="block text-xs font-semibold text-[#0F141C] mb-1"
                  >
                    Role & Compensation Terms ($35,000.00 – $450,000.00/yr)
                  </label>
                  <input
                    id="invite-compensation"
                    type="text"
                    value={compensationPackage}
                    onChange={(e) => setCompensationPackage(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#C7BBAE] text-[#0F141C]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="invite-message"
                    className="block text-xs font-semibold text-[#0F141C] mb-1"
                  >
                    Direct Invitation Message to Donna Aseret Rivas ({CANDIDATE_DIRECT_EMAIL})
                  </label>
                  <textarea
                    id="invite-message"
                    rows={3}
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#C7BBAE] text-[#0F141C]"
                  />
                </div>

                {errorMsg && (
                  <div
                    role="alert"
                    className="p-3 bg-[#9E3B33]/10 border border-[#9E3B33] text-xs text-[#9E3B33] font-medium"
                  >
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1">
                  <button
                    type="submit"
                    className="sm:col-span-8 py-3 px-5 bg-[#9E3B33] hover:bg-[#842F28] text-white text-xs font-semibold tracking-wide transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>
                      {actionType === 'interview'
                        ? `Send Interview Invitation to ${CANDIDATE_DIRECT_EMAIL}`
                        : `Send Role Acceptance Offer to ${CANDIDATE_DIRECT_EMAIL}`}
                    </span>
                  </button>

                  <a
                    href={currentMailtoHref}
                    data-testid="direct-mailto-pepperdine-link"
                    className="sm:col-span-4 py-3 px-4 bg-[#0F141C] hover:bg-[#1E293B] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#E5C158]" />
                    <span>Direct Email Client</span>
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export const DealSheetModal: React.FC<{
  deal: CrmCharterDeal | null;
  onClose: () => void;
  onAdvanceDeal: (dealId: string) => void;
}> = ({ deal, onClose, onAdvanceDeal }) => {
  if (!deal) return null;

  const grossMargin = deal.quotedRetailPrice - deal.wholesaleCost;
  const brokerPayout = Math.round(grossMargin * 0.35);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="deal-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 overflow-y-auto"
    >
      <div className="bg-[#FAF8F5] border border-[#0F141C] w-full max-w-xl p-6 md:p-8 my-8">
        <div className="flex items-start justify-between gap-4 border-b border-[#E2D9CC] pb-4">
          <div>
            <p className="text-xs text-[#6E655C] font-mono-tabular">
              JetZen ML Deal Desk · {deal.id} · {deal.confidentialityTier}
            </p>
            <h2
              id="deal-modal-title"
              className="font-display text-2xl font-semibold text-[#0F141C] mt-1"
            >
              {deal.routeSummary}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close deal sheet"
            className="p-2 text-[#575049] hover:text-[#0F141C]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-5 space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-4 bg-[#F5F0E8] border border-[#D8CFC2] p-4">
            <div>
              <span className="text-[#6E655C] block">Client Account</span>
              <strong className="text-[#0F141C]">{deal.clientCode}</strong>
            </div>
            <div>
              <span className="text-[#6E655C] block">Assigned Aircraft</span>
              <strong className="text-[#0F141C]">
                {deal.preferredAircraft} ({deal.paxCount} PAX)
              </strong>
            </div>
            <div>
              <span className="text-[#6E655C] block">Wholesale Operator Cost</span>
              <strong className="font-mono-tabular text-[#0F141C]">
                ${deal.wholesaleCost.toLocaleString()}
              </strong>
            </div>
            <div>
              <span className="text-[#6E655C] block">Client Retail Quote</span>
              <strong className="font-mono-tabular text-[#0F141C]">
                ${deal.quotedRetailPrice.toLocaleString()} (+$
                {brokerPayout.toLocaleString()} Broker Comm.)
              </strong>
            </div>
          </div>

          <div>
            <div className="font-semibold text-[#0F141C] mb-1.5">
              Completed ML Administrative Workflows:
            </div>
            <ul className="space-y-1 text-[#4A453E] list-disc list-inside">
              {deal.mlAutoTasksCompleted.map((t, idx) => (
                <li key={idx}>{t}</li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-[#E2D9CC] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#575049]"
            >
              Close
            </button>
            {deal.stage !== 'Flight Confirmed' && (
              <button
                type="button"
                onClick={() => {
                  onAdvanceDeal(deal.id);
                  onClose();
                }}
                className="px-5 py-2.5 bg-[#0F141C] text-white text-xs font-semibold"
              >
                Advance Stage via ML CRM
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
