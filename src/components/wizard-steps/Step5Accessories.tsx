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
    { id: 'non-la', name: 'nón lá', region: 'all', slot: 'head', desc: 'mộc mạc, che nắng' },
    { id: 'khan-mo-qua', name: 'khăn mỏ quạ', region: 'Hà Nội', slot: 'head', desc: 'đặc trưng quan họ' },
    { id: 'khan-dong', name: 'khăn đóng', region: 'Huế', slot: 'head', desc: 'trang trọng, uy nghi' },
    { id: 'van-toc', name: 'vấn đội đầu', region: 'Hà Nội', slot: 'head', desc: 'gọn gàng, thanh lịch' },
    { id: 'khan-ran', name: 'khăn rằn', region: 'Sài Gòn', slot: 'neck', desc: 'chất phác, nam bộ' },
    { id: 'quat', name: 'quạt giấy', region: 'all', slot: 'hand', desc: 'nho nhã, phong lưu' },
    { id: 'sneaker', name: 'sneaker', region: 'modern', slot: 'feet', desc: 'hiện đại, năng động' },
    { id: 'giay-da', name: 'giày da', region: 'modern', slot: 'feet', desc: 'lịch lãm, tây phương' },
    { id: 'guoc', name: 'guốc mộc', region: 'all', slot: 'feet', desc: 'mộc mạc, truyền thống' },
    { id: 'chan-dat', name: 'chân không', region: 'all', slot: 'feet', desc: 'gần gũi với đất' },
];

const tabs = [
    { id: 'head', label: 'đầu' },
    { id: 'neck', label: 'cổ' },
    { id: 'hand', label: 'cầm tay' },
    { id: 'feet', label: 'chân' },
];

export default function Step5Accessories({ state, updateState, setGuardMessage }: Props) {
    const [activeTab, setActiveTab] = useState('head');

    const toggleAccessory = (id: string, region: string, slot: string) => {
        let newAcc = [...state.accessories];
        
        // Nếu là giày (feet), xoá các loại giày khác đi (chỉ được chọn 1)
        if (slot === 'feet') {
            const feetIds = allAccessories.filter(a => a.slot === 'feet').map(a => a.id);
            newAcc = newAcc.filter(a => !feetIds.includes(a));
        }

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
                            <div className="w-full aspect-[4/5] mb-3 bg-[#EFE8D8] flex flex-col items-center justify-center p-2 relative overflow-hidden">
                                <div className="w-full h-full flex flex-col items-center justify-center text-[10px] text-than/50 font-bold text-center tracking-widest uppercase opacity-80 mix-blend-multiply">
                                    [ITEM-<br/>{acc.id.toUpperCase()}]<br/><br/>
                                    <span className="text-[#B3261E]">ẢNH ĐANG ĐƯỢC TẠO...</span>
                                </div>
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
