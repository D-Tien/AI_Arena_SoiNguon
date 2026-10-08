import { motion } from 'framer-motion';
import type { WardrobeState } from '../WardrobeWizard';

interface Props {
    state: WardrobeState;
    updateState: (updates: Partial<WardrobeState>) => void;
    setGuardMessage: (msg: string | null) => void;
}

const bottoms = [
    { id: 'quan-lua', name: 'quần lụa', type: 'traditional', desc: 'mềm mại, cổ điển' },
    { id: 'vay-den', name: 'váy đụp đen', type: 'traditional', desc: 'nét duyên phụ nữ xưa' },
    { id: 'quan-short', name: 'quần short', type: 'modern', desc: 'trẻ trung, năng động' },
    { id: 'jeans', name: 'jeans ống rộng', type: 'modern', desc: 'phá cách, hiện đại' },
    { id: 'cargo', name: 'quần cargo', type: 'modern', desc: 'cá tính, bụi bặm' },
];

export default function Step4Bottom({ state, updateState, setGuardMessage }: Props) {
    const handleSelect = (bottomId: string, type: string) => {
        updateState({ bottom: bottomId });
        
        // Cultural Guard Check
        if (type === 'modern' && state.mode !== 'modern') {
            setGuardMessage(`sự kết hợp này mang hơi hướng cách tân. bạn có muốn chọn phong cách hiện đại ở bước cuối không?`);
            setTimeout(() => setGuardMessage(null), 4000);
        } else {
            setGuardMessage(null);
        }
    };

    const currentBottom = bottoms.find(b => b.id === state.bottom) || bottoms[0];
    const storyText = `${currentBottom.name}: ${currentBottom.desc}.`;

    return (
        <div className="flex flex-col gap-6 font-label lowercase">
            <p className="text-than text-sm mb-2 italic border-b border-than/10 pb-4 uppercase tracking-widest font-bold">
                {storyText}
            </p>

            <div className="grid grid-cols-3 gap-6">
                {bottoms.filter(b => b.id !== 'vay-den' || state.gender === 'female').map((b, index) => {
                    const isSelected = state.bottom === b.id;
                    const rotation = index % 2 === 0 ? 'rotate-1' : '-rotate-1';
                    
                    return (
                        <button
                            key={b.id}
                            onClick={() => handleSelect(b.id, b.type)}
                            className={`relative p-2.5 text-center bg-[#FBF5E9] flex flex-col items-center min-h-[44px] group transition-all duration-300 transform ${!isSelected ? rotation : 'rotate-0'} hover:rotate-0 hover:-translate-y-1 hover:shadow-[6px_8px_0_var(--than)] border-2 ${
                                isSelected 
                                ? 'border-[#B3261E] shadow-[4px_4px_0_var(--than)] z-10' 
                                : 'border-than shadow-[4px_4px_0_var(--than)]'
                            }`}
                        >
                            {/* Băng dính ở giữa trên cùng */}
                            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-8 h-3 bg-white/70 backdrop-blur-sm border border-black/10 rotate-2 z-10 shadow-sm" />
                            
                            {/* Dấu triện đỏ đóng */}
                            {isSelected && (
                                <motion.div 
                                    initial={{ scale: 1.5, opacity: 0, rotate: -15 }} 
                                    animate={{ scale: 1, opacity: 1, rotate: -15 }} 
                                    transition={{ type: 'spring', bounce: 0.6 }}
                                    className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-[#B3261E] border-[2px] border-[#FBF5E9] flex items-center justify-center text-[#FBF5E9] text-[12px] font-bold z-20 shadow-sm"
                                >
                                    ✓
                                </motion.div>
                            )}

                            {/* Hộp nền cho hình ảnh */}
                            <div className="w-full aspect-[4/5] mb-3 bg-[#EFE8D8] flex flex-col items-center justify-center p-2 relative overflow-hidden">
                                <div className="w-full h-full flex flex-col items-center justify-center text-[10px] text-than/50 font-bold text-center tracking-widest uppercase opacity-80 mix-blend-multiply">
                                    [COSTUME-<br/>{b.id.toUpperCase()}]<br/><br/>
                                    <span className="text-[#B3261E]">ẢNH ĐANG ĐƯỢC TẠO...</span>
                                </div>
                            </div>

                            <div className="flex flex-col items-center justify-center mt-auto w-full px-1">
                                <h3 className={`text-base leading-tight font-bold tracking-wide ${isSelected ? 'text-[#B3261E]' : 'text-than'}`}>
                                    {b.name}
                                </h3>
                                <p className="text-[10.5px] text-than/70 mt-1 line-clamp-2 leading-tight tracking-wide">
                                    {b.desc}
                                </p>
                            </div>
                        </button>
                    )
                })}
            </div>
        </div>
    );
}
