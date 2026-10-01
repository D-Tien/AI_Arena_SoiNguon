import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Download, Share2, X } from 'lucide-react';
import { SmartImage } from './SmartImage';

const DUMMY_LOOKS = [
    { id: 1, name: 'LÃNG KHÁCH', style: 'Ngũ thân × Streetwear', score: 95, color: 'bg-son', rotate: '-rotate-2', slot: 'costume-ao-ngu-than' },
    { id: 2, name: 'GIAO MÙA', style: 'Áo dài × Blazer', score: 88, color: 'bg-cham', rotate: 'rotate-3', slot: 'costume-ao-dai' },
    { id: 3, name: 'MỘC MẠC', style: 'Tứ thân × Denim', score: 92, color: 'bg-luc', rotate: '-rotate-1', slot: 'costume-ao-tu-than' },
    { id: 4, name: 'CUNG ĐÌNH', style: 'Nhật bình × Gothic', score: 75, color: 'bg-nghe', rotate: 'rotate-2', slot: 'costume-ao-nhat-binh' },
];

export const Lookbook = () => {
    const [selectedLook, setSelectedLook] = useState<any>(null);

    return (
        <div className="w-full h-full bg-giay-do relative overflow-hidden flex flex-col p-8 lg:p-12">
            {/* Background texture for board */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%231A1410\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'1\'/%3E%3C/g%3E%3C/svg%3E")' }} />
            
            <h2 className="font-display text-5xl md:text-7xl mb-12 relative z-10 text-than inline-block">
                Bộ Sưu Tập
                <div className="absolute -bottom-2 left-0 w-full h-2 bg-son -rotate-1 z-[-1]" />
            </h2>

            <div className="flex-1 overflow-y-auto hidden-scrollbar pb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 p-4">
                    {DUMMY_LOOKS.map((look) => (
                        <motion.div 
                            key={look.id}
                            whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
                            className={`bg-giay-sang p-4 pb-12 cursor-pointer ${look.rotate} relative origin-center neo-shadow border border-than/20`}
                            onClick={() => setSelectedLook(look)}
                        >
                            {/* Washi tape */}
                            <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 opacity-80 ${look.color} rotate-[-5deg] shadow-sm`} style={{ clipPath: 'polygon(5% 0, 95% 2%, 100% 100%, 0 98%)' }} />
                            
                            <div className="aspect-[3/4] bg-giay-do neo-border flex items-center justify-center mb-4 relative overflow-hidden">
                                <SmartImage slot={look.slot} className="w-full h-full object-cover absolute inset-0 mix-blend-multiply" />
                                <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-giay-sang neo-border flex items-center justify-center font-display text-sm shadow-sm">{look.score}</div>
                            </div>
                            <h3 className="font-display text-2xl text-center">{look.name}</h3>
                            <p className="font-label text-[10px] text-center text-than/60 uppercase">{look.style}</p>
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
                                <SmartImage slot={selectedLook.slot} className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-multiply" />
                                
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                                
                                <div className="absolute top-4 right-4 w-12 h-12 bg-son rounded-full flex items-center justify-center font-display text-giay-sang text-xl rotate-12 z-20 neo-shadow">SN</div>
                                
                                <div className="mt-auto relative z-10">
                                    <h2 className="font-display text-4xl leading-none mb-2">{selectedLook.name}</h2>
                                    <p className="font-label text-[10px] text-son mb-4">{selectedLook.style}</p>
                                    
                                    <div className="flex gap-1 mb-4">
                                        {['#A8231A', '#1B2A5C', '#E3A72F', '#0F5B4A', '#F3E9D6'].map((c, i) => (
                                            <div key={i} className="w-4 h-4 rounded-full border border-than" style={{ backgroundColor: c }} />
                                        ))}
                                    </div>
                                    
                                    <p className="text-[10px] text-than/80 border-t border-than/20 pt-2 line-clamp-2">
                                        "Thời trang là vòng lặp của lịch sử, nhưng mang hơi thở của thời đại mới."
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex gap-2">
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
