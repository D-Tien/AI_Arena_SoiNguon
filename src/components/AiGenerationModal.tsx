import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AiGenerationModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialPrompt: string;
    attemptsLeft: number;
    onUseAttempt: () => void;
    coreId: string;
    sceneId: string;
    layers: any;
    palette: string[];
}

export const AiGenerationModal = ({ isOpen, onClose, initialPrompt, attemptsLeft, onUseAttempt, coreId, sceneId, layers, palette }: AiGenerationModalProps) => {
    const [prompt, setPrompt] = useState(initialPrompt);
    const [state, setState] = useState<'review' | 'generating' | 'result'>('review');
    const [resultUrl, setResultUrl] = useState<string | null>(null);
    const [loadingText, setLoadingText] = useState('Đang cắt vải...');
    
    // Cycle loading text
    useEffect(() => {
        if (state === 'generating') {
            const texts = ["Đang cắt vải...", "Đang lên phom...", "Đang chụp hình...", "Đang phối màu..."];
            let i = 0;
            const interval = setInterval(() => {
                i = (i + 1) % texts.length;
                setLoadingText(texts[i]);
            }, 1500);
            return () => clearInterval(interval);
        }
    }, [state]);

    // Update prompt if it changes from outside (e.g. user changed outfit)
    useEffect(() => {
        if (isOpen && state === 'review') {
            setPrompt(initialPrompt);
        }
    }, [initialPrompt, isOpen]);

    const handleGenerate = async () => {
        if (attemptsLeft <= 0) {
            alert('Bạn đã hết lượt tạo ảnh trong phiên này!');
            return;
        }
        
        setState('generating');
        onUseAttempt();
        
        const hash = btoa(encodeURIComponent(prompt)).substring(0, 15);
        
        // 1. Check cache
        const cached = localStorage.getItem(`ai_cache_${hash}`);
        if (cached) {
            setTimeout(() => {
                setResultUrl(cached);
                setState('result');
            }, 500);
            return;
        }

        // 2. Check demo results
        try {
            const demoPath = `/demo-results/${coreId}-${sceneId}.webp`;
            const demoRes = await fetch(demoPath, { method: 'HEAD' });
            if (demoRes.ok) {
                setTimeout(() => {
                    localStorage.setItem(`ai_cache_${hash}`, demoPath);
                    setResultUrl(demoPath);
                    setState('result');
                }, 1000);
                return;
            }
        } catch (e) {}

        // 3. Fake API Call with timeout and retries
        let attempts = 0;
        const maxAttempts = 2;
        
        while (attempts < maxAttempts) {
            try {
                // Simulate a 4-second delay for AI generation
                await new Promise((resolve) => setTimeout(resolve, 4000));
                
                // Placeholder result
                const fakeResult = "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80&w=1000";
                
                localStorage.setItem(`ai_cache_${hash}`, fakeResult);
                setResultUrl(fakeResult);
                setState('result');
                return;
            } catch (e) {
                attempts++;
            }
        }
        
        alert('Tạo ảnh thất bại sau 2 lần thử (Timeout 40s). Vui lòng thử lại sau.');
        setState('review');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm font-sans text-than">
            <div className="bg-giay-do w-full max-w-5xl h-[90vh] neo-border border-[4px] border-than flex flex-col overflow-hidden relative shadow-[12px_12px_0_white]">
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b-[4px] border-than bg-giay-sang shrink-0 z-10">
                    <h3 className="font-display text-2xl md:text-3xl">Kết quả Ảnh Thật (AI)</h3>
                    <div className="flex items-center gap-4">
                        <span className="font-label text-sm text-son border-2 border-son px-3 py-1 bg-son/10 rounded-full">LƯỢT CÒN: {attemptsLeft}/5</span>
                        <button onClick={() => { onClose(); setState('review'); }} className="neo-button-secondary py-1 text-sm">ĐÓNG</button>
                    </div>
                </div>
                
                <div className="flex-1 flex flex-col md:flex-row relative overflow-hidden bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMCwwLDAsMC4wNSkiLz48L3N2Zz4=')]">
                    
                    {/* REVIEW STATE */}
                    {state === 'review' && (
                        <div className="flex-1 p-6 md:p-12 flex flex-col items-center justify-center overflow-y-auto">
                            <h4 className="font-display text-3xl mb-4 text-center">Tuỳ chỉnh Prompt</h4>
                            <p className="text-than/70 mb-8 text-center max-w-xl">Bạn có thể xem trước và chỉnh sửa mô tả (prompt) trước khi gửi cho AI. Thêm chi tiết để có kết quả độc đáo hơn.</p>
                            
                            <textarea 
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                className="w-full max-w-2xl h-48 neo-border border-2 border-than p-4 font-mono text-sm leading-relaxed bg-giay-sang focus:ring-4 focus:ring-nghe/50 outline-none resize-none"
                            />
                            
                            <button 
                                onClick={handleGenerate}
                                disabled={attemptsLeft <= 0}
                                className={`mt-8 neo-button-primary text-xl px-12 py-4 ${attemptsLeft <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {attemptsLeft > 0 ? 'BẮT ĐẦU TẠO (TRỪ 1 LƯỢT)' : 'HẾT LƯỢT'}
                            </button>
                        </div>
                    )}

                    {/* GENERATING STATE */}
                    {state === 'generating' && (
                        <div className="flex-1 flex flex-col items-center justify-center p-8 gap-8">
                            <div className="relative w-24 h-24">
                                <svg className="w-full h-full animate-spin text-son" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" strokeOpacity="0.2" />
                                    <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
                                </svg>
                                {/* Kim chỉ khâu / Kéo icon */}
                                <div className="absolute inset-0 flex items-center justify-center animate-bounce text-than">
                                    ✂️
                                </div>
                            </div>
                            
                            <div className="text-center">
                                <p className="font-display text-3xl animate-pulse text-than mb-4">
                                    {loadingText}
                                </p>
                                {/* Thanh tiến độ giả */}
                                <div className="w-64 h-3 border-2 border-than p-0.5 rounded-full mx-auto bg-giay-sang overflow-hidden">
                                    <div className="h-full bg-son rounded-full animate-[progress_4s_ease-in-out]" style={{ width: '80%' }} />
                                </div>
                            </div>

                            <button onClick={() => { setState('review'); }} className="neo-button-secondary mt-8">HUỶ BỎ</button>
                        </div>
                    )}

                    {/* RESULT STATE */}
                    {state === 'result' && resultUrl && (
                        <div className="flex-1 flex flex-col h-full relative p-4 md:p-8 gap-6">
                            
                            {/* Main Image Container */}
                            <div className="flex-1 w-full bg-giay-sang neo-border border-[3px] border-than p-2 shadow-[8px_8px_0_rgba(0,0,0,0.15)] relative group overflow-hidden flex items-center justify-center">
                                <div className="absolute top-4 left-4 z-20 bg-son text-white text-[10px] md:text-xs px-3 py-1 uppercase tracking-widest font-label neo-border border-2">
                                    Ảnh do AI tạo – Có thể sai chi tiết trang phục
                                </div>
                                
                                <img src={resultUrl} className="w-full h-full object-contain object-center z-10" alt="AI Generated Fashion" />
                                
                                {/* 2D vs AI Hover Overlay for comparison */}
                                <div className="absolute inset-0 z-30 opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center text-white pointer-events-none">
                                    <p className="font-display text-2xl mb-2">Bản vẽ 2D gốc</p>
                                    <p className="text-sm">Tương lai có thể nhúng bản 2D đè lên đây bằng slider</p>
                                </div>
                            </div>
                            
                            {/* Controls */}
                            <div className="flex flex-wrap gap-4 justify-center shrink-0">
                                <button className="neo-button-secondary bg-transparent hover:bg-giay-sang">BÁO SAI CHI TIẾT</button>
                                <button className="neo-button-secondary bg-transparent hover:bg-giay-sang">TẢI VỀ</button>
                                <button className="neo-button-secondary bg-transparent hover:bg-giay-sang">CHIA SẺ</button>
                                <button onClick={() => setState('review')} className="neo-button-secondary bg-transparent hover:bg-giay-sang">TẠO LẠI (-1 LƯỢT)</button>
                                <button className="neo-button-primary bg-cham border-cham text-white hover:bg-cham/90 hover:shadow-[4px_4px_0_var(--son)] shadow-[4px_4px_0_var(--than)]">LƯU LOOKBOOK</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            
            <style>{`
                @keyframes progress {
                    0% { width: 0%; }
                    50% { width: 60%; }
                    100% { width: 90%; }
                }
            `}</style>
        </div>
    );
};
