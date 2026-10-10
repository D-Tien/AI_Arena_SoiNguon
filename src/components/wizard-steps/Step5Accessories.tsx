import { useState } from 'react';
import { motion } from 'framer-motion';
import { SmartImage } from '../SmartImage';
import type { WardrobeState } from '../WardrobeWizard';

interface Props {
    state: WardrobeState;
    updateState: (updates: Partial<WardrobeState>) => void;
    setGuardMessage: (msg: string | null) => void;
}

const allAccessories = [
    { id: 'khong-doi', name: 'không đội gì', region: 'all', slot: 'head', desc: 'để tóc tự nhiên' },
    { id: 'non-la', name: 'nón lá', region: 'all', slot: 'head', desc: 'mộc mạc, che nắng' },
    { id: 'khan-dong', name: 'khăn đóng', region: 'Huế', slot: 'head', desc: 'trang trọng, uy nghi' },
    { id: 'non-quai-thao', name: 'nón quai thao', region: 'Hà Nội', slot: 'head', desc: 'gọn gàng, thanh lịch' },
    { id: 'khong-khan', name: 'không đeo khăn', region: 'all', slot: 'neck', desc: 'trống trải, thoải mái' },
    { id: 'khan-ran', name: 'khăn rằn', region: 'Sài Gòn', slot: 'neck', desc: 'chất phác, nam bộ' },

    { id: 'sneaker', name: 'sneaker', region: 'modern', slot: 'feet', desc: 'hiện đại, năng động' },
    { id: 'giay-da', name: 'giày da', region: 'modern', slot: 'feet', desc: 'lịch lãm, tây phương' },
    { id: 'guoc', name: 'guốc mộc', region: 'all', slot: 'feet', desc: 'mộc mạc, truyền thống' },
    { id: 'chan-dat', name: 'chân không', region: 'all', slot: 'feet', desc: 'gần gũi với đất' },
];

const tabs = [
    { id: 'head', label: 'đầu' },
    { id: 'neck', label: 'cổ' },

    { id: 'feet', label: 'chân' },
];

export default function Step5Accessories({ state, updateState, setGuardMessage }: Props) {
    const [activeTab, setActiveTab] = useState('head');

    const toggleAccessory = (id: string, region: string, slot: string) => {
        let newAcc = [...state.accessories];
        
        // Giới hạn 1 món cho mỗi slot (head, neck, hand, feet)
        const slotIds = allAccessories.filter(a => a.slot === slot).map(a => a.id);
        newAcc = newAcc.filter(a => !slotIds.includes(a));


        if (state.accessories.includes(id)) {
            newAcc = newAcc.filter(a => a !== id);
        } else {
            newAcc.push(id);
            // Cultural Guard Check
            if (region !== 'all' && region !== 'modern' && region !== state.place) {
                setGuardMessage(`phụ kiện này thường đi liền với trang phục vùng ${region}.`);
                setTimeout(() => setGuardMessage(null), 4000);
            } else if (region === 'modern' && state.mode !== 'modern') {
                setGuardMessage(`một chút phá cách hiện đại? hãy chắc chắn bạn đổi sang phong cách hiện đại ở bước sau nhé.`);
                setTimeout(() => setGuardMessage(null), 4000);
            } else {
                setGuardMessage(null);
            }
        }
        updateState({ accessories: newAcc });
    };

    const itemsToShow = allAccessories.filter(a => a.slot === activeTab);

    const isSupported = state.top === 'ao-tu-than' && state.gender === 'female';

    if (!isSupported) {
        return (
            <div className="flex flex-col items-center justify-center p-8 text-center h-full border-2 border-dashed border-than/20 rounded-lg bg-white/50">
                <div className="w-16 h-16 mb-4 opacity-50">
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--than)" strokeWidth="1.5">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                        <path d="M12 8V12L15 15" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <h3 className="text-than font-bold text-lg mb-2 uppercase tracking-wide">Đang phát triển thêm</h3>
                <p className="text-than/70 text-sm leading-relaxed max-w-xs">
                    Hệ thống đang trong quá trình cập nhật hình ảnh phụ kiện cho trang phục này. Cảm ơn bạn đã kiên nhẫn chờ đợi nhé!
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 font-label lowercase">
            {/* Tabs ngang */}
            <div className="flex gap-2 border-b border-than/20 pb-2 overflow-x-auto hidden-scrollbar">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-1.5 whitespace-nowrap transition-colors border-2 rounded-full min-h-[44px] flex items-center justify-center ${
                            activeTab === tab.id 
                            ? 'bg-[#B3261E] border-[#B3261E] text-giay-sang font-bold' 
                            : 'bg-transparent border-than/20 text-than hover:border-than/50'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-3 gap-6">
                {itemsToShow.map((acc, index) => {
                    const isSelected = state.accessories.includes(acc.id);
                    const rotation = index % 2 === 0 ? 'rotate-1' : '-rotate-1';
                    
                    return (
                        <button
                            key={acc.id}
                            onClick={() => toggleAccessory(acc.id, acc.region, acc.slot)}
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
                            {acc.region === state.place && (
                                <div className="absolute -top-2 -left-2 bg-[#F3E9D6] border border-than text-than text-[9px] px-2 py-0.5 z-20 shadow-sm -rotate-[8deg] font-bold tracking-wide" style={{ borderRadius: '2px' }}>
                                    hợp nơi bạn đi
                                </div>
                            )}

                            {/* Hộp nền cho hình ảnh */}
                            <div className="w-full aspect-[4/5] mb-3 bg-[#EFE8D8] flex flex-col items-center justify-center relative overflow-hidden">
                                <img
                                    src={`/assets/character/accessories/${acc.id}.jpg`}
                                    alt={acc.name}
                                    className="w-full h-full object-cover mix-blend-multiply opacity-90 transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>

                            <div className="flex flex-col items-center justify-center mt-auto w-full px-1">
                                <h3 className={`text-base leading-tight font-bold tracking-wide ${isSelected ? 'text-[#B3261E]' : 'text-than'}`}>
                                    {acc.name}
                                </h3>
                                <p className="text-[10.5px] text-than/70 mt-1 line-clamp-2 leading-tight tracking-wide">
                                    {acc.desc}
                                </p>
                            </div>
                        </button>
                    )
                })}
            </div>
        </div>
    );
}
