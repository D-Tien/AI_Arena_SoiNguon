import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface DollLayers {
    bottom?: string;
    top?: string;
    outer?: string;
    shoes?: string;
    headwear?: string;
    accessories?: string[];
}

export interface CharacterProps {
    gender?: 'female' | 'male';
    skinTone?: string;
    hair?: string;
    bangs?: string;
    palette?: string[]; // [primary, secondary, accent]
    layers: DollLayers;
    styleMode?: 'traditional' | 'modern';
}

// --- SVG Definitions for Garments ---
const Eyes = ({ cx, cy, isFemale, skinTone }: { cx: number, cy: number, isFemale?: boolean, skinTone?: string }) => {
    const isRight = cx > 200;

    if (isFemale) {
        // Mắt dịu dàng cho nữ
        const angle = isRight ? -7 : 7;
        return (
            <g transform={`rotate(${angle}, ${cx}, ${cy})`}>
                <ellipse cx={cx} cy={cy} rx="12" ry="10" fill="#FFF" stroke="var(--than)" strokeWidth="1.5" />
                <ellipse cx={cx} cy={cy + 1} rx="8.5" ry="7.5" fill="#2B1A14" />
                <path d={`M ${cx - 13} ${cy - 7} Q ${cx} ${cy - 11} ${cx + 13} ${cy - 7} L ${cx + 13} ${cy - 15} L ${cx - 13} ${cy - 15} Z`} fill={skinTone || "#FFD1B3"} />
                <circle cx={cx - 3} cy={cy - 2} r="3" fill="white" />
                <circle cx={cx + 3} cy={cy + 4} r="1" fill="white" />
                <path d={`M ${cx - 13} ${cy - 1} C ${cx - 8} ${cy - 10}, ${cx + 8} ${cy - 10}, ${cx + 13} ${cy - 1}`} fill="none" stroke="var(--than)" strokeWidth="3" strokeLinecap="round" />
                <path d={isRight ? `M ${cx + 12} ${cy - 3} Q ${cx + 18} ${cy - 2} ${cx + 20} ${cy - 4}` : `M ${cx - 12} ${cy - 3} Q ${cx - 18} ${cy - 2} ${cx - 20} ${cy - 4}`} fill="none" stroke="var(--than)" strokeWidth="2.5" strokeLinecap="round" />
                <path d={isRight ? `M ${cx + 14} ${cy - 2} Q ${cx + 18} ${cy - 5} ${cx + 21} ${cy - 8}` : `M ${cx - 14} ${cy - 2} Q ${cx - 18} ${cy - 5} ${cx - 21} ${cy - 8}`} fill="none" stroke="var(--than)" strokeWidth="1.5" strokeLinecap="round" />
                <path d={isRight ? `M ${cx + 12} ${cy - 6} Q ${cx + 16} ${cy - 9} ${cx + 19} ${cy - 11}` : `M ${cx - 12} ${cy - 6} Q ${cx - 16} ${cy - 9} ${cx - 19} ${cy - 11}`} fill="none" stroke="var(--than)" strokeWidth="1.5" strokeLinecap="round" />
                <path d={`M ${cx - 10} ${cy + 9} Q ${cx} ${cy + 11} ${cx + 10} ${cy + 9}`} fill="none" stroke="#A89F91" strokeWidth="1.5" strokeLinecap="round" />
            </g>
        );
    }

    // Mắt nam tính cho nam (sắc sảo, thon dài, không quá to tròn)
    const angle = isRight ? -2 : 2;
    return (
        <g transform={`rotate(${angle}, ${cx}, ${cy})`}>
            {/* Tròng trắng thật to */}
            <path d={`M ${cx - 14} ${cy} C ${cx - 7} ${cy - 12}, ${cx + 7} ${cy - 12}, ${cx + 14} ${cy} C ${cx + 7} ${cy + 7}, ${cx - 7} ${cy + 7}, ${cx - 14} ${cy}`} fill="#FFF" stroke="var(--than)" strokeWidth="1.5" strokeLinejoin="round" />

            {/* Lòng đen thật lớn */}
            <circle cx={cx} cy={cy - 1} r="7.5" fill="#1A1410" />
            <circle cx={cx + 2} cy={cy - 4} r="2" fill="white" />

            {/* Mi trên đậm, vòng cung rộng hơn */}
            <path d={`M ${cx - 15} ${cy - 1} Q ${cx} ${cy - 13} ${cx + 15} ${cy - 1}`} fill="none" stroke="var(--than)" strokeWidth="3.5" strokeLinecap="round" />

            {/* Lông mi đuôi mắt ngắn gọn */}
            <path d={isRight 
                ? `M ${cx + 14} ${cy - 2} L ${cx + 16} ${cy - 3.5}`
                : `M ${cx - 14} ${cy - 2} L ${cx - 16} ${cy - 3.5}`} fill="none" stroke="var(--than)" strokeWidth="2" strokeLinecap="round" />
            <path d={isRight
                ? `M ${cx + 11} ${cy - 7} L ${cx + 12.5} ${cy - 8.5}`
                : `M ${cx - 11} ${cy - 7} L ${cx - 12.5} ${cy - 8.5}`} fill="none" stroke="var(--than)" strokeWidth="1.5" strokeLinecap="round" />

            {/* Bọng mắt mờ nhẹ */}
            <path d={`M ${cx - 8} ${cy + 9} Q ${cx} ${cy + 10} ${cx + 8} ${cy + 9}`} fill="none" stroke="var(--than)" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
        </g>
    );
};

