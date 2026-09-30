import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Compass, Camera, BookOpen, Sun, Moon, ArrowRight, ArrowLeft, X } from 'lucide-react';
import { Character, type DollLayers } from './components/PaperDoll';
import { StageBackground } from './components/Stage';
import { GuardStamp, GuardModal } from './components/CulturalGuard';
import { CultureCard } from './components/CultureCard';
import { Lookbook } from './components/Lookbook';
import { Solution } from './components/Solution';
import { Explore } from './components/Explore';
import { SmartImage } from './components/SmartImage';
import { StudioDo } from './components/StudioDo';
import { AiGenerationModal } from './components/AiGenerationModal';

// --- Shared Components ---
const Slogan = () => (
    <div className="mt-6 flex flex-col gap-1">
        <span className="font-label text-than text-sm md:text-base border-b-2 border-than pb-1 mb-1 max-w-[200px]">Mặc truyền thống.</span>
        <span className="font-label text-than text-sm md:text-base border-b-2 border-than pb-1 mb-1 max-w-[200px]">Sống Gen Z.</span>
        <span className="font-label text-son text-sm md:text-base">Đẹp và đúng.</span>
    </div>
);

const ThreadText = () => (
    <svg className="w-full max-w-[500px] h-[120px] md:h-[200px]" viewBox="0 0 500 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.path d="M 50 150 C 50 50, 150 50, 150 100 C 150 150, 50 150, 80 80 C 120 10, 180 50, 180 150" stroke="var(--son)" strokeWidth="8" strokeLinecap="round" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, ease: "easeInOut" }} />
        <text x="10" y="160" className="font-display fill-than text-[80px] md:text-[110px]" fontStyle="italic">Sợi</text>
        <text x="180" y="160" className="font-display fill-than text-[80px] md:text-[110px]" fontStyle="italic">Nguồn</text>
    </svg>
);

const Marquee = () => (
    <div className="absolute bottom-0 left-0 w-full bg-than text-giay-sang py-3 md:py-4 neo-border border-l-0 border-r-0 border-b-0 marquee-container z-20">
        <div className="marquee-content whitespace-nowrap font-label text-sm md:text-xl">
            {Array(5).fill("ÁO DÀI • TỨ THÂN • NGŨ THÂN • BÀ BA • NHẬT BÌNH • REMIX • ĐẸP VÀ ĐÚNG • ").map((text, i) => (
                <span key={i} className="mx-4">{text}</span>
            ))}
            {Array(5).fill("ÁO DÀI • TỨ THÂN • NGŨ THÂN • BÀ BA • NHẬT BÌNH • REMIX • ĐẸP VÀ ĐÚNG • ").map((text, i) => (
                <span key={i + 5} className="mx-4">{text}</span>
            ))}
        </div>
    </div>
);

const Sidebar = ({ activeTab, setActiveTab, onHome }: { activeTab: string, setActiveTab: (t: string) => void, onHome: () => void }) => (
    <div className="hidden lg:flex w-[88px] bg-giay-sang neo-border border-t-0 border-b-0 border-l-0 flex-col items-center py-6 h-screen sticky top-0 z-50">
        <div className="w-12 h-12 bg-son rounded-full flex items-center justify-center neo-shadow text-giay-sang font-display text-xl mb-12 border-2 border-than transform -rotate-12 cursor-pointer" onClick={onHome}>SN</div>

        <div className="flex flex-col gap-8 items-center flex-1 w-full px-2">
            <button onClick={() => setActiveTab('phoi')} className={`flex flex-col items-center gap-1 group transition-colors w-full ${activeTab === 'phoi' ? 'text-son' : 'text-than hover:text-son'}`}><Sparkles size={24} className="group-hover:scale-110 transition-transform" /><span className="font-label text-[10px] text-center leading-tight">PHỐI ĐỒ</span></button>
            <button onClick={() => setActiveTab('kham')} className={`flex flex-col items-center gap-1 group transition-colors w-full ${activeTab === 'kham' ? 'text-son' : 'text-than hover:text-son'}`}><Compass size={24} className="group-hover:scale-110 transition-transform" /><span className="font-label text-[10px] text-center leading-tight">KHÁM PHÁ</span></button>
            <button onClick={() => setActiveTab('look')} className={`flex flex-col items-center gap-1 group transition-colors w-full ${activeTab === 'look' ? 'text-son' : 'text-than hover:text-son'}`}><Camera size={24} className="group-hover:scale-110 transition-transform" /><span className="font-label text-[10px] text-center leading-tight">LOOKBOOK</span></button>
            <button onClick={() => setActiveTab('hoc')} className={`flex flex-col items-center gap-1 group transition-colors w-full ${activeTab === 'hoc' ? 'text-son' : 'text-than hover:text-son'}`}><BookOpen size={24} className="group-hover:scale-110 transition-transform" /><span className="font-label text-[10px] text-center leading-tight">HỌC &<br />GIẢI PHÁP</span></button>
        </div>
        <button className="text-than hover:text-son mb-4 transition-colors"><Moon size={24} /></button>
    </div>
);

const MobilePillNav = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) => (
    <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 bg-than text-giay-sang rounded-full px-6 py-3 flex gap-8 z-50 shadow-xl border-2 border-than/20">
        <button onClick={() => setActiveTab('phoi')} className={`relative flex flex-col items-center ${activeTab === 'phoi' ? 'text-giay-do' : 'text-giay-sang/60 hover:text-giay-sang'}`}>
            {activeTab === 'phoi' && <div className="absolute -inset-2 bg-son rounded-full -z-10 blur-[2px]" />}
            <Sparkles size={20} />
        </button>
        <button onClick={() => setActiveTab('kham')} className={`flex flex-col items-center ${activeTab === 'kham' ? 'text-son' : 'text-giay-sang/60 hover:text-giay-sang'}`}><Compass size={20} /></button>
        <button onClick={() => setActiveTab('look')} className={`flex flex-col items-center ${activeTab === 'look' ? 'text-son' : 'text-giay-sang/60 hover:text-giay-sang'}`}><Camera size={20} /></button>
        <button onClick={() => setActiveTab('hoc')} className={`flex flex-col items-center ${activeTab === 'hoc' ? 'text-son' : 'text-giay-sang/60 hover:text-giay-sang'}`}><BookOpen size={20} /></button>
    </div>
);

// --- State & Constants ---
const PALETTES = [
    ["#A8231A", "#1B2A5C", "#E3A72F"], // Son, Chàm, Nghệ
    ["#0F5B4A", "#F3E9D6", "#FF5C8A"], // Lục, Dó, Sen
    ["#1A1410", "#C8F169", "#A8231A"], // Than, Cốm, Son
    ["#1B2A5C", "#E3A72F", "#0F5B4A"], // Chàm, Nghệ, Lục
    ["#F3E9D6", "#A8231A", "#1A1410"], // Dó, Son, Than
];

const COSTUMES = [
    { id: 'ao-tu-than', name: 'TỨ THÂN', diff: 4, slot: 'costume-tuthan' },
    { id: 'ao-ngu-than', name: 'NGŨ THÂN', diff: 3, slot: 'costume-nguthan' },
    { id: 'ao-ba-ba', name: 'BÀ BA', diff: 1, slot: 'costume-baba' },
    // Hidden costumes (keep data)
    // {id: 'ao-dai', name: 'ÁO DÀI', diff: 2, slot: 'costume-aodai'},
    // {id: 'ao-nhat-binh', name: 'NHẬT BÌNH', diff: 5, slot: 'costume-nhatbinh'},
    // {id: 'ao-giao-linh', name: 'GIAO LĨNH', diff: 4, slot: 'costume-giaolinh'},
    // {id: 'ao-tac', name: 'ÁO TẤC', diff: 3, slot: 'costume-aotac'},
    // {id: 'ao-the', name: 'ÁO THE NAM', diff: 2, slot: 'costume-aothe'},
    // {id: 'ao-canh', name: 'ÁO CÁNH', diff: 2, slot: 'costume-aocanh'},
    // {id: 'yem', name: 'YẾM VÁY', diff: 3, slot: 'costume-yem'},
    // {id: 'ao-chen', name: 'ÁO CHẼN', diff: 4, slot: 'costume-aochen'},
    // {id: 'ao-mang-bao', name: 'MẠNG BÀO', diff: 5, slot: 'costume-mangbao'},
];

