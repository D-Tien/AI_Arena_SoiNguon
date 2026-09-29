import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface DollLayers {
    bottom?: string;
    top?: string;
    outer?: string;
    shoes?: string;
    headwear?: string;
}

export interface CharacterProps {
    skinTone?: string;
    hair?: string;
    palette?: string[]; // [primary, secondary, accent]
    layers: DollLayers;
}

// --- SVG Definitions for Garments ---
const BodyBase = ({ skinTone }: { skinTone: string }) => (
    <g id="body-base">
        {/* Legs */}
        <path d="M 40 120 L 40 200 L 45 200 L 45 120" fill={skinTone} stroke="var(--than)" strokeWidth="2" />
        <path d="M 60 120 L 60 200 L 55 200 L 55 120" fill={skinTone} stroke="var(--than)" strokeWidth="2" />
        {/* Torso */}
        <path d="M 35 60 Q 50 50 65 60 L 60 130 L 40 130 Z" fill={skinTone} stroke="var(--than)" strokeWidth="2" />
        {/* Arms */}
        <path d="M 35 60 L 25 110 L 30 110 L 40 70" fill={skinTone} stroke="var(--than)" strokeWidth="2" />
        <path d="M 65 60 L 75 110 L 70 110 L 60 70" fill={skinTone} stroke="var(--than)" strokeWidth="2" />
        {/* Head */}
        <circle cx="50" cy="35" r="15" fill={skinTone} stroke="var(--than)" strokeWidth="2" />
    </g>
);

const Hair = ({ type, color }: { type: string, color: string }) => {
    if (type === 'bun') {
        return (
            <g id="hair-bun">
                <path d="M 35 35 C 35 15, 65 15, 65 35" fill={color} stroke="var(--than)" strokeWidth="2" />
                <circle cx="50" cy="15" r="8" fill={color} stroke="var(--than)" strokeWidth="2" />
            </g>
        )
    }
    return (
        <g id="hair-short">
            <path d="M 35 35 C 35 15, 65 15, 65 35 L 65 45 L 35 45 Z" fill={color} stroke="var(--than)" strokeWidth="2" />
        </g>
    )
};

// Truyền thống
const AoDai = ({ color, accent }: { color: string, accent: string }) => (
    <g id="garment-aodai">
        {/* Tà sau */}
        <path d="M 40 120 L 30 180 L 70 180 L 60 120 Z" fill={color} opacity="0.8" />
        {/* Thân áo */}
        <path d="M 36 60 Q 50 55 64 60 L 60 125 L 40 125 Z" fill={color} stroke="var(--than)" strokeWidth="2" />
        {/* Tà trước */}
        <path d="M 40 125 L 35 185 L 65 185 L 60 125 Z" fill={color} stroke="var(--than)" strokeWidth="2" />
        {/* Cổ đứng */}
        <path d="M 45 48 L 55 48 L 55 52 L 45 52 Z" fill={color} stroke="var(--than)" strokeWidth="2" />
        {/* Tay áo */}
        <path d="M 36 60 L 22 110 L 28 112 L 40 70 Z" fill={color} stroke="var(--than)" strokeWidth="2" />
        <path d="M 64 60 L 78 110 L 72 112 L 60 70 Z" fill={color} stroke="var(--than)" strokeWidth="2" />
        {/* Khuy chéo */}
        <circle cx="52" cy="58" r="1" fill={accent} />
        <circle cx="55" cy="63" r="1" fill={accent} />
        <circle cx="58" cy="68" r="1" fill={accent} />
    </g>
);

const AoTuThan = ({ color, accent }: { color: string, accent: string }) => (
    <g id="garment-aotuthan">
        {/* Yếm */}
        <path d="M 42 65 L 58 65 L 50 85 Z" fill={accent} stroke="var(--than)" strokeWidth="1" />
        {/* Áo ngoài */}
        <path d="M 36 60 Q 50 55 64 60 L 60 110 Q 50 120 40 110 Z" fill={color} stroke="var(--than)" strokeWidth="2" />
        {/* Vạt chéo buộc bụng */}
        <path d="M 40 110 Q 50 125 55 115 Z" fill={color} stroke="var(--than)" strokeWidth="1.5" />
        <path d="M 60 110 Q 50 125 45 115 Z" fill={color} stroke="var(--than)" strokeWidth="1.5" />
        {/* Tay áo xắn */}
        <path d="M 36 60 L 28 90 L 32 90 L 40 70 Z" fill={color} stroke="var(--than)" strokeWidth="2" />
        <path d="M 64 60 L 72 90 L 68 90 L 60 70 Z" fill={color} stroke="var(--than)" strokeWidth="2" />
    </g>
);