const BodyBase = ({ skinTone }: { skinTone: string }) => (
    <g id="body-base">
        {/* Body & Limbs - SINGLE PATH WITH NECK */}
        <path
            d="
            M 185 130
            L 185 180
            C 140 180, 120 190, 110 210
            C 100 240, 105 290, 100 340
            C 98 360, 95 390, 105 400
            C 115 410, 125 390, 130 370
            C 135 350, 135 310, 140 280
            C 145 290, 150 330, 140 390
            C 130 460, 120 540, 125 620
            L 190 620
            L 190 410
            L 210 410
            L 210 620
            L 275 620
            C 280 540, 270 460, 260 390
            C 250 330, 255 290, 260 280
            C 265 310, 265 350, 270 370
            C 275 390, 285 410, 295 400
            C 305 390, 302 360, 300 340
            C 295 290, 300 240, 290 210
            C 280 190, 260 180, 215 180
            L 215 130
            Z"
            fill={skinTone} stroke="var(--than)" strokeWidth="4" strokeLinejoin="round"
        />

        {/* Head */}
        <path
            d="M 130 60 C 130 -60, 270 -60, 270 60 C 270 130, 230 150, 200 150 C 170 150, 130 130, 130 60 Z"
            fill={skinTone} stroke="var(--than)" strokeWidth="4" strokeLinejoin="round"
        />

        <g id="face-features">
            {/* Lông mày: mảnh 2px, cách mắt 10px */}
            <path d="M 157 54 Q 174 48 188 56" fill="none" stroke="#3A2A22" strokeWidth="2" strokeLinecap="round" />
            <path d="M 243 54 Q 226 48 212 56" fill="none" stroke="#3A2A22" strokeWidth="2" strokeLinecap="round" />

            {/* Mắt */}
            <Eyes cx={174} cy={75} isFemale={true} skinTone={skinTone} />
            <Eyes cx={226} cy={75} isFemale={true} skinTone={skinTone} />

            {/* Má hồng (dưới mắt 8px, nhẹ nhàng) */}
            <ellipse cx="155" cy="94" rx="15" ry="8" fill="#FF7F9F" opacity="0.55" />
            <ellipse cx="245" cy="94" rx="15" ry="8" fill="#FF7F9F" opacity="0.55" />

            {/* Mũi */}
            <path d="M 200 75 L 200 85 L 205 85" fill="none" stroke="var(--than)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />

            {/* Môi */}
            <g id="lips" transform="translate(0, 105)">
                <path d="M 188 0 Q 200 7 212 0 Q 200 12 188 0 Z" fill="#E06666" stroke="#A8231A" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M 188 0 Q 200 3 212 0" fill="none" stroke="#A8231A" strokeWidth="1.5" />
                <ellipse cx="205" cy="3" rx="2" ry="1" fill="white" opacity="0.7" />
            </g>
        </g>
    </g>
);

const BodyBaseMale = ({ skinTone }: { skinTone: string }) => (
    <g id="body-base-male">
        <path
            d="
            M 180 130
            L 180 170
            C 130 170, 110 180, 95 210
            C 90 240, 95 290, 90 340
            C 88 360, 85 390, 95 400
            C 105 410, 115 390, 120 370
            C 125 350, 125 310, 130 280
            C 135 290, 140 330, 130 390
            C 120 460, 110 540, 115 620
            L 185 620
            L 185 410
            L 215 410
            L 215 620
            L 285 620
            C 290 540, 280 460, 270 390
            C 260 330, 265 290, 270 280
            C 275 310, 275 350, 280 370
            C 285 390, 295 410, 305 400
            C 315 390, 312 360, 310 340
            C 305 290, 310 240, 305 210
            C 290 180, 270 170, 220 170
            L 220 130
            Z"
            fill={skinTone} stroke="var(--than)" strokeWidth="4" strokeLinejoin="round"
        />
        <path
            d="M 130 60 C 130 -60, 270 -60, 270 60 C 270 130, 230 150, 200 150 C 170 150, 130 130, 130 60 Z"
            fill={skinTone} stroke="var(--than)" strokeWidth="4" strokeLinejoin="round"
        />
        <g id="face-features-male" transform="translate(0, 6)">
            {/* Lông mày nam: rất rậm, đậm, nam tính */}
            <path d="M 152 52 Q 170 48 186 51 L 186 57.5 Q 170 54 152 56 Z" fill="var(--than)" />
            <path d="M 248 52 Q 230 48 214 51 L 214 57.5 Q 230 54 248 56 Z" fill="var(--than)" />

            {/* Mắt nam tính */}
            <Eyes cx={175} cy={72} skinTone={skinTone} />
            <Eyes cx={225} cy={72} skinTone={skinTone} />

            {/* Má lúm đồng tiền (thay má hồng) */}
            <path d="M 183 103 Q 180 106 183 109" fill="none" stroke="#3A2A22" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
            <path d="M 217 103 Q 220 106 217 109" fill="none" stroke="#3A2A22" strokeWidth="2" strokeLinecap="round" opacity="0.4" />

            {/* Sống mũi cao, nam tính, nghệ thuật */}
            <path d="M 197 63 Q 200 75 200 84 L 205 86" fill="none" stroke="var(--than)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
            {/* Bóng đổ nhẹ tạo khối cho sống mũi */}
            <path d="M 194 65 Q 198 75 198 83" fill="none" stroke="#3A2A22" strokeWidth="2" strokeLinecap="round" opacity="0.15" />

            {/* Miệng cười bình thường */}
            <g id="male-mouth">
                {/* Lòng miệng */}
                <path d="M 187 105 Q 200 105 213 105 Q 200 114 187 105 Z" fill="#8A1C1C" stroke="#A8231A" strokeWidth="2" strokeLinejoin="round" />
                {/* Hàng răng trên */}
                <path d="M 188 105.5 Q 200 105.5 212 105.5 Q 200 110 188 105.5 Z" fill="#FFFFFF" />
            </g>
        </g>
    </g>
);

const HairBack = ({ type, color }: { type: string, color: string }) => {
    if (type === 'dai-thuot-tha') {
        return (
            <g id="hair-back-long">
                <path
                    d="M 155 130 C 130 160, 140 250, 140 320 C 150 340, 180 340, 200 340 C 220 340, 250 340, 260 320 C 260 250, 270 160, 245 130 Z"
                    fill={color} stroke="var(--than)" strokeWidth="4" strokeLinejoin="round"
                />
                <path d="M 155 180 Q 155 250 160 300" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                <path d="M 180 180 Q 180 250 185 300" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                <path d="M 220 180 Q 220 250 215 300" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                <path d="M 245 180 Q 245 250 240 300" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
            </g>
        );
    }
    if (type === 'van-gon') {
        // Lộ một búi nhỏ nhô ra bên phải cổ/gáy để có thể nhìn thấy từ góc chính diện
        return <circle cx="230" cy="120" r="22" fill={color} stroke="var(--than)" strokeWidth="4" />;
    }
    if (type === 'bui-cao') {
        return <circle cx="200" cy="-15" r="35" fill={color} stroke="var(--than)" strokeWidth="4" />;
    }
    if (type === 'buoc-thap') {
        // Tóc buộc thấp vắt nhẹ sang vai phải để có thể nhìn thấy từ phía trước
        return <path d="M 210 120 C 240 130, 275 180, 250 260 C 240 280, 225 280, 230 260 C 250 180, 220 150, 205 130 Z" fill={color} stroke="var(--than)" strokeWidth="4" strokeLinejoin="round" />;
    }
    return null;
};

