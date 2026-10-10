import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface DollLayers {
    bottom?: string;
    top?: string;
    topColor?: string;
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
    remixLevel?: number;
    hideBase?: boolean;
}

const SafeSvgImage = ({ href, fallback, fallbackBase, ...props }: any) => {
    const [error, setError] = React.useState(false);
    const maskId = React.useId().replace(/:/g, '');
    React.useEffect(() => { setError(false); }, [href]);

    if (error && fallback) {
        return (
            <g>
                <defs>
                    <mask id={`mask-${maskId}`}>
                        {React.isValidElement(fallback) 
                            ? React.cloneElement(fallback as React.ReactElement, { fill: 'white' }) 
                            : <rect width="100%" height="100%" fill="white" />}
                    </mask>
                </defs>
                {fallbackBase}
                {fallback}
                {/* Overlay hoạ tiết chấm mờ nhẹ lên fallback */}
                <rect x="-200" y="-200" width="800" height="1000" fill="url(#fallback-pattern)" mask={`url(#mask-${maskId})`} opacity="0.4" pointerEvents="none" style={{ mixBlendMode: 'multiply' }} />
            </g>
        );
    }
    return <image href={href} onError={() => setError(true)} {...props} />;
};


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
        <image 
            href="/assets/character/base/female.png" 
            x="-130" 
            y="-205" 
            width="660" 
            height="825" 
            preserveAspectRatio="xMidYMax meet" 
        />
    </g>
);

