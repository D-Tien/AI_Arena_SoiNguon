import React, { useState } from 'react';
import { getManifestItem } from '../data/imageManifest';

export const SmartImage = ({ slot, className, onClick }: { slot: string, className?: string, onClick?: () => void }) => {
    const item = getManifestItem(slot);
    const [imgError, setImgError] = useState(false);

    const positionClass = className?.includes('absolute') || className?.includes('fixed') ? '' : 'relative';

    // Fallback if no item or image fails to load
    if (!item || imgError) {
        return (
            <div className={`${positionClass} overflow-hidden bg-giay-sang flex flex-col items-center justify-center p-4 ${className || ''}`} onClick={onClick} style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.05\'/%3E%3C/svg%3E")' }}>
                <span className="font-label text-than/50 text-xs text-center">[{slot}]</span>
                <span className="font-label text-son text-[10px] mt-2 text-center">Ảnh đang được tạo...</span>
            </div>
        );
    }

    return (
        <div className={`${positionClass} overflow-hidden group ${className || ''}`} onClick={onClick}>
            {/* Giả lập bộ lọc Zine Đông Hồ: giảm saturate, tăng contrast */}
            <img 
                src={item.localPath} 
                alt={item.alt} 
                className="w-full h-full object-cover grayscale-[30%] contrast-[1.05] sepia-[20%] group-hover:grayscale-0 group-hover:sepia-0 transition-all duration-500"
                onError={() => setImgError(true)}
                loading="lazy"
            />
            {/* Lớp overlay nhiễu giấy dó */}
            <div className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-20" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
            
            {/* Credit text */}
            <div className="absolute bottom-1 right-1 bg-giay-sang/80 backdrop-blur-sm px-1 py-0.5 rounded-[2px] font-label text-[8px] text-than neo-border border-[1px] opacity-0 group-hover:opacity-100 transition-opacity">
                {item.credit}
            </div>
        </div>
    );
};