const HairFront = ({ type, color, bangs }: { type: string, color: string, bangs: string }) => {
    // Top cap covering the head, used as base for all
    const topCap = (
        <path
            d="M 130 60 C 130 -60, 270 -60, 270 60 C 270 30, 240 5, 200 5 C 160 5, 130 30, 130 60 Z"
            fill={color} stroke="var(--than)" strokeWidth="4" strokeLinejoin="round"
        />
    );

    let bangsRender = null;

    if (bangs === 'mai-thua') {
        bangsRender = (
            <g id="bangs-mai-thua">
                {/* 7-9 small strands across forehead */}
                <path d="M 145 15 Q 150 43 155 43 Q 160 43 160 12" fill={color} stroke="var(--than)" strokeWidth="2" strokeLinejoin="round" />
                <path d="M 160 10 Q 165 45 170 45 Q 175 45 175 8" fill={color} stroke="var(--than)" strokeWidth="2" strokeLinejoin="round" />
                <path d="M 175 6 Q 180 46 185 46 Q 190 46 190 5" fill={color} stroke="var(--than)" strokeWidth="2" strokeLinejoin="round" />
                <path d="M 190 5 Q 195 48 200 48 Q 205 48 205 5" fill={color} stroke="var(--than)" strokeWidth="2" strokeLinejoin="round" />
                <path d="M 205 5 Q 210 46 215 46 Q 220 46 220 6" fill={color} stroke="var(--than)" strokeWidth="2" strokeLinejoin="round" />
                <path d="M 220 8 Q 225 45 230 45 Q 235 45 235 10" fill={color} stroke="var(--than)" strokeWidth="2" strokeLinejoin="round" />
                <path d="M 235 12 Q 240 43 245 43 Q 250 43 250 15" fill={color} stroke="var(--than)" strokeWidth="2" strokeLinejoin="round" />

                {/* 2 thin side strands down to chin */}
                <path d="M 130 60 C 140 100, 140 140, 145 150 C 138 140, 135 100, 125 60 Z" fill={color} stroke="var(--than)" strokeWidth="2" strokeLinejoin="round" />
                <path d="M 270 60 C 260 100, 260 140, 255 150 C 262 140, 265 100, 275 60 Z" fill={color} stroke="var(--than)" strokeWidth="2" strokeLinejoin="round" />
            </g>
        );
    } else if (bangs === 'mai-ngang-day') {
        bangsRender = (
            <path
                d="M 130 60 C 130 80, 140 42, 200 42 C 260 42, 270 80, 270 60 C 270 30, 240 5, 200 5 C 160 5, 130 30, 130 60 Z"
                fill={color} stroke="var(--than)" strokeWidth="4" strokeLinejoin="round"
            />
        );
    } else if (bangs === 'mai-bay') {
        bangsRender = (
            <g id="bangs-mai-bay">
                {/* Left swept */}
                <path d="M 200 5 C 170 30, 160 70, 130 80 C 140 60, 150 20, 200 5 Z" fill={color} stroke="var(--than)" strokeWidth="4" strokeLinejoin="round" />
                {/* Right swept */}
                <path d="M 200 5 C 230 30, 240 70, 270 80 C 260 60, 250 20, 200 5 Z" fill={color} stroke="var(--than)" strokeWidth="4" strokeLinejoin="round" />
            </g>
        );
    }

    let extraFront = null;
    if (type === 'dai-thuot-tha') {
        extraFront = (
            <path
                d="M 260 120 C 270 160, 250 230, 225 280 C 215 300, 220 305, 225 300 C 240 280, 275 200, 270 120 Z"
                fill={color} stroke="var(--than)" strokeWidth="3" strokeLinejoin="round"
            />
        );
    }

    return (
        <g>
            {bangs !== 'mai-ngang-day' && topCap}
            {bangsRender}
            {extraFront}
        </g>
    );
};

const HairBackMale = ({ type, color }: { type: string, color: string }) => {
    if (type === 'buoc-thap') {
        return (
            <g>
                <path d="M 150 140 C 170 160, 230 160, 250 140 C 240 160, 220 170, 200 170 C 180 170, 160 160, 150 140 Z" fill={color} />
                <circle cx="200" cy="165" r="15" fill={color} stroke="var(--than)" strokeWidth="3" />
            </g>
        );
    }
    return null;
}

const HairFrontMale = ({ type, color, headwear }: { type: string, color: string, headwear?: string }) => {
    const earColor = color === 'white' ? 'white' : '#FFD1B3';
    const ears = (
        <g id="male-ears">
            <path d="M 132 65 C 122 65, 122 85, 132 85 Z" fill={earColor} stroke="var(--than)" strokeWidth="3" strokeLinejoin="round" />
            <path d="M 268 65 C 278 65, 278 85, 268 85 Z" fill={earColor} stroke="var(--than)" strokeWidth="3" strokeLinejoin="round" />
            {color !== 'white' && (
                <g>
                    <path d="M 128 70 C 125 75, 125 80, 130 80" fill="none" stroke="var(--than)" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                    <path d="M 272 70 C 275 75, 275 80, 270 80" fill="none" stroke="var(--than)" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                </g>
            )}
        </g>
    );

    if (headwear === 'khan-xep' || headwear === 'khan-dong') {
        return (
            <g id="hair-with-turban">
                {ears}
                <path d="M 128 55 C 125 70, 135 75, 138 75 C 142 65, 135 55, 128 55 Z" fill={color} stroke="var(--than)" strokeWidth="2.5" strokeLinejoin="round" />
                <path d="M 272 55 C 275 70, 265 75, 262 75 C 258 65, 265 55, 272 55 Z" fill={color} stroke="var(--than)" strokeWidth="2.5" strokeLinejoin="round" />
            </g>
        );
    }

    const baseTop = (
        <path d="M 124 60 C 124 -75, 276 -75, 276 60 C 276 35, 240 15, 200 15 C 160 15, 124 35, 124 60 Z" fill={color} stroke="var(--than)" strokeWidth="3" strokeLinejoin="round" />
    );
    const baseHighlight = color !== 'white' ? (
        <g>
            <path d="M 160 -15 C 180 -25, 220 -25, 240 -15" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 170 -5 C 190 -12, 210 -12, 230 -5" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" />
        </g>
    ) : null;

    if (type === 're-ngoi') {
        return (
            <g>
                {ears}
                <path d="M 124 60 C 124 -75, 276 -75, 276 60 C 276 35, 250 10, 180 5 C 150 0, 124 35, 124 60 Z" fill={color} stroke="var(--than)" strokeWidth="3" strokeLinejoin="round" />
                <path d="M 180 5 C 190 20, 220 35, 260 40 C 240 15, 210 5, 180 5 Z" fill={color} stroke="var(--than)" strokeWidth="2.5" strokeLinejoin="round" />
                <path d="M 260 40 C 265 42, 270 44, 274 48 C 272 30, 265 20, 260 10" fill={color} />
                <path d="M 185 10 C 210 20, 230 30, 245 35" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round" />
                {baseHighlight}
            </g>
        );
    } else if (type === 'mai-bay') {
        return (
            <g>
                {ears}
                <path d="M 130 50 C 130 -65, 270 -65, 270 50 C 270 30, 240 15, 200 15 C 160 15, 130 30, 130 50 Z" fill={color} stroke="var(--than)" strokeWidth="3" strokeLinejoin="round" />
                <path d="M 180 -20 Q 170 -40 160 -25 Q 170 -15 180 -20 Z" fill={color} stroke="var(--than)" strokeWidth="2" />
                <path d="M 200 -25 Q 190 -50 180 -35 Q 190 -20 200 -25 Z" fill={color} stroke="var(--than)" strokeWidth="2" />
                <path d="M 220 -20 Q 210 -40 200 -25 Q 210 -15 220 -20 Z" fill={color} stroke="var(--than)" strokeWidth="2" />
                <path d="M 200 15 C 180 30, 170 40, 150 35 C 160 25, 180 20, 200 15 Z" fill={color} stroke="var(--than)" strokeWidth="2" />
                {baseHighlight}
            </g>
        );
    } else if (type === 'buoc-thap') {
        return (
            <g>
                {ears}
                <path d="M 130 55 C 130 -65, 270 -65, 270 55 C 270 30, 240 10, 200 10 C 160 10, 130 30, 130 55 Z" fill={color} stroke="var(--than)" strokeWidth="3" strokeLinejoin="round" />
                {color !== 'white' && (
                    <g>
                        <path d="M 150 0 Q 170 -10 200 -10" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                        <path d="M 250 0 Q 230 -10 200 -10" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                    </g>
                )}
                {baseHighlight}
            </g>
        );
    }

    // Tóc nam tính rẽ ngôi 7/3 (side part lãng tử có lọn con)
    return (
        <g id="hair-men-7-3">
            {ears}
            {baseTop}

            {/* Mái dài bên trái (mái 7) */}
            <path d="M 124 60 Q 130 -5 185 10 C 160 45, 150 70, 128 65 Z" fill={color} stroke="var(--than)" strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M 140 40 Q 155 15 175 10" fill="none" stroke={color !== 'white' ? "rgba(255,255,255,0.2)" : "transparent"} strokeWidth="1.5" strokeLinecap="round" />

            {/* Mái nhẹ bên phải (mái 3) */}
            <path d="M 276 60 Q 260 -5 215 10 C 240 35, 255 60, 268 55 Z" fill={color} stroke="var(--than)" strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M 260 45 Q 245 25 225 20" fill="none" stroke={color !== 'white' ? "rgba(255,255,255,0.2)" : "transparent"} strokeWidth="1.5" strokeLinecap="round" />

            {/* Lọn tóc con lãng tử (tinh tế, thưa thớt hơn) */}
            <path d="M 180 12 Q 185 35 178 50" fill="none" stroke="var(--than)" strokeWidth="2" strokeLinecap="round" />
            <path d="M 172 15 Q 170 25 168 35" fill="none" stroke="var(--than)" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 215 12 Q 205 35 212 45" fill="none" stroke="var(--than)" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 222 15 Q 225 25 228 30" fill="none" stroke="var(--than)" strokeWidth="1.5" strokeLinecap="round" />

            {baseHighlight}
        </g>
    );
};

