import { motion } from 'framer-motion';
import type { WardrobeState, Place } from '../WardrobeWizard';

interface Props {
    state: WardrobeState;
    updateState: (updates: Partial<WardrobeState>) => void;
}

const placesData = [
    { id: 'Hà Nội', name: 'hà nội', desc: 'thanh lịch, truyền thống', image: 'ha-noi.jpg' },
    { id: 'Huế', name: 'huế', desc: 'thơ mộng, cổ kính', image: 'hue.jpg' },
    { id: 'Sài Gòn', name: 'sài gòn', desc: 'phóng khoáng, tự do', image: 'sai-gon.jpg' },
    { id: 'Ninh Bình', name: 'ninh bình', desc: 'cố đô, non nước', image: 'ninh-binh.jpg' },
    { id: 'Bắc Ninh', name: 'bắc ninh', desc: 'quan họ, mộc mạc', image: 'bac-ninh.jpg' },
    { id: 'Hà Giang', name: 'hà giang', desc: 'hùng vĩ, sương mây', image: 'ha-giang.jpg' },
    { id: 'Tuyên Quang', name: 'tuyên quang', desc: 'lễ hội, rực rỡ', image: 'tuyen-quang.jpg' },
    { id: 'Quảng Ninh', name: 'quảng ninh', desc: 'vịnh xanh, kỳ vĩ', image: 'quang-ninh.jpg' },
    { id: 'Đà Nẵng', name: 'đà nẵng', desc: 'năng động, biển xanh', image: 'da-nang.jpg' },
    { id: 'Hội An', name: 'hội an', desc: 'hoài cổ, bình yên', image: 'hoi-an.jpg' },
    { id: 'Cà Mau', name: 'cà mau', desc: 'đất mũi, sông nước', image: 'ca-mau.jpg' },
    { id: 'Đà Lạt', name: 'đà lạt', desc: 'mộng mơ, sương mù', image: 'da-lat.jpg' },
];

export default function Step2Place({ state, updateState }: Props) {
    const handleSelect = (place: Place) => {
        let suggestedTop = state.top;
        if (['Hà Nội', 'Tuyên Quang', 'Quảng Ninh', 'Ninh Bình', 'Bắc Ninh', 'Hà Giang'].includes(place)) {
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

            <div className="grid grid-cols-2 gap-8">
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

                            {/* Hộp nền cho hình ảnh địa danh */}
                            <div className="w-full aspect-square mb-4 bg-[#EFE8D8] flex flex-col items-center justify-center p-0 relative overflow-hidden">
                                {/* Fallback text phía sau */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-[10px] text-than/50 font-bold text-center tracking-widest uppercase opacity-80 mix-blend-multiply p-2">
                                    [PLACE-<br/>{place.id.toUpperCase()}]<br/><br/>
                                </div>
                                {/* Ảnh */}
                                <img 
                                    src={`/images/places/${place.image}`} 
                                    alt={place.name} 
                                    className="w-full h-full object-cover relative z-10" 
                                    onError={(e) => {
                                        // Ẩn ảnh nếu không tải được để hiện text fallback
                                        e.currentTarget.style.display = 'none';
                                    }}
                                />
                            </div>

                            <div className="flex flex-col items-center justify-center mt-auto w-full px-1 pb-1">
                                <h3 className={`text-lg leading-tight font-bold tracking-wide uppercase ${isSelected ? 'text-[#B3261E]' : 'text-than'}`}>
                                    {place.name}
                                </h3>
                                <p className="text-xs text-than/70 mt-1 line-clamp-2 leading-relaxed tracking-wide">
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
