import React from 'react';

export const CharacterV2 = ({ 
    primary, secondary, skin, 
    showSkin, showHair, showUnderwear, showPants, showAoDai, showShoes,
    material, pattern, shoeType
}: any) => {

    const isSilk = material === 'Lụa';
    const isGấm = material === 'Gấm';
    const isĐũi = material === 'Đũi';
    const isCotton = material === 'Cotton';

    const getPattern = () => {
        switch(pattern) {
            case 'Chấm': return <pattern id="pat-ao" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="3" fill="var(--than)" opacity="0.3"/></pattern>;
            case 'Sóng': return <pattern id="pat-ao" width="40" height="20" patternUnits="userSpaceOnUse"><path d="M 0 10 Q 10 0 20 10 T 40 10" fill="none" stroke="var(--than)" strokeWidth="2" opacity="0.2"/></pattern>;
            case 'Sen': return <pattern id="pat-ao" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M30 10 C10 10 10 30 30 50 C50 30 50 10 30 10 Z" fill="var(--than)" opacity="0.15"/></pattern>;
            case 'Trống đồng': return <pattern id="pat-ao" width="80" height="80" patternUnits="userSpaceOnUse"><circle cx="40" cy="40" r="30" fill="none" stroke="var(--than)" strokeWidth="2" opacity="0.15"/><circle cx="40" cy="40" r="20" fill="none" stroke="var(--than)" strokeWidth="1" opacity="0.15"/><polygon points="40,15 45,25 55,25 47,32 50,42 40,35 30,42 33,32 25,25 35,25" fill="var(--than)" opacity="0.15"/></pattern>;
            default: return null;
        }
    };

    return (
        <svg viewBox="0 0 400 1000" className="h-full w-auto drop-shadow-2xl overflow-visible">
            <defs>
                {getPattern()}
            </defs>

            {/* Bóng dưới chân */}
            <ellipse cx="200" cy="980" rx="90" ry="10" fill="#000" opacity="0.15" filter="blur(4px)" />

            {/* Tóc sau & trâm */}
            {showHair && (
                <g id="hair">
                    <circle cx="200" cy="170" r="32" fill="#111" />
                    <circle cx="200" cy="190" r="25" fill="#111" />
                    {/* Trâm gỗ cắm ngang */}
                    <path d="M 130 165 L 270 155" stroke="#8c6239" strokeWidth="4" strokeLinecap="round" />
                    <circle cx="130" cy="165" r="5" fill="#5C3A21" />
                </g>
            )}

            {/* Da & Cơ thể */}
            {showSkin && (
                <g id="skin" fill={skin} stroke="#111" strokeWidth="1.5" strokeLinejoin="round">
                    {/* Cổ */}
                    <path d="M 188 170 L 188 210 L 212 210 L 212 170 Z" />
                    {/* Thân */}
                    <path d="M 185 210 L 215 210 L 250 230 C 230 270 235 320 230 350 C 225 380 250 430 250 480 L 200 500 L 150 480 C 150 430 175 380 170 350 C 165 320 170 270 150 230 Z" />
                    {/* Chân */}
                    <path d="M 150 480 L 130 960 L 195 960 L 200 500 Z" />
                    <path d="M 250 480 L 270 960 L 205 960 L 200 500 Z" />
                    
                    {/* Cánh tay trái */}
                    <path d="M 150 230 C 130 270 110 400 110 480 C 110 520 115 540 120 560 L 145 560 C 140 540 135 520 135 480 C 135 400 145 320 150 270 Z" />
                    {/* Bàn tay trái */}
                    <path d="M 120 560 C 115 590 125 610 130 610 C 135 610 140 590 145 560 Z" />
                    
                    {/* Cánh tay phải */}
                    <path d="M 250 230 C 270 270 290 400 290 480 C 290 520 285 540 280 560 L 255 560 C 260 540 265 520 265 480 C 265 400 255 320 250 270 Z" />
                    {/* Bàn tay phải */}
                    <path d="M 280 560 C 285 590 275 610 270 610 C 265 610 260 590 255 560 Z" />
                </g>
            )}

            {/* Đồ lót */}
            {showUnderwear && !showAoDai && (
                <g id="undertop" fill="#fff" stroke="#111" strokeWidth="1.5">
                    <path d="M 150 280 Q 200 310 250 280 L 245 310 Q 200 330 155 310 Z" />
                    <path d="M 155 450 L 245 450 L 235 490 Q 200 510 165 490 Z" />
                </g>
            )}

            {/* Quần lụa ống rộng */}
            {showPants && (
                <g id="pants" fill={secondary} stroke="#111" strokeWidth="1.5" strokeLinejoin="round">
                    {/* Quần trái */}
                    <path d="M 200 350 L 155 350 L 110 965 C 150 975 180 975 200 965 Z" />
                    {/* Quần phải */}
                    <path d="M 200 350 L 245 350 L 290 965 C 250 975 220 975 200 965 Z" />
                    
                    {/* Nếp gấp ống quần */}
                    <path d="M 175 350 Q 160 650 140 968" fill="none" stroke="#111" opacity="0.3" />
                    <path d="M 190 350 Q 180 650 170 970" fill="none" stroke="#111" opacity="0.3" />
                    <path d="M 225 350 Q 240 650 260 968" fill="none" stroke="#111" opacity="0.3" />
                    <path d="M 210 350 Q 220 650 230 970" fill="none" stroke="#111" opacity="0.3" />
                </g>
            )}

            {/* Tà sau áo dài */}
            {showAoDai && (
                <g id="aodai_back_panel" fill={primary} stroke="#111" strokeWidth="1.5" strokeLinejoin="round">
                    <path d="M 165 350 L 115 930 C 180 950 220 950 285 930 L 235 350 Z" />
                    {pattern !== 'Trơn' && <path d="M 165 350 L 115 930 C 180 950 220 950 285 930 L 235 350 Z" fill="url(#pat-ao)" stroke="none" />}
                </g>
            )}

            {/* Thân trước & Tà trước áo dài */}
            {showAoDai && (
                <g id="aodai_front_panel" stroke="#111" strokeWidth="1.5" strokeLinejoin="round">
                    <g fill={primary}>
                        {/* Thân & tà trước xẻ từ eo, ôm sát ngực eo */}
                        <path d="M 185 210 L 215 210 L 250 230 C 230 270 235 320 230 350 C 225 380 250 430 250 480 L 275 930 C 220 955 180 955 125 930 L 150 480 C 150 430 175 380 170 350 C 165 320 170 270 150 230 Z" />
                        {pattern !== 'Trơn' && <path d="M 185 210 L 215 210 L 250 230 C 230 270 235 320 230 350 C 225 380 250 430 250 480 L 275 930 C 220 955 180 955 125 930 L 150 480 C 150 430 175 380 170 350 C 165 320 170 270 150 230 Z" fill="url(#pat-ao)" stroke="none" />}
                        
                        {/* Tay trái */}
                        <path d="M 150 230 C 130 270 110 400 110 480 C 110 520 115 540 120 560 L 145 560 C 140 540 135 520 135 480 C 135 400 145 320 150 270 Z" />
                        {pattern !== 'Trơn' && <path d="M 150 230 C 130 270 110 400 110 480 C 110 520 115 540 120 560 L 145 560 C 140 540 135 520 135 480 C 135 400 145 320 150 270 Z" fill="url(#pat-ao)" stroke="none" />}
                        
                        {/* Tay phải */}
                        <path d="M 250 230 C 270 270 290 400 290 480 C 290 520 285 540 280 560 L 255 560 C 260 540 265 520 265 480 C 265 400 255 320 250 270 Z" />
                        {pattern !== 'Trơn' && <path d="M 250 230 C 270 270 290 400 290 480 C 290 520 285 540 280 560 L 255 560 C 260 540 265 520 265 480 C 265 400 255 320 250 270 Z" fill="url(#pat-ao)" stroke="none" />}
                        
                        {/* Cổ áo (Stand collar) */}
                        <path d="M 185 210 L 215 210 L 215 190 C 200 195 185 195 185 190 Z" />
                    </g>

                    {/* Viền tay áo */}
                    <path d="M 120 560 L 145 560" stroke="#111" strokeWidth="1.5" fill="none" />
                    <path d="M 280 560 L 255 560" stroke="#111" strokeWidth="1.5" fill="none" />

                    {/* Đường may raglan có viền trắng (Piping) */}
                    <path d="M 185 210 C 170 230 160 250 150 270" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.8" />
                    <path d="M 215 210 C 230 230 240 250 250 270" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.8" />
                    {/* Viền cổ áo */}
                    <path d="M 185 210 L 185 190 Q 200 195 215 190 L 215 210" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.8" />

                    {/* Nếp gấp rủ áo dài */}
                    <path d="M 170 350 Q 180 700 160 938" fill="none" opacity="0.2" />
                    <path d="M 200 350 Q 200 700 200 945" fill="none" opacity="0.2" />
                    <path d="M 230 350 Q 220 700 240 938" fill="none" opacity="0.2" />
                    
                    {/* Nếp lượn phần eo & ngực */}
                    <path d="M 170 270 C 190 320 210 320 200 300" fill="none" opacity="0.15" />
                    <path d="M 230 270 C 210 320 190 320 200 300" fill="none" opacity="0.15" />
                </g>
            )}

            {/* Đầu & Khuôn mặt tĩnh lặng */}
            {showSkin && (
                <g id="face">
                    <path d="M 160 110 C 160 190 240 190 240 110 C 240 70 160 70 160 110 Z" fill={skin} stroke="#111" strokeWidth="1.5" />
                    {/* Chân mày */}
                    <path d="M 172 135 Q 182 130 192 135" fill="none" stroke="#111" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M 208 135 Q 218 130 228 135" fill="none" stroke="#111" strokeWidth="1.5" strokeLinecap="round" />
                    {/* Mắt nhắm thư thái */}
                    <path d="M 172 150 Q 182 155 192 150" fill="none" stroke="#111" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M 208 150 Q 218 155 228 150" fill="none" stroke="#111" strokeWidth="1.5" strokeLinecap="round" />
                    {/* Mũi nhỏ */}
                    <path d="M 200 155 C 195 165 195 170 200 170" fill="none" stroke="#111" strokeWidth="1" strokeLinecap="round" />
                    {/* Môi chúm chím */}
                    <path d="M 193 182 Q 200 185 207 182 Q 200 180 193 182 Z" fill="#E86C6C" stroke="#111" strokeWidth="0.5" />
                    {/* Tai (lấp ló sau tóc) */}
                    <path d="M 160 140 C 150 145 150 165 160 170" fill={skin} stroke="#111" strokeWidth="1.5" />
                    <path d="M 240 140 C 250 145 250 165 240 170" fill={skin} stroke="#111" strokeWidth="1.5" />
                </g>
            )}

            {/* Tóc trước rẽ ngôi thanh lịch */}
            {showHair && (
                <g id="hair_front" fill="#111" stroke="#111" strokeWidth="1.5" strokeLinejoin="round">
                    <path d="M 160 110 C 160 70 200 70 200 70 C 240 70 240 110 240 110 C 240 85 200 85 200 85 C 200 85 160 85 160 110 Z" />
                    <path d="M 160 110 Q 170 140 155 160 C 145 140 155 110 160 110 Z" />
                    <path d="M 240 110 Q 230 140 245 160 C 255 140 245 110 240 110 Z" />
                    {/* Đường ngôi giữa */}
                    <path d="M 200 70 L 200 85" fill="none" stroke="#333" strokeWidth="1" />
                </g>
            )}

            {/* Giày */}
            {showShoes && (
                <g id="shoes">
                    {shoeType === 'Sneaker' ? (
                        <g fill="#fff" stroke="#111" strokeWidth="1.5" strokeLinejoin="round">
                            <path d="M 120 960 L 155 960 C 160 980 160 990 150 990 L 125 990 C 115 990 115 980 120 960 Z" />
                            <path d="M 130 960 C 140 975 150 975 155 960 Z" fill="#eee" />
                            <path d="M 245 960 L 280 960 C 285 980 285 990 275 990 L 250 990 C 240 990 240 980 245 960 Z" />
                            <path d="M 245 960 C 250 975 260 975 270 960 Z" fill="#eee" />
                        </g>
                    ) : shoeType === 'Dép quai' ? (
                        <g stroke="#111" strokeWidth="1.5" strokeLinecap="round">
                            {/* Bàn chân & Dép trái */}
                            <path d="M 130 965 C 120 965 110 975 115 985 C 130 990 150 990 155 985 C 160 975 150 965 130 965 Z" fill={skin} />
                            <path d="M 115 985 C 130 990 150 990 155 985 L 155 990 C 150 995 130 995 115 990 Z" fill="#333" />
                            <path d="M 120 980 Q 135 970 150 980" fill="none" stroke="#222" strokeWidth="3" />
                            
                            {/* Bàn chân & Dép phải */}
                            <path d="M 270 965 C 280 965 290 975 285 985 C 270 990 250 990 245 985 C 240 975 250 965 270 965 Z" fill={skin} />
                            <path d="M 285 985 C 270 990 250 990 245 985 L 245 990 C 250 995 270 995 285 990 Z" fill="#333" />
                            <path d="M 280 980 Q 265 970 250 980" fill="none" stroke="#222" strokeWidth="3" />
                        </g>
                    ) : (
                        <g stroke="#111" strokeWidth="1.5">
                            <path d="M 125 960 L 150 960 L 150 980 L 125 980 Z" fill="#8c6239" />
                            <path d="M 250 960 L 275 960 L 275 980 L 250 980 Z" fill="#8c6239" />
                        </g>
                    )}
                </g>
            )}
        </svg>
    );
};
