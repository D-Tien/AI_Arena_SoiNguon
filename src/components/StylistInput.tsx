import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Loader2, Info } from 'lucide-react';
import { generateStylistOutfit, type StylistResponse } from '../services/stylistService';
import type { ValidGender } from '../data/outfitRegistry';
import { STYLIST_MAX_CALLS_PER_SESSION, STYLIST_INPUT_MAX_LENGTH } from '../config';

interface StylistInputProps {
  gender: ValidGender;
  onApply: (result: StylistResponse, promptUsed: string) => void;
  className?: string;
  compact?: boolean;
  compactLabel?: string;
  initialPrompt?: string;
  autoSubmit?: boolean;
}

const QUICK_SUGGESTIONS = [
  "Đi lễ chùa đầu năm",
  "Đám cưới bạn thân ở Hà Nội",
  "Cà phê cuối tuần ở Sài Gòn"
];

export const StylistInput: React.FC<StylistInputProps> = ({ gender, onApply, className = '', compact = false, compactLabel, initialPrompt, autoSubmit }) => {
  const [prompt, setPrompt] = useState(initialPrompt || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(false);
  
  // Track calls per session
  const [callsLeft, setCallsLeft] = useState(() => {
    const saved = sessionStorage.getItem('stylistCallsCount');
    return saved ? STYLIST_MAX_CALLS_PER_SESSION - parseInt(saved, 10) : STYLIST_MAX_CALLS_PER_SESSION;
  });

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Ref to prevent multiple autosubmits
  const hasAutoSubmitted = useRef(false);

  useEffect(() => {
    if (initialPrompt && autoSubmit && !hasAutoSubmitted.current) {
      hasAutoSubmitted.current = true;
      handleSubmit(initialPrompt);
    }
  }, [initialPrompt, autoSubmit]);

  const handleSubmit = async (textToSubmit: string = prompt) => {
    if (!textToSubmit.trim() || isLoading || callsLeft <= 0) return;
    
    setIsLoading(true);
    setError(null);
    setIsOffline(false);

    try {
      const response = await generateStylistOutfit({ prompt: textToSubmit, gender });
      
      // Check if it's an offline fallback
      if (!response.isFallback) {
        const currentCount = parseInt(sessionStorage.getItem('stylistCallsCount') || '0', 10);
        sessionStorage.setItem('stylistCallsCount', (currentCount + 1).toString());
        setCallsLeft(prev => prev - 1);
      }
      
      onApply(response, textToSubmit);
      setPrompt(''); // Clear after successful apply
    } catch (err) {
      console.error(err);
      setError('Đã có lỗi xảy ra. Đang dùng chế độ ngoại tuyến...');
      setIsOffline(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (compact) {
    return (
      <div className={`w-full ${className}`}>
        <button 
          onClick={() => {
            const el = document.getElementById('stylist-drawer');
            if (el) el.classList.toggle('hidden');
          }}
          className="flex items-center gap-2 px-4 py-3 bg-son/10 text-son font-label text-sm rounded-sm border border-son/20 hover:bg-son hover:text-white transition-colors w-full justify-between shadow-sm"
        >
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap text-ellipsis">
            <Sparkles size={16} className="shrink-0" /> 
            <span className="truncate max-w-[200px] text-left">Trợ lý: {compactLabel || 'Phối đồ'}</span>
          </div>
          <span className="underline underline-offset-2 shrink-0 text-xs">Sửa</span>
        </button>
        <div id="stylist-drawer" className="hidden mt-2 border border-than/20 bg-white shadow-sm relative">
            <StylistInput gender={gender} onApply={onApply} />
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-giay-sang neo-border p-5 border-l-4 border-l-son shadow-sm relative overflow-hidden ${className}`}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-son/5 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      
      <div className="flex items-center justify-between mb-4 relative z-10">
        <h3 className="font-label text-than text-sm tracking-[0.2em] uppercase flex items-center gap-2">
          <Sparkles size={16} className="text-son" />
          Trợ lý phối đồ
        </h3>
        <span className="text-[10px] text-than/50 font-label tracking-widest uppercase">
          {callsLeft > 0 ? `Còn ${callsLeft} lượt` : 'Hết lượt'}
        </span>
      </div>

      <div className="relative z-10 space-y-3">
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value.slice(0, STYLIST_INPUT_MAX_LENGTH))}
            placeholder="Bạn muốn mặc đi đâu? Kể bằng lời của bạn..."
            className="w-full h-24 bg-white border border-than/20 p-3 text-sm focus:outline-none focus:border-son/50 focus:ring-1 focus:ring-son/50 resize-none font-sans text-than placeholder:text-than/30"
            disabled={isLoading || callsLeft <= 0}
          />
          <div className="absolute bottom-2 right-2 text-[10px] text-than/40 font-label">
            {prompt.length}/{STYLIST_INPUT_MAX_LENGTH}
          </div>
        </div>

        <p className="text-[10px] text-than/60 italic flex items-center gap-1">
          <Info size={12} /> Câu của bạn được gửi tới Gemini để phối đồ, không được lưu.
        </p>

        {/* Quick suggestions */}
        {callsLeft > 0 && !isLoading && (
          <div className="flex flex-wrap gap-2">
            {QUICK_SUGGESTIONS.map((s, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setPrompt(s);
                  handleSubmit(s);
                }}
                className="text-xs px-3 py-1.5 border border-than/20 bg-giay-do text-than/70 hover:text-than hover:border-than/40 transition-colors font-medium rounded-full"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {isOffline && (
          <div className="bg-vang/20 border border-vang/50 text-than p-2 text-xs flex items-center gap-2">
             Đang dùng chế độ ngoại tuyến.
          </div>
        )}
        
        {error && !isOffline && (
          <div className="text-son text-xs">{error}</div>
        )}

        <button
          onClick={() => {
            if (!prompt.trim()) {
              textareaRef.current?.focus();
            } else {
              handleSubmit();
            }
          }}
          disabled={isLoading || callsLeft <= 0}
          className={`w-full font-label text-xs tracking-widest uppercase py-3 px-4 transition-colors flex items-center justify-center gap-2 shadow-sm font-bold ${
            callsLeft <= 0 ? 'bg-giay-do text-than neo-border cursor-not-allowed' :
            !prompt.trim() ? 'bg-giay-do text-than neo-border cursor-pointer hover:bg-giay-sang' : 
            'bg-son text-white hover:bg-[#8b231a]'
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Trợ lý đang phối đồ...
            </>
          ) : !prompt.trim() ? (
            'Hãy kể một câu trước'
          ) : (
            'Nhờ Trợ lý phối đồ'
          )}
        </button>
      </div>
    </div>
  );
};
