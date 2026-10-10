import { useState, useEffect, useRef } from 'react';
import { Download, LoaderCircle, RotateCcw, X } from 'lucide-react';
import { imageGenerationProvider } from '../services/image/imageGenerationService';
import { DEMO_PLACEHOLDER } from '../data/demoGeneratedImages';

interface AiGenerationModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialPrompt: string;
    attemptsLeft: number;
    onUseAttempt: () => void;
    coreId: string;
    gender: 'male' | 'female';
    sceneId: string;
    style?: string;
    palette: string[];
}

export const AiGenerationModal = ({ isOpen, onClose, initialPrompt, attemptsLeft, onUseAttempt, coreId, gender, sceneId, style, palette }: AiGenerationModalProps) => {
    const [prompt, setPrompt] = useState(initialPrompt);
    const [state, setState] = useState<'review' | 'generating' | 'result'>('review');
    const [resultUrl, setResultUrl] = useState<string | null>(null);
    const [error, setError] = useState('');
    const [imageFailed, setImageFailed] = useState(false);
    const requestRef = useRef<AbortController | null>(null);

    useEffect(() => () => { requestRef.current?.abort(); requestRef.current = null; }, []);

    const cancel = () => {
        requestRef.current?.abort();
        requestRef.current = null;
        setState('review');
    };

    const handleGenerate = async () => {
        if (requestRef.current || attemptsLeft <= 0) return;
        const controller = new AbortController();
        requestRef.current = controller;
        setState('generating');
        setError('');
        onUseAttempt();
        try {
            const result = await imageGenerationProvider.generate({
                prompt, gender, garment: coreId, style, occasion: sceneId, color: palette.join(' '),
                previousImageUrl: resultUrl || undefined, signal: controller.signal,
            });
            if (requestRef.current !== controller || controller.signal.aborted) return;
            setImageFailed(false);
            setResultUrl(result.imageUrl);
            setState('result');
        } catch {
            if (!controller.signal.aborted && requestRef.current === controller) {
                setError('Không thể tải ảnh minh họa. Bạn thử lại nhé.');
                setState('review');
            }
        } finally {
            if (requestRef.current === controller) requestRef.current = null;
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm font-sans text-than" role="dialog" aria-modal="true" aria-labelledby="demo-image-title">
            <div className="bg-giay-do w-full max-w-5xl h-[90dvh] neo-border border-[4px] border-than flex flex-col overflow-hidden relative shadow-[8px_8px_0_white]">
                <div className="flex flex-wrap justify-between items-center gap-3 p-4 border-b-[4px] border-than bg-giay-sang shrink-0">
                    <div>
                        <h3 id="demo-image-title" className="font-display text-xl md:text-2xl">Ảnh minh họa concept</h3>
                        <span className="font-label text-xs text-son">Demo preview</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="font-label text-xs text-son">LƯỢT CÒN: {attemptsLeft}/5</span>
                        <button onClick={() => { cancel(); onClose(); }} title="Đóng" aria-label="Đóng" className="neo-button-secondary p-2"><X size={20} /></button>
                    </div>
                </div>

                {state === 'review' && (
                    <div className="flex-1 min-h-0 p-4 md:p-12 flex flex-col items-center justify-center overflow-y-auto gap-5">
                        <h4 className="font-display text-2xl text-center">Tuỳ chỉnh Prompt</h4>
                        <textarea aria-label="Mô tả trang phục" value={prompt} onChange={e => setPrompt(e.target.value)} className="w-full max-w-2xl h-48 shrink-0 neo-border border-2 border-than p-4 font-mono text-sm leading-relaxed bg-giay-sang focus:ring-4 focus:ring-nghe/50 outline-none resize-none" />
                        {error && <p role="alert" className="text-son text-sm">{error}</p>}
                        <button onClick={handleGenerate} disabled={attemptsLeft <= 0} className="neo-button-primary text-base px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed">
                            {attemptsLeft > 0 ? 'BẮT ĐẦU TẠO (TRỪ 1 LƯỢT)' : 'HẾT LƯỢT'}
                        </button>
                    </div>
                )}

                {state === 'generating' && (
                    <div className="flex-1 flex flex-col items-center justify-center p-4 gap-6" aria-live="polite" aria-busy="true">
                        <LoaderCircle size={64} className="animate-spin text-son" />
                        <p className="font-display text-2xl text-center animate-pulse">ĐANG TẠO ẢNH...</p>
                        <button onClick={cancel} className="neo-button-secondary">HUỶ BỎ</button>
                    </div>
                )}

                {state === 'result' && resultUrl && (
                    <div className="flex-1 min-h-0 flex flex-col p-4 md:p-8 gap-4">
                        <div className="flex-1 min-h-0 w-full bg-giay-sang neo-border border-[3px] border-than p-2 flex items-center justify-center overflow-hidden">
                            {imageFailed ? <p role="status" className="text-center text-sm">Ảnh minh họa chưa có sẵn.</p> : (
                                <img src={resultUrl} className="w-full h-full object-contain" alt="Ảnh minh họa concept trang phục" onError={() => {
                                    if (resultUrl !== DEMO_PLACEHOLDER) setResultUrl(DEMO_PLACEHOLDER);
                                    else setImageFailed(true);
                                }} />
                            )}
                        </div>
                        <div className="flex flex-wrap gap-3 justify-center shrink-0">
                            {!imageFailed && <a href={resultUrl} download className="neo-button-secondary inline-flex items-center gap-2"><Download size={18} />TẢI VỀ</a>}
                            <button onClick={handleGenerate} disabled={attemptsLeft <= 0} className="neo-button-secondary inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"><RotateCcw size={18} />TẠO LẠI (-1 LƯỢT)</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
