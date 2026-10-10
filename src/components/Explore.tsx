import { useEffect, useReducer, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MessageSquare, Award, LoaderCircle, Check, X, ArrowRight, RotateCcw, Compass } from 'lucide-react';
import { quizQuestions } from '../data/quizQuestions';
import { initialQuizState, quizReducer, shuffleQuestions } from './quizState';
import { askAdvisor } from '../services/ai/advisorService';
import { ADVISOR_ERROR_MESSAGE, HISTORY_LIMIT, type ConversationMessage } from '../services/ai/advisorContext';

interface ChatMessage {
    id: number;
    text: string;
    sender: 'user' | 'bot';
    failed?: boolean;
}

export const Explore = ({ onExplore }: { onExplore?: () => void }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { id: 1, text: "Chào bạn! Mình là Cố vấn Gen Z của Sợi Nguồn. Bạn muốn hỏi gì về Việt Phục hay cách phối đồ hôm nay?", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const [quiz, dispatchQuiz] = useReducer(quizReducer, initialQuizState);
    const question = quiz.questions[quiz.currentQuestionIndex];
    const total = quiz.questions.length;
    const percentage = total ? Math.round(quiz.score / total * 100) : 0;
    const startQuiz = () => dispatchQuiz({ type: 'start', questions: shuffleQuestions(quizQuestions) });
    const [pending, setPending] = useState(false);
    const [providerStatus, setProviderStatus] = useState<'CLOUD AI' | 'OFFLINE' | null>(null);
    const requestRef = useRef<AbortController | null>(null);
    const nextId = useRef(2);
    const messagesEnd = useRef<HTMLDivElement>(null);

    useEffect(() => () => requestRef.current?.abort(), []);
    useEffect(() => { messagesEnd.current?.scrollIntoView({ block: 'nearest' }); }, [messages, pending]);

    const handleSend = async () => {
        const question = input.trim();
        if (!question || requestRef.current) return;
        const controller = new AbortController();
        requestRef.current = controller;
        const history: ConversationMessage[] = messages
            .filter(message => message.id !== 1 && !message.failed)
            .slice(-HISTORY_LIMIT)
            .map(message => ({ role: message.sender === 'user' ? 'user' : 'assistant', text: message.text }));
        const userId = nextId.current++;
        setMessages(previous => [...previous, { id: userId, text: question, sender: 'user' }]);
        setInput('');
        setPending(true);
        try {
            const answer = await askAdvisor(question, history, controller.signal);
            if (!controller.signal.aborted) {
                setProviderStatus('CLOUD AI');
                const id = nextId.current++;
                setMessages(previous => [...previous, { id, text: answer, sender: 'bot' }]);
            }
        } catch {
            if (!controller.signal.aborted) {
                setProviderStatus('OFFLINE');
                const id = nextId.current++;
                setMessages(previous => [...previous.map(message => message.id === userId
                    ? { ...message, failed: true } : message),
                    { id, text: ADVISOR_ERROR_MESSAGE, sender: 'bot', failed: true }]);
            }
        } finally {
            requestRef.current = null;
            if (!controller.signal.aborted) setPending(false);
        }
    };

    return (
        <div className="w-full h-full min-h-0 bg-giay-do relative overflow-y-auto lg:overflow-hidden flex flex-col lg:flex-row p-4 sm:p-8 lg:p-12 pb-28 lg:pb-12 gap-8">
            {/* Cột trái: Chatbot Advisor */}
            <div className="flex-none lg:flex-1 min-w-0 min-h-0 h-[420px] lg:h-full bg-giay-sang neo-border border-than flex flex-col overflow-hidden">
                <div className="bg-son text-giay-sang p-4 border-b-2 border-than flex items-center justify-between">
                    <h2 className="font-display text-2xl flex items-center gap-2"><MessageSquare /> Cố vấn Gen Z (AI)</h2>
                    <span role="status" className="font-label text-[10px] bg-giay-sang text-son px-2 py-1 rounded shrink-0">{pending ? 'ĐANG TRẢ LỜI' : providerStatus ?? 'AI'}</span>
                </div>
                
                <div role="log" aria-label="Hội thoại với Cố vấn Gen Z" aria-live="polite" aria-busy={pending} className="flex-1 min-h-0 overflow-y-auto p-6 flex flex-col gap-4">
                    <AnimatePresence>
                        {messages.map(m => (
                            <motion.div 
                                key={m.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`max-w-[80%] p-4 neo-border ${m.sender === 'user' ? 'bg-luc/20 ml-auto border-luc' : 'bg-giay-do border-than'}`}
                            >
                                <p className="text-than text-sm md:text-base whitespace-pre-wrap break-words">{m.text}</p>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {pending && <LoaderCircle role="status" aria-label="Đang trả lời" className="animate-spin text-son shrink-0" size={20} />}
                    <div ref={messagesEnd} />
                </div>

                <div className="p-4 border-t-2 border-than bg-giay-do flex gap-2">
                    <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && !e.nativeEvent.isComposing && void handleSend()}
                        placeholder="Bạn muốn hỏi gì?"
                        aria-label="Câu hỏi cho Cố vấn Gen Z"
                        maxLength={4000}
                        className="flex-1 min-w-0 bg-giay-sang neo-border px-4 py-2 text-than focus:outline-none focus:border-son"
                    />
                    <button onClick={() => void handleSend()} disabled={pending || !input.trim()} title="Gửi câu hỏi" aria-label="Gửi câu hỏi" className="neo-button-primary px-4 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed">
                        <Send size={20} />
                    </button>
                </div>
            </div>

            {/* Cột phải: Quiz Mini-game */}
            <div role="region" aria-label="Thử thách kiến thức" tabIndex={0} className="flex-none lg:flex-[0.8] min-w-0 lg:min-h-0 lg:h-full lg:overflow-y-auto lg:overscroll-contain flex flex-col gap-8 lg:pr-3 lg:pb-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cham">
                <div className="bg-cham/10 neo-border border-cham p-4 sm:p-8 flex flex-col items-center justify-center shrink-0 min-h-[320px] relative overflow-hidden">
                    <div aria-hidden="true" className="absolute -right-10 -top-10 text-cham/10 rotate-12 pointer-events-none"><Award size={150} /></div>
                    
                    {!quiz.isStarted ? (
                        <>
                            <h2 className="font-display text-4xl text-than mb-4 relative z-10 text-center">Thử Thách<br/>Kiến Thức</h2>
                            <p className="text-than/80 text-center mb-8 relative z-10 text-sm">Bạn đã sẵn sàng để kiểm tra kiến thức về cổ phục Việt Nam chưa?</p>
                            <button onClick={startQuiz} className="neo-button-primary bg-cham border-cham hover:bg-cham/90 w-full relative z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-son">BẮT ĐẦU CHƠI</button>
                        </>
                    ) : quiz.isFinished ? (
                        <div className="w-full relative z-10 text-center" role="status">
                            <h2 className="font-display text-3xl text-than mb-4">Kết quả thử thách</h2>
                            <p className="font-display text-4xl text-son mb-2">{quiz.score} / {total}</p>
                            <p className="font-label text-cham mb-4">{percentage}% · {quiz.xp} XP</p>
                            <p className="text-than mb-6">{percentage >= 80 ? 'Bạn am hiểu Việt phục ghê đó!' : percentage >= 60 ? 'Kiến thức khá tốt, thử thêm vài câu nữa nhé!' : 'Khởi đầu ổn rồi, khám phá thêm Việt phục nhé!'}</p>
                            <div className="flex flex-col gap-3">
                                <button onClick={startQuiz} className="neo-button-primary flex items-center justify-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cham"><RotateCcw size={18} /> CHƠI LẠI</button>
                                <button onClick={onExplore} disabled={!onExplore} className="neo-button-primary bg-cham border-cham hover:bg-cham/90 flex items-center justify-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-son disabled:opacity-50"><Compass size={18} /> KHÁM PHÁ VIỆT PHỤC</button>
                            </div>
                        </div>
                    ) : !question ? (
                        <div role="status" className="w-full relative z-10 text-center">
                            <p className="text-than mb-4">Chưa có câu hỏi để hiển thị.</p>
                            <button onClick={startQuiz} className="neo-button-primary w-full">THỬ LẠI</button>
                        </div>
                    ) : (
                        <div className="w-full relative z-10 flex flex-col">
                            <span className="font-label text-cham text-sm mb-2">CÂU {quiz.currentQuestionIndex + 1} / {total}</span>
                            <div role="progressbar" aria-label="Tiến độ thử thách" aria-valuemin={0} aria-valuemax={total} aria-valuenow={quiz.currentQuestionIndex + 1} className="h-2 bg-cham/10 mb-4 overflow-hidden">
                                <div className="h-full bg-cham transition-all" style={{ width: `${(quiz.currentQuestionIndex + 1) / total * 100}%` }} />
                            </div>
                            <h3 className="font-display text-2xl text-than mb-6 break-words">{question.question}</h3>
                            
                            <div className="flex flex-col gap-3">
                                {question.options.map((ans, i) => {
                                    const correct = quiz.answered && i === question.correctAnswer;
                                    const wrong = quiz.answered && i === quiz.selectedAnswer && !correct;
                                    return (
                                    <button 
                                        key={`${question.id}-${i}`}
                                        disabled={quiz.answered}
                                        aria-pressed={quiz.selectedAnswer === i}
                                        onClick={() => dispatchQuiz({ type: 'answer', questionId: question.id, answer: i })}
                                        className={`w-full p-3 sm:p-4 text-left neo-border neo-shadow rounded-[4px] transition-colors flex items-start gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cham disabled:cursor-default ${correct ? 'bg-luc/20 border-luc text-than' : wrong ? 'bg-son/10 border-son text-than' : 'bg-giay-do border-than text-than enabled:hover:bg-giay-sang disabled:opacity-60'}`}
                                    >
                                        <span className="font-label text-son shrink-0">{String.fromCharCode(65 + i)}.</span>
                                        <span className="flex-1 min-w-0 break-words">{ans}</span>
                                        {correct && <span className="flex items-center gap-1 text-luc text-sm shrink-0"><Check size={16} /> Đúng</span>}
                                        {wrong && <span className="flex items-center gap-1 text-son text-sm shrink-0"><X size={16} /> Sai</span>}
                                    </button>
                                    );
                                })}
                            </div>
                            {quiz.answered && <div className="mt-5">
                                <p role="status" className="text-than text-sm leading-relaxed mb-4">{question.explanation}</p>
                                <button onClick={() => dispatchQuiz({ type: 'next', questionId: question.id })} className="neo-button-primary w-full flex items-center justify-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cham">
                                    {quiz.currentQuestionIndex === total - 1 ? 'XEM KẾT QUẢ' : 'CÂU TIẾP THEO'} <ArrowRight size={18} />
                                </button>
                            </div>}
                        </div>
                    )}
                </div>

                <div className="bg-giay-sang neo-border p-6 flex items-center justify-between shrink-0">
                    <div>
                        <span className="font-label text-[10px] text-than/60 block mb-1">ĐIỂM TÍCH LŨY</span>
                        <span role="status" aria-label={`${quiz.xp} XP`} className="font-display text-4xl text-son">{quiz.xp} <span className="text-xl">XP</span></span>
                    </div>
                    <Award size={48} className="text-nghe" />
                </div>
            </div>
        </div>
    );
};
