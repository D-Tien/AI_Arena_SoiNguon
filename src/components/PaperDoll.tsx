import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface DollLayers {
    skin?: string;
    core?: string;
    overlay?: string;
    accessory?: string;
    background?: string;
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
                            ? React.cloneElement(fallback as React.ReactElement<React.SVGProps<SVGElement>>, { fill: 'white' })
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

const BodyBase = (_props: { skinTone: string }) => (
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

const BodyBaseMale = (_props: { skinTone: string }) => (
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







// Truyền thống - TỨ THÂN
const AoTuThan = ({ primary, accent, styleMode }: { primary: string, secondary: string, accent: string, styleMode?: string }) => (
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




// Hiện đại (Remix)




export const Character = ({ gender = 'female', skinTone = "#FFD1B3", palette = ["#A8231A", "#1B2A5C", "#E3A72F"], layers, styleMode = 'traditional', remixLevel, hideBase = false }: CharacterProps) => {
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
                        const isNewConvention = ['ao-tu-than', 'ao-the', 'ao-ngu-than', 'ao-ba-ba'].includes(layers.top || '');
                        
                        if (isNewConvention) {
                            let outfitType = layers.top === 'ao-tu-than' || layers.top === 'ao-the' ? 'tu_than' : (layers.top === 'ao-ngu-than' ? 'ngu_than' : 'ba_ba');
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
                            if (outfitType === 'tu_than' && styleMode === 'modern' && gender === 'female') {
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
                            else if (outfitType === 'tu_than' && gender === 'male') fallbackComponent = <AoThe primary={primary} secondary={secondary} layers={layers} styleMode={styleMode} />;
                            else if (layers.top === 'ao-ngu-than') fallbackComponent = <AoNguThan primary={primary} secondary={secondary} layers={layers} styleMode={styleMode} />;
                            else if (layers.top === 'ao-ba-ba') fallbackComponent = <AoBaBa primary={primary} secondary={secondary} layers={layers} styleMode={styleMode} />;

                            if (outfitType === 'tu_than' && gender === 'female' && styleMode === 'modern') {
                                const rLevel = remixLevel || 50;
                                const rPrefix = colorFolder === 'default' ? `ao_${outfitType}` : `ao_${outfitType}_${colorFolder}`;
                                const lowHref = `/assets/character/top/remix/female/${rPrefix}_low.png?v=${Date.now()}`;
                                const highHref = `/assets/character/top/remix/female/${rPrefix}_high.png?v=${Date.now()}`;
                                
                                // Map 26-100 to 0-1 opacity for high image
                                const highOpacity = Math.max(0, Math.min(1, (rLevel - 26) / (100 - 26)));

                                return (
                                    <motion.g initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} key={`png-top-new-remix-${rPrefix}`}>
                                        <SafeSvgImage 
                                            href={lowHref}
                                            x="-130" y="-205" width="660" height="825" preserveAspectRatio="xMidYMax meet" 
                                            fallback={fallbackComponent}
                                            fallbackBase={<BodyBase skinTone={skinTone} />}
                                        />
                                        {highOpacity > 0 && (
                                            <SafeSvgImage 
                                                href={highHref}
                                                x="-130" y="-205" width="660" height="825" preserveAspectRatio="xMidYMax meet" 
                                                style={{ opacity: highOpacity, transition: 'opacity 0.1s ease-out' }}
                                                fallback={fallbackComponent}
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