const BodyBaseMale = ({ skinTone }: { skinTone: string }) => (
    <g id="body-base-male">
        {/* Dùng model ảnh được cung cấp thay thế cho SVG vẽ tay. Bạn có thể tự chỉnh x, y, width, height để ảnh vừa vặn nhất */}
        <image 
            href="/assets/character/base/male.png" 
            x="-130" 
            y="-205" 
            width="660" 
            height="825" 
            preserveAspectRatio="xMidYMax meet" 
        />
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

const Underwear = ({ gender }: { gender: 'female' | 'male' }) => (
    <g id="garment-underwear">
        {gender === 'female' ? (
            <>
                {/* Yếm trắng */}
                <path d="M 200 185 L 235 220 L 200 310 L 165 220 Z" fill="#FFF" stroke="var(--than)" strokeWidth="3" strokeLinejoin="round" />
                <path d="M 200 185 Q 190 170 185 160" fill="none" stroke="#FFF" strokeWidth="3" />
                <path d="M 200 185 Q 210 170 215 160" fill="none" stroke="#FFF" strokeWidth="3" />
                {/* Quần tơ lụa mỏng */}
                <path d="M 140 310 L 125 450 L 195 450 L 195 320 L 205 320 L 205 450 L 275 450 L 260 310 Z" fill="#FBF5E9" stroke="var(--than)" strokeWidth="3" strokeLinejoin="round" />
            </>
        ) : (
            <>
                {/* Áo cộc nam trắng */}
                <path d="M 125 210 C 130 250, 125 330, 115 380 C 145 390, 185 390, 195 380 L 195 210 Z" fill="#FFF" stroke="var(--than)" strokeWidth="3" strokeLinejoin="round" />
                <path d="M 275 210 C 270 250, 275 330, 285 380 C 255 390, 215 390, 205 380 L 205 210 Z" fill="#FFF" stroke="var(--than)" strokeWidth="3" strokeLinejoin="round" />
                <path d="M 175 160 C 185 180, 215 180, 225 160" fill="none" stroke="var(--than)" strokeWidth="3" />
                {/* Quần đùi trắng */}
                <path d="M 135 340 L 120 460 L 195 460 L 195 350 L 205 350 L 205 460 L 280 460 L 265 340 Z" fill="#FBF5E9" stroke="var(--than)" strokeWidth="3" strokeLinejoin="round" />
            </>
        )}
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

export const Character = ({ gender = 'female', skinTone = "#FFD1B3", hair = "bun", bangs = "mai-thua", palette = ["#A8231A", "#1B2A5C", "#E3A72F"], layers, styleMode = 'traditional', remixLevel, hideBase = false }: CharacterProps) => {
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
                <defs>
                    <pattern id="fallback-pattern" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                        <circle cx="2" cy="2" r="1.5" fill="var(--than)" />
                    </pattern>
                </defs>

                {/* Main Render */}
                {!hideBase && (layers.top === 'underwear' || !layers.top) && (
                    gender === 'female' ? <BodyBase skinTone={skinTone} /> : (
                        // Ẩn BodyBaseMale nếu đang dùng ảnh combo (quần short, jeans, cargo...), giữ lại ở Step 1, 2 (khi bottom === 'none')
                        (!layers.bottom || layers.bottom === 'none' || layers.bottom === 'quan-lua' || layers.bottom === 'default') && <BodyBaseMale skinTone={skinTone} />
                    )
                )}
                
                {/* Layer Quần Áo (PNG) */}
                <AnimatePresence>
                    {/* Layer Áo (Nằm trên quần) */}
                    {(() => {
                        const isNewConvention = ['ao-tu-than', 'ao-ngu-than', 'ao-ba-ba'].includes(layers.top || '');
                        
                        if (isNewConvention) {
                            let outfitType = layers.top === 'ao-tu-than' ? 'tu_than' : (layers.top === 'ao-ngu-than' ? 'ngu_than' : 'ba_ba');
                            let colorFolder = layers.topColor || 'default';
                            if (outfitType === 'tu_than' && gender === 'female') {
                                if (colorFolder === 'brown') colorFolder = '1';
                                else if (!['default', '1', '2'].includes(colorFolder)) colorFolder = '2';
                            }
                            if (outfitType === 'tu_than' && gender === 'male' && colorFolder === 'default') {
                                colorFolder = 'blue';
                            }

                            let hasNonLa = layers.headwear === 'non-la' || layers.accessories?.includes('non-la');
                            let hasKhanRan = layers.headwear === 'khan-ran' || layers.accessories?.includes('khan-ran');
                            
                            let shoeStr = '';
                            let parts = [];

                            if (outfitType === 'tu_than' && gender === 'female') {
                                if (layers.shoes === 'sneaker') shoeStr = '_s';
                                else if (layers.shoes === 'giay-da') shoeStr = '_gd';
                                else if (layers.shoes === 'guoc') shoeStr = '_gm';

                                if (hasNonLa) {
                                    parts.push('non_la');
                                } else if (layers.headwear && layers.headwear !== 'khong-doi' && layers.headwear !== 'khan-ran') {
                                    parts.push(layers.headwear.replace(/-/g, '_'));
                                }
                                
                                if (hasKhanRan) {
                                    parts.push('khan');
                                }
                            }

                            let fileName = '';
                            if (outfitType === 'tu_than' && gender === 'male') {
                                fileName = 'ao_the_male';
                                if (colorFolder && colorFolder !== 'default') {
                                    fileName += `_${colorFolder}`;
                                } else {
                                    fileName += '_blue';
                                }
                            } else {
                                if (parts.length > 0) {
                                    fileName = parts.join('_') + shoeStr;
                                } else {
                                    fileName = `ao_${outfitType}` + (shoeStr ? shoeStr : `_${gender}`);
                                }

                                if (outfitType === 'tu_than' && colorFolder === '2') {
                                    fileName += '_2';
                                }
                            }

                            let href = '';
                            if (styleMode === 'modern' && gender === 'female' && outfitType === 'tu_than') {
                                const rLevel = remixLevel || 50;
                                const intensity = rLevel > 60 ? 'high' : 'low';
                                const rPrefix = colorFolder === 'default' ? `ao_${outfitType}` : `ao_${outfitType}_${colorFolder}`;
                                href = `/assets/character/top/remix/female/${rPrefix}_${intensity}.png?v=${Date.now()}`;
                            } else {
                                if (outfitType === 'tu_than' && gender === 'female') {
                                    href = `/assets/character/top/${outfitType}/${gender}/${colorFolder}/${fileName}.png?v=${Date.now()}`;
                                } else {
                                    if (colorFolder && colorFolder !== 'default' && parts.length === 0 && !(outfitType === 'tu_than' && gender === 'male')) {
                                        fileName += `_${colorFolder}`;
                                    }
                                    href = `/assets/character/top/${outfitType}/${gender}/${fileName}.png?v=${Date.now()}`;
                                }
                            }

                            let fallbackComponent = null;
                            if (layers.top === 'ao-tu-than' && gender === 'female') fallbackComponent = <AoTuThan primary={primary} secondary={secondary} accent={accent} styleMode={styleMode} />;
                            else if (layers.top === 'ao-tu-than' && gender === 'male') fallbackComponent = <AoThe primary={primary} secondary={secondary} layers={layers} styleMode={styleMode} />;
                            else if (layers.top === 'ao-ngu-than') fallbackComponent = <AoNguThan primary={primary} secondary={secondary} layers={layers} styleMode={styleMode} />;
                            else if (layers.top === 'ao-ba-ba') fallbackComponent = <AoBaBa primary={primary} secondary={secondary} layers={layers} styleMode={styleMode} />;

                            if (styleMode === 'modern' && outfitType === 'tu_than') {
                                const rLevel = remixLevel || 50;
                                const highOpacity = Math.max(0, Math.min(1, (rLevel - 26) / (100 - 26)));
                                
                                let lowHref = '';
                                let highHref = '';
                                let renderKey = '';

                                if (gender === 'female') {
                                    const rPrefix = colorFolder === 'default' ? `ao_${outfitType}` : `ao_${outfitType}_${colorFolder}`;
                                    lowHref = `/assets/character/top/remix/female/${rPrefix}_low.png?v=${Date.now()}`;
                                    highHref = `/assets/character/top/remix/female/${rPrefix}_high.png?v=${Date.now()}`;
                                    renderKey = `png-top-new-remix-${rPrefix}`;
                                } else {
                                    let colorSuffix = '';
                                    if (colorFolder === 'red') colorSuffix = '_1';
                                    else if (colorFolder === 'grey') colorSuffix = '_2';
                                    lowHref = `/assets/character/top/remix/male/the_nam_low${colorSuffix}.png?v=${Date.now()}`;
                                    highHref = `/assets/character/top/remix/male/the_nam_high${colorSuffix}.png?v=${Date.now()}`;
                                    renderKey = `png-top-new-remix-male-${colorSuffix}`;
                                }

                                return (
                                    <motion.g initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} key={renderKey}>
                                        <SafeSvgImage 
                                            href={lowHref}
                                            x="-130" y="-205" width="660" height="825" preserveAspectRatio="xMidYMax meet" 
                                            fallback={null}
                                            fallbackBase={null}
                                        />
                                        {highOpacity > 0 && (
                                            <SafeSvgImage 
                                                href={highHref}
                                                x="-130" y="-205" width="660" height="825" preserveAspectRatio="xMidYMax meet" 
                                                style={{ opacity: highOpacity, transition: 'opacity 0.1s ease-out' }}
                                                fallback={null}
                                                fallbackBase={null}
                                            />
                                        )}
                                    </motion.g>
                                );
                            }

                            return (
                                <motion.g initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} key={`png-top-new-${outfitType}-${gender}-${fileName}`}>
                                    <SafeSvgImage 
                                        href={href}
                                        x="-130" y="-205" width="660" height="825" preserveAspectRatio="xMidYMax meet" 
                                        fallback={fallbackComponent}
                                        fallbackBase={gender === 'female' ? <BodyBase skinTone={skinTone} /> : <BodyBaseMale skinTone={skinTone} />}
                                    />
                                </motion.g>
                            );
                        } else if (layers.top === 'ao-the') {
                            return (
                                <motion.g initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} key={`png-top-aothe-male-${layers.topColor || 'default'}-${layers.bottom || 'default'}`}>
                                    <SafeSvgImage 
                                        href={`/assets/character/top/ao_the_male${layers.topColor && layers.topColor !== 'default' ? '_' + layers.topColor : ''}${layers.bottom && layers.bottom !== 'quan-lua' ? '_' + layers.bottom.replace(/-/g, '_') : ''}.png`}
                                        x={layers.bottom && layers.bottom !== 'quan-lua' ? "-170" : "-130"} 
                                        y={layers.bottom && layers.bottom !== 'quan-lua' ? "-245" : "-205"} 
                                        width={layers.bottom && layers.bottom !== 'quan-lua' ? "740" : "660"} 
                                        height={layers.bottom && layers.bottom !== 'quan-lua' ? "925" : "825"} 
                                        preserveAspectRatio="xMidYMax meet" 
                                        fallback={<AoThe primary={primary} secondary={secondary} layers={layers} styleMode={styleMode} />}
                                        fallbackBase={gender === 'female' ? <BodyBase skinTone={skinTone} /> : <BodyBaseMale skinTone={skinTone} />}
                                    />
                                </motion.g>
                            );
                        }
                        return null;
                    })()}

                    {/* Layer Phụ Kiện Cũ (Chỉ áp dụng nếu không phải 3 áo mới) */}
                    {!['ao-tu-than', 'ao-ngu-than', 'ao-ba-ba'].includes(layers.top || '') && layers.headwear === 'non-la' && (
                        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key={`png-acc-nonla-${layers.accessories?.includes('khan-ran') ? 'khan' : 'nokhan'}-${layers.shoes || 'noshoe'}`}>
                            {(() => {
                                let parts = ['non_la'];
                                if (layers.accessories?.includes('khan-ran')) parts.push('khan');
                                
                                if (layers.shoes === 'sneaker') parts.push('s');
                                else if (layers.shoes === 'giay-da') parts.push('gd');
                                else if (layers.shoes === 'guoc') parts.push('gm');
                                
                                const fileName = parts.join('_') + '.png';
                                return (
                                    <SafeSvgImage 
                                        href={`/assets/character/top/Phu_kien/non_la/${fileName}?v=${Date.now()}`}
                                        x="-130" y="-205" width="660" height="825" preserveAspectRatio="xMidYMax meet"
                                    />
                                );
                            })()}
                        </motion.g>
                    )}
                </AnimatePresence>
            </svg>
        </div>
    );
};