const KhanMoQua = ({ color }: { color: string }) => (
    <g id="headwear-moqua">
        <path d="M 125 50 C 120 10, 160 -10, 200 0 C 240 -10, 280 10, 275 50 C 270 -5, 230 -20, 200 -5 C 170 -20, 130 -5, 125 50 Z" fill={color} stroke="var(--than)" strokeWidth="4" strokeLinejoin="round" />
        <path d="M 185 -2 L 200 -30 L 215 -2 Z" fill={color} stroke="var(--than)" strokeWidth="3" strokeLinejoin="round" />
        <path d="M 155 20 Q 180 5 200 -2" fill="none" stroke="rgba(0,0,0,0.4)" strokeWidth="1.5" />
        <path d="M 245 20 Q 220 5 200 -2" fill="none" stroke="rgba(0,0,0,0.4)" strokeWidth="1.5" />
    </g>
);

const BangDoLua = ({ color }: { color: string }) => (
    <g id="headwear-bangdo">
        <path d="M 128 40 C 150 20, 250 20, 272 40 C 270 30, 250 10, 200 10 C 150 10, 130 30, 128 40 Z" fill={color} stroke="var(--than)" strokeWidth="3" />
        <circle cx="140" cy="35" r="8" fill={color} stroke="var(--than)" strokeWidth="2" />
        <path d="M 140 35 L 120 20 L 140 35 L 130 50 Z" fill={color} stroke="var(--than)" strokeWidth="2" />
    </g>
);

// Truyền thống - TỨ THÂN
const AoTuThan = ({ primary, secondary, accent, styleMode }: { primary: string, secondary: string, accent: string, styleMode?: string }) => (
    <g id="garment-tuthan">
        {/* Váy đen dài chấm mắt cá */}
        <g id="garment-skirt">
            <path d="M 140 310 L 115 610 C 170 620, 230 620, 285 610 L 260 310 Z" fill="#1A1410" stroke="var(--than)" strokeWidth="4" strokeLinejoin="round" />
            <path d="M 170 310 L 160 615" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
            <path d="M 230 310 L 240 615" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
        </g>

        {/* Yếm đào */}
        <path d="M 200 185 L 235 220 L 200 310 L 165 220 Z" fill={accent} stroke="var(--than)" strokeWidth="3" strokeLinejoin="round" />
        {/* Dây yếm */}
        <path d="M 200 185 Q 190 170 185 160" fill="none" stroke={accent} strokeWidth="3" />
        <path d="M 200 185 Q 210 170 215 160" fill="none" stroke={accent} strokeWidth="3" />

        {/* Áo tứ thân - Vạt sau */}
        <path d="M 140 300 L 110 520 L 135 530 L 155 315 Z" fill={primary} opacity="0.8" stroke="var(--than)" strokeWidth="3" strokeLinejoin="round" />
        <path d="M 260 300 L 290 520 L 265 530 L 245 315 Z" fill={primary} opacity="0.8" stroke="var(--than)" strokeWidth="3" strokeLinejoin="round" />

        {/* Áo tứ thân - 2 Vạt trước phẳng, ôm gọn vào thân hơn */}
        {/* Vạt phải người mặc (trái màn hình) */}
        <path d="M 135 180 C 150 180, 160 190, 170 220 C 180 270, 185 300, 180 320 L 135 315 Z" fill={primary} stroke="var(--than)" strokeWidth="4" strokeLinejoin="round" />
        {/* Vạt trái người mặc (phải màn hình) */}
        <path d="M 265 180 C 250 180, 240 190, 230 220 C 220 270, 215 300, 220 320 L 265 315 Z" fill={primary} stroke="var(--than)" strokeWidth="4" strokeLinejoin="round" />

        {/* Thắt lưng lụa xanh chàm quấn ngang eo */}
        <path d="M 140 310 C 180 320, 220 320, 260 310 L 260 320 C 220 330, 180 330, 140 320 Z" fill="#2B4C7E" stroke="var(--than)" strokeWidth="2.5" />
        {/* Nút buộc giữa */}
        <circle cx="200" cy="320" r="5" fill="#2B4C7E" stroke="var(--than)" strokeWidth="2.5" />

        {/* Nút thắt to phía trước bụng (vạt áo) */}
        <path d="M 185 315 C 180 305, 220 305, 215 315 C 220 325, 180 325, 185 315 Z" fill={primary} stroke="var(--than)" strokeWidth="3" strokeLinejoin="round" />

        {/* Hai đầu tà thắt lưng xanh chàm rủ xuống dài tới đầu gối (đầu gối ~ Y=480) */}
        <path d="M 195 325 C 190 380, 185 450, 185 480" fill="none" stroke="var(--than)" strokeWidth="8" strokeLinecap="round" />
        <path d="M 195 325 C 190 380, 185 450, 185 480" fill="none" stroke="#2B4C7E" strokeWidth="5" strokeLinecap="round" />
        <path d="M 205 325 C 210 380, 215 450, 215 480" fill="none" stroke="var(--than)" strokeWidth="8" strokeLinecap="round" />
        <path d="M 205 325 C 210 380, 215 450, 215 480" fill="none" stroke="#2B4C7E" strokeWidth="5" strokeLinecap="round" />

        {/* Hai vạt áo tứ thân buộc rủ xuống */}
        <path d="M 190 325 L 165 490 L 180 500 L 200 325 Z" fill={primary} stroke="var(--than)" strokeWidth="3" strokeLinejoin="round" />
        <path d="M 210 325 L 235 490 L 220 500 L 200 325 Z" fill={primary} stroke="var(--than)" strokeWidth="3" strokeLinejoin="round" />

        {/* Tay áo */}
        {styleMode === 'modern' ? (
            <>
                <path d="M 135 180 C 110 180, 100 210, 105 240 L 125 245 C 130 210, 130 220, 135 220 Z" fill={primary} stroke="var(--than)" strokeWidth="4" strokeLinejoin="round" />
                <path d="M 265 180 C 290 180, 300 210, 295 240 L 275 245 C 270 210, 270 220, 265 220 Z" fill={primary} stroke="var(--than)" strokeWidth="4" strokeLinejoin="round" />
            </>
        ) : (
            <>
                <path d="M 135 180 C 110 180, 95 240, 95 375 L 125 380 C 125 280, 130 220, 135 220 Z" fill={primary} stroke="var(--than)" strokeWidth="4" strokeLinejoin="round" />
                <path d="M 265 180 C 290 180, 305 240, 305 375 L 275 380 C 275 280, 270 220, 265 220 Z" fill={primary} stroke="var(--than)" strokeWidth="4" strokeLinejoin="round" />
            </>
        )}
    </g>
);

