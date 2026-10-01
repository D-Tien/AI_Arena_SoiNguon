import { motion } from 'framer-motion';
import { SmartImage } from '../SmartImage';
import type { WardrobeState } from '../WardrobeWizard';

interface Props {
    state: WardrobeState;
    updateState: (updates: Partial<WardrobeState>) => void;
    setGuardMessage: (msg: string | null) => void;
}

const tops = [
    { id: 'ao-tu-than', name: 'áo tứ thân', region: 'Hà Nội', gender: 'female', desc: 'gọn gàng, nữ tính' },
    { id: 'ao-the', name: 'áo the', region: 'Hà Nội', gender: 'male', desc: 'nho nhã, nam tính' },
    { id: 'ao-ngu-than', name: 'áo ngũ thân', region: 'Huế', gender: 'all', desc: 'chữ thập, quyền quý' },
    { id: 'ao-ba-ba', name: 'áo bà ba', region: 'Sài Gòn', gender: 'all', desc: 'mộc mạc, gần gũi' },
];

export default function Step3Top({ state, updateState, setGuardMessage }: Props) {
    const sortedTops = tops
        .filter(top => top.gender === 'all' || top.gender === state.gender)
        .sort((a, b) => {
            if (a.region === state.place) return -1;
            if (b.region === state.place) return 1;
            return 0;
        });

    const handleSelect = (topId: string, topRegion: string, topGender: string) => {
        updateState({ top: topId });
        if (topRegion !== state.place) {
            setGuardMessage(`áo này thường phổ biến ở ${topRegion}. bạn có muốn phá cách ở ${state.place}?`);
            setTimeout(() => setGuardMessage(null), 4000);
        } else if (topGender !== 'all' && topGender !== state.gender) {
             setGuardMessage(`áo này mang thiết kế đặc trưng cho giới tính khác theo truyền thống.`);
             setTimeout(() => setGuardMessage(null), 4000);
        } else {
            setGuardMessage(null);
        }
    };

    const colors = [
        { id: 'default', color: '#4C9173', name: 'xanh jade' },
        { id: 'blue', color: '#1B2A5C', name: 'xanh dương' },
        { id: 'grey', color: '#808080', name: 'xám ghi' },
        { id: 'red', color: '#8B0000', name: 'đỏ đô' },
        { id: 'cream', color: '#F3E9D6', name: 'kem ngà' },
    ];

    const tuThanColors = [
        { id: 'default', color: '#0F5B4A', name: 'lục ngọc' },
        { id: '1', color: '#A8231A', name: 'đỏ son' },
        { id: '2', color: '#E3A72F', name: 'vàng nghệ' },
    ];

    const currentTop = tops.find(t => t.id === state.top);
    const storyText = currentTop ? `${currentTop.name}: món của ${currentTop.gender === 'male' ? 'nam' : currentTop.gender === 'female' ? 'nữ' : 'người'} ${currentTop.region}.` : "hãy chọn một chiếc áo.";

    return (
        <div className="flex flex-col gap-6 font-label lowercase">
            <p className="text-than text-sm mb-2 italic border-b border-than/10 pb-4 uppercase tracking-widest font-bold">
                {storyText}
            </p>

            <div className="grid grid-cols-3 gap-6">
                {sortedTops.map((top, index) => {
                    const isSelected = state.top === top.id;
                    const rotation = index % 2 === 0 ? 'rotate-1' : '-rotate-1';
                    
                    return (
                        <button
                            key={top.id}
                            onClick={() => handleSelect(top.id, top.region, top.gender)}
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

                            {/* Tem gợi ý (giống trong ảnh: dán băng dính chéo góc trên trái) */}
                            {top.region === state.place && (
                                <div className="absolute -top-2 -left-2 bg-[#F3E9D6] border border-than text-than text-[9px] px-2 py-0.5 z-20 shadow-sm -rotate-[8deg] font-bold tracking-wide" style={{ borderRadius: '2px' }}>
                                    hợp nơi bạn đi
                                </div>
                            )}

                            {/* Hộp nền cho hình ảnh */}
                            <div className="w-full aspect-[4/5] mb-3 bg-[#EFE8D8] flex flex-col items-center justify-center p-2 relative overflow-hidden">
                                <SmartImage slot={`costume-${top.id}`} className="absolute bottom-0 w-full h-[120%] object-contain object-bottom scale-110 origin-bottom mix-blend-multiply opacity-80 pointer-events-none" />
                            </div>

                            <div className="flex flex-col items-center justify-center mt-auto w-full px-1">
                                <h3 className={`text-base leading-tight font-bold tracking-wide ${isSelected ? 'text-[#B3261E]' : 'text-than'}`}>
                                    {top.name}
                                </h3>
                                <p className="text-[10.5px] text-than/70 mt-1 line-clamp-2 leading-tight tracking-wide">
                                    {top.desc}
                                </p>
                            </div>
                        </button>
                    )
                })}
            </div>

            {(state.top === 'ao-the' || state.top === 'ao-tu-than') && (
                <div className="pt-4 border-t border-[#2B2118]/10 mt-2">
                    <p className="text-than/80 text-sm mb-3">màu sắc trang phục</p>
                    <div className="flex flex-wrap gap-3">
                        {(state.top === 'ao-the' ? colors : tuThanColors).map(c => (
                            <button
                                key={c.id}
                                onClick={() => updateState({ topColor: c.id })}
                                className={`w-11 h-11 min-h-[44px] rounded-full border-2 transition-transform ${
                                    (state.topColor === c.id || (!state.topColor && c.id === 'default'))
                                    ? 'border-[#B3261E] scale-110 shadow-md' 
                                    : 'border-[#2B2118]/20 hover:scale-105 hover:border-[#2B2118]/50'
                                }`}
                                style={{ backgroundColor: c.color }}
                                title={c.name}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