// --- Wizard Components ---
const WizardStep1 = ({ scene, setScene }: any) => (
    <div className="space-y-6 pb-6">
        <h2 className="font-display text-4xl leading-snug py-1">1. Khung cảnh &<br />Sự kiện</h2>
        <p className="text-than/70">Không gian quyết định hồn trang phục. Bạn đi đâu?</p>
        <div className="grid grid-cols-2 gap-4">
            {[
                { id: 'hanoi', name: 'Cà phê Hà Nội', slot: 'event-cafe' },
                { id: 'hue', name: 'Thăm di tích', slot: 'event-heritage' },
                { id: 'nambo', name: 'Du xuân', slot: 'event-spring' },
                { id: 'chua', name: 'Đi lễ Chùa', slot: 'event-temple' }
            ].map(s => (
                <button key={s.id} onClick={() => setScene(s.id)} className={`aspect-square neo-card flex flex-col items-center justify-center p-0 gap-0 overflow-hidden relative group ${scene === s.id ? 'border-son shadow-[4px_4px_0_var(--son)]' : 'border-than'}`}>
                    <SmartImage slot={s.slot} className="w-full h-full absolute inset-0 z-0" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                    <span className="font-label text-sm text-center relative z-20 text-giay-sang mt-auto mb-4">{s.name}</span>
                    {scene === s.id && <div className="absolute top-2 right-2 z-20 w-4 h-4 bg-son rounded-full neo-border" />}
                </button>
            ))}
        </div>
    </div>
);