const AoNguThan = ({ primary, secondary, layers, styleMode }: { primary: string, secondary: string, layers: DollLayers, styleMode?: string }) => (
    <g id="garment-nguthan">
        {/* Quần ống rộng lụa */}
        {(!layers.bottom || layers.bottom === 'quan-trang') && (
            <g id="garment-pants-white">
                <path d="M 125 320 L 95 620 C 145 630, 190 625, 200 620 L 195 320 Z" fill="#FBF5E9" stroke="var(--than)" strokeWidth="4" strokeLinejoin="round" />
                <path d="M 275 320 L 305 620 C 255 630, 210 625, 200 620 L 205 320 Z" fill="#FBF5E9" stroke="var(--than)" strokeWidth="4" strokeLinejoin="round" />
            </g>
        )}

        {/* Tà áo sau */}
        <path d="M 115 320 L 95 560 C 145 570, 255 570, 305 560 L 285 320 Z" fill={primary} stroke="var(--than)" strokeWidth="3" strokeLinejoin="round" opacity="0.95" />

        {/* Thân áo trước (Ngũ thân có vạt đè lên nhau, vạt phải nằm ngoài) */}
        <path d="M 105 220 C 110 300, 110 380, 110 540 C 140 560, 260 560, 290 540 C 290 380, 290 300, 295 220 C 270 170, 230 160, 225 160 C 200 165, 175 165, 175 160 C 170 160, 130 170, 105 220 Z" fill={primary} stroke="var(--than)" strokeWidth="4" strokeLinejoin="round" />
        
        {/* Đường tà áo bên trái đè sang phải */}
        <path d="M 185 185 C 200 200, 240 220, 240 320 C 240 400, 245 450, 250 550" fill="none" stroke="var(--than)" strokeWidth="3" />
        
        {/* Nút cài ngũ thân */}
        <circle cx="215" cy="205" r="3" fill={secondary} />
        <circle cx="228" cy="230" r="3" fill={secondary} />
        <circle cx="236" cy="255" r="3" fill={secondary} />
        <circle cx="240" cy="280" r="3" fill={secondary} />
        <circle cx="242" cy="305" r="3" fill={secondary} />

        {/* Cổ đứng (stand collar) */}
        <path d="M 175 160 L 170 140 C 200 145, 230 145, 230 140 L 225 160 Z" fill={primary} stroke="var(--than)" strokeWidth="3" strokeLinejoin="round" />
        {/* Lót cổ trắng */}
        <path d="M 172 140 C 200 145, 230 145, 228 140 L 227 135 C 200 140, 175 140, 173 135 Z" fill="#FFF" stroke="var(--than)" strokeWidth="2" strokeLinejoin="round" />

        {/* Tay áo rộng */}
        {styleMode === 'modern' ? (
            <>
                <path d="M 105 220 C 80 230, 80 250, 90 280 L 120 285 C 115 250, 110 240, 105 220 Z" fill={primary} stroke="var(--than)" strokeWidth="4" strokeLinejoin="round" />
                <path d="M 295 220 C 320 230, 320 250, 310 280 L 280 285 C 285 250, 290 240, 295 220 Z" fill={primary} stroke="var(--than)" strokeWidth="4" strokeLinejoin="round" />
            </>
        ) : (
            <>
                <path d="M 130 170 C 90 180, 75 300, 75 370 L 115 380 C 115 300, 110 240, 105 220 Z" fill={primary} stroke="var(--than)" strokeWidth="4" strokeLinejoin="round" />
                <path d="M 270 170 C 310 180, 325 300, 325 370 L 285 380 C 285 300, 290 240, 295 220 Z" fill={primary} stroke="var(--than)" strokeWidth="4" strokeLinejoin="round" />
            </>
        )}
    </g>
);

