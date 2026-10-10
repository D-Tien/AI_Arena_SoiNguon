import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Download, Share2, X, Grid, User } from 'lucide-react';
import { SmartImage } from './SmartImage';
import { Character } from './PaperDoll';

const DUMMY_LOOKS = [
    { id: 1, name: 'HUẾ THƯƠNG', style: 'Ngũ Thân Truyền Thống', score: 98, color: 'bg-son', rotate: '-rotate-2', image: '/images/lookbook/trad_1.jpg', topId: 'ao-ngu-than', place: 'Huế', gender: 'female' },
    { id: 2, name: 'HÀ THÀNH', style: 'Áo The Truyền Thống', score: 96, color: 'bg-cham', rotate: 'rotate-1', image: '/images/lookbook/trad_2.jpg', topId: 'ao-the', place: 'Hà Nội', gender: 'male' },
    { id: 3, name: 'GIAO LĨNH AVANT-GARDE', style: 'Giao Lĩnh × Hiện Đại', score: 95, color: 'bg-luc', rotate: '-rotate-1', image: '/images/lookbook/mod_3.jpg', topId: null },
    { id: 4, name: 'HOÀNG PHÁI', style: 'Nhật Bình Cổ Điển', score: 97, color: 'bg-nghe', rotate: 'rotate-2', image: '/images/lookbook/trad_3.jpg', topId: null },
    { id: 5, name: 'CYBER TỨ THÂN', style: 'Tứ Thân × Cyberpunk', score: 99, color: 'bg-son', rotate: '-rotate-3', image: '/images/lookbook/mod_1.jpg', topId: 'ao-tu-than', place: 'Hà Nội', gender: 'female', mode: 'modern' },
    { id: 6, name: 'ĐƯỜNG PHỐ', style: 'Bà Ba × Streetwear', score: 94, color: 'bg-cham', rotate: 'rotate-2', image: '/images/lookbook/mod_2.jpg', topId: 'ao-ba-ba', place: 'Sài Gòn', gender: 'male', mode: 'modern' },
    { id: 7, name: 'NEON YẾM', style: 'Yếm × Techwear', score: 92, color: 'bg-luc', rotate: '-rotate-2', image: '/images/lookbook/mod_4.jpg', topId: null },
    { id: 8, name: 'HƯƠNG SEN', style: 'Tứ Thân × Nón Quai Thao', score: 96, color: 'bg-nghe', rotate: 'rotate-1', image: '/images/lookbook/trad_4.jpg', topId: 'ao-tu-than', place: 'Bắc Ninh', gender: 'female' },
    { id: 9, name: 'THE QUÝ TỘC', style: 'Áo The × Suit Nam', score: 95, color: 'bg-son', rotate: '-rotate-1', image: '/images/lookbook/mod_5.jpg', topId: 'ao-the', place: 'Hà Nội', gender: 'male', mode: 'modern' },
];

export interface LookbookProps {
    onTryOn?: (lookConfig: any) => void;
    myLooks?: any[];
    onUpdateLook?: (id: number, updates: any) => void;
}

