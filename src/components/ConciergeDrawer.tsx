import React, { useState } from 'react';
import { X, Send } from 'lucide-react';

interface ConciergeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'nurse' | 'patient';
  author: string;
  text: string;
  timestamp: string;
}

const QUICK_QUESTIONS = [
  'Pre-care for Laser Hair Removal?',
  'Botox vs. Clear + Brilliant® downtime?',
  'How do LA Premiere Points work?',
];

export const ConciergeDrawer: React.FC<ConciergeDrawerProps> = ({
  isOpen,
  onClose,
  onOpenBooking,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'nurse',
      author: 'Claire Beaumont, BSN, RN · Clinical Concierge',
      text: 'Welcome to LaserAway Clinical Concierge. Ask me about laser wavelength calibration for your Fitzpatrick skin tone, pre-treatment retinoid windows, or package financing.',
      timestamp: 'Just now',
    },
  ]);
  const [inputText, setInputText] = useState('');

  if (!isOpen) return null;

  const generateClinicalReply = (question: string): string => {
    const q = question.toLowerCase();
    if (q.includes('pre-care') || q.includes('hair') || q.includes('shave')) {
      return 'For Dual-Wavelength Laser Hair Removal: cleanly shave the treatment zone 12–24 hours prior, avoid direct sun exposure or self-tanners for 14 days, and pause glycolic/retinoid topicals 5 days before your visit.';
    }
    if (q.includes('botox') || q.includes('clear') || q.includes('downtime')) {
      return 'Neuromodulator (Botox/Xeomin) sessions require zero social downtime—simply remain upright for 4 hours and avoid strenuous exercise for 24 hours. Clear + Brilliant® Perméa produces mild warmth for 12–24 hours followed by a sandpaper micro-exfoliation through day 4.';
    }
    if (q.includes('point') || q.includes('reward') || q.includes('premiere')) {
      return 'Every $1 spent on packages earns LA Premiere Points (1.5x at Icon Tier, 2.0x at VIP Platinum). You can redeem points directly in the LaserLove section for $50–$150 vouchers or full-size LaserAway Beauty® serums.';
    }
    return 'Thank you for sharing. Our Aesthetic Registered Nurses calibrate every fluence and dosage parameter in-studio using the Skintel® Melanin Reader. Would you like to lock in a complimentary 15-minute Nurse Consultation?';
  };

  const handleSend = (textToUse?: string) => {
    const query = (textToUse ?? inputText).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'patient',
      author: 'Donna Rivas',
      text: query,
      timestamp: 'Now',
    };

    const replyMsg: ChatMessage = {
      id: `n-${Date.now() + 1}`,
      sender: 'nurse',
      author: 'Claire Beaumont, BSN, RN',
      text: generateClinicalReply(query),
      timestamp: 'Now',
    };

    setMessages((prev) => [...prev, userMsg, replyMsg]);
    if (!textToUse) setInputText('');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="concierge-drawer-title"
      className="fixed inset-0 z-50 flex justify-end bg-black/50"
    >
      <div className="bg-[#FAF8F5] border-l border-[#181615] w-full max-w-md h-full flex flex-col justify-between p-6">
        <div className="flex items-center justify-between border-b border-[#E2D9CC] pb-4">
          <div>
            <p className="text-xs text-[#6E655C]">
              Direct Clinician Support · Registered Nurse On Duty
            </p>
            <h2
              id="concierge-drawer-title"
              className="font-display text-2xl font-semibold text-[#181615]"
            >
              Aesthetic Nurse Live Chat
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close nurse chat"
            className="p-2 text-[#575049] hover:text-[#181615]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`p-4 border text-xs leading-relaxed ${
                m.sender === 'nurse'
                  ? 'bg-[#F5F0E8] border-[#E2D9CC] text-[#181615]'
                  : 'bg-[#181615] border-[#181615] text-[#FAF8F5] ml-6'
              }`}
            >
              <div className="font-semibold mb-1 opacity-80">{m.author}</div>
              <p>{m.text}</p>
            </div>
          ))}

          <div className="pt-2">
            <p className="text-[11px] text-[#6E655C] mb-2">
              Common Clinical Questions:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {QUICK_QUESTIONS.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => handleSend(q)}
                  className="text-left px-2.5 py-1.5 text-xs border border-[#D5C7B4] bg-[#FAF8F5] hover:border-[#9E3B33] text-[#181615]"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-[#E2D9CC] space-y-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask an Aesthetic RN about wavelengths, units, or pre-care..."
              aria-label="Message Aesthetic Nurse"
              className="flex-1 px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D5C7B4] text-[#181615]"
            />
            <button
              type="submit"
              aria-label="Send message"
              className="px-3.5 py-2 bg-[#181615] text-white text-xs font-semibold flex items-center gap-1"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenBooking();
            }}
            className="w-full py-2 px-3 border border-[#9E3B33] text-[#9E3B33] hover:bg-[#9E3B33] hover:text-white text-xs font-semibold transition-colors"
          >
            Switch to Video Consultation Booking
          </button>
        </div>
      </div>
    </div>
  );
};
