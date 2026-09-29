import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MessageSquare, Award } from 'lucide-react';

export const Explore = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Chào bạn! Mình là Cố vấn Gen Z của Sợi Nguồn. Bạn muốn hỏi gì về Việt Phục hay cách phối đồ hôm nay?", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const [quizActive, setQuizActive] = useState(false);
    const [score, setScore] = useState(0);

    const handleSend = () => {
        if (!input.trim()) return;
        
        const newMsg = { id: Date.now(), text: input, sender: 'user' };
        setMessages([...messages, newMsg]);
        setInput('');

        // Mock bot response
        setTimeout(() => {
            const botReply = { 
                id: Date.now() + 1, 
                text: "Theo mình biết thì Áo ngũ thân ra đời từ thời chúa Nguyễn Phúc Khoát. Nếu bạn muốn phối streetwear, hãy thử kết hợp với giày chunky và quần ống rộng nhé!", 
                sender: 'bot' 
            };
            setMessages(prev => [...prev, botReply]);
        }, 1000);
    };

    return (
        <div className="w-full h-full bg-giay-do relative overflow-hidden flex flex-col md:flex-row p-8 lg:p-12 gap-8">
            {/* Cột trái: Chatbot Advisor */}
            <div className="flex-1 bg-giay-sang neo-border border-than flex flex-col overflow-hidden">
                <div className="bg-son text-giay-sang p-4 border-b-2 border-than flex items-center justify-between">
                    <h2 className="font-display text-2xl flex items-center gap-2"><MessageSquare /> Cố vấn Gen Z (AI)</h2>
                    <span className="font-label text-[10px] bg-giay-sang text-son px-2 py-1 rounded">ONLINE</span>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
                    <AnimatePresence>
                        {messages.map(m => (
                            <motion.div 
                                key={m.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`max-w-[80%] p-4 neo-border ${m.sender === 'user' ? 'bg-luc/20 ml-auto border-luc' : 'bg-giay-do border-than'}`}
                            >
                                <p className="text-than text-sm md:text-base">{m.text}</p>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <div className="p-4 border-t-2 border-than bg-giay-do flex gap-2">
                    <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Hỏi AI về Việt Phục..." 
                        className="flex-1 bg-giay-sang neo-border px-4 py-2 text-than focus:outline-none focus:border-son"
                    />
                    <button onClick={handleSend} className="neo-button-primary px-4 flex items-center justify-center">
                        <Send size={20} />
                    </button>
                </div>
            </div>

            {/* Cột phải: Quiz Mini-game */}
            <div className="flex-[0.8] flex flex-col gap-8">
                <div className="bg-cham/10 neo-border border-cham p-8 flex flex-col items-center justify-center flex-1 relative overflow-hidden">
                    <div className="absolute -right-10 -top-10 text-cham/10 rotate-12"><Award size={150} /></div>
                    
                    {!quizActive ? (
                        <>
                            <h2 className="font-display text-4xl text-than mb-4 relative z-10 text-center">Thử Thách<br/>Kiến Thức</h2>
                            <p className="text-than/80 text-center mb-8 relative z-10 text-sm">Bạn đã sẵn sàng để kiểm tra kiến thức về cổ phục Việt Nam chưa?</p>
                            <button onClick={() => setQuizActive(true)} className="neo-button-primary bg-cham border-cham hover:bg-cham/90 w-full relative z-10">BẮT ĐẦU CHƠI</button>
                        </>
                    ) : (
                        <div className="w-full relative z-10 flex flex-col">
                            <span className="font-label text-cham text-sm mb-2">CÂU HỎI 1/5</span>
                            <h3 className="font-display text-2xl text-than mb-6">Trang phục nào có 5 chiếc khuy tượng trưng cho Ngũ Thường?</h3>
                            
                            <div className="flex flex-col gap-3">
                                {['Áo Tứ thân', 'Áo Ngũ thân', 'Áo Nhật bình', 'Áo Tấc'].map((ans, i) => (
                                    <button 
                                        key={i} 
                                        onClick={() => {
                                            if (i === 1) setScore(s => s + 10);
                                            setQuizActive(false); // Demo: end after 1 question
                                        }} 
                                        className="w-full p-4 text-left neo-card hover:bg-giay-sang transition-colors"
                                    >
                                        <span className="font-label text-son mr-2">{String.fromCharCode(65 + i)}.</span> {ans}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="bg-giay-sang neo-border p-6 flex items-center justify-between">
                    <div>
                        <span className="font-label text-[10px] text-than/60 block mb-1">ĐIỂM TÍCH LŨY</span>
                        <span className="font-display text-4xl text-son">{score} <span className="text-xl">XP</span></span>
                    </div>
                    <Award size={48} className="text-nghe" />
                </div>
            </div>
        </div>
    );
};