const AoNhatBinh = ({ color, accent, secondary }: { color: string, accent: string, secondary: string }) => (
    <g id="garment-aonhatbinh">
        {/* Tà áo rộng */}
        <path d="M 35 120 L 25 180 L 75 180 L 65 120 Z" fill={color} stroke="var(--than)" strokeWidth="2" />
        {/* Thân áo */}
        <path d="M 36 60 Q 50 55 64 60 L 65 125 L 35 125 Z" fill={color} stroke="var(--than)" strokeWidth="2" />
        {/* Cổ áo to bản đặc trưng Nhật Bình */}
        <path d="M 40 60 L 60 60 L 60 110 L 40 110 Z" fill={accent} stroke="var(--than)" strokeWidth="2" />
        {/* Hoa văn cổ */}
        <circle cx="50" cy="70" r="2" fill={secondary} />
        <circle cx="50" cy="85" r="2" fill={secondary} />
        <circle cx="50" cy="100" r="2" fill={secondary} />
        {/* Tay áo thụng rộng */}
        <path d="M 36 60 L 15 120 L 25 125 L 40 70 Z" fill={color} stroke="var(--than)" strokeWidth="2" />
        <path d="M 64 60 L 85 120 L 75 125 L 60 70 Z" fill={color} stroke="var(--than)" strokeWidth="2" />
    </g>
);

const YemVay = ({ color, accent }: { color: string, accent: string }) => (
    <g id="garment-yemvay">
        {/* Váy */}
        <path d="M 40 110 L 30 190 L 70 190 L 60 110 Z" fill={color} stroke="var(--than)" strokeWidth="2" />
        {/* Yếm đào */}
        <path d="M 42 60 L 58 60 L 50 110 Z" fill={accent} stroke="var(--than)" strokeWidth="2" />
        {/* Dây cổ */}
        <path d="M 50 60 L 50 50" stroke={accent} strokeWidth="2" />
        {/* Dây lưng */}
        <path d="M 45 90 L 38 90" stroke={accent} strokeWidth="1" />
        <path d="M 55 90 L 62 90" stroke={accent} strokeWidth="1" />
        {/* Thắt lưng */}
        <rect x="38" y="105" width="24" height="6" fill={color} stroke="var(--than)" strokeWidth="1" />
    </g>
);

const AoGeneric = ({ color, type }: { color: string, type: 'nguthan' | 'giaolinh' | 'baba' | 'aocanh' | 'aotac' | 'aothe' | 'aochen' | 'mangbao' }) => (
    <g id={`garment-${type}`}>
        {/* Tà áo */}
        <path d="M 38 120 L 32 170 L 68 170 L 62 120 Z" fill={color} opacity="0.9" stroke="var(--than)" strokeWidth="2" />
        {/* Thân áo */}
        <path d="M 36 60 Q 50 55 64 60 L 62 125 L 38 125 Z" fill={color} stroke="var(--than)" strokeWidth="2" />
        {/* Tay áo */}
        <path d="M 36 60 L 25 110 L 30 112 L 40 70 Z" fill={color} stroke="var(--than)" strokeWidth="2" />
        <path d="M 64 60 L 75 110 L 70 112 L 60 70 Z" fill={color} stroke="var(--than)" strokeWidth="2" />
    </g>
);

const QuanLua = ({ color }: { color: string }) => (
    <g id="garment-quanlua">
        <path d="M 40 120 L 25 195 L 48 195 L 50 130 Z" fill={color} stroke="var(--than)" strokeWidth="2" />
        <path d="M 60 120 L 50 130 L 52 195 L 75 195 Z" fill={color} stroke="var(--than)" strokeWidth="2" />
    </g>
);

// Hiện đại
const Jeans = ({ color }: { color: string }) => (
    <g id="garment-jeans">
        <path d="M 38 120 L 35 195 L 48 195 L 48 130 Z" fill={color} stroke="var(--than)" strokeWidth="2" />
        <path d="M 62 120 L 52 130 L 52 195 L 65 195 Z" fill={color} stroke="var(--than)" strokeWidth="2" />
        <path d="M 40 150 L 45 150" stroke="var(--than)" strokeWidth="1" strokeDasharray="1,1" />
    </g>
);

const Sneaker = ({ color }: { color: string }) => (
    <g id="garment-sneaker">
        <path d="M 30 195 L 45 195 L 45 205 L 25 205 Q 25 195 30 195 Z" fill={color} stroke="var(--than)" strokeWidth="2" />
        <path d="M 55 195 L 70 195 Q 75 195 75 205 L 55 205 Z" fill={color} stroke="var(--than)" strokeWidth="2" />
    </g>
);