const AoBaBa = ({ primary, secondary, layers, styleMode }: { primary: string, secondary: string, layers: DollLayers, styleMode?: string }) => (
    <g id="garment-baba">
        {/* Quần lĩnh đen / lụa đen rũ */}
        {(!layers.bottom || layers.bottom === 'quan-den' || layers.bottom === 'quan-trang') && (
            <g id="garment-pants-black">
                <path d="M 130 320 L 105 615 C 150 625, 185 625, 195 615 L 195 320 Z" fill="#1A1410" stroke="var(--than)" strokeWidth="4" strokeLinejoin="round" />
                <path d="M 270 320 L 295 615 C 250 625, 215 625, 205 615 L 205 320 Z" fill="#1A1410" stroke="var(--than)" strokeWidth="4" strokeLinejoin="round" />
            </g>
        )}

        {/* Áo bà ba (ngắn ngang hông, xẻ tà hai bên) */}
        <path d="M 125 210 C 130 250, 125 330, 115 380 C 145 390, 185 390, 195 380 L 195 210 Z" fill={primary} stroke="var(--than)" strokeWidth="4" strokeLinejoin="round" />
        <path d="M 275 210 C 270 250, 275 330, 285 380 C 255 390, 215 390, 205 380 L 205 210 Z" fill={primary} stroke="var(--than)" strokeWidth="4" strokeLinejoin="round" />

        {/* Nếp nhăn áo */}
        <path d="M 145 310 C 140 340, 145 360, 135 380" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeLinecap="round" />
        <path d="M 255 310 C 260 340, 255 360, 265 380" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeLinecap="round" />

        {/* Cổ tròn xẻ giữa */}
        <path d="M 175 160 C 185 180, 215 180, 225 160" fill="none" stroke="var(--than)" strokeWidth="3" />
        <path d="M 200 175 L 200 380" fill="none" stroke="var(--than)" strokeWidth="3" />

        {/* Khuy áo dọc giữa ngực */}
        <circle cx="200" cy="200" r="2.5" fill={secondary} stroke="var(--than)" strokeWidth="1" />
        <circle cx="200" cy="235" r="2.5" fill={secondary} stroke="var(--than)" strokeWidth="1" />
        <circle cx="200" cy="270" r="2.5" fill={secondary} stroke="var(--than)" strokeWidth="1" />
        <circle cx="200" cy="305" r="2.5" fill={secondary} stroke="var(--than)" strokeWidth="1" />
        <circle cx="200" cy="340" r="2.5" fill={secondary} stroke="var(--than)" strokeWidth="1" />

        {/* Túi áo hai bên */}
        <path d="M 130 330 L 155 330 L 150 365 L 125 365 Z" fill={primary} stroke="var(--than)" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M 270 330 L 245 330 L 250 365 L 275 365 Z" fill={primary} stroke="var(--than)" strokeWidth="2.5" strokeLinejoin="round" />

        {/* Tay áo dài */}
        {styleMode === 'modern' ? (
            <>
                <path d="M 125 210 C 100 230, 95 250, 105 270 L 130 270 C 125 250, 120 230, 130 220 Z" fill={primary} stroke="var(--than)" strokeWidth="4" strokeLinejoin="round" />
                <path d="M 275 210 C 300 230, 305 250, 295 270 L 270 270 C 275 250, 280 230, 270 220 Z" fill={primary} stroke="var(--than)" strokeWidth="4" strokeLinejoin="round" />
            </>
        ) : (
            <>
                <path d="M 130 170 C 95 180, 85 280, 85 365 L 115 370 C 115 300, 120 250, 130 220 Z" fill={primary} stroke="var(--than)" strokeWidth="4" strokeLinejoin="round" />
                <path d="M 270 170 C 305 180, 315 280, 315 365 L 285 370 C 285 300, 280 250, 270 220 Z" fill={primary} stroke="var(--than)" strokeWidth="4" strokeLinejoin="round" />
            </>
        )}
    </g>
);

const AoThe = ({ primary, secondary, layers, styleMode }: { primary: string, secondary: string, layers: DollLayers, styleMode?: string }) => (
    <g id="garment-aothe">
        {(!layers.bottom || layers.bottom === 'quan-trang') && (
            <g id="garment-pants-white">
                <path d="M 125 320 L 100 615 C 150 625, 185 625, 195 615 L 195 320 Z" fill="#FBF5E9" stroke="var(--than)" strokeWidth="4" strokeLinejoin="round" />
                <path d="M 275 320 L 300 615 C 250 625, 215 625, 205 615 L 205 320 Z" fill="#FBF5E9" stroke="var(--than)" strokeWidth="4" strokeLinejoin="round" />
                <path d="M 135 340 L 125 580" stroke="rgba(0,0,0,0.1)" strokeWidth="3" />
                <path d="M 165 340 L 155 580" stroke="rgba(0,0,0,0.1)" strokeWidth="3" />
                <path d="M 265 340 L 275 580" stroke="rgba(0,0,0,0.1)" strokeWidth="3" />
                <path d="M 235 340 L 245 580" stroke="rgba(0,0,0,0.1)" strokeWidth="3" />
            </g>
        )}

        <path d="M 115 320 L 95 540 C 130 550, 170 550, 195 540 L 200 320 Z" fill={primary} opacity="0.9" stroke="var(--than)" strokeWidth="3" strokeLinejoin="round" />
        <path d="M 285 320 L 305 540 C 270 550, 230 550, 205 540 L 200 320 Z" fill={primary} opacity="0.9" stroke="var(--than)" strokeWidth="3" strokeLinejoin="round" />

        <path d="M 105 220 C 110 300, 110 380, 110 520 C 130 540, 270 540, 290 520 C 290 380, 290 300, 295 220 C 270 170, 230 160, 225 160 C 200 165, 175 165, 175 160 C 170 160, 130 170, 105 220 Z" fill={primary} stroke="var(--than)" strokeWidth="4" strokeLinejoin="round" />

        <path d="M 175 160 L 175 145 C 200 150, 225 150, 225 145 L 225 160 Z" fill={primary} stroke="var(--than)" strokeWidth="3" strokeLinejoin="round" />
        <path d="M 175 145 C 200 150, 225 150, 225 145" fill="none" stroke="var(--than)" strokeWidth="2.5" />

        <path d="M 225 160 C 225 170, 150 180, 105 220" fill="none" stroke="var(--than)" strokeWidth="2.5" />
        <circle cx="210" cy="170" r="2.5" fill={secondary} />
        <circle cx="178" cy="182" r="2.5" fill={secondary} />
        <circle cx="145" cy="196" r="2.5" fill={secondary} />
        <circle cx="115" cy="213" r="2.5" fill={secondary} />

        <path d="M 140 320 C 135 380, 135 460, 140 520" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
        <path d="M 170 320 C 165 380, 165 460, 170 520" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
        <path d="M 260 320 C 265 380, 265 460, 260 520" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />

        <path d="M 230 170 C 250 180, 270 190, 280 200" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2.5" strokeLinecap="round" />

        {styleMode === 'modern' ? (
            <>
                <path d="M 105 220 C 80 230, 80 250, 90 280 L 120 285 C 115 250, 110 240, 105 220 Z" fill={primary} stroke="var(--than)" strokeWidth="4" strokeLinejoin="round" />
                <path d="M 295 220 C 320 230, 320 250, 310 280 L 280 285 C 285 250, 290 240, 295 220 Z" fill={primary} stroke="var(--than)" strokeWidth="4" strokeLinejoin="round" />
            </>
        ) : (
            <>
                <path d="M 130 170 C 90 180, 80 300, 80 370 L 115 380 C 115 300, 110 240, 105 220 Z" fill={primary} stroke="var(--than)" strokeWidth="4" strokeLinejoin="round" />
                <path d="M 270 170 C 310 180, 320 300, 320 370 L 285 380 C 285 300, 290 240, 295 220 Z" fill={primary} stroke="var(--than)" strokeWidth="4" strokeLinejoin="round" />
            </>
        )}

        <path d="M 125 180 Q 115 200, 110 220" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round" />
        <path d="M 275 180 Q 285 200, 290 220" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round" />
    </g>
);

