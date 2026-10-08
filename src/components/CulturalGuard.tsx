import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Info, CheckCircle2, X } from 'lucide-react';

export const GuardStamp = ({ level, onClick }: { level: 'green' | 'yellow' | 'red', onClick: () => void, className?: string }) => {
    const colors = {
        green: 'border-luc text-luc bg-giay-do',
        yellow: 'border-nghe text-nghe bg-giay-do',
        red: 'border-son text-son bg-giay-do'
    };
    
    const text = {
        green: 'CHUẨN\nVĂN HOÁ',
        yellow: 'LƯU Ý\nVĂN HOÁ',
        red: 'CẢNH BÁO\nVĂN HOÁ'
    };

    return (
        <motion.button 
            initial={{ scale: 2, opacity: 0, rotate: -45 }}
            animate={{ scale: 1, opacity: 1, rotate: -12 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.5 }}
            onClick={onClick}
            className={`absolute top-4 left-4 lg:top-12 lg:left-12 z-40 w-32 h-32 rounded-full border-[4px] flex items-center justify-center shadow-lg ${colors[level]} hover:scale-105 transition-transform cursor-pointer overflow-hidden`}
        >
            <div className="absolute inset-1.5 border-[2px] border-dashed rounded-full pointer-events-none opacity-50" style={{ borderColor: 'currentColor' }} />
            <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0 rotate-[-90deg]">
                <path id="curve" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="transparent" />
                <text className="font-display font-black text-[18px] uppercase tracking-[0.1em]" fill="currentColor">
                    <textPath href="#curve" startOffset="50%" textAnchor="middle">
                        {text[level].replace('\n', ' • ')}
                    </textPath>
                </text>
            </svg>
            <div className="font-display text-4xl mt-1">{level === 'green' ? '✓' : level === 'yellow' ? '!' : '×'}</div>
        </motion.button>
    );
};

export const GuardModal = ({ isOpen, onClose, level }: { isOpen: boolean, onClose: () => void, level: 'green' | 'yellow' | 'red' }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-12">
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }} 
                        onClick={onClose}
                        className="absolute inset-0 bg-than/40 backdrop-blur-sm" 
                    />
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 50, rotateX: 20 }} 
                        animate={{ opacity: 1, y: 0, rotateX: 0 }} 
                        exit={{ opacity: 0, y: 20, rotateX: -20 }}
                        className="relative z-10 w-full max-w-lg bg-giay-sang neo-border neo-shadow p-8 flex flex-col gap-6"
                        style={{ transformPerspective: 1000 }}
                    >
                        <button onClick={onClose} className="absolute top-4 right-4 text-than hover:text-son"><X size={24} /></button>
                        
                        <div className="flex gap-4 items-start">
                            {level === 'red' && <AlertTriangle size={32} className="text-son shrink-0" />}
                            {level === 'yellow' && <Info size={32} className="text-nghe shrink-0" />}
                            {level === 'green' && <CheckCircle2 size={32} className="text-luc shrink-0" />}
                            
                            <div>
                                <h2 className="font-display text-3xl text-than mb-2">Thẻ Kiểm Duyệt</h2>
                                <p className="text-sm font-label text-than/70">Mức độ: {level === 'red' ? 'Cần cân nhắc' : level === 'yellow' ? 'Nên lưu ý' : 'An toàn'}</p>
                            </div>
                        </div>

                        <div className="bg-giay-do neo-border p-4 rounded-sm text-than text-sm leading-relaxed">
                            {level === 'red' ? (
                                "Sự kết hợp này vi phạm một số quy chuẩn khắt khe về trang phục tế lễ truyền thống. Áo dài ngũ thân không nên mặc chung với quần đùi ngắn khi tham gia các không gian trang nghiêm."
                            ) : level === 'yellow' ? (
                                "Sự sáng tạo rất thú vị, tuy nhiên việc phối Áo Nhật Bình với áo lót ren có thể gây tranh cãi trong một số cộng đồng bảo tồn. Nên cẩn thận khi sử dụng trong không gian công cộng truyền thống."
                            ) : (
                                "Bộ trang phục phối hợp hài hoà, giữ gìn được cấu trúc cốt lõi của trang phục truyền thống mà vẫn mang lại hơi thở hiện đại an toàn."
                            )}
                        </div>
                        
                        {level !== 'green' && (
                            <div className="flex gap-4 mt-2">
                                <button onClick={onClose} className="neo-button-secondary flex-1 py-3 text-sm">Sửa giúp tôi</button>
                                <button onClick={onClose} className="neo-button-primary flex-1 py-3 text-sm !bg-than">Tôi hiểu, vẫn giữ</button>
                            </div>
                        )}
                        {level === 'green' && (
                            <button onClick={onClose} className="neo-button-primary w-full py-3 text-sm">Đã rõ</button>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