export const Lookbook = ({ onTryOn, myLooks = [], onUpdateLook }: LookbookProps) => {
    const [activeTab, setActiveTab] = useState<'community' | 'mine'>('community');
    const [selectedLook, setSelectedLook] = useState<any>(null);
    const [msg, setMsg] = useState('');

    const handleTryOn = () => {
        if (selectedLook.topId && onTryOn) {
            onTryOn(selectedLook);
        } else {
            setMsg('Hệ thống đang cập nhật thêm trang phục này!');
            setTimeout(() => setMsg(''), 3000);
        }
    };

    return (
        <div className="w-full h-full bg-giay-do relative overflow-hidden flex flex-col p-8 lg:p-12">
            {/* Background texture for board */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%231A1410\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'1\'/%3E%3C/g%3E%3C/svg%3E")' }} />
            <div className="mb-8 relative z-10 w-full pt-8 px-4 flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-than/10 pb-8">
                <div className="relative">
                    <p className="font-label text-son uppercase tracking-[0.3em] text-xs md:text-sm mb-3 flex items-center gap-2">
                        <Sparkles size={14} /> Heritage & Future
                    </p>
                    <h2 className="font-display text-6xl md:text-8xl text-than leading-none relative">
                        Bộ Sưu Tập <span className="italic text-than/40">2026</span>
                    </h2>
                    {/* Sợi chỉ đỏ (Red Thread) - Straightened */}
                    <div className="absolute -bottom-8 left-0 w-32 h-[2px] bg-son" />
                </div>
                
                {/* Tabs - Segmented Control Style */}
                <div className="flex gap-1 bg-white/50 backdrop-blur-sm p-1.5 border border-than/10 shadow-sm rounded-sm">
                    <button 
                        onClick={() => setActiveTab('community')}
                        className={`flex items-center gap-2 px-6 py-3 font-label uppercase tracking-[0.2em] text-xs transition-all rounded-sm ${activeTab === 'community' ? 'bg-son text-white shadow-sm' : 'bg-transparent text-than/70 hover:text-than hover:bg-than/5'}`}
                    >
                        <Grid size={14} /> Cộng Đồng
                    </button>
                    <button 
                        onClick={() => setActiveTab('mine')}
                        className={`flex items-center gap-2 px-6 py-3 font-label uppercase tracking-[0.2em] text-xs transition-all rounded-sm ${activeTab === 'mine' ? 'bg-son text-white shadow-sm' : 'bg-transparent text-than/70 hover:text-than hover:bg-than/5'}`}
                    >
                        <User size={14} /> Của Tôi 
                        {myLooks.length > 0 && (
                            <span className={`px-2 py-0.5 rounded-sm text-[10px] ml-1 ${activeTab === 'mine' ? 'bg-white/20 text-white' : 'bg-than/10 text-than'}`}>
                                {myLooks.length}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto hidden-scrollbar pb-32 pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
                    {(activeTab === 'community' ? DUMMY_LOOKS : myLooks).length === 0 && activeTab === 'mine' ? (
                        <div className="col-span-full flex flex-col items-center justify-center py-20 text-than/50">
                            <Sparkles size={32} className="mb-4 opacity-50" />
                            <p className="font-display text-2xl">Chưa có bản phối nào</p>
                            <p className="font-label text-xs uppercase tracking-widest mt-2">Hãy lưu các bộ trang phục bạn tạo vào đây nhé.</p>
                        </div>
                    ) : (activeTab === 'community' ? DUMMY_LOOKS : myLooks).map((look, index) => (
                        <motion.div 
                            key={look.id}
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ scale: 1.02, y: -5, zIndex: 10 }}
                            className="bg-giay-sang p-3 pb-6 cursor-pointer relative neo-shadow border border-than/20 flex flex-col h-full transition-shadow hover:shadow-xl"
                            onClick={() => setSelectedLook(look)}
                        >
                            {/* Washi tape - simplified */}
                            <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-4 opacity-80 ${look.color} shadow-sm`} style={{ clipPath: 'polygon(5% 0, 95% 2%, 100% 100%, 0 98%)' }} />
                            
                            <div className="aspect-[3/4] bg-giay-do neo-border flex items-center justify-center mb-4 relative overflow-hidden shrink-0">
                                {look.isCustom ? (
                                    <div className="w-full h-full relative overflow-hidden flex items-end justify-center pb-2 bg-giay-sang">
                                        {look.scene && (
                                            <>
                                                <div className="absolute inset-0 z-0 blur-[1px] opacity-70" style={{ backgroundImage: `url(/images/places/${look.scene}.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                                                <div className="absolute inset-0 bg-gradient-to-t from-giay-sang via-giay-sang/60 to-transparent z-10 pointer-events-none"></div>
                                            </>
                                        )}
                                        <div className="w-full h-[90%] relative flex items-end justify-center pointer-events-none scale-90 origin-bottom z-10">
                                            <Character 
                                                gender={look.gender}
                                                hair={look.hair}
                                                palette={look.palette}
                                                layers={look.layers}
                                                styleMode={look.styleMode}
                                                remixLevel={look.remixLevel}
                                            />
                                        </div>
                                    </div>
                                ) : look.image ? (
                                    <img src={look.image} alt={look.name} className="w-full h-full object-cover absolute inset-0" />
                                ) : (
                                    <SmartImage slot={look.slot} className="w-full h-full object-cover absolute inset-0 mix-blend-multiply" />
                                )}
                                <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-giay-sang neo-border flex items-center justify-center font-display text-sm shadow-sm">{look.score}</div>
                            </div>
                            <h3 className="font-display text-lg md:text-xl text-center leading-tight mt-1">{look.name}</h3>
                            <p className="font-label text-[9px] text-center text-than/60 uppercase mt-1">{look.style}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Share/Export Modal */}
            <AnimatePresence>
                {selectedLook && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedLook(null)} className="absolute inset-0 bg-than/80 backdrop-blur-sm" />
                        <motion.div 
                            initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                            className="relative z-10 w-full max-w-sm bg-giay-sang p-4 neo-border neo-shadow flex flex-col gap-4"
                        >
                            {/* Export Preview 1080x1350 aspect ratio (4:5) */}
                            <div className="w-full aspect-[4/5] bg-giay-do neo-border relative overflow-hidden p-6 flex flex-col">
                                {selectedLook.isCustom ? (
                                    <div className="absolute inset-0 bg-giay-sang overflow-hidden flex items-end justify-center pb-8">
                                        {selectedLook.scene ? (
                                            <>
                                                <div className="absolute inset-0 z-0 blur-[2px] opacity-80" style={{ backgroundImage: `url(/images/places/${selectedLook.scene}.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                                                <div className="absolute inset-0 bg-gradient-to-t from-giay-sang via-giay-sang/40 to-transparent z-10 pointer-events-none"></div>
                                                <div className="absolute inset-0 bg-white/20 z-10 mix-blend-overlay pointer-events-none"></div>
                                            </>
                                        ) : (
                                            <div className="absolute inset-0 bg-giay-do opacity-20 mix-blend-multiply pointer-events-none"></div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none"></div>
                                        <div className="w-full h-[90%] relative flex items-end justify-center pointer-events-none scale-100 z-20">
                                            <Character 
                                                gender={selectedLook.gender}
                                                hair={selectedLook.hair}
                                                palette={selectedLook.palette}
                                                layers={selectedLook.layers}
                                                styleMode={selectedLook.styleMode}
                                                remixLevel={selectedLook.remixLevel}
                                            />
                                        </div>
                                    </div>
                                ) : selectedLook.image ? (
                                    <img src={selectedLook.image} alt={selectedLook.name} className="absolute inset-0 w-full h-full object-cover opacity-90" />
                                ) : (
                                    <SmartImage slot={selectedLook.slot} className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-multiply" />
                                )}
                                
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10 pointer-events-none" />
                                
                                <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center rotate-12 z-30 neo-shadow p-2">
                                    <img src="/brand/logo-soi-nguon.png" alt="Sợi Nguồn" className="w-full h-full object-contain" />
                                </div>
                                
                                <div className="mt-auto relative z-30 text-white">
                                    {selectedLook.isCustom ? (
                                        <input 
                                            type="text" 
                                            value={selectedLook.name} 
                                            onChange={(e) => {
                                                setSelectedLook({...selectedLook, name: e.target.value});
                                                if (onUpdateLook) onUpdateLook(selectedLook.id, { name: e.target.value });
                                            }}
                                            className="font-display text-4xl leading-none mb-2 text-white bg-transparent border-b border-dashed border-white/30 focus:border-white focus:outline-none w-full pb-1"
                                        />
                                    ) : (
                                        <h2 className="font-display text-4xl leading-none mb-2 text-white">{selectedLook.name}</h2>
                                    )}
                                    <p className="font-label text-[10px] text-nghe mb-4 uppercase mt-1">{selectedLook.style}</p>
                                    
                                    <div className="flex gap-1 mb-4">
                                        {['#A8231A', '#1B2A5C', '#E3A72F', '#0F5B4A', '#F3E9D6'].map((c, i) => (
                                            <div key={i} className="w-4 h-4 rounded-full border border-than" style={{ backgroundColor: c }} />
                                        ))}
                                    </div>
                                    
                                    <p className="text-[10px] text-white/80 border-t border-white/20 pt-2 line-clamp-2">
                                        "Thời trang là vòng lặp của lịch sử, nhưng mang hơi thở của thời đại mới."
                                    </p>
                                </div>
                            </div>
                            
                            {msg && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-son text-white text-xs font-bold text-center py-2 neo-border shadow-sm">
                                    {msg}
                                </motion.div>
                            )}
                            <div className="flex gap-2">
                                <button onClick={handleTryOn} className="flex-1 bg-luc text-white neo-border py-3 flex items-center justify-center gap-2 text-sm font-bold hover:scale-105 transition-transform">
                                    <Sparkles size={16}/> {selectedLook.topId ? 'THỬ NGAY' : 'BÓC TÁCH OUTFIT'}
                                </button>
                            </div>
                            
                            <div className="flex gap-2 mt-2">
                                <button className="flex-1 neo-button-primary py-3 flex items-center justify-center gap-2 text-sm"><Download size={16}/> LƯU ẢNH</button>
                                <button className="flex-1 neo-button-secondary py-3 flex items-center justify-center gap-2 text-sm"><Share2 size={16}/> CHIA SẺ</button>
                            </div>
                            <button onClick={() => setSelectedLook(null)} className="absolute -top-4 -right-4 bg-giay-sang text-than p-2 rounded-full neo-border neo-shadow hover:text-son"><X size={20}/></button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
