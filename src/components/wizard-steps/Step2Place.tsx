import { motion } from 'framer-motion';
import type { WardrobeState, Place } from '../WardrobeWizard';

interface Props {
    state: WardrobeState;
    updateState: (updates: Partial<WardrobeState>) => void;
}

const placesData = [
    { id: 'Hà Nội', name: 'hà nội', desc: 'thanh lịch, truyền thống' },
    { id: 'Huế', name: 'huế', desc: 'thơ mộng, cổ kính' },
    { id: 'Sài Gòn', name: 'sài gòn', desc: 'phóng khoáng, tự do' },
    { id: 'Tuyên Quang', name: 'tuyên quang', desc: 'lễ hội, rực rỡ' },
    { id: 'Quảng Ninh', name: 'quảng ninh', desc: 'vịnh xanh, kỳ vĩ' },
    { id: 'Đà Nẵng', name: 'đà nẵng', desc: 'năng động, biển xanh' },
    { id: 'Hội An', name: 'hội an', desc: 'hoài cổ, bình yên' },
    { id: 'Cà Mau', name: 'cà mau', desc: 'đất mũi, sông nước' },
    { id: 'Đà Lạt', name: 'đà lạt', desc: 'mộng mơ, sương mù' },
];

export default function Step2Place({ state, updateState }: Props) {
    const handleSelect = (place: Place) => {
        let suggestedTop = state.top;
        if (['Hà Nội', 'Tuyên Quang', 'Quảng Ninh'].includes(place)) {
            suggestedTop = state.gender === 'male' ? 'ao-the' : 'tu-than';
        } else if (['Huế', 'Đà Nẵng', 'Hội An', 'Đà Lạt'].includes(place)) {
            suggestedTop = 'ngu-than';
        } else if (['Sài Gòn', 'Cà Mau'].includes(place)) {
            suggestedTop = 'ba-ba';
        }
        updateState({ place, top: suggestedTop });
    };

    const currentPlace = placesData.find(p => p.id === state.place) || placesData[0];
    const storyText = `${currentPlace.name}: ${currentPlace.desc}.`;

    return (
        <div className="flex flex-col gap-6 font-label lowercase">
            <p className="text-than text-sm mb-2 italic border-b border-than/10 pb-4 uppercase tracking-widest font-bold">
                {storyText}
            </p>

            <div className="grid grid-cols-3 gap-6">
                {placesData.map((place, index) => {
                    const isSelected = state.place === place.id;
                    const rotation = index % 2 === 0 ? 'rotate-1' : '-rotate-1';
                    
                    return (
                        <button
                            key={place.id}
                            onClick={() => handleSelect(place.id as Place)}
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

                            {/* Hộp nền cho hình ảnh (trống vì là địa danh) */}
                            <div className="w-full aspect-[4/5] mb-3 bg-[#EFE8D8] flex flex-col items-center justify-center p-2 relative overflow-hidden">
                                <div className="w-full h-full flex flex-col items-center justify-center text-[10px] text-than/50 font-bold text-center tracking-widest uppercase opacity-80 mix-blend-multiply">
                                    [PLACE-<br/>{place.id.toUpperCase()}]<br/><br/>
                                </div>
                            </div>

                            <div className="flex flex-col items-center justify-center mt-auto w-full px-1">
                                <h3 className={`text-base leading-tight font-bold tracking-wide ${isSelected ? 'text-[#B3261E]' : 'text-than'}`}>
                                    {place.name}
                                </h3>
                                <p className="text-[10.5px] text-than/70 mt-1 line-clamp-2 leading-tight tracking-wide">
                                    {place.desc}
                                </p>
                            </div>
                        </button>
                    )
                })}
            </div>
        </div>
    );
}