const WizardStep2 = ({ core, setCore, gender, onOpenInfo }: any) => (
    <div className="space-y-6 pb-6">
        <h2 className="font-display text-4xl leading-snug py-1">2. Trang phục<br />Cốt lõi</h2>
        <p className="text-than/70">Chọn món đồ truyền thống làm điểm tựa.</p>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {COSTUMES.map(c => {
                const displayName = gender === 'male' && c.id === 'ao-tu-than' ? 'ÁO THE NAM' : c.name;
                return (
                    <button key={c.id} onClick={() => setCore(c.id)} className={`relative aspect-[3/4] neo-card flex flex-col items-center justify-center p-0 overflow-hidden group ${core === c.id ? 'border-cham shadow-[4px_4px_0_var(--cham)]' : 'border-than'}`}>
                        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#FBF5E9]">
                            <div className="w-[120%] h-[120%] absolute top-[-10%] left-[-10%] flex justify-center items-end pb-8">
                                <Character gender={gender} layers={{ top: c.id, headwear: gender === 'male' && c.id === 'ao-tu-than' ? 'khan-xep' : (gender === 'female' && c.id === 'ao-tu-than' ? 'khan-mo-qua' : undefined) }} palette={["#A8231A", "#1B2A5C", "#E3A72F"]} />
                            </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                        <div className="absolute top-2 left-2 z-20 flex flex-col gap-1 items-start">
                            <div className="flex gap-0.5 bg-giay-sang/20 backdrop-blur-sm px-1.5 py-1 rounded-full neo-border border-[1px]">
                                {Array(5).fill(0).map((_, i) => (
                                    <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < c.diff ? 'bg-nghe' : 'bg-giay-sang/30'}`} />
                                ))}
                            </div>
                            <span className="bg-giay-sang text-[9px] px-1.5 py-0.5 rounded-full font-label text-than border-[1px] border-than shadow-sm">{c.diff <= 2 ? 'Dễ phối' : 'Cần chú ý'}</span>
                        </div>
                        <div 
                            onClick={(e) => { e.stopPropagation(); onOpenInfo && onOpenInfo(c.id); }} 
                            className="absolute top-2 right-2 z-30 w-6 h-6 bg-giay-sang rounded-full neo-border shadow-sm flex items-center justify-center text-than hover:text-son hover:bg-giay-do transition-colors cursor-pointer font-bold text-sm"
                            title="Tìm hiểu thêm"
                        >
                            ?
                        </div>
                        <span className="font-label text-[13px] text-giay-sang relative z-20 mt-auto mb-2 px-1 text-center w-full leading-tight">{displayName}</span>
                    </button>
                );
            })}
        </div>
    </div>
);

const WizardStep3 = ({ paletteIdx, setPaletteIdx, style, setStyle }: any) => (
    <div className="space-y-8 pb-6">
        <div>
            <h2 className="font-display text-4xl leading-snug mb-4">3. Bảng màu &<br />Phong cách</h2>
            <p className="text-than/70 mb-4">Chọn bảng màu đĩa gốm ngũ hành.</p>
            <div className="grid grid-cols-5 gap-3 mb-8">
                {PALETTES.map((p, i) => (
                    <button key={i} onClick={() => setPaletteIdx(i)} className={`aspect-square rounded-full border-[3px] ${paletteIdx === i ? 'border-than neo-shadow scale-110' : 'border-transparent'} transition-all flex flex-col overflow-hidden`}>
                        <div className="flex-1 w-full" style={{ backgroundColor: p[0] }} />
                        <div className="flex-1 w-full" style={{ backgroundColor: p[1] }} />
                        <div className="flex-1 w-full" style={{ backgroundColor: p[2] }} />
                    </button>
                ))}
            </div>

            <p className="text-than/70 mb-4">Phụ kiện đính kèm (chọn thêm).</p>
            <div className="flex gap-3 overflow-x-auto hidden-scrollbar mb-8 pb-2">
                {['Nón lá', 'Khăn rằn', 'Guốc mộc', 'Kính râm'].map(acc => (
                    <button key={acc} className="px-4 py-2 font-label text-xs neo-border rounded-full bg-giay-sang hover:-translate-y-0.5 flex-shrink-0 whitespace-nowrap text-than">
                        + {acc}
                    </button>
                ))}
            </div>

            <p className="text-than/70 mb-4">Dán nhãn phong cách (Vibe).</p>
            <div className="flex flex-wrap gap-2">
                {['Tối giản', 'Y2K', 'Streetwear', 'Thanh lịch', 'Retro', 'Cottagecore', 'Nghệ sĩ'].map(s => (
                    <button key={s} onClick={() => setStyle(s)} className={`px-4 py-2 font-label text-sm neo-border ${style === s ? 'bg-nghe text-than shadow-[3px_3px_0_var(--than)] -rotate-2' : 'bg-giay-sang hover:-translate-y-0.5'} transition-all`}>
                        {s}
                    </button>
                ))}
            </div>
        </div>
    </div>
);

const WizardStep4 = ({ remixLevel, setRemixLevel, styleMode, setStyleMode }: any) => (
    <div className="space-y-6 pb-6 h-full flex flex-col justify-center">
        <h2 className="font-display text-4xl leading-snug">4. Cữ chỉnh<br />Máy dệt</h2>
        <p className="text-than/70">Kéo thanh trượt để AI "thêm mắm dặm muối" hiện đại vào.</p>

        {styleMode === 'traditional' ? (
            <div className="bg-cham/10 border border-cham p-4 rounded-xl flex items-start gap-3 mt-4">
                <span className="text-xl">⚠️</span>
                <div>
                    <h4 className="font-bold text-cham mb-1">Đang ở chế độ Truyền Thống</h4>
                    <p className="text-sm text-than/70 mb-2">Thanh trượt Độ Remix chỉ dành cho chế độ Cách tân.</p>
                    <button onClick={() => setStyleMode('modern')} className="text-sm bg-cham text-white px-3 py-1 rounded">Chuyển sang Cách tân</button>
                </div>
            </div>
        ) : (
            <div className="py-12 relative w-full">
                <input type="range" min="26" max="100" value={remixLevel} onChange={(e) => setRemixLevel(parseInt(e.target.value))} className="w-full appearance-none h-4 neo-border rounded-full bg-giay-do outline-none focus-visible:ring-4 focus-visible:ring-nghe/50 cursor-ew-resize" />
                <div className="flex justify-between mt-6 font-label text-sm">
                    <div className="flex flex-col items-center text-than">
                        <span>CÁCH TÂN NHẸ</span>
                    </div>
                    <div className="flex flex-col items-center text-son">
                        <span>REMIX MẠNH</span>
                    </div>
                </div>
            </div>
        )}
    </div>
);



// --- Result Poster ---
const ResultPoster = ({ onBack, scene, layers, palette, core, style, gender, styleMode }: any) => {
    const [isGuardOpen, setIsGuardOpen] = useState(false);
    const [isCultureOpen, setIsCultureOpen] = useState(false);
    const [isAiModalOpen, setIsAiModalOpen] = useState(false);
    const [attemptsLeft, setAttemptsLeft] = useState(5);

    // Dynamic guard level based on remix level
    let guardLevel: 'green' | 'yellow' | 'red' = 'green';
    if (layers.shoes === 'sneaker' || layers.outer === 'blazer') guardLevel = 'yellow';
    if (layers.bottom === 'jeans' && layers.top === 'ao-tu-than') guardLevel = 'red';
    
    // Check Guard logic for Ao The male
    if (gender === 'male' && core === 'ao-tu-than' && layers.outer === 'blazer' && layers.bottom === 'jeans') {
        // Just keeping it yellow/red as an example, actual logic requires only a warning
    }

    const TITLES: Record<string, string> = {
        'Tối giản': 'Thanh Thuần',
        'Y2K': 'Dị Biệt',
        'Streetwear': 'Lãng Khách',
        'Thanh lịch': 'Nho Nhã',
        'Retro': 'Hoài Niệm',
        'Cottagecore': 'Thơ Ngây',
        'Nghệ sĩ': 'Phiêu Lãng'
    };
    const title = TITLES[style] || 'Tân Thời';

    const getCoreName = () => {
        if (gender === 'male' && core === 'ao-tu-than') return 'Áo The Nam';
        return COSTUMES.find(c => c.id === core)?.name || 'Việt Phục';
    }
    const coreName = getCoreName();

    const getPrompt = () => {
        let descMap: any = {
            'ao-dai': 'cổ đứng, hai tà tách rời, xẻ từ eo, tay raglan',
            'ao-tu-than': 'bốn thân áo, yếm bên trong, buộc vạt trước',
            'ao-ngu-than': 'năm thân áo, cổ đứng, form rộng, cài khuy',
            'ao-ba-ba': 'cổ tròn xẻ giữa, xẻ tà hai bên, form rộng vừa',
            'ao-tac': 'ống tay thụng rộng, cổ đứng, tà dài rộng',
            'ao-nhat-binh': 'cổ hình chữ nhật xẻ giữa, hoa văn viền cổ tay',
        };
        
        if (gender === 'male' && core === 'ao-tu-than') {
            descMap['ao-tu-than'] = 'áo the dài cổ đứng có viền mảnh, cài khuy chéo bên phải, tay dài rộng, tà xẻ hai bên hông';
        }

        const desc = descMap[core] || 'trang phục truyền thống Việt Nam';

        const colorNames: any = { '#A8231A': 'đỏ son', '#1B2A5C': 'xanh chàm', '#E3A72F': 'vàng nghệ', '#0F5B4A': 'xanh lục', '#F3E9D6': 'trắng ngà giấy dó', '#1A1410': 'đen than', '#C8F169': 'xanh cốm', '#FF5C8A': 'hồng sen' };
        const c1 = colorNames[palette[0]] || 'màu đặc trưng';

        const sceneMap: any = { 'hanoi': 'phố cổ Hà Nội cổ kính', 'hue': 'Đại Nội Huế rêu phong', 'nambo': 'chợ nổi sông nước Nam Bộ', 'chua': 'chốn thiền môn thanh tịnh' };
        const sceneDesc = sceneMap[scene] || 'bối cảnh văn hoá';

        let extraDesc = [];
        if (layers.bottom === 'jeans' || layers.bottom === 'cargo') extraDesc.push('quần jeans/cargo ống rộng');
        if (layers.outer === 'blazer' || layers.outer === 'bomber') extraDesc.push('khoác ngoài hiện đại');
        if (layers.shoes === 'sneaker') extraDesc.push('giày sneaker đế dày');
        
        const characterDesc = gender === 'male' ? 'một nam thanh niên Việt Nam trẻ' : 'một người mẫu Việt Nam trẻ';
        const stylePrefix = styleMode === 'traditional' ? 'phong cách truyền thống nguyên bản' : 'phong cách cách tân hiện đại';

        return `Ảnh chụp thời trang chân thực phong cách tạp chí, ${characterDesc}, toàn thân, đứng ở ${sceneDesc}, mặc ${coreName} màu ${c1}, ${desc}, ${extraDesc.length > 0 ? 'kết hợp cùng ' + extraDesc.join(', ') : ''}. ${stylePrefix}, Vibe ${style}. Ánh sáng tự nhiên, nét ảnh sắc, độ sâu trường ảnh nhẹ. Không chữ, không logo, không thương hiệu, không giống người nổi tiếng, không phải kimono/hanbok/hanfu/sườn xám.`;
    };

    return (
        <div className="w-full h-full flex flex-col overflow-y-auto hidden-scrollbar relative bg-giay-do">
            <GuardModal isOpen={isGuardOpen} onClose={() => setIsGuardOpen(false)} level={guardLevel} />
            <CultureCard isOpen={isCultureOpen} onClose={() => setIsCultureOpen(false)} outfitName={title} core={core} />
            <AiGenerationModal
                isOpen={isAiModalOpen}
                onClose={() => setIsAiModalOpen(false)}
                initialPrompt={getPrompt()}
                attemptsLeft={attemptsLeft}
                onUseAttempt={() => setAttemptsLeft(p => p - 1)}
                coreId={core}
                sceneId={scene}
                layers={layers}
                palette={palette}
            />

            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-50" style={{ mixBlendMode: 'multiply' }}>
                <path d="M -50 450 Q 200 400 280 430" fill="none" stroke="var(--son)" strokeWidth="2" strokeDasharray="4 4" />
            </svg>

            <button onClick={onBack} className="absolute top-4 left-4 z-40 w-10 h-10 neo-card flex items-center justify-center rounded-full"><ArrowLeft size={20} /></button>

            {/* Character Stage (Matching Main Stage A6) */}
            <div className="w-full h-[60vh] lg:h-[75vh] relative flex flex-col items-center justify-start overflow-hidden bg-giay-sang neo-border border-l-0 border-r-0 border-t-0 p-0">
                {/* StageBackground automatically draws the arch and title */}
                <StageBackground scene={scene} title={`${coreName}\n${title}`} />

                <GuardStamp level={guardLevel} onClick={() => setIsGuardOpen(true)} />

                {/* Score Stamps */}
                <div className="absolute top-4 right-4 md:top-8 md:right-8 z-30 w-16 h-16 md:w-24 md:h-24 bg-giay-do rounded-full neo-border border-[3px] border-luc flex flex-col items-center justify-center shadow-lg rotate-12 hover:scale-105 transition-transform cursor-pointer" onClick={() => setIsCultureOpen(true)}>
                    <span className="font-display text-xl md:text-3xl text-luc">95</span>
                    <span className="font-label text-[6px] md:text-[8px] text-luc text-center leading-tight">TÔN TRỌNG<br />VĂN HOÁ</span>
                </div>
                <div className="absolute top-24 right-6 md:top-36 md:right-12 z-30 w-14 h-14 md:w-20 md:h-20 bg-giay-do rounded-full neo-border border-[3px] border-nghe flex flex-col items-center justify-center shadow-lg -rotate-12 cursor-pointer hover:scale-105 transition-transform" onClick={() => setIsCultureOpen(true)}>
                    <span className="font-display text-lg md:text-2xl text-nghe">90</span>
                    <span className="font-label text-[5px] md:text-[7px] text-nghe text-center leading-tight">HÀI HOÀ<br />MÀU SẮC</span>
                </div>

                {/* Character Podium (Bục giấy hình elip) */}
                <div className="absolute top-[86%] left-1/2 -translate-x-1/2 w-[220px] h-[30px] bg-giay-sang rounded-[100%] neo-border shadow-[0_6px_12px_rgba(0,0,0,0.25)] z-10" />

                {/* Character Wrapper */}
                <div
                    className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-full max-w-sm h-[78%] flex items-end justify-center pointer-events-none z-30"
                    style={{ filter: 'drop-shadow(4px 4px 0px var(--than)) drop-shadow(0 0 0px white) drop-shadow(0 0 2px white)' }}
                >
                    <div className="w-full h-full pointer-events-auto" style={{ filter: 'drop-shadow(3px 0 0 white) drop-shadow(-3px 0 0 white) drop-shadow(0 3px 0 white) drop-shadow(0 -3px 0 white)' }}>
                        <SmartImage slot={`costume-${core}`} className="w-full h-full object-contain object-bottom" />
                    </div>
                </div>
            </div>

            {/* Info Cards */}
            <div className="p-6 lg:p-12 space-y-8 bg-giay-do">
                <div className="flex items-center gap-4 mb-2">
                    <h2 className="font-display text-5xl text-than m-0">{title}</h2>
                    {styleMode === 'modern' && (
                        <span className="bg-vang text-than font-label text-xs px-3 py-1 rounded-full neo-border shadow-sm transform -rotate-3">
                            ⭐ CÁCH TÂN
                        </span>
                    )}
                </div>
                <p className="font-label text-son uppercase tracking-widest text-sm">{coreName} × {style}</p>

                {/* TRANG PHỤC DỮ LIỆU */}
                <div className="neo-card p-6 border-than">
                    <h3 className="font-label text-than mb-4">THÀNH PHẦN TRANG PHỤC</h3>
                    <div className="flex flex-wrap gap-3">
                        <div className="flex items-center gap-2 bg-giay-sang px-3 py-1.5 rounded-full neo-border text-sm">
                            <span className="font-medium text-than">{coreName}</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full border ${styleMode === 'traditional' ? 'bg-luc/10 text-luc border-luc/30' : 'bg-vang/20 text-vang border-vang/50'}`}>
                                {styleMode === 'traditional' ? 'Giữ (Nguyên bản)' : 'Sáng tạo (Biến tấu)'}
                            </span>
                        </div>
                        {layers.bottom && (
                            <div className="flex items-center gap-2 bg-giay-sang px-3 py-1.5 rounded-full neo-border text-sm">
                                <span className="font-medium text-than">{layers.bottom}</span>
                                <span className={`text-[10px] px-2 py-0.5 rounded-full border ${['jeans', 'cargo'].includes(layers.bottom) ? 'bg-vang/20 text-vang border-vang/50' : 'bg-luc/10 text-luc border-luc/30'}`}>
                                    {['jeans', 'cargo'].includes(layers.bottom) ? 'Sáng tạo' : 'Giữ'}
                                </span>
                            </div>
                        )}
                        {layers.outer && (
                            <div className="flex items-center gap-2 bg-giay-sang px-3 py-1.5 rounded-full neo-border text-sm">
                                <span className="font-medium text-than">{layers.outer}</span>
                                <span className="text-[10px] px-2 py-0.5 rounded-full border bg-vang/20 text-vang border-vang/50">
                                    Sáng tạo
                                </span>
                            </div>
                        )}
                        {layers.headwear && (
                            <div className="flex items-center gap-2 bg-giay-sang px-3 py-1.5 rounded-full neo-border text-sm">
                                <span className="font-medium text-than">{layers.headwear}</span>
                                <span className={`text-[10px] px-2 py-0.5 rounded-full border ${['mu-bucket', 'kinh-ram'].includes(layers.headwear) ? 'bg-vang/20 text-vang border-vang/50' : 'bg-luc/10 text-luc border-luc/30'}`}>
                                    {['mu-bucket', 'kinh-ram'].includes(layers.headwear) ? 'Sáng tạo' : 'Giữ'}
                                </span>
                            </div>
                        )}
                        {layers.shoes && (
                            <div className="flex items-center gap-2 bg-giay-sang px-3 py-1.5 rounded-full neo-border text-sm">
                                <span className="font-medium text-than">{layers.shoes}</span>
                                <span className={`text-[10px] px-2 py-0.5 rounded-full border ${['sneaker', 'combat-boot'].includes(layers.shoes) ? 'bg-vang/20 text-vang border-vang/50' : 'bg-luc/10 text-luc border-luc/30'}`}>
                                    {['sneaker', 'combat-boot'].includes(layers.shoes) ? 'Sáng tạo' : 'Giữ'}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <button onClick={() => setIsCultureOpen(true)} className="neo-card p-6 border-son relative overflow-hidden group text-left cursor-pointer hover:bg-giay-sang">
                        <div className="absolute -right-4 -top-4 w-12 h-12 bg-son/10 rounded-full group-hover:scale-[10] transition-transform duration-500 z-0" />
                        <h3 className="font-label text-son relative z-10 mb-2">Mảnh ghép văn hoá</h3>
                        <p className="text-sm relative z-10 text-than">Bấm để lật trang tìm hiểu chi tiết nguồn gốc và ý nghĩa trang phục.</p>
                    </button>
                    <div className="neo-card p-6 border-cham relative overflow-hidden group">
                        <div className="absolute -right-4 -top-4 w-12 h-12 bg-cham/10 rounded-full group-hover:scale-[10] transition-transform duration-500 z-0" />
                        <h3 className="font-label text-cham relative z-10 mb-2">Mẹo phối</h3>
                        <p className="text-sm relative z-10">Kết hợp cùng Chunky Sneaker và quần Jeans ống rộng rách nhẹ để tăng tính năng động.</p>
                    </div>
                    <div className="neo-card p-6 border-luc relative overflow-hidden group flex flex-col justify-center gap-3">
                        <button onClick={() => setIsAiModalOpen(true)} className="w-full neo-button-primary border-son bg-son text-white hover:bg-son/90">✨ TẠO ẢNH THẬT BẰNG AI</button>
                        <div className="flex gap-2">
                            <button className="flex-1 neo-button-primary border-luc bg-luc hover:bg-luc/90">LƯU LOOKBOOK</button>
                            <button className="flex-[0.5] neo-button-secondary">CHIA SẺ</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


const MainLayout = ({ onReset, initialConfig }: { onReset: () => void, initialConfig?: any }) => {
    const [activeTab, setActiveTab] = useState('phoi');
    const [step, setStep] = useState(initialConfig ? 3 : 1);

    // Character State
    const [gender, setGender] = useState<'female' | 'male'>(initialConfig?.gender || 'female');
    const [scene, setScene] = useState(initialConfig?.scene || 'hanoi');
    const [core, setCore] = useState(initialConfig?.core || 'ao-tu-than');
    const [paletteIdx, setPaletteIdx] = useState(0);
    const [style, setStyle] = useState('Streetwear');
    const [remixLevel, setRemixLevel] = useState(50);
    const [hairType, setHairType] = useState('dai-thuot-tha');
    const [headwearType, setHeadwearType] = useState('none');
    const [bangsType, setBangsType] = useState('mai-thua');
    const [shoesType, setShoesType] = useState('guoc');
    const [activeToolbarTab, setActiveToolbarTab] = useState<'toc' | 'mai' | 'phukien' | 'giay' | 'none'>('none');
    const [styleMode, setStyleMode] = useState<'traditional' | 'modern'>('traditional');

    const [isCultureOpen, setIsCultureOpen] = useState(false);
    const [cultureCore, setCultureCore] = useState('ao-tu-than');

    // On gender change, ensure consistent defaults if needed, but the prompt says "Không làm mất lựa chọn ở các bước đã đi qua"
    // We only need to set default valid hair if the current is invalid, but let's just use effect.
    React.useEffect(() => {
        if (gender === 'male') {
            if (['dai-thuot-tha', 'van-gon', 'bui-cao'].includes(hairType)) setHairType('ngan-gon');
            if (['khan-mo-qua', 'bang-do-lua'].includes(headwearType)) setHeadwearType('none');
        } else {
            if (['ngan-gon', 're-ngoi', 'mai-bay', 'buoc-thap'].includes(hairType)) setHairType('dai-thuot-tha');
            if (['khan-xep', 'khan-dong', 'mu-bucket'].includes(headwearType)) setHeadwearType('none');
        }
    }, [gender]);

    React.useEffect(() => {
        if (gender === 'female') {
            if (remixLevel <= 25) {
                setHairType('dai-thuot-tha');
                setHeadwearType('khan-mo-qua');
                setShoesType('guoc');
            } else if (remixLevel > 25 && hairType === 'dai-thuot-tha' && headwearType === 'khan-mo-qua') {
                setHeadwearType('none');
                setShoesType('sneaker');
            }
        } else {
            if (remixLevel <= 25) {
                setHairType('ngan-gon');
                setHeadwearType('khan-xep');
                setShoesType('guoc');
            } else if (remixLevel > 25 && headwearType === 'khan-xep') {
                setHeadwearType('none'); // Or bucket depending on user
                setShoesType('sneaker');
            }
        }
    }, [remixLevel, gender]);

    React.useEffect(() => {
        if (headwearType === 'khan-mo-qua') {
            setBangsType('khong-mai');
        } else {
            setBangsType('mai-thua');
        }
    }, [headwearType]);

    const getLayers = (): DollLayers => {
        let bottom = 'quan-lua'; // default for others
        let outer = 'none';
        let shoes = shoesType;
        let headwear = headwearType;

        if (core === 'ao-tu-than') {
            if (gender === 'female') {
                if (remixLevel <= 25) {
                    bottom = 'none'; // Uses internal vay den
                    outer = 'none';
                } else if (remixLevel <= 60) {
                    bottom = 'none';
                    outer = 'none';
                } else if (remixLevel <= 85) {
                    bottom = 'jeans';
                    outer = 'none';
                } else {
                    bottom = 'jeans';
                    outer = 'blazer';
                }
            } else {
                // Male Ao The mapping
                if (remixLevel <= 25) {
                    bottom = 'quan-trang';
                    outer = 'none';
                } else if (remixLevel <= 60) {
                    bottom = 'quan-trang';
                    outer = 'none';
                } else if (remixLevel <= 85) {
                    bottom = 'jeans';
                    outer = 'none';
                } else {
                    bottom = 'jeans';
                    outer = 'blazer';
                }
            }
        }

        return {
            top: core,
            bottom: bottom === 'none' ? undefined : bottom,
            outer: outer === 'none' ? undefined : outer,
            shoes: shoes === 'none' ? undefined : shoes,
            headwear: headwear === 'none' ? undefined : headwear,
        };
    };

    const getStageTitle = () => {
        if (core === 'ao-tu-than') {
            if (gender === 'female') {
                return styleMode === 'traditional' ? "TỨ THÂN\nBẮC BỘ" : "TỨ THÂN\nDẠO PHỐ";
            } else {
                return styleMode === 'traditional' ? "ÁO THE\nBẮC BỘ" : "ÁO THE\nSTREETWEAR";
            }
        }
        if (core === 'ao-ngu-than') {
            return styleMode === 'traditional' ? "NGŨ THÂN\nCỐ ĐÔ" : "NGŨ THÂN\nCÁCH TÂN";
        }
        return `${COSTUMES.find(c => c.id === core)?.name || ''}\n${style.toUpperCase()}`;
    };

    const stageTitle = getStageTitle();

    if (activeTab === 'look') {
        return (
            <div className="flex h-screen w-full bg-giay-do relative">
                <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onHome={onReset} />
                <div className="flex-1 w-full h-full">
                    <Lookbook />
                </div>
                <MobilePillNav activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
        );
    }

    if (activeTab === 'kham') {
        return (
            <div className="flex h-screen w-full bg-giay-do relative">
                <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onHome={onReset} />
                <div className="flex-1 w-full h-full">
                    <Explore />
                </div>
                <MobilePillNav activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
        );
    }

    if (activeTab === 'hoc') {
        return (
            <div className="flex h-screen w-full bg-giay-do relative">
                <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onHome={onReset} />
                <div className="flex-1 w-full h-full">
                    <Solution />
                </div>
                <MobilePillNav activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
        );
    }

    if (step === 5) {
        return (
            <div className="flex h-screen w-full bg-giay-do relative">
                <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onHome={onReset} />
                <div className="flex-1 w-full h-full">
                    <ResultPoster onBack={() => setStep(4)} scene={scene} core={core} style={style} layers={getLayers()} palette={PALETTES[paletteIdx]} hair={hairType} gender={gender} styleMode={styleMode} />
                </div>
                <MobilePillNav activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
        );
    }

    return (
        <div className="flex h-screen w-full bg-giay-do relative">
            <CultureCard isOpen={isCultureOpen} onClose={() => setIsCultureOpen(false)} outfitName={COSTUMES.find(c => c.id === cultureCore)?.name || 'Việt Phục'} core={cultureCore} />
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onHome={onReset} />

            <div className="flex-1 flex flex-col lg:flex-row relative h-full">
                {/* KHU GIỮA (SÂN KHẤU) */}
                <div className="flex-[1.2] h-[50vh] lg:h-full border-b-2 lg:border-b-0 lg:border-r-2 border-than relative flex items-center justify-center p-0 lg:p-0 overflow-hidden bg-giay-sang">
                    {/* Background and Arch */}
                    <StageBackground scene={scene} title={stageTitle} />
                    
                    {/* Gender Toggle Button */}
                    <div className="absolute top-4 right-4 z-40 bg-giay-sang neo-border rounded-full flex overflow-hidden font-label shadow-lg">
                        <button onClick={() => setGender('female')} className={`px-4 py-2 transition-colors ${gender === 'female' ? 'bg-son text-giay-sang' : 'hover:bg-giay-do text-than'}`}>Nữ</button>
                        <div className="w-[1px] bg-than h-auto" />
                        <button onClick={() => setGender('male')} className={`px-4 py-2 transition-colors ${gender === 'male' ? 'bg-son text-giay-sang' : 'hover:bg-giay-do text-than'}`}>Nam</button>
                    </div>

                    {/* Mode Toggle Button (Vertical on left side) */}
                    <div className="absolute top-24 left-6 z-40 bg-giay-sang neo-border rounded-xl flex flex-col overflow-hidden font-label shadow-lg">
                        <button onClick={() => setStyleMode('traditional')} className={`px-3 py-3 transition-colors ${styleMode === 'traditional' ? 'bg-cham text-giay-sang' : 'hover:bg-giay-do text-than'}`} style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>Truyền thống</button>
                        <div className="h-[1px] bg-than w-full" />
                        <button onClick={() => setStyleMode('modern')} className={`px-3 py-3 transition-colors ${styleMode === 'modern' ? 'bg-vang text-than' : 'hover:bg-giay-do text-than'}`} style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>Hiện đại</button>
                    </div>
                    
                    {/* Guard Warning */}
                    {styleMode === 'traditional' && (getLayers().outer !== undefined || getLayers().bottom === 'jeans' || getLayers().shoes === 'sneaker') && (
                        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-50 bg-vang border border-than p-3 rounded-xl shadow-lg flex items-center gap-3 w-[80%] max-w-[300px]">
                            <span className="text-2xl">⚠️</span>
                            <div className="flex-1">
                                <p className="text-xs font-bold text-than mb-1">Bạn đang rời khỏi bản truyền thống, chuyển sang Cách tân?</p>
                                <button onClick={() => setStyleMode('modern')} className="text-[10px] bg-white text-than px-2 py-1 rounded border border-than shadow">Chuyển sang Cách tân</button>
                            </div>
                        </div>
                    )}

                    {/* Progress Bar */}
                    <div className="absolute top-10 left-6 z-30 flex gap-2 w-[200px]">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className={`h-2 flex-1 neo-border rounded-full ${step >= i ? 'bg-son' : 'bg-giay-do'}`} />
                        ))}
                    </div>

                    {/* Toolbar / Tabs */}
                    <div className="absolute bottom-8 right-6 z-40 flex flex-col items-end gap-2">
                        {/* Tab Content */}
                        {activeToolbarTab !== 'none' && (
                            <div className="bg-giay-do neo-border rounded shadow-lg p-2 w-48 animate-fade-in-up">
                                {activeToolbarTab === 'toc' && (
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs font-semibold text-black/50 mb-1 px-1">TÓC</span>
                                        {gender === 'female' ? (
                                            [{ id: 'dai-thuot-tha', label: 'Dài thướt tha' }, { id: 'van-gon', label: 'Vấn gọn' }, { id: 'buoc-thap', label: 'Buộc thấp' }, { id: 'bui-cao', label: 'Búi cao' }].map(h => (
                                                <button key={h.id} onClick={() => setHairType(h.id)} className={`px-3 py-1.5 text-sm rounded text-left transition-colors ${hairType === h.id ? 'bg-black text-giay-sang' : 'hover:bg-black/5 text-black/80'}`}>{h.label}</button>
                                            ))
                                        ) : (
                                            [{ id: 'ngan-gon', label: 'Ngắn gọn' }, { id: 're-ngoi', label: 'Rẽ ngôi lệch' }, { id: 'mai-bay', label: 'Mái bay' }, { id: 'buoc-thap', label: 'Buộc thấp' }].map(h => (
                                                <button key={h.id} onClick={() => setHairType(h.id)} className={`px-3 py-1.5 text-sm rounded text-left transition-colors ${hairType === h.id ? 'bg-black text-giay-sang' : 'hover:bg-black/5 text-black/80'}`}>{h.label}</button>
                                            ))
                                        )}
                                    </div>
                                )}
                                {activeToolbarTab === 'phukien' && (
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs font-semibold text-black/50 mb-1 px-1">PHỤ KIỆN TÓC</span>
                                        {gender === 'female' ? (
                                            [{ id: 'none', label: 'Không phụ kiện' }, { id: 'khan-mo-qua', label: 'Khăn mỏ quạ' }, { id: 'bang-do-lua', label: 'Băng đô lụa' }].map(h => (
                                                <button key={h.id} onClick={() => setHeadwearType(h.id)} className={`px-3 py-1.5 text-sm rounded text-left transition-colors ${headwearType === h.id ? 'bg-black text-giay-sang' : 'hover:bg-black/5 text-black/80'}`}>{h.label}</button>
                                            ))
                                        ) : (
                                            [{ id: 'none', label: 'Không phụ kiện' }, { id: 'khan-xep', label: 'Khăn xếp' }, { id: 'khan-dong', label: 'Khăn đóng' }, { id: 'mu-bucket', label: 'Mũ bucket' }].map(h => (
                                                <button key={h.id} onClick={() => setHeadwearType(h.id)} className={`px-3 py-1.5 text-sm rounded text-left transition-colors ${headwearType === h.id ? 'bg-black text-giay-sang' : 'hover:bg-black/5 text-black/80'}`}>{h.label}</button>
                                            ))
                                        )}
                                    </div>
                                )}
                                {activeToolbarTab === 'giay' && (
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs font-semibold text-black/50 mb-1 px-1">GIÀY</span>
                                        {[{ id: 'guoc', label: 'Guốc mộc' }, { id: 'giay-vai', label: 'Giày vải' }, { id: 'sneaker', label: 'Sneaker' }].map(h => (
                                            <button key={h.id} onClick={() => setShoesType(h.id)} className={`px-3 py-1.5 text-sm rounded text-left transition-colors ${shoesType === h.id ? 'bg-black text-giay-sang' : 'hover:bg-black/5 text-black/80'}`}>{h.label}</button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                        {/* Tab Buttons */}
                        <div className="flex bg-giay-do neo-border rounded shadow-md overflow-hidden font-heading text-lg">
                            <button onClick={() => setActiveToolbarTab(a => a === 'toc' ? 'none' : 'toc')} className={`px-4 py-2 transition-colors ${activeToolbarTab === 'toc' ? 'bg-black text-giay-sang' : 'hover:bg-black/5 text-black'}`}>Tóc</button>
                            <button onClick={() => setActiveToolbarTab(a => a === 'phukien' ? 'none' : 'phukien')} className={`px-4 py-2 border-l border-black transition-colors ${activeToolbarTab === 'phukien' ? 'bg-black text-giay-sang' : 'hover:bg-black/5 text-black'}`}>Phụ Kiện</button>
                            <button onClick={() => setActiveToolbarTab(a => a === 'giay' ? 'none' : 'giay')} className={`px-4 py-2 border-l border-black transition-colors ${activeToolbarTab === 'giay' ? 'bg-black text-giay-sang' : 'hover:bg-black/5 text-black'}`}>Giày</button>
                        </div>
                    </div>

                    {/* Character Podium (Bục giấy hình elip) */}
                    <div className="absolute top-[86%] left-1/2 -translate-x-1/2 w-[220px] h-[30px] bg-giay-sang rounded-[100%] neo-border shadow-[0_6px_12px_rgba(0,0,0,0.25)] z-10" />

                    {/* Character Wrapper (Stepping out of frame, white sticker border, offset shadow) */}
                    <div
                        className="absolute bottom-[2%] left-1/2 w-full max-w-sm h-[78%] flex items-end justify-center pointer-events-none transition-transform duration-300 z-30"
                        style={{
                            transform: step === 4 ? 'translateX(-50%) scale(1.05) translateY(10px)' : 'translateX(-50%) scale(1)',
                            filter: 'drop-shadow(4px 4px 0px var(--than)) drop-shadow(0 0 0px white) drop-shadow(0 0 2px white)'
                        }}
                    >
                        {/* The white border effect (using multi drop-shadow or SVG filter in real app, here CSS drop-shadow hack) */}
                        <div className="w-full h-full pointer-events-auto flex items-end justify-center" style={{ filter: 'drop-shadow(3px 0 0 white) drop-shadow(-3px 0 0 white) drop-shadow(0 3px 0 white) drop-shadow(0 -3px 0 white)' }}>
                            <Character gender={gender} layers={getLayers()} palette={PALETTES[paletteIdx]} hair={hairType} bangs={bangsType} styleMode={styleMode} />
                        </div>
                    </div>
                </div>

                {/* KHU PHẢI (WIZARD CỘT TRẢI NGHIỆM) */}
                <div className="flex-1 h-[50vh] lg:h-full bg-giay-do overflow-y-auto hidden-scrollbar flex flex-col relative">
                    <div className="p-6 lg:p-12 flex-1 flex flex-col min-h-max">
                        <AnimatePresence mode="wait">
                            <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1">
                                {step === 1 && <WizardStep1 scene={scene} setScene={setScene} />}
                                {step === 2 && <WizardStep2 core={core} setCore={setCore} gender={gender} onOpenInfo={(cId: string) => { setCultureCore(cId); setIsCultureOpen(true); }} />}
                                {step === 3 && <WizardStep3 paletteIdx={paletteIdx} setPaletteIdx={setPaletteIdx} style={style} setStyle={setStyle} />}
                                {step === 4 && <WizardStep4 remixLevel={remixLevel} setRemixLevel={setRemixLevel} styleMode={styleMode} setStyleMode={setStyleMode} />}
                            </motion.div>
                        </AnimatePresence>

                        <div className="mt-8 flex gap-4 w-full pt-4 border-t-2 border-than/10">
                            {step > 1 && (
                                <button onClick={() => setStep(step - 1)} className="neo-button-secondary aspect-square flex items-center justify-center p-0 w-14">
                                    <ArrowLeft size={24} />
                                </button>
                            )}
                            <button onClick={() => setStep(step + 1)} className="neo-button-primary flex-1 flex items-center justify-center gap-2 text-lg shadow-xl">
                                {step === 4 ? "XEM POSTER" : "TIẾP THEO"} <ArrowRight size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <MobilePillNav activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
    );
}

const Lotus = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 text-[#A8231A] ${className}`} fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M 20 5 C 25 15, 35 25, 20 35 C 5 25, 15 15, 20 5 Z" fill="#FBF5E9" />
        <path d="M 20 5 C 30 15, 45 20, 20 35" />
        <path d="M 20 5 C 10 15, -5 20, 20 35" />
    </svg>
);

const Petal = ({ delay, startX, endX }: { delay: number, startX: number, endX: number }) => (
    <motion.svg
        viewBox="0 0 20 20"
        className="absolute w-4 h-4 text-[#A8231A] opacity-60 pointer-events-none"
        initial={{ y: -50, x: startX, rotate: 0, opacity: 0 }}
        animate={{ y: '100vh', x: endX, rotate: 360, opacity: [0, 1, 1, 0] }}
        transition={{ duration: 15, delay, repeat: Infinity, ease: 'linear' }}
        fill="currentColor"
    >
        <path d="M10 0 C15 5 18 10 10 20 C2 10 5 5 10 0Z" />
    </motion.svg>
);

const WelcomeScreen = ({ onStart, onStartConfig, onOpenCulture }: { onStart: () => void, onStartConfig: (config: any) => void, onOpenCulture: (core: string) => void }) => {
    const [status, setStatus] = useState<'closed' | 'opening' | 'opened'>('closed');
    const [logoError, setLogoError] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.onload = () => console.log('Logo loaded successfully: /brand/logo-soi-nguon.png');
        img.onerror = () => {
            console.warn('Logo failed to load: /brand/logo-soi-nguon.png. Falling back to monogram SN.');
            setLogoError(true);
        };
        img.src = '/brand/logo-soi-nguon.png';
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (status === 'closed' && (e.key === 'Enter' || e.key === ' ')) {
                handleOpen();
            } else if (status === 'opened' && e.key === 'Escape') {
                setStatus('closed');
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [status]);

    const handleOpen = () => {
        if (status !== 'closed') return;
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) {
            setStatus('opened');
        } else {
            setStatus('opening');
            setTimeout(() => setStatus('opened'), 2000);
        }
    };

    return (
        <div className={`h-[100dvh] relative flex flex-col items-center justify-center w-full overflow-hidden transition-colors duration-1000 ${status === 'opened' ? 'bg-[#EAE0D3]' : 'bg-[#EADFC8]'} text-[#1A1410] font-sans selection:bg-[#B3261E] selection:text-white`}>
            
            {/* Texture */}
            <div className="absolute inset-0 w-full h-full pointer-events-none mix-blend-multiply opacity-[0.06]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
            
            {/* ENVELOPE */}
            <AnimatePresence>
                {status !== 'opened' && (
                    <motion.div 
                        className="absolute inset-0 flex items-center justify-center z-10"
                        exit={{ opacity: 0, transition: { duration: 0.4 } }}
                    >
                        <div className="relative w-[86vw] md:w-[520px] aspect-[3/2]" style={{ perspective: '1200px' }}>
                            <div className="absolute inset-0 bg-[#D4C3A3] rounded-sm shadow-md z-10" />
                            <div className="absolute inset-0 bg-[#E3D4B6] rounded-sm shadow-sm z-20" style={{ clipPath: 'polygon(0 0, 50% 45%, 100% 0, 100% 100%, 0 100%)' }} />
                            
                            <motion.div
                                className="absolute top-0 left-0 w-full h-[60%] bg-[#E3D4B6] rounded-sm z-40 origin-top shadow-sm border-b border-[#1A1410]/5"
                                style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)', rotate: -2 }}
                                initial={false}
                                animate={status === 'opening' ? { rotateX: -180, zIndex: 15 } : { rotateX: 0, zIndex: 40 }}
                                transition={{ duration: 0.7 }}
                            />

                            <motion.button
                                onClick={handleOpen}
                                aria-label="Mở thư"
                                className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 focus:outline-none focus:ring-4 focus:ring-[#B3261E]/30 rounded-full"
                                animate={{ rotate: -2 }}
                            >
                                <motion.div 
                                    className="relative w-[100px] h-[100px] md:w-[120px] md:h-[120px]"
                                    animate={status === 'opening' ? { scale: 1.2, opacity: 0 } : { scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className="absolute inset-0 bg-[#B3261E] rounded-full shadow-md flex items-center justify-center">
                                        {!logoError ? (
                                            <div className="w-[70%] h-[70%] bg-[#FBF5E9] opacity-90" style={{ maskImage: "url('/brand/logo-soi-nguon.png')", maskSize: "contain", maskPosition: "center", maskRepeat: "no-repeat", WebkitMaskImage: "url('/brand/logo-soi-nguon.png')", WebkitMaskSize: "contain", WebkitMaskPosition: "center", WebkitMaskRepeat: "no-repeat" }} />
                                        ) : (
                                            <span className="font-display font-bold text-4xl text-[#FBF5E9]">SN</span>
                                        )}
                                    </div>
                                </motion.div>
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* THE LETTER PAPER */}
            <div className={`absolute inset-0 flex items-center justify-center z-20 pointer-events-none p-4 md:p-6 lg:p-8 ${status === 'opened' ? 'overflow-y-auto pointer-events-auto' : ''}`}>
                <motion.div
                    className="bg-[#FBF6EE] text-[#2B2118] relative flex flex-col w-full max-w-[1024px] rounded-lg shadow-2xl shadow-[#2B2118]/20 shrink-0 overflow-hidden"
                    initial={{ y: 0, opacity: 0, scale: 0.8, height: '300px', width: '500px' }}
                    animate={
                        status === 'closed' ? { opacity: 0, scale: 0.8, y: 0, height: '300px', width: '500px' } :
                        status === 'opening' ? { opacity: [0, 1, 1], scale: [0.8, 1, 1], y: [0, -100, 0], width: ['500px', '500px', '100%'], height: ['300px', '300px', '100%'] } :
                        { opacity: 1, scale: 1, y: 0, width: '100%', height: 'auto', minHeight: '580px' }
                    }
                    transition={status === 'opening' ? { duration: 1.6, times: [0, 0.4, 1], ease: [0.22, 1, 0.36, 1], delay: 0.4 } : { duration: 0 }}
                >
                    {status === 'opened' && (
                        <div className="w-full h-full px-6 py-8 md:p-12 lg:p-16 relative flex flex-col md:flex-row gap-8 lg:gap-12 items-center min-h-[580px]">
                            
                            {/* Watermark Logo */}
                            <div className="absolute -bottom-12 -left-12 w-[300px] h-[300px] md:w-[350px] md:h-[350px] opacity-[0.03] pointer-events-none transform -rotate-12 mix-blend-multiply">
                                <div className="w-full h-full bg-[#2B2118]" style={{ maskImage: "url('/brand/logo-soi-nguon.png')", maskSize: "contain", maskPosition: "center", maskRepeat: "no-repeat", WebkitMaskImage: "url('/brand/logo-soi-nguon.png')", WebkitMaskSize: "contain", WebkitMaskPosition: "center", WebkitMaskRepeat: "no-repeat" }} />
                            </div>

                            {/* LEFT COLUMN: Letter Content */}
                            <div className="w-full md:w-1/2 flex flex-col items-start z-10 relative">
                                {/* Logo Stamp */}
                                <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-start opacity-80 mix-blend-multiply mb-3">
                                    {!logoError ? (
                                        <div className="w-full h-full bg-[#B3261E]" style={{ maskImage: "url('/brand/logo-soi-nguon.png')", maskSize: "contain", maskPosition: "left center", maskRepeat: "no-repeat", WebkitMaskImage: "url('/brand/logo-soi-nguon.png')", WebkitMaskSize: "contain", WebkitMaskPosition: "left center", WebkitMaskRepeat: "no-repeat" }} />
                                    ) : (
                                        <span className="font-display font-bold text-3xl text-[#B3261E]">SN</span>
                                    )}
                                </div>

                                {/* Heading with SMOOTH RED THREAD connection */}
                                <h1 className="font-display text-5xl md:text-6xl lg:text-7xl tracking-tight mb-6 flex items-center flex-wrap">
                                    <span className="text-[#2B2118]">Sợi</span>
                                    {/* Curved Red Thread SVG */}
                                    <div className="mx-1 md:mx-3 flex items-center justify-center w-12 h-6 md:w-16 md:h-8 overflow-visible mt-2">
                                        <svg viewBox="0 0 50 20" className="w-full h-full overflow-visible">
                                            <motion.path 
                                                d="M 0,10 C 15,0 35,20 50,10" 
                                                fill="none" 
                                                stroke="#B3261E" 
                                                strokeWidth="2.5"
                                                strokeLinecap="round"
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 1 }}
                                                transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                                            />
                                        </svg>
                                    </div>
                                    <span className="text-[#B3261E] italic pr-2 font-bold drop-shadow-sm">Nguồn</span>
                                </h1>
                                
                                <div className="font-display text-base md:text-lg text-[#4A3F35] leading-loose mb-8 max-w-lg">
                                    <p className="mb-3 md:mb-4 italic text-[#2B2118]/80">Bạn thân mến,</p>
                                    <p className="mb-3 md:mb-4 font-sans not-italic text-sm md:text-base">
                                        Mặc truyền thống. Sống Gen Z. Khám phá và phối lại những tà cổ phục Việt Nam theo phong cách của riêng bạn mà vẫn giữ trọn vẹn hồn dân tộc.
                                    </p>
                                    <p className="font-sans not-italic text-sm md:text-base">
                                        Hãy lật mở những trang bưu thiếp đính kèm và chọn cho mình một tà áo xưa.
                                    </p>
                                </div>
                                
                                <button 
                                    onClick={onStart}
                                    className="group relative inline-flex items-center justify-center px-8 md:px-10 py-3 md:py-4 bg-[#B3261E] text-white rounded-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-[#B3261E]/30"
                                >
                                    <span className="relative z-10 font-medium tracking-wide text-sm md:text-base">Bắt đầu phối đồ</span>
                                </button>
                            </div>

                            {/* RIGHT COLUMN: Polaroids & Background Thread */}
                            <div className="w-full md:w-1/2 relative min-h-[400px] md:min-h-[450px] flex items-center justify-center z-10 mt-8 md:mt-0">
                                
                                {/* Background Red Thread connecting the Polaroids - SMOOTH S-CURVE */}
                                <div className="absolute inset-0 pointer-events-none z-0 opacity-70">
                                    <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                                        <motion.path 
                                            d="M 5,10 C 60,-20 110,40 50,55 C -10,70 50,120 95,90" 
                                            fill="none" 
                                            stroke="#B3261E" 
                                            strokeWidth="1.2"
                                            strokeLinecap="round"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
                                        />
                                    </svg>
                                </div>
                                
                                {/* Polaroid 1 (Hanoi) */}
                                <div 
                                    className="absolute top-0 right-4 md:right-8 w-[150px] md:w-[180px] bg-white p-2 pb-8 md:p-3 md:pb-10 shadow-xl shadow-[#2B2118]/15 -rotate-6 hover:rotate-0 z-10 hover:z-40 transition-all duration-300 cursor-pointer"
                                    onClick={() => onStartConfig({ scene: 'hanoi', core: 'ao-tu-than', gender: 'female' })}
                                >
                                    <div className="absolute -top-3 left-1/3 -translate-x-1/2 w-8 h-4 bg-white/50 backdrop-blur-sm border border-black/5 rotate-3 shadow-sm" />
                                    
                                    <img 
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU9PG7oZtL6qVrZi_vpe2YPIBk7LtNffiozhvu9tYXeNe8zUdAl21ZRxo&s=10" 
                                        alt="Hanoi Old Quarter" 
                                        className="w-full aspect-[4/5] object-cover bg-[#EAE0D3]"
                                    />
                                    <div className="absolute bottom-2 left-0 w-full text-center">
                                        <span className="font-display italic text-[#2B2118]/60 text-xs md:text-sm">Bắc Bộ - Áo Tứ Thân</span>
                                    </div>
                                </div>

                                {/* Polaroid 2 (Hue) */}
                                <div 
                                    className="absolute top-16 md:top-20 left-2 md:left-6 w-[160px] md:w-[190px] bg-white p-2 pb-8 md:p-3 md:pb-10 shadow-2xl shadow-[#2B2118]/20 rotate-3 z-20 hover:rotate-0 hover:z-40 transition-all duration-300 cursor-pointer"
                                    onClick={() => onStartConfig({ scene: 'hue', core: 'ao-ngu-than', gender: 'female' })}
                                >
                                    <div className="absolute -top-3 right-1/4 w-8 h-5 bg-white/50 backdrop-blur-sm border border-black/5 -rotate-3 shadow-sm" />
                                    
                                    <img 
                                        src="https://file.huengaynay.vn/data2/image/fckeditor/upload/2020/20200326/images/ao-dai.jpg" 
                                        alt="Hue" 
                                        className="w-full aspect-square object-cover bg-[#EAE0D3]"
                                    />
                                    <div className="absolute bottom-2 left-0 w-full text-center">
                                        <span className="font-display italic text-[#2B2118]/60 text-xs md:text-sm">Huế - Nhật Bình</span>
                                    </div>
                                </div>

                                {/* Polaroid 3 (Saigon) */}
                                <div 
                                    className="absolute top-36 md:top-48 right-0 md:right-4 w-[170px] md:w-[200px] bg-white p-2 pb-8 md:p-3 md:pb-10 shadow-2xl shadow-[#2B2118]/25 -rotate-2 z-30 hover:rotate-0 hover:z-40 transition-all duration-300 cursor-pointer"
                                    onClick={() => onStartConfig({ scene: 'saigon', core: 'ao-ba-ba', gender: 'female' })}
                                >
                                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-5 bg-white/50 backdrop-blur-sm border border-black/5 -rotate-1 shadow-sm" />
                                    
                                    <img 
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_PMqQvm5Z2gI3Ht_pGzaUGJGllHc4HCN9h2nmdus5dRipAShAoTXRnmv_&s=10" 
                                        alt="Saigon" 
                                        className="w-full aspect-[4/5] object-cover bg-[#EAE0D3]"
                                    />
                                    <div className="absolute bottom-2 left-0 w-full text-center">
                                        <span className="font-display italic text-[#2B2118]/60 text-xs md:text-sm">Nam Bộ - Áo Bà Ba</span>
                                    </div>
                                </div>

                            </div>

                            {/* BOTTOM OF LETTER LINKS */}
                            <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 md:gap-4 z-10 w-full px-8 mt-10 md:mt-0">
                                <button onClick={() => setStatus('closed')} className="text-xs text-[#2B2118]/40 hover:text-[#B3261E] underline underline-offset-4 italic transition-colors">
                                    Gấp thư lại
                                </button>
                                
                                <div className="hidden md:flex gap-8 border-t border-[#2B2118]/10 pt-3 md:pt-4 w-full justify-center max-w-xs">
                                    <button className="uppercase text-[10px] tracking-widest text-[#2B2118]/60 hover:text-[#B3261E] transition-colors font-bold">Về dự án</button>
                                    <button className="uppercase text-[10px] tracking-widest text-[#2B2118]/60 hover:text-[#B3261E] transition-colors font-bold">Bạn có biết?</button>
                                </div>
                            </div>

                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};
export default function App() {
    const [started, setStarted] = useState(false);
    const [initialConfig, setInitialConfig] = useState<any>(null);
    const [isCultureOpen, setIsCultureOpen] = useState(false);
    const [cultureCore, setCultureCore] = useState('ao-tu-than');
    
    return (
        <div className="w-full h-screen font-sans text-than overflow-hidden">
            {window.location.pathname === '/studio-do' ? (
                <StudioDo />
            ) : (
                <AnimatePresence mode="wait">
                    {!started ? (
                        <motion.div key="welcome" exit={{ opacity: 0, y: -50 }} className="w-full h-full">
                            <WelcomeScreen onStart={() => setStarted(true)} onStartConfig={(config) => { setInitialConfig(config); setStarted(true); }} onOpenCulture={(core) => { setCultureCore(core); setIsCultureOpen(true); }} />
                            <CultureCard isOpen={isCultureOpen} onClose={() => setIsCultureOpen(false)} outfitName={COSTUMES.find(c => c.id === cultureCore)?.name || 'Việt Phục'} core={cultureCore} />
                        </motion.div>
                    ) : (
                        <motion.div key="main" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="w-full h-full">
                            <MainLayout onReset={() => setStarted(false)} initialConfig={initialConfig} />
                        </motion.div>
                    )}
                </AnimatePresence>
            )}
        </div>
    );
}