const KhanXep = ({ color }: { color: string }) => (
    <g id="headwear-khanxep">
        <path d="M 123 45 C 118 -15, 160 -35, 200 -35 C 240 -35, 282 -15, 277 45 C 272 25, 240 20, 200 20 C 160 20, 128 25, 123 45 Z" fill={color} stroke="var(--than)" strokeWidth="3" strokeLinejoin="round" />
        <path d="M 124 30 C 160 5, 240 5, 276 30" fill="none" stroke="var(--than)" strokeWidth="2.5" />
        <path d="M 126 15 C 160 -10, 240 -10, 274 15" fill="none" stroke="var(--than)" strokeWidth="2.5" />
        <path d="M 190 20 L 210 -15" fill="none" stroke="var(--than)" strokeWidth="2.5" />
        <path d="M 200 18 L 220 -15" fill="none" stroke="var(--than)" strokeWidth="2.5" />
        <path d="M 160 -10 C 180 -20, 220 -20, 240 -10" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" />
    </g>
);

const GuocMoc = ({ color }: { color: string }) => (
    <g id="garment-guoc">
        <ellipse cx="145" cy="628" rx="18" ry="4" fill="rgba(0,0,0,0.2)" />
        <ellipse cx="255" cy="628" rx="18" ry="4" fill="rgba(0,0,0,0.2)" />
        <path d="M 130 618 L 160 618 L 160 625 L 150 625 L 150 620 L 140 620 L 140 625 L 130 625 Z" fill="#D4A373" stroke="var(--than)" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M 240 618 L 270 618 L 270 625 L 260 625 L 260 620 L 250 620 L 250 625 L 240 625 Z" fill="#D4A373" stroke="var(--than)" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M 140 618 C 145 610, 155 610, 160 618" fill="none" stroke="#1A1410" strokeWidth="3" strokeLinecap="round" />
        <path d="M 250 618 C 255 610, 265 610, 270 618" fill="none" stroke="#1A1410" strokeWidth="3" strokeLinecap="round" />
    </g>
);

const GiayVai = ({ color }: { color: string }) => (
    <g id="garment-giayvai">
        <g transform="rotate(5, 145, 620)">
            <ellipse cx="145" cy="630" rx="20" ry="4" fill="rgba(0,0,0,0.2)" />
            <path d="M 130 615 L 165 615 C 165 625, 150 628, 125 628 C 120 622, 120 615, 130 615 Z" fill={color} stroke="var(--than)" strokeWidth="3" strokeLinejoin="round" />
            <path d="M 123 628 C 135 630, 155 630, 167 628 L 167 632 C 155 634, 135 634, 123 632 Z" fill="#FFF" stroke="var(--than)" strokeWidth="2" strokeLinejoin="round" />
        </g>
        <g transform="rotate(-5, 255, 620)">
            <ellipse cx="255" cy="630" rx="20" ry="4" fill="rgba(0,0,0,0.2)" />
            <path d="M 235 615 L 270 615 C 280 615, 280 622, 275 628 C 250 628, 235 625, 235 615 Z" fill={color} stroke="var(--than)" strokeWidth="3" strokeLinejoin="round" />
            <path d="M 233 628 C 245 630, 265 630, 277 628 L 277 632 C 265 634, 245 634, 233 632 Z" fill="#FFF" stroke="var(--than)" strokeWidth="2" strokeLinejoin="round" />
        </g>
    </g>
);

// Hiện đại (Remix)
const Jeans = ({ color }: { color: string }) => (
    <g id="garment-jeans">
        <path d="M 140 310 L 105 625 L 190 625 L 195 350 Z" fill={color} stroke="var(--than)" strokeWidth="4" strokeLinejoin="round" />
        <path d="M 260 310 L 295 625 L 210 625 L 205 350 Z" fill={color} stroke="var(--than)" strokeWidth="4" strokeLinejoin="round" />
        <path d="M 150 550 L 170 550" stroke="var(--than)" strokeWidth="2" strokeDasharray="4 4" />
    </g>
);

const Sneaker = ({ color }: { color: string }) => (
    <g id="garment-sneaker">
        <g transform="rotate(8, 145, 620)">
            <ellipse cx="145" cy="632" rx="22" ry="5" fill="rgba(0,0,0,0.2)" />
            <path d="M 130 612 L 165 612 C 165 625, 150 628, 125 628 C 120 620, 120 612, 130 612 Z" fill="#FBF5E9" stroke="var(--than)" strokeWidth="3" strokeLinejoin="round" />
            <path d="M 135 612 C 135 604, 150 604, 150 612" fill="#FBF5E9" stroke="var(--than)" strokeWidth="2.5" />
            <path d="M 123 628 C 135 631, 155 631, 167 628 L 167 635 C 155 638, 135 638, 123 635 Z" fill="#FFF" stroke="var(--than)" strokeWidth="3" strokeLinejoin="round" />
            <path d="M 140 620 L 155 620" stroke={color} strokeWidth="3" strokeLinecap="round" />
            <path d="M 140 615 L 150 615 M 138 617 L 152 617" stroke="var(--than)" strokeWidth="1.5" />
        </g>
        <g transform="rotate(-8, 255, 620)">
            <ellipse cx="255" cy="632" rx="22" ry="5" fill="rgba(0,0,0,0.2)" />
            <path d="M 235 612 L 270 612 C 280 612, 280 620, 275 628 C 250 628, 235 625, 235 612 Z" fill="#FBF5E9" stroke="var(--than)" strokeWidth="3" strokeLinejoin="round" />
            <path d="M 250 612 C 250 604, 265 604, 265 612" fill="#FBF5E9" stroke="var(--than)" strokeWidth="2.5" />
            <path d="M 233 628 C 245 631, 265 631, 277 628 L 277 635 C 265 638, 245 638, 233 635 Z" fill="#FFF" stroke="var(--than)" strokeWidth="3" strokeLinejoin="round" />
            <path d="M 245 620 L 260 620" stroke={color} strokeWidth="3" strokeLinecap="round" />
            <path d="M 248 615 L 258 615 M 246 617 L 260 617" stroke="var(--than)" strokeWidth="1.5" />
        </g>
    </g>
);

