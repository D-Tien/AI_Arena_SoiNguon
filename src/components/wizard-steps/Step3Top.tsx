import { motion } from 'framer-motion';
import { SmartImage } from '../SmartImage';
import type { WardrobeState } from '../WardrobeWizard';

interface Props {
    state: WardrobeState;
    updateState: (updates: Partial<WardrobeState>) => void;
    setGuardMessage: (msg: string | null) => void;
}

const MIEN_BAC = ['Hà Nội', 'Ninh Bình', 'Bắc Ninh', 'Hà Giang', 'Tuyên Quang', 'Quảng Ninh'];
const MIEN_TRUNG = ['Huế', 'Đà Nẵng', 'Hội An', 'Đà Lạt'];
const MIEN_NAM = ['Sài Gòn', 'Cà Mau'];

const tops = [
    { id: 'ao-tu-than', name: 'áo tứ thân', regions: MIEN_BAC, primaryRegionName: 'miền Bắc', gender: 'female', desc: 'gọn gàng, nữ tính' },
    { id: 'ao-the', name: 'áo the', regions: MIEN_BAC, primaryRegionName: 'miền Bắc', gender: 'male', desc: 'nho nhã, nam tính' },
    { id: 'ao-ngu-than', name: 'áo ngũ thân', regions: MIEN_TRUNG, primaryRegionName: 'miền Trung', gender: 'all', desc: 'chữ thập, quyền quý' },
    { id: 'ao-ba-ba', name: 'áo bà ba', regions: [...MIEN_NAM, ...MIEN_TRUNG], primaryRegionName: 'miền Nam & miền Trung', gender: 'all', desc: 'mộc mạc, gần gũi' },
];

export default function Step3Top({ state, updateState, setGuardMessage }: Props) {
    const sortedTops = tops
        .filter(top => top.gender === 'all' || top.gender === state.gender)
        .sort((a, b) => {
            if (a.regions.includes(state.place)) return -1;
            if (b.regions.includes(state.place)) return 1;
            return 0;
        });

    const handleSelect = (topId: string, topRegions: string[], primaryRegionName: string, topGender: string) => {
        updateState({ top: topId, topColor: undefined });
        if (!topRegions.includes(state.place)) {
            setGuardMessage(`áo này thường phổ biến ở ${primaryRegionName}. bạn có muốn phá cách ở ${state.place}?`);
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
        { id: 'default', color: '#2D5A4C', name: 'xanh lục' },
        { id: 'brown', color: '#A37B65', name: 'nâu nhẹ' },
        { id: '1', color: '#C8828B', name: 'hồng nhẹ' },
    ];

    const nguThanColors = [
        { id: 'default', color: '#1A2A40', name: 'xanh đen' },
        { id: 'teal', color: '#165057', name: 'xanh ngọc' },
        { id: 'purple', color: '#5D2A82', name: 'tím' },
    ];

    const baBaColors = [
        { id: 'default', color: '#FDFDFD', name: 'trắng' },
        { id: 'brown', color: '#6B4423', name: 'nâu đất' },
        { id: 'burgundy', color: '#722F37', name: 'đỏ mận' },
    ];

    const currentTop = tops.find(t => t.id === state.top);
    const storyText = currentTop ? `${currentTop.name}: món của ${currentTop.gender === 'male' ? 'nam' : currentTop.gender === 'female' ? 'nữ' : 'người'} ${currentTop.primaryRegionName}.` : "hãy chọn một chiếc áo.";

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
                            onClick={() => handleSelect(top.id, top.regions, top.primaryRegionName, top.gender)}
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
                            {top.regions.includes(state.place) && (
                                <div className="absolute -top-2 -left-2 bg-[#F3E9D6] border border-than text-than text-[9px] px-2 py-0.5 z-20 shadow-sm -rotate-[8deg] font-bold tracking-wide" style={{ borderRadius: '2px' }}>
                                    hợp nơi bạn đi
                                </div>
                            )}

                            {/* Hộp nền cho hình ảnh */}
                            <div className="w-full aspect-[3/4] mb-3 bg-[#EFE8D8] flex flex-col items-center justify-center p-0 relative overflow-hidden">
                                <SmartImage slot={`costume-${top.id}`} className="absolute inset-0 w-full h-full object-cover object-center mix-blend-multiply opacity-90 pointer-events-none" />
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

            {(state.top === 'ao-the' || state.top === 'ao-tu-than' || state.top === 'ao-ngu-than' || state.top === 'ao-ba-ba') && (
                <div className="pt-4 border-t border-[#2B2118]/10 mt-2">
                    <p className="text-than/80 text-sm mb-3">màu sắc trang phục</p>
                    <div className="flex flex-wrap gap-3">
                        {(state.top === 'ao-the' ? colors : (state.top === 'ao-tu-than' ? tuThanColors : (state.top === 'ao-ngu-than' ? nguThanColors : baBaColors))).map(c => (
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
