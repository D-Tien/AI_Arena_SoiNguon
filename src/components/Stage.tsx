import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SmartImage } from './SmartImage';

export const StageBackground = ({ scene = 'hanoi', title = '' }: { scene: string, title?: string }) => {
    const [imgError, setImgError] = useState(false);

    useEffect(() => {
        setImgError(false);
    }, [scene]);
    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 bg-[#E8E1D5] flex flex-col items-center justify-end pb-12">
            {/* Giấy Dó Texture outside the arch */}
            <div className="absolute inset-0 z-0 mix-blend-multiply opacity-20" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
            
            {/* Spotlight behind character */}
            <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-giay-sang rounded-full blur-[60px] opacity-80 z-10" />

            {/* Giant Title Typography positioned at the VERY TOP so it doesn't get covered */}
            {title && (
                <div className="absolute top-14 left-1/2 -translate-x-1/2 w-[95%] text-center z-30 drop-shadow-sm flex flex-col items-center justify-center pointer-events-none">
                    <h1 className="font-display text-[40px] md:text-[55px] leading-[0.95] text-than px-2 tracking-tighter mix-blend-multiply" style={{ wordBreak: 'keep-all' }}>
                        {title.toUpperCase()}
                    </h1>
                </div>
            )}

            {/* Vòm Cổng (Arch) containing the scene image */}
            <div className="relative w-[85%] h-[82%] max-w-[600px] bg-giay-do neo-border border-[2px] border-than neo-shadow overflow-hidden z-20 rounded-t-[1000px]">
                
                <AnimatePresence mode="wait">
                    <motion.div
                        key={scene}
                        initial={{ opacity: 0, clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
                        animate={{ opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: "circOut" }}
                        className="absolute inset-0 w-full h-full"
                    >
                        {/* Halftone & filter effects on image */}
                        <div className="w-full h-full bg-[#D6C5B3]" style={{ filter: 'saturate(0.88) contrast(1.05)' }}>
                            {!imgError ? (
                                <img src={`/images/places/${scene}.jpg`} alt={scene} className="w-full h-full object-cover mix-blend-multiply" onError={() => setImgError(true)} />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center mix-blend-multiply opacity-50 relative overflow-hidden">
                                    <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--than) 2px, transparent 2px)', backgroundSize: '12px 12px' }} />
                                </div>
                            )}
                        </div>
                        
                        {/* Vignette & Halftone overlay */}
                        <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30" style={{ background: 'radial-gradient(circle, transparent 50%, rgba(0,0,0,0.8) 150%)' }} />
                        <div className="absolute inset-0 pointer-events-none opacity-10" style={{ backgroundImage: 'radial-gradient(var(--than) 1px, transparent 1px)', backgroundSize: '4px 4px' }} />
                    </motion.div>
                </AnimatePresence>

            </div>
        </div>
    );
}
