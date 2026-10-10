import React from 'react';
import { Character } from './PaperDoll';
import type { DollLayers } from './PaperDoll';

interface ShareCardProps {
    gender: 'female' | 'male';
    layers: DollLayers;
    palette: string[];
    styleMode: 'traditional' | 'modern';
    coreName: string;
    style: string;
    title: string;
    cultureNote: string;
    isAI: boolean;
}

export const ShareCard = React.forwardRef<HTMLDivElement, ShareCardProps>(({
    gender, layers, palette, styleMode, coreName, style, title, cultureNote, isAI
}, ref) => {
    return (
        <div 
            ref={ref}
            className="w-[1080px] h-[1350px] bg-giay-do relative flex flex-col items-center justify-between overflow-hidden"
            style={{ 
                position: 'absolute', 
                left: '-9999px', 
                top: 0 
            }}
        >
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>

            {/* Top Section: Title & Tags */}
            <div className="w-full px-24 pt-24 pb-10 flex flex-col gap-6 relative z-10">
                <div className="flex justify-between items-start w-full">
                    <div className="flex flex-col gap-4 max-w-[700px]">
                        <p className="font-label text-son uppercase tracking-[0.25em] text-2xl font-bold flex items-center gap-4">
                            <span>{coreName}</span>
                            <span className="text-than/30">×</span>
                            <span className="text-than/60">{style}</span>
                        </p>
                        <h2 className="font-display text-[110px] text-than m-0 leading-[0.9] tracking-tight drop-shadow-sm">
                            {title}
                        </h2>
                    </div>
                    
                    <div className="flex flex-col gap-4 items-end">
                        <span className={`inline-block font-label text-2xl tracking-[0.2em] uppercase border px-8 py-4 rounded-sm ${styleMode === 'traditional' ? 'border-luc/40 bg-luc/5 text-luc' : 'border-son/40 bg-son/5 text-son'}`}>
                            {styleMode === 'traditional' ? 'Truyền thống' : 'Cách tân'}
                        </span>
                        {isAI && (
                            <span className="inline-block text-than/60 font-label text-xl tracking-[0.2em] uppercase border border-than/20 bg-white/50 px-6 py-3 rounded-sm shadow-sm">
                                Ảnh do AI tạo
                            </span>
                        )}
                    </div>
                </div>
                
                <div className="flex gap-4">
                    {palette.map((color, idx) => (
                        <div key={idx} className="w-16 h-16 rounded-full neo-border shadow-sm" style={{ backgroundColor: color }} />
                    ))}
                </div>
            </div>

            {/* Middle Section: Character */}
            <div className="flex-1 w-full relative flex items-end justify-center z-20 overflow-visible">
                <div className="absolute inset-0 z-0 flex justify-center items-center pointer-events-none pb-20">
                    <div className="w-[800px] h-[800px] bg-white/60 blur-[100px] rounded-full"></div>
                </div>
                
                {/* Arch Frame */}
                <div className="absolute inset-x-20 inset-y-0 border-2 border-son/20 rounded-t-[300px] pointer-events-none z-10">
                    <div className="absolute -top-[2px] left-1/2 -translate-x-1/2 w-32 h-[4px] bg-son"></div>
                </div>

                <div className="relative w-full max-w-[750px] h-full flex items-end justify-center z-30 translate-y-20">
                    {/* Shadow */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[500px] h-[20px] bg-than/20 rounded-[100%] blur-[8px] z-0" />
                    
                    <div className="w-full h-full relative z-10" style={{ filter: 'drop-shadow(12px 20px 30px rgba(0,0,0,0.15))' }}>
                        <Character 
                            gender={gender}
                            hair={'Tóc xõa dài'} // simplified for share card
                            palette={palette}
                            layers={layers}
                            styleMode={styleMode}
                        />
                    </div>
                </div>
            </div>

            {/* Bottom Section: Culture Note */}
            <div className="w-full bg-white/80 backdrop-blur-md border-t-[3px] border-cham p-16 relative z-30">
                <div className="max-w-[900px] mx-auto flex flex-col gap-4">
                    <h3 className="font-label text-cham text-2xl tracking-[0.25em] uppercase flex items-center gap-3">
                        <span className="w-4 h-4 rounded-full bg-cham"></span>
                        Mảnh ghép văn hóa
                    </h3>
                    <p className="text-than text-4xl font-display leading-[1.4] italic">
                        "{cultureNote}"
                    </p>
                </div>
            </div>
            
            {/* Branding Watermark */}
            <div className="absolute bottom-16 right-16 z-40">
                <h1 className="font-display text-4xl text-than/40">Sợi Nguồn 2026</h1>
            </div>
        </div>
    );
});

ShareCard.displayName = 'ShareCard';