const Blazer = ({ color }: { color: string }) => (
    <g id="garment-blazer">
        {/* Khoác ngoài */}
        <path d="M 120 180 L 125 450 L 165 450 L 175 190 Z" fill={color} stroke="var(--than)" strokeWidth="4" strokeLinejoin="round" />
        <path d="M 280 180 L 275 450 L 235 450 L 225 190 Z" fill={color} stroke="var(--than)" strokeWidth="4" strokeLinejoin="round" />
        {/* Cổ lật */}
        <path d="M 125 180 L 165 250 L 165 190 Z" fill={color} stroke="var(--than)" strokeWidth="2" strokeLinejoin="round" />
        <path d="M 275 180 L 235 250 L 235 190 Z" fill={color} stroke="var(--than)" strokeWidth="2" strokeLinejoin="round" />
        {/* Tay áo dài */}
        <path d="M 120 180 L 95 370 L 120 375 L 135 220 Z" fill={color} stroke="var(--than)" strokeWidth="4" strokeLinejoin="round" />
        <path d="M 280 180 L 305 370 L 280 375 L 265 220 Z" fill={color} stroke="var(--than)" strokeWidth="4" strokeLinejoin="round" />
    </g>
);

export const Character = ({ gender = 'female', skinTone = "#FFD1B3", hair = "bun", bangs = "mai-thua", palette = ["#A8231A", "#1B2A5C", "#E3A72F"], layers, styleMode = 'traditional' }: CharacterProps) => {
    const primary = palette[0] || "#A8231A";
    const secondary = palette[1] || "#1B2A5C";
    const accent = palette[2] || "#E3A72F";

    return (
        <div className="w-full h-full flex justify-center items-center relative">
            <svg
                viewBox="0 0 400 700"
                className="w-full h-full max-h-[85vh] overflow-visible"
                style={{
                    filter: 'drop-shadow(4px 4px 0px var(--than))'
                }}
            >
                {/* White Outline behind everything */}
                <g stroke="white" strokeWidth="12" strokeLinejoin="round" strokeLinecap="round">
                    {gender === 'female' ? <HairBack type={hair} color="white" /> : <HairBackMale type={hair} color="white" />}
                    {gender === 'female' ? <BodyBase skinTone="white" /> : <BodyBaseMale skinTone="white" />}
                    {gender === 'female' ? <HairFront type={hair} color="white" bangs={bangs} /> : <HairFrontMale type={hair} color="white" headwear={layers.headwear} />}
                    {layers.bottom === 'jeans' && <Jeans color="white" />}
                    {layers.top === 'ao-tu-than' && gender === 'female' && <AoTuThan primary="white" secondary="white" accent="white" styleMode={styleMode} />}
                    {layers.top === 'ao-tu-than' && gender === 'male' && <AoThe primary="white" secondary="white" layers={layers} styleMode={styleMode} />}
                    {layers.top === 'ao-ngu-than' && <AoNguThan primary="white" secondary="white" layers={layers} styleMode={styleMode} />}
                    {layers.top === 'ao-ba-ba' && <AoBaBa primary="white" secondary="white" layers={layers} styleMode={styleMode} />}
                    {layers.outer === 'blazer' && <Blazer color="white" />}
                    {layers.headwear === 'khan-mo-qua' && <KhanMoQua color="white" />}
                    {layers.headwear === 'bang-do-lua' && <BangDoLua color="white" />}
                    {layers.headwear === 'khan-xep' && <KhanXep color="white" />}
                    {layers.headwear === 'khan-dong' && <KhanXep color="white" />}
                    {layers.shoes === 'giay-vai' && <GiayVai color="white" />}
                </g>

                {/* Main Render */}
                {gender === 'female' ? <HairBack type={hair} color="#1A1410" /> : <HairBackMale type={hair} color="#1A1410" />}
                {gender === 'female' ? <BodyBase skinTone={skinTone} /> : <BodyBaseMale skinTone={skinTone} />}
                {gender === 'female' ? <HairFront type={hair} color="#1A1410" bangs={bangs} /> : <HairFrontMale type={hair} color="#1A1410" headwear={layers.headwear} />}

                <AnimatePresence>
                    {/* Headwear */}
                    {layers.headwear === 'khan-mo-qua' && (
                        <motion.g initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} key="headwear-moqua">
                            <KhanMoQua color={secondary} />
                        </motion.g>
                    )}
                    {layers.headwear === 'bang-do-lua' && (
                        <motion.g initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} key="headwear-bangdo">
                            <BangDoLua color={secondary} />
                        </motion.g>
                    )}
                    {(layers.headwear === 'khan-xep' || layers.headwear === 'khan-dong') && (
                        <motion.g initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} key="headwear-khanxep">
                            <KhanXep color={secondary} />
                        </motion.g>
                    )}

                    {/* Bottoms */}
                    {layers.bottom === 'jeans' && (
                        <motion.g initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} key="bottom-jeans">
                            <Jeans color="#1B2A5C" />
                        </motion.g>
                    )}

                    {/* Tops */}
                    {layers.top === 'ao-tu-than' && gender === 'female' && (
                        <motion.g initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} key="top-tuthan">
                            <AoTuThan primary={primary} secondary={secondary} accent={accent} styleMode={styleMode} />
                        </motion.g>
                    )}
                    {layers.top === 'ao-tu-than' && gender === 'male' && (
                        <motion.g initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} key="top-aothe">
                            <AoThe primary={primary} secondary={secondary} layers={layers} styleMode={styleMode} />
                        </motion.g>
                    )}
                    {layers.top === 'ao-ngu-than' && (
                        <motion.g initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} key="top-nguthan">
                            <AoNguThan primary={primary} secondary={secondary} layers={layers} styleMode={styleMode} />
                        </motion.g>
                    )}
                    {layers.top === 'ao-ba-ba' && (
                        <motion.g initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} key="top-baba">
                            <AoBaBa primary={primary} secondary={secondary} layers={layers} styleMode={styleMode} />
                        </motion.g>
                    )}

                    {/* Outer */}
                    {layers.outer === 'blazer' && (
                        <motion.g initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} key="outer-blazer">
                            <Blazer color={secondary} />
                        </motion.g>
                    )}

                    {/* Shoes */}
                    {(!layers.shoes || layers.shoes === 'guoc') && (
                        <motion.g initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 10, opacity: 0 }} key="shoes-guoc">
                            <GuocMoc color="#D4A373" />
                        </motion.g>
                    )}
                    {layers.shoes === 'giay-vai' && (
                        <motion.g initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 10, opacity: 0 }} key="shoes-giayvai">
                            <GiayVai color={primary} />
                        </motion.g>
                    )}
                    {layers.shoes === 'sneaker' && (
                        <motion.g initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 10, opacity: 0 }} key="shoes-sneaker">
                            <Sneaker color={secondary} />
                        </motion.g>
                    )}
                </AnimatePresence>
            </svg>
        </div>
    );
};