const Blazer = ({ color }: { color: string }) => (
    <g id="garment-blazer">
        {/* Khoác ngoài */}
        <path d="M 32 60 L 38 135 L 45 135 L 45 65 Z" fill={color} stroke="var(--than)" strokeWidth="2" />
        <path d="M 68 60 L 62 135 L 55 135 L 55 65 Z" fill={color} stroke="var(--than)" strokeWidth="2" />
        {/* Cổ lật */}
        <path d="M 32 60 L 45 85 L 45 65 Z" fill={color} stroke="var(--than)" strokeWidth="1" />
        <path d="M 68 60 L 55 85 L 55 65 Z" fill={color} stroke="var(--than)" strokeWidth="1" />
        {/* Tay áo dài */}
        <path d="M 32 60 L 18 115 L 25 115 L 38 70 Z" fill={color} stroke="var(--than)" strokeWidth="2" />
        <path d="M 68 60 L 82 115 L 75 115 L 62 70 Z" fill={color} stroke="var(--than)" strokeWidth="2" />
    </g>
);

export const Character = ({ skinTone = "#FFD1B3", hair = "bun", palette = ["#A8231A", "#1B2A5C", "#E3A72F"], layers }: CharacterProps) => {
    const primary = palette[0];
    const secondary = palette[1];
    const accent = palette[2];

    return (
        <div className="w-full h-full flex justify-center items-center relative">
            <svg viewBox="0 0 100 220" className="w-full h-full max-h-[80vh] drop-shadow-xl overflow-visible">
                {/* Z-index based on rendering order */}
                <BodyBase skinTone={skinTone} />
                <Hair type={hair} color="#1A1410" />

                <AnimatePresence>
                    {/* Quần/váy */}
                    {layers.bottom === 'quan-lua' && <motion.g initial={{y: -20, opacity: 0}} animate={{y: 0, opacity: 1}} exit={{y: -20, opacity: 0}} key="bottom-1"><QuanLua color={secondary} /></motion.g>}
                    {layers.bottom === 'jeans' && <motion.g initial={{y: -20, opacity: 0}} animate={{y: 0, opacity: 1}} exit={{y: -20, opacity: 0}} key="bottom-2"><Jeans color="#1B2A5C" /></motion.g>}

                    {/* Trang phục chính (12 món) */}
                    {layers.top === 'ao-dai' && <motion.g initial={{y: -20, opacity: 0}} animate={{y: 0, opacity: 1}} exit={{y: -20, opacity: 0}} key="top-aodai"><AoDai color={primary} accent={accent} /></motion.g>}
                    {layers.top === 'ao-tu-than' && <motion.g initial={{y: -20, opacity: 0}} animate={{y: 0, opacity: 1}} exit={{y: -20, opacity: 0}} key="top-tuthan"><AoTuThan color={primary} accent={accent} /></motion.g>}
                    {layers.top === 'ao-nhat-binh' && <motion.g initial={{y: -20, opacity: 0}} animate={{y: 0, opacity: 1}} exit={{y: -20, opacity: 0}} key="top-nhatbinh"><AoNhatBinh color={primary} accent={accent} secondary={secondary} /></motion.g>}
                    {layers.top === 'yem' && <motion.g initial={{y: -20, opacity: 0}} animate={{y: 0, opacity: 1}} exit={{y: -20, opacity: 0}} key="top-yem"><YemVay color={primary} accent={accent} /></motion.g>}
                    
                    {/* Các loại áo form chung */}
                    {['ao-ngu-than', 'ao-giao-linh', 'ao-ba-ba', 'ao-canh', 'ao-tac', 'ao-the', 'ao-chen', 'ao-mang-bao'].includes(layers.top || '') && (
                        <motion.g initial={{y: -20, opacity: 0}} animate={{y: 0, opacity: 1}} exit={{y: -20, opacity: 0}} key={`top-${layers.top}`}>
                            <AoGeneric color={primary} type={layers.top as any} />
                        </motion.g>
                    )}

                    {/* Giày & Outerwear */}
                    {layers.shoes === 'sneaker' && <motion.g initial={{y: -10, opacity: 0}} animate={{y: 0, opacity: 1}} exit={{y: -10, opacity: 0}} key="shoes-1"><Sneaker color="#FBF5E9" /></motion.g>}
                    {layers.outer === 'blazer' && <motion.g initial={{y: -20, opacity: 0}} animate={{y: 0, opacity: 1}} exit={{y: -20, opacity: 0}} key="outer-1"><Blazer color={accent} /></motion.g>}
                </AnimatePresence>
            </svg>
        </div>
    );
};
