import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Compass, Camera, BookOpen, Sun, Moon, ArrowRight, ArrowLeft, X, Calendar, Share2, MapPin } from 'lucide-react';
import { Character, type DollLayers } from './components/PaperDoll';
import { StageBackground } from './components/Stage';
import { GuardStamp, GuardModal } from './components/CulturalGuard';
import { CultureCard } from './components/CultureCard';
import { Lookbook } from './components/Lookbook';
import { BookOfOutfits } from './components/BookOfOutfits';
import { Explore } from './components/Explore';
import { SmartImage } from './components/SmartImage';
import { StudioDo } from './components/StudioDo';
import { AiGenerationModal } from './components/AiGenerationModal';
import CalendarTab from './components/CalendarTab';
import * as htmlToImage from 'html-to-image';
import { ShareCard } from './components/ShareCard';
import Step1GenderHair from './components/wizard-steps/Step1GenderHair';
import Step2Place from './components/wizard-steps/Step2Place';
import Step2bEvent from './components/wizard-steps/Step2bEvent';
import Step3Top from './components/wizard-steps/Step3Top';
import Step5Accessories from './components/wizard-steps/Step5Accessories';
import Step6Mode from './components/wizard-steps/Step6Mode';
import CulturalGuardAlert from './components/CulturalGuardAlert';
import type { WardrobeState } from './components/WardrobeWizard';
import { StylistInput } from './components/StylistInput';
import type { StylistResponse } from './services/stylistService';
import TroVeCoiNguon from './components/TroVeCoiNguon';
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
        <div className="w-16 h-16 flex items-center justify-center mb-10 mt-2 cursor-pointer hover:scale-105 transition-transform" onClick={onHome}>
            <img src="/brand/logo-soi-nguon.png" alt="Sợi Nguồn" className="w-full h-full object-contain mix-blend-multiply opacity-90" onError={(e) => { e.currentTarget.style.display = 'none'; (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'block'; }} />
            <span className="hidden font-display text-2xl text-than font-bold">SN</span>
        </div>

        <div className="flex flex-col gap-8 items-center flex-1 w-full px-2">
            <button onClick={() => setActiveTab('phoi')} className={`flex flex-col items-center gap-1 group transition-colors w-full ${activeTab === 'phoi' ? 'text-son' : 'text-than hover:text-son'}`}><Sparkles size={24} className="group-hover:scale-110 transition-transform" /><span className="font-label text-[10px] text-center leading-tight">PHỐI ĐỒ</span></button>
            <button onClick={() => setActiveTab('kham')} className={`flex flex-col items-center gap-1 group transition-colors w-full ${activeTab === 'kham' ? 'text-son' : 'text-than hover:text-son'}`}><Compass size={24} className="group-hover:scale-110 transition-transform" /><span className="font-label text-[10px] text-center leading-tight">KHÁM PHÁ</span></button>
            <button onClick={() => setActiveTab('look')} className={`flex flex-col items-center gap-1 group transition-colors w-full ${activeTab === 'look' ? 'text-son' : 'text-than hover:text-son'}`}><Camera size={24} className="group-hover:scale-110 transition-transform" /><span className="font-label text-[10px] text-center leading-tight">LOOKBOOK</span></button>
            <button onClick={() => setActiveTab('lich')} className={`flex flex-col items-center gap-1 group transition-colors w-full ${activeTab === 'lich' ? 'text-son' : 'text-than hover:text-son'}`}><Calendar size={24} className="group-hover:scale-110 transition-transform" /><span className="font-label text-[10px] text-center leading-tight">LỊCH TRÌNH</span></button>
            <button onClick={() => setActiveTab('hoc')} className={`flex flex-col items-center gap-1 group transition-colors w-full ${activeTab === 'hoc' ? 'text-son' : 'text-than hover:text-son'}`}><BookOpen size={24} className="group-hover:scale-110 transition-transform" /><span className="font-label text-[10px] text-center leading-tight">HỌC &<br />GIẢI PHÁP</span></button>
            <button onClick={() => setActiveTab('hanhtrinh')} className={`flex flex-col items-center gap-1 group transition-colors w-full ${activeTab === 'hanhtrinh' ? 'text-son' : 'text-than hover:text-son'}`}><MapPin size={24} className="group-hover:scale-110 transition-transform" /><span className="font-label text-[10px] text-center leading-tight">HÀNH TRÌNH<br />ĐẠI SỨ</span></button>
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
        <button onClick={() => setActiveTab('lich')} className={`flex flex-col items-center ${activeTab === 'lich' ? 'text-son' : 'text-giay-sang/60 hover:text-giay-sang'}`}><Calendar size={20} /></button>
        <button onClick={() => setActiveTab('hoc')} className={`flex flex-col items-center ${activeTab === 'hoc' ? 'text-son' : 'text-giay-sang/60 hover:text-giay-sang'}`}><BookOpen size={20} /></button>
        <button onClick={() => setActiveTab('hanhtrinh')} className={`flex flex-col items-center ${activeTab === 'hanhtrinh' ? 'text-son' : 'text-giay-sang/60 hover:text-giay-sang'}`}><MapPin size={20} /></button>
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
    { id: 'ao-tu-than', name: 'TỨ THÂN', diff: 4, slot: 'costume-ao-tu-than' },
    { id: 'ao-ngu-than', name: 'NGŨ THÂN', diff: 3, slot: 'costume-ao-ngu-than' },
    { id: 'ao-ba-ba', name: 'BÀ BA', diff: 1, slot: 'costume-ao-ba-ba' },
    // Hidden costumes (keep data)
    // {id: 'ao-dai', name: 'ÁO DÀI', diff: 2, slot: 'costume-ao-dai'},
    // {id: 'ao-nhat-binh', name: 'NHẬT BÌNH', diff: 5, slot: 'costume-ao-nhat-binh'},
    // {id: 'ao-giao-linh', name: 'GIAO LĨNH', diff: 4, slot: 'costume-ao-giao-linh'},
    // {id: 'ao-tac', name: 'ÁO TẤC', diff: 3, slot: 'costume-ao-tac'},
    // {id: 'ao-the', name: 'ÁO THE NAM', diff: 2, slot: 'costume-ao-the'},
    // {id: 'ao-canh', name: 'ÁO CÁNH', diff: 2, slot: 'costume-ao-canh'},
    // {id: 'yem', name: 'YẾM VÁY', diff: 3, slot: 'costume-yem'},
    // {id: 'ao-chen', name: 'ÁO CHẼN', diff: 4, slot: 'costume-ao-chen'},
    // {id: 'ao-mang-bao', name: 'MẠNG BÀO', diff: 5, slot: 'costume-ao-mang-bao'},
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
                                <Character gender={gender} layers={{ top: c.id, headwear: gender === 'male' && c.id === 'ao-tu-than' ? 'khan-xep' : undefined }} palette={["#A8231A", "#1B2A5C", "#E3A72F"]} />
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
const ResultPoster = ({ onBack, onSave, scene, layers, palette, core, style, gender, styleMode, remixLevel, hair, cultureNote }: any) => {
    const [isGuardOpen, setIsGuardOpen] = useState(false);
    const [isCultureOpen, setIsCultureOpen] = useState(false);
    const [isAiModalOpen, setIsAiModalOpen] = useState(false);
    const [attemptsLeft, setAttemptsLeft] = useState(5);
    const shareRef = useRef<HTMLDivElement>(null);

    const handleShare = async () => {
        if (shareRef.current) {
            try {
                const dataUrl = await htmlToImage.toJpeg(shareRef.current, { quality: 0.95 });
                const link = document.createElement('a');
                link.download = `soinguon-${core.toLowerCase()}-${Date.now()}.jpg`;
                link.href = dataUrl;
                link.click();
            } catch (err) {
                console.error('Lỗi khi xuất ảnh', err);
            }
        }
    };

    // Dynamic guard level based on remix level
    let guardLevel: 'green' | 'yellow' | 'red' = 'green';
    let guardMessage: string | undefined = undefined;
    if (layers.shoes === 'sneaker' || layers.outer === 'blazer') guardLevel = 'yellow';
    if (layers.bottom === 'jeans' && layers.top === 'ao-tu-than') guardLevel = 'red';
    
    if (remixLevel && core === 'ao-tu-than' && gender === 'female') {
        if (remixLevel > 60) {
            guardLevel = 'red';
            guardMessage = "Cảnh báo văn hóa: Mức độ remix quá cao có thể làm mất đi đặc trưng của Áo Tứ Thân truyền thống.";
        } else {
            if (guardLevel === 'green') guardLevel = 'yellow'; // Don't override 'red' if it was set by something else like jeans
            guardMessage = "Lưu ý văn hóa: Sáng tạo rất thú vị, nhưng việc cách tân vẫn tiềm ẩn nguy cơ làm sai lệch một số chi tiết truyền thống nhỏ.";
        }
    }
    
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
        const stylePrefix = styleMode === 'traditional' ? 'phong cách Truyền thống' : 'phong cách Cách tân';

        return `Ảnh chụp thời trang chân thực phong cách tạp chí, ${characterDesc}, toàn thân, đứng ở ${sceneDesc}, mặc ${coreName} màu ${c1}, ${desc}, ${extraDesc.length > 0 ? 'kết hợp cùng ' + extraDesc.join(', ') : ''}. ${stylePrefix}, Vibe ${style}. Ánh sáng tự nhiên, nét ảnh sắc, độ sâu trường ảnh nhẹ. Không chữ, không logo, không thương hiệu, không giống người nổi tiếng, không phải kimono/hanbok/hanfu/sườn xám.`;
    };

    return (
        <div className="w-full h-full flex flex-col overflow-y-auto hidden-scrollbar relative bg-giay-do">
            <GuardModal isOpen={isGuardOpen} onClose={() => setIsGuardOpen(false)} level={guardLevel} message={guardMessage} />
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

            <button onClick={onBack} className="absolute top-4 left-4 z-40 w-10 h-10 border border-than/20 flex items-center justify-center rounded-full hover:bg-than/5 transition-colors bg-white/50 backdrop-blur-sm"><ArrowLeft size={20} /></button>

            <div className="w-full h-full flex flex-col lg:flex-row">
                {/* Left Side: Character Stage (Fixed on Desktop) */}
                <div className="w-full lg:w-[45%] h-[60vh] lg:h-full relative flex flex-col items-center justify-end overflow-hidden bg-giay-sang border-b lg:border-b-0 lg:border-r border-than/10 shrink-0">
                    {/* Scene Background - Faded, Blurred & Elegant */}
                    <div className="absolute inset-0 z-0 opacity-30 mix-blend-multiply blur-[2px] transition-all duration-1000" style={{ backgroundImage: `url(/images/places/${scene}.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'grayscale(40%) sepia(30%)' }}></div>
                    
                    {/* Beautiful Fade Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-giay-sang via-giay-sang/40 to-transparent z-0"></div>
                    
                    {/* Center Glow to highlight model */}
                    <div className="absolute inset-0 z-0 flex justify-center items-center pointer-events-none">
                        <div className="w-[300px] h-[500px] bg-white/40 blur-[50px] rounded-full"></div>
                    </div>
                    
                    {/* Arch Frame (Subtle Red Thread Frame) */}
                    <div className="absolute inset-4 lg:inset-8 border border-son/20 rounded-t-[120px] pointer-events-none z-10">
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-12 h-[1px] bg-son"></div>
                    </div>

                    {/* Character Wrapper - Anchored to bottom */}
                    <div className="relative w-full max-w-[400px] h-[85%] lg:h-[90%] flex items-end justify-center z-30 pb-4 lg:pb-8">
                        {/* Elegant Podium shadow */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[280px] h-[12px] bg-than/20 rounded-[100%] blur-[4px] z-0" />
                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[180px] h-[6px] bg-than/30 rounded-[100%] blur-[2px] z-0" />
                        
                        <div className="w-full h-full relative z-10 transition-transform duration-700 hover:scale-[1.03]" style={{ filter: 'drop-shadow(8px 12px 20px rgba(0,0,0,0.12))' }}>
                            <Character 
                                gender={gender}
                                hair={hair}
                                palette={palette}
                                layers={layers}
                                styleMode={styleMode}
                                remixLevel={remixLevel}
                            />
                        </div>
                    </div>

                    <GuardStamp level={guardLevel} onClick={() => setIsGuardOpen(true)} className="absolute top-4 right-4 z-40 scale-75 lg:scale-90 opacity-90 hover:opacity-100 transition-opacity" />
                </div>

                {/* Right Side: Typography & Information (Scrollable on Desktop) */}
                <div className="w-full lg:w-[55%] flex flex-col overflow-y-auto hidden-scrollbar bg-giay-do relative">
                    {/* Subtle Watermark or Texture could go here */}
                    <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>

                    <div className="px-6 py-12 lg:px-16 lg:py-20 flex flex-col gap-14 w-full max-w-3xl mx-auto relative z-10">
                        
                        {/* Header & Seals Row */}
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 relative">
                            {/* Title Area */}
                            <div className="flex-1 relative">
                                <div className="absolute -left-6 lg:-left-16 top-4 w-4 lg:w-8 h-[2px] bg-son"></div>
                                <div className="flex flex-col gap-3">
                                    <p className="font-label text-son uppercase tracking-[0.25em] text-[10px] font-bold flex items-center gap-2">
                                        <span>{coreName}</span>
                                        <span className="text-than/30">×</span>
                                        <span className="text-than/60">{style}</span>
                                    </p>
                                    <h2 className="font-display text-6xl md:text-7xl text-than m-0 leading-[0.95] tracking-tight drop-shadow-sm">{title}</h2>
                                    <span className={`inline-block mt-2 font-label text-[9px] tracking-[0.2em] uppercase border px-4 py-1.5 rounded-sm w-max ${styleMode === 'traditional' ? 'border-luc/40 bg-luc/5 text-luc' : 'border-son/40 bg-son/5 text-son'}`}>
                                        {styleMode === 'traditional' ? 'Truyền thống' : 'Cách tân'}
                                    </span>
                                </div>
                            </div>

                            {/* Traditional Seals */}
                            <div className="flex gap-5 items-start shrink-0">
                                <div 
                                    className="w-16 h-16 bg-white/50 backdrop-blur-sm rounded-sm border-[1.5px] border-son flex flex-col items-center justify-center rotate-3 hover:rotate-0 transition-transform cursor-pointer relative shadow-sm" 
                                    onClick={() => setIsCultureOpen(true)}
                                >
                                    <div className="absolute inset-[3px] border border-son/30 rounded-sm pointer-events-none"></div>
                                    <span className="font-display text-2xl text-son leading-none">95</span>
                                    <span className="font-label text-[7px] text-son text-center mt-1 leading-[1.2] tracking-widest font-bold">VĂN<br />HÓA</span>
                                </div>
                                <div 
                                    className="w-14 h-14 bg-white/50 backdrop-blur-sm rounded-full border-[1.5px] border-cham flex flex-col items-center justify-center -rotate-6 hover:rotate-0 transition-transform cursor-pointer relative shadow-sm" 
                                    onClick={() => setIsCultureOpen(true)}
                                >
                                    <div className="absolute inset-[3px] border border-cham/30 rounded-full pointer-events-none border-dashed"></div>
                                    <span className="font-display text-xl text-cham leading-none">90</span>
                                    <span className="font-label text-[6px] text-cham text-center mt-1 leading-[1.2] tracking-wider font-bold">HÀI HÒA</span>
                                </div>
                            </div>
                        </div>

                        {/* Outfit Components */}
                        <div className="border-t border-than/10 pt-10 mt-2">
                            <h3 className="font-label text-than/40 text-[10px] tracking-[0.25em] uppercase mb-6 flex items-center gap-3">
                                Thành Phần Trang Phục
                                <div className="h-[1px] flex-1 bg-than/5"></div>
                            </h3>
                            
                            {(() => {
                                const ITEM_NAMES: Record<string, string> = {
                                    'quan-lua': 'Quần Lụa',
                                    'vay-luy': 'Váy Lĩnh',
                                    'vay-dinh': 'Váy Đình',
                                    'jeans': 'Quần Jeans',
                                    'cargo': 'Quần Túi Hộp',
                                    'khoac-the': 'Áo Khoác The',
                                    'jacket': 'Áo Khoác Jacket',

                                    'khan-dong': 'Khăn Đóng',
                                    'non-quai-thao': 'Nón Quai Thao',
                                    'khan-ran': 'Khăn Rằn',
                                    'non-la': 'Nón Lá',
                                    'khan-xep': 'Khăn Xếp',
                                    'mu-bucket': 'Mũ Bucket',
                                    'kinh-ram': 'Kính Râm',
                                    'guoc': 'Guốc Mộc',
                                    'sneaker': 'Giày Sneaker',
                                    'giay-da': 'Giày Da',
                                    'combat-boot': 'Giày Combat'
                                };
                                const getName = (id: string) => ITEM_NAMES[id] || id;

                                return (
                                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                                        {/* Top */}
                                        <div className="bg-giay-do/50 neo-border p-3.5 flex flex-col gap-1 border border-than/20 shadow-sm relative group overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
                                            <span className="text-[8px] uppercase tracking-widest text-than/50 font-bold mb-1 relative z-10">Áo / Top</span>
                                            <span className="font-display text-lg text-than truncate relative z-10">{coreName}</span>
                                            <span className={`text-[8px] uppercase tracking-widest font-bold px-2 py-1 rounded-sm w-fit mt-1 relative z-10 ${styleMode === 'traditional' ? 'bg-luc/10 text-luc' : 'bg-vang/10 text-vang'}`}>
                                                {styleMode === 'traditional' ? 'Nguyên bản' : 'Biến tấu'}
                                            </span>
                                        </div>
                                        
                                        {/* Bottom */}
                                        {layers.bottom && (
                                            <div className="bg-giay-do/50 neo-border p-3.5 flex flex-col gap-1 border border-than/20 shadow-sm relative group overflow-hidden">
                                                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
                                                <span className="text-[8px] uppercase tracking-widest text-than/50 font-bold mb-1 relative z-10">Quần / Bottom</span>
                                                <span className="font-display text-lg text-than truncate relative z-10">{getName(layers.bottom)}</span>
                                                <span className={`text-[8px] uppercase tracking-widest font-bold px-2 py-1 rounded-sm w-fit mt-1 relative z-10 ${['jeans', 'cargo'].includes(layers.bottom) ? 'bg-vang/10 text-vang' : 'bg-luc/10 text-luc'}`}>
                                                    {['jeans', 'cargo'].includes(layers.bottom) ? 'Sáng tạo' : 'Nguyên bản'}
                                                </span>
                                            </div>
                                        )}
                                        
                                        {/* Outer */}
                                        {layers.outer && (
                                            <div className="bg-giay-do/50 neo-border p-3.5 flex flex-col gap-1 border border-than/20 shadow-sm relative group overflow-hidden">
                                                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
                                                <span className="text-[8px] uppercase tracking-widest text-than/50 font-bold mb-1 relative z-10">Khoác / Outer</span>
                                                <span className="font-display text-lg text-than truncate relative z-10">{getName(layers.outer)}</span>
                                                <span className="text-[8px] uppercase tracking-widest font-bold px-2 py-1 rounded-sm w-fit mt-1 bg-vang/10 text-vang relative z-10">Sáng tạo</span>
                                            </div>
                                        )}
                                        
                                        {/* Headwear */}
                                        {layers.headwear && (
                                            <div className="bg-giay-do/50 neo-border p-3.5 flex flex-col gap-1 border border-than/20 shadow-sm relative group overflow-hidden">
                                                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
                                                <span className="text-[8px] uppercase tracking-widest text-than/50 font-bold mb-1 relative z-10">Phụ kiện đầu</span>
                                                <span className="font-display text-lg text-than truncate relative z-10">{getName(layers.headwear)}</span>
                                                <span className={`text-[8px] uppercase tracking-widest font-bold px-2 py-1 rounded-sm w-fit mt-1 relative z-10 ${['mu-bucket', 'kinh-ram'].includes(layers.headwear) ? 'bg-vang/10 text-vang' : 'bg-luc/10 text-luc'}`}>
                                                    {['mu-bucket', 'kinh-ram'].includes(layers.headwear) ? 'Sáng tạo' : 'Nguyên bản'}
                                                </span>
                                            </div>
                                        )}
                                        
                                        {/* Shoes */}
                                        {layers.shoes && (
                                            <div className="bg-giay-do/50 neo-border p-3.5 flex flex-col gap-1 border border-than/20 shadow-sm relative group overflow-hidden">
                                                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
                                                <span className="text-[8px] uppercase tracking-widest text-than/50 font-bold mb-1 relative z-10">Giày / Shoes</span>
                                                <span className="font-display text-lg text-than truncate relative z-10">{getName(layers.shoes)}</span>
                                                <span className={`text-[8px] uppercase tracking-widest font-bold px-2 py-1 rounded-sm w-fit mt-1 relative z-10 ${['sneaker', 'combat-boot'].includes(layers.shoes) ? 'bg-vang/10 text-vang' : 'bg-luc/10 text-luc'}`}>
                                                    {['sneaker', 'combat-boot'].includes(layers.shoes) ? 'Sáng tạo' : 'Nguyên bản'}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                );
                            })()}
                        </div>

                        {/* Styling Tip - Premium Glassmorphism Card */}
                        <div className="backdrop-blur-md bg-white/40 p-6 lg:p-8 border-l-[3px] border-cham shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-r-lg relative overflow-hidden mb-6">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-cham/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                            <h3 className="font-label text-cham text-[10px] tracking-[0.25em] uppercase mb-3 flex items-center gap-2">
                                <Sparkles size={12} className="text-cham" />
                                Góc Nhìn Trẻ (Styling Tip)
                            </h3>
                            <p className="text-than/80 font-medium leading-[1.8] text-sm lg:text-base relative z-10">
                                {cultureNote}
                            </p>
                        </div>
                    </div>

                    {/* Action Buttons - Sticky at the bottom */}
                    <div className="sticky bottom-0 bg-gradient-to-t from-giay-do via-giay-do to-transparent pt-12 pb-6 px-6 lg:px-16 w-full z-50">
                        <div className="max-w-3xl mx-auto flex flex-col gap-4">
                            <button 
                                onClick={() => setIsCultureOpen(true)} 
                                className="w-full text-left p-6 border border-than/10 hover:border-son/40 transition-all duration-300 group relative overflow-hidden bg-white/60 hover:bg-white/90 rounded-sm shadow-sm hover:shadow-md"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-son/5 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-[3] transition-transform duration-700 z-0"></div>
                                <div className="relative z-10 flex items-center justify-between">
                                    <div>
                                        <h3 className="font-label text-son text-[9px] tracking-[0.25em] uppercase mb-1.5 opacity-80 group-hover:opacity-100 transition-opacity">Mảnh ghép văn hóa</h3>
                                        <p className="font-display text-xl text-than">Tìm hiểu nguồn gốc bộ trang phục</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-giay-sang flex items-center justify-center text-than group-hover:bg-son group-hover:text-white transition-all shadow-sm">
                                        <ArrowRight size={16} />
                                    </div>
                                </div>
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button 
                                    onClick={() => setIsAiModalOpen(true)} 
                                    className="bg-gradient-to-r from-son to-[#8b231a] shadow-lg shadow-son/20 text-white py-4 px-6 font-label uppercase tracking-[0.2em] text-xs hover:shadow-son/40 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 rounded-sm"
                                >
                                    <Camera size={14} />
                                    Tạo Ảnh Thực Tế (AI)
                                </button>
                                
                                <div className="flex gap-4">
                                    <button onClick={onSave} className="flex-[3] bg-white border border-than/10 text-than py-4 font-label uppercase tracking-[0.2em] text-xs hover:border-than/30 hover:bg-giay-sang transition-all rounded-sm shadow-sm">
                                        Lưu Lookbook
                                    </button>
                                    <button onClick={handleShare} className="flex-[1] bg-white border border-than/10 text-than flex items-center justify-center hover:border-than/30 hover:bg-giay-sang transition-all rounded-sm shadow-sm text-than/70 hover:text-son">
                                        <Share2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <ShareCard 
                        ref={shareRef}
                        gender={gender}
                        layers={layers}
                        palette={palette}
                        styleMode={styleMode}
                        coreName={coreName}
                        style={style}
                        title={title}
                        cultureNote={cultureNote}
                        isAI={styleMode === 'modern'}
                    />
                </div>
            </div>
        </div>
    );
};


const MainLayout = ({ onReset, initialConfig }: { onReset: () => void, initialConfig?: any }) => {
    const [activeTab, setActiveTab] = useState('phoi');
    const [myLooks, setMyLooks] = useState<any[]>([]);
    const [step, setStep] = useState(initialConfig ? 3 : 1);

    const [guardMessage, setGuardMessage] = useState<string | null>(null);
    const [aiReasoning, setAiReasoning] = useState<string | null>(null);
    const [aiPrompt, setAiPrompt] = useState<string | null>(null);
    const [wizardInitialPrompt, setWizardInitialPrompt] = useState<string | null>(null);
    const [wardrobeState, setWardrobeState] = useState<WardrobeState>({
        gender: initialConfig?.gender || 'female',
        hair: 'Tóc xõa dài',
        place: initialConfig?.scene === 'saigon' ? 'Sài Gòn' : (initialConfig?.scene === 'hue' ? 'Huế' : 'Hà Nội'),
        top: initialConfig?.core || 'ao-tu-than',
        topColor: 'default',
        bottom: 'quan-lua',
        accessories: [],
        mode: 'traditional'
    });

    const handleStylistApply = (res: StylistResponse, promptUsed: string) => {
        updateWardrobeState({
            gender: res.gender as any,
            place: res.region === 'bac' ? 'Hà Nội' : (res.region === 'hue' ? 'Huế' : 'Sài Gòn'),
            top: res.top,
            bottom: res.bottom,
            accessories: [...res.accessories, res.shoes].filter(Boolean),
            mode: res.mode,
            topColor: 'default' // Tạm thời dùng màu mặc định vì file ảnh là đuôi chữ (purple, teal...) chứ không phải HEX
        });
        setAiReasoning(res.reasoning);
        setAiPrompt(promptUsed);
        setWizardInitialPrompt(null);
        setStep(3);
    };

    const updateWardrobeState = (updates: Partial<WardrobeState>) => {
        setWardrobeState(prev => ({ ...prev, ...updates }));
    };

    const gender = wardrobeState.gender;
    const styleMode = wardrobeState.mode;
    const placeMap: Record<string, string> = {
        'Hà Nội': 'ha-noi',
        'Huế': 'hue',
        'Sài Gòn': 'sai-gon',
        'Ninh Bình': 'ninh-binh',
        'Bắc Ninh': 'bac-ninh',
        'Hà Giang': 'ha-giang',
        'Tuyên Quang': 'tuyen-quang',
        'Quảng Ninh': 'quang-ninh',
        'Đà Nẵng': 'da-nang',
        'Hội An': 'hoi-an',
        'Cà Mau': 'ca-mau',
        'Đà Lạt': 'da-lat'
    };
    const scene = placeMap[wardrobeState.place] || 'ha-noi';
    const stageTitleVal = wardrobeState.top === 'tu-than' ? 'TỨ THÂN' : wardrobeState.top === 'ao-the' ? 'ÁO THE' : wardrobeState.top === 'ngu-than' ? 'NGŨ THÂN' : 'BÀ BA';
    
    // Fallbacks for ResultPoster
    const core = wardrobeState.top;
    const style = wardrobeState.mode === 'traditional' ? 'Truyền thống' : 'Cách tân';
    const hairType = wardrobeState.hair;
    const paletteIdx = 0;

    const [isCultureOpen, setIsCultureOpen] = useState(false);
    const [cultureCore, setCultureCore] = useState('ao-tu-than');

    // Cleaned up old effects since logic is moved to 6-step wizard

    const getLayers = (): DollLayers => {
        const acc = wardrobeState.accessories;
        let headwear = 'none';

        if (acc.includes('khan-dong')) headwear = 'khan-dong';
        if (acc.includes('non-quai-thao')) headwear = 'non-quai-thao';
        if (acc.includes('khan-ran')) headwear = 'khan-ran';
        if (acc.includes('non-la')) headwear = 'non-la';
        if (acc.includes('khan-xep')) headwear = 'khan-xep';
        if (acc.includes('mu-bucket')) headwear = 'mu-bucket';
        
        let shoes = 'none';
        if (acc.includes('guoc')) shoes = 'guoc';
        if (acc.includes('sneaker')) shoes = 'sneaker';
        if (acc.includes('giay-da')) shoes = 'giay-da';
        
        if (step <= 2) {
            return {
                top: 'underwear',
                bottom: 'none',
                outer: undefined,
                shoes: 'none',
                headwear: 'none',
            };
        }
        
        return {
            top: wardrobeState.top,
            topColor: wardrobeState.topColor,
            bottom: wardrobeState.bottom,
            outer: undefined,
            accessories: step >= 4 ? wardrobeState.accessories : [],
            shoes: step >= 4 ? (shoes === 'none' ? undefined : shoes) : undefined,
            headwear: step >= 4 ? (headwear === 'none' ? undefined : headwear) : undefined,
        };
    };

    const getStageTitle = () => {
        if (step < 3) return '';
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

    const handleTryOnLookbook = (lookConfig: any) => {
        setWardrobeState(prev => ({
            ...prev,
            region: lookConfig.place ? (
                lookConfig.place === 'Huế' ? 'MIEN_TRUNG' :
                lookConfig.place === 'Hà Nội' ? 'MIEN_BAC' :
                lookConfig.place === 'Bắc Ninh' ? 'MIEN_BAC' :
                lookConfig.place === 'Sài Gòn' ? 'MIEN_NAM' : prev.region
            ) : prev.region,
            top: lookConfig.topId || prev.top,
            mode: lookConfig.mode || 'traditional',
            gender: lookConfig.gender || prev.gender,
        }));
        
        setStep(3); // Jump to top selection
        setActiveTab('phoi'); // Switch to phoi do tab
    };

    const handleSuggestOutfit = (prompt: string) => {
        setWizardInitialPrompt(prompt);
        setStep(1);
        setActiveTab('phoi');
    };

    const handleSaveLookbook = () => {
        const newLook = {
            id: Date.now(),
            name: `${COSTUMES.find(c => c.id === core)?.name || 'Trang Phục'} Của Tôi`,
            style: `${styleMode === 'traditional' ? 'Nguyên bản' : 'Cách tân'}`,
            score: Math.floor(Math.random() * (99 - 90 + 1)) + 90,
            color: 'bg-son',
            rotate: 'rotate-0',
            isCustom: true,
            layers: getLayers(),
            gender: gender,
            hair: hairType,
            palette: PALETTES[paletteIdx],
            styleMode: styleMode,
            scene: scene,
        };
        setMyLooks(prev => [newLook, ...prev]);
        
        // Reset state để tạo cái mới
        setStep(1);
        setWardrobeState({
            gender: 'female',
            hair: 'Tóc xõa dài',
            place: 'Hà Nội',
            top: 'ao-tu-than',
            topColor: 'default',
            bottom: 'quan-lua',
            accessories: [],
            mode: 'traditional'
        });
        setWizardInitialPrompt(null);
        setAiReasoning(null);
        setGuardMessage(null);
        
        setActiveTab('look');
    };

    const handleUpdateLookbook = (id: number, updates: any) => {
        setMyLooks(prev => prev.map(look => look.id === id ? { ...look, ...updates } : look));
    };

    const stageTitle = getStageTitle();

    if (activeTab === 'look') {
        return (
            <div className="flex h-screen w-full bg-giay-do relative">
                <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onHome={onReset} />
                <div className="flex-1 w-full h-full">
                    <Lookbook onTryOn={handleTryOnLookbook} myLooks={myLooks} onUpdateLook={handleUpdateLookbook} />
                </div>
                <MobilePillNav activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
        );
    }

    if (activeTab === 'lich') {
        return (
            <div className="flex h-screen w-full bg-giay-do relative">
                <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onHome={onReset} />
                <div className="flex-1 w-full h-full">
                    <CalendarTab onSuggestOutfit={handleSuggestOutfit} />
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
                    <BookOfOutfits onStartPhoi={() => setActiveTab('phoi')} />
                </div>
                <MobilePillNav activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
        );
    }

    if (activeTab === 'hanhtrinh') {
        return (
            <div className="flex h-screen w-full bg-giay-do relative">
                <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onHome={onReset} />
                <div className="flex-1 w-full h-full overflow-y-auto">
                    <TroVeCoiNguon />
                </div>
                <MobilePillNav activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
        );
    }

    if (step === 6) {
        return (
            <div className="flex h-screen w-full bg-giay-do relative">
                <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onHome={onReset} />
                <div className="flex-1 w-full h-full">
                    <ResultPoster 
                        onBack={() => setStep(5)} 
                        onSave={handleSaveLookbook} 
                        scene={scene} 
                        core={core} 
                        style={style} 
                        layers={getLayers()} 
                        palette={PALETTES[paletteIdx]} 
                        hair={hairType} 
                        gender={gender} 
                        styleMode={styleMode} 
                        remixLevel={wardrobeState.remixLevel}
                        cultureNote={aiReasoning || "Trang phục truyền thống được thiết kế tỉ mỉ, gìn giữ nét văn hóa dân tộc."}
                    />
                </div>
                <MobilePillNav activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
        );
    }

    return (
        <div className="flex h-screen w-full bg-giay-do relative">
            <CulturalGuardAlert message={guardMessage} />
            <CultureCard isOpen={isCultureOpen} onClose={() => setIsCultureOpen(false)} outfitName={COSTUMES.find(c => c.id === cultureCore)?.name || 'Việt Phục'} core={cultureCore} />
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onHome={onReset} />

            <div className="flex-1 flex flex-col lg:flex-row relative h-full">
                {/* KHU GIỮA (SÂN KHẤU) */}
                <div className="flex-[1.2] h-[50vh] lg:h-full border-b-2 lg:border-b-0 lg:border-r-2 border-than relative flex items-center justify-center p-0 lg:p-0 overflow-hidden bg-giay-sang">
                    {/* Background and Arch */}
                    <StageBackground scene={scene} title={stageTitle} />
                    
                    {/* Gender Toggle Button */}
                    <div className="absolute top-4 right-4 z-40 bg-giay-sang neo-border rounded-full flex overflow-hidden font-label shadow-lg">
                        <button onClick={() => updateWardrobeState({ gender: 'female' })} className={`px-4 py-2 transition-colors ${gender === 'female' ? 'bg-son text-giay-sang' : 'hover:bg-giay-do text-than'}`}>Nữ</button>
                        <div className="w-[1px] bg-than h-auto" />
                        <button onClick={() => updateWardrobeState({ gender: 'male' })} className={`px-4 py-2 transition-colors ${gender === 'male' ? 'bg-son text-giay-sang' : 'hover:bg-giay-do text-than'}`}>Nam</button>
                    </div>

                    {/* Mode Toggle Button (Horizontal on top) - TẠM ẨN 
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 bg-giay-sang neo-border rounded-full flex overflow-hidden font-label shadow-lg">
                        <button onClick={() => updateWardrobeState({ mode: 'traditional' })} className={`px-4 py-2 transition-colors min-h-[44px] ${styleMode === 'traditional' ? 'bg-cham text-giay-sang' : 'hover:bg-giay-do text-than'}`}>Truyền thống</button>
                        <div className="w-[1px] bg-than h-auto" />
                        <button onClick={() => updateWardrobeState({ mode: 'modern' })} className={`px-4 py-2 transition-colors min-h-[44px] ${styleMode === 'modern' ? 'bg-vang text-than' : 'hover:bg-giay-do text-than'}`}>Hiện đại</button>
                    </div>
                    */}
                    
                    {/* Guard Warning (Removed popup mode change) */}

                    {/* Progress Bar */}
                    <div className="absolute top-10 left-6 z-30 flex gap-2 w-[200px]">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className={`h-2 flex-1 neo-border rounded-full ${step >= i ? 'bg-son' : 'bg-giay-do'}`} />
                        ))}
                    </div>

                    {/* Toolbar / Tabs */}
                    <div className="absolute bottom-8 right-6 z-40 flex flex-col items-end gap-2">
                        {/* Removed the old toolbar since hair, accessories and shoes are now handled by Steps 1, 4, 5 */}
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
                            <Character gender={gender} layers={getLayers()} palette={PALETTES[paletteIdx]} hair={hairType} bangs="mai-thua" styleMode={styleMode} remixLevel={wardrobeState.remixLevel} />
                        </div>
                    </div>
                </div>

                {/* KHU PHẢI (WIZARD CỘT TRẢI NGHIỆM) */}
                <div className="flex-1 h-[50vh] lg:h-full bg-giay-do flex flex-col">
                    <div className="flex-1 overflow-y-auto hidden-scrollbar p-6 lg:p-12 pb-12">
                        <AnimatePresence mode="wait">
                            <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="min-h-full">
                                {step === 1 && (
                                    <>
                                        <div className="mb-6">
                                            <StylistInput 
                                                key={`stylist-step-1`}
                                                gender={wardrobeState.gender as any} 
                                                onApply={handleStylistApply} 
                                                initialPrompt={wizardInitialPrompt || aiPrompt || undefined}
                                                autoSubmit={!!wizardInitialPrompt}
                                            />
                                        </div>
                                        <Step2Place state={wardrobeState} updateState={updateWardrobeState} />
                                    </>
                                )}
                                {step === 2 && (
                                    <>
                                        <div className="mb-6"><StylistInput gender={wardrobeState.gender as any} compact compactLabel={aiPrompt || undefined} onApply={handleStylistApply} /></div>
                                        <Step2bEvent state={wardrobeState} updateState={updateWardrobeState} />
                                    </>
                                )}
                                {step === 3 && (
                                    <>
                                        {aiReasoning && (
                                            <div className="mb-6 bg-son/10 border-l-4 border-son p-4 flex flex-col gap-2">
                                                <div className="flex items-start gap-2">
                                                    <Sparkles size={16} className="text-son mt-0.5 shrink-0" />
                                                    <p className="text-sm text-than italic leading-relaxed">{aiReasoning}</p>
                                                </div>
                                                <button onClick={() => setAiReasoning(null)} className="text-[10px] uppercase font-label tracking-widest bg-white border border-than/20 px-4 py-2 self-start hover:border-son text-than shadow-sm hover:shadow-md transition-all">Chỉnh từng món</button>
                                            </div>
                                        )}
                                        {!aiReasoning && <div className="mb-6"><StylistInput gender={wardrobeState.gender as any} compact compactLabel={aiPrompt || undefined} onApply={handleStylistApply} /></div>}
                                        <Step3Top 
                                            state={wardrobeState} 
                                            updateState={updateWardrobeState} 
                                            setGuardMessage={setGuardMessage} 
                                            onOpenCulture={(core) => {
                                                setCultureCore(core);
                                                setIsCultureOpen(true);
                                            }}
                                        />
                                    </>
                                )}
                                {step === 4 && (
                                    <>
                                        <div className="mb-6"><StylistInput gender={wardrobeState.gender as any} compact compactLabel={aiPrompt || undefined} onApply={handleStylistApply} /></div>
                                        <Step5Accessories state={wardrobeState} updateState={updateWardrobeState} setGuardMessage={setGuardMessage} />
                                    </>
                                )}
                                {step === 5 && (
                                    <>
                                        <div className="mb-6"><StylistInput gender={wardrobeState.gender as any} compact compactLabel={aiPrompt || undefined} onApply={handleStylistApply} /></div>
                                        <Step6Mode state={wardrobeState} updateState={updateWardrobeState} setGuardMessage={setGuardMessage} />
                                    </>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="w-full p-6 lg:px-12 lg:pb-8 lg:pt-6 flex gap-4 bg-giay-do shrink-0 border-t border-than/10 z-50">
                        <div className="w-full flex gap-4">
                            {step > 1 && (
                                <button onClick={() => setStep(step - 1)} className="neo-button-secondary aspect-square flex items-center justify-center p-0 w-14 bg-giay-sang shadow-lg">
                                    <ArrowLeft size={24} />
                                </button>
                            )}
                            <button onClick={() => setStep(step + 1)} className="neo-button-primary flex-1 flex items-center justify-center gap-2 text-lg shadow-xl">
                                {step === 5 ? "HOÀN TẤT" : "TIẾP THEO"} <ArrowRight size={24} />
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
    const [showAbout, setShowAbout] = useState(false);

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
                        <div className="relative w-[90vw] md:w-[600px] aspect-[3/2]" style={{ perspective: '1200px' }}>
                            <div className="absolute inset-0 bg-[#D4C3A3] rounded-sm shadow-md z-10" />
                            <div className="absolute inset-0 bg-[#E3D4B6] rounded-sm shadow-sm z-20" style={{ clipPath: 'polygon(0 0, 50% 45%, 100% 0, 100% 100%, 0 100%)' }} />
                            
                            {/* Envelope creaselines (draws lines for the pocket folds) */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none z-20 opacity-20 mix-blend-multiply" preserveAspectRatio="none">
                                <line x1="0" y1="0" x2="50%" y2="45%" stroke="#2B2118" strokeWidth="1" />
                                <line x1="100%" y1="0" x2="50%" y2="45%" stroke="#2B2118" strokeWidth="1" />
                            </svg>
                            
                            {/* ENVELOPE TEXT (From/To) - Bottom Left */}
                            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-30 font-display text-[#2B2118]/90 leading-relaxed pointer-events-none">
                                <div className="flex flex-col gap-2 md:gap-3">
                                    <div>
                                        <span className="font-sans font-bold uppercase text-[8px] md:text-[9px] tracking-widest text-[#2B2118]/50 block mb-0.5">From</span>
                                        <span className="italic text-base md:text-xl drop-shadow-sm">
                                            Sợi Nguồn
                                        </span>
                                    </div>
                                    <div>
                                        <span className="font-sans font-bold uppercase text-[8px] md:text-[9px] tracking-widest text-[#2B2118]/50 block mb-0.5">To</span>
                                        <span className="italic text-base md:text-xl drop-shadow-sm">Những người yêu bản sắc<br/>dân tộc nồng nàn</span>
                                    </div>
                                </div>
                            </div>

                            {/* MULTIPLE STAMPS & POSTMARKS - Bottom Right */}
                            <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-30 flex items-end gap-1 pointer-events-none">
                                {/* Stamp 1 (Sợi Nguồn Logo) */}
                                <div className="w-10 h-12 md:w-12 md:h-16 bg-[#FBF5E9] border-[2px] md:border-[3px] border-dotted border-[#D4C3A3] flex flex-col items-center justify-center shadow-sm transform -rotate-3 opacity-95 p-0.5 md:p-1 relative z-10">
                                    {!logoError ? (
                                        <img src="/brand/logo-soi-nguon.png" className="w-full h-full object-contain opacity-80 mix-blend-multiply" alt="stamp" />
                                    ) : (
                                        <div className="w-full h-full bg-[#B3261E]/20" />
                                    )}
                                    <span className="font-sans font-bold text-[5px] md:text-[6px] text-[#B3261E]/80 mt-1 uppercase tracking-widest">VN-50đ</span>
                                </div>
                                
                                {/* Stamp 2 (Hà Nội) */}
                                <div className="w-9 h-11 md:w-11 md:h-14 bg-[#FBF5E9] border-[2px] md:border-[3px] border-dotted border-[#D4C3A3] flex flex-col items-center justify-center shadow-sm transform rotate-6 opacity-90 p-0.5 relative -ml-2 mb-1 z-20">
                                    <div className="w-full h-full bg-[#2B2118]/5 flex items-center justify-center border border-[#2B2118]/10">
                                        <span className="font-display italic text-[#2B2118]/60 text-[8px] md:text-[10px]">Hà Nội</span>
                                    </div>
                                    <span className="font-sans font-bold text-[4px] md:text-[5px] text-[#B3261E]/70 mt-1 uppercase tracking-widest">VN-20đ</span>
                                </div>

                                {/* Stamp 3 (Sài Gòn) */}
                                <div className="w-12 h-9 md:w-14 md:h-11 bg-[#FBF5E9] border-[2px] md:border-[3px] border-dotted border-[#D4C3A3] flex flex-col items-center justify-center shadow-sm transform -rotate-2 opacity-95 p-0.5 relative -ml-3 mb-2 z-30">
                                    <div className="w-full h-full bg-[#B3261E]/5 flex items-center justify-center border border-[#B3261E]/10">
                                        <span className="font-display italic text-[#B3261E]/60 text-[8px] md:text-[10px]">Sài Gòn</span>
                                    </div>
                                    <span className="font-sans font-bold text-[4px] md:text-[5px] text-[#B3261E]/80 mt-0.5 uppercase tracking-widest">VN-100đ</span>
                                </div>

                                {/* Wavy Postmark overlapping the stamps */}
                                <svg className="absolute -top-8 -left-16 md:-top-12 md:-left-20 w-36 md:w-48 h-16 md:h-20 opacity-40 mix-blend-multiply pointer-events-none transform -rotate-6 z-40" viewBox="0 0 120 50">
                                    <circle cx="20" cy="25" r="18" fill="none" stroke="#2B2118" strokeWidth="1.5" />
                                    <circle cx="20" cy="25" r="12" fill="none" stroke="#2B2118" strokeWidth="0.5" />
                                    <text x="20" y="27" fontSize="5" textAnchor="middle" fill="#2B2118" className="font-sans font-bold uppercase tracking-widest">Bưu Điện</text>
                                    <path d="M 40,15 Q 50,5 60,15 T 80,15 T 100,15 T 120,15 M 40,25 Q 50,15 60,25 T 80,25 T 100,25 T 120,25 M 40,35 Q 50,25 60,35 T 80,35 T 100,35 T 120,35" fill="none" stroke="#2B2118" strokeWidth="1" />
                                </svg>
                            </div>

                            {/* FLAP WRAPPER (with drop shadow so the fold is visible) */}
                            <motion.div
                                className="absolute top-0 left-0 w-full h-[60%] z-40 origin-top"
                                initial={false}
                                animate={status === 'opening' ? { rotateX: -180, zIndex: 15, rotate: -2 } : { rotateX: 0, zIndex: 40, rotate: -2 }}
                                transition={{ duration: 0.7 }}
                                style={{ filter: "drop-shadow(0px 6px 12px rgba(43,33,24,0.25))" }}
                            >
                                {/* The clipped flap */}
                                <div className="w-full h-full bg-[#E3D4B6] rounded-sm" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }} />
                                {/* Optional: stroke along the flap's V edge for extra sharpness */}
                                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30 mix-blend-multiply" preserveAspectRatio="none">
                                    <line x1="0" y1="0" x2="50%" y2="100%" stroke="#2B2118" strokeWidth="1" />
                                    <line x1="100%" y1="0" x2="50%" y2="100%" stroke="#2B2118" strokeWidth="1" />
                                </svg>
                            </motion.div>

                            {/* WAX SEAL - explicitly positioning X/Y in Framer Motion to prevent overriding */}
                            <motion.button
                                onClick={handleOpen}
                                aria-label="Mở thư"
                                className="absolute top-[60%] left-[50%] z-50 focus:outline-none focus:ring-4 focus:ring-[#B3261E]/30 rounded-full"
                                initial={{ x: "-50%", y: "-50%", rotate: -2 }}
                                animate={{ x: "-50%", y: "-50%", rotate: -2 }}
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
                                    className="group relative z-50 inline-flex items-center justify-center px-8 md:px-10 py-3 md:py-4 bg-[#B3261E] text-white rounded-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-[#B3261E]/30 select-none cursor-pointer"
                                >
                                    <span className="relative z-10 font-medium tracking-wide text-sm md:text-base pointer-events-none">Bắt đầu phối đồ</span>
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
                                    <button onClick={() => setShowAbout(true)} className="uppercase text-[10px] tracking-widest text-[#2B2118]/60 hover:text-[#B3261E] transition-colors font-bold">Về dự án</button>
                                    <button className="uppercase text-[10px] tracking-widest text-[#2B2118]/60 hover:text-[#B3261E] transition-colors font-bold">Bạn có biết?</button>
                                </div>
                            </div>

                        </div>
                    )}
                </motion.div>
            </div>

            <AnimatePresence>
                {showAbout && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#1A1410]/80 backdrop-blur-sm"
                        onClick={() => setShowAbout(false)}
                    >
                        <motion.div 
                            initial={{ y: 50, scale: 0.95 }}
                            animate={{ y: 0, scale: 1 }}
                            exit={{ y: 20, scale: 0.95 }}
                            className="bg-[#FBF6EE] w-full max-w-2xl max-h-[85vh] rounded-xl shadow-2xl overflow-y-auto hidden-scrollbar relative p-8 md:p-12 text-[#2B2118]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button 
                                onClick={() => setShowAbout(false)}
                                className="absolute top-6 right-6 p-2 rounded-full hover:bg-[#2B2118]/5 transition-colors"
                            >
                                <X size={24} className="text-[#2B2118]/50 hover:text-[#B3261E]" />
                            </button>

                            <h2 className="font-display text-4xl md:text-5xl mb-8 text-[#B3261E] text-center border-b border-[#2B2118]/10 pb-6">Về Dự Án</h2>
                            
                            <div className="space-y-8 font-sans leading-relaxed text-sm md:text-base">
                                <section>
                                    <h3 className="font-display text-2xl mb-3 text-[#2B2118]">Khởi nguồn (Mục đích)</h3>
                                    <p className="text-[#4A3F35]">
                                        Sợi Nguồn ra đời từ một trăn trở: Làm sao để cổ phục Việt Nam không chỉ nằm yên trong lồng kính bảo tàng hay những dịp lễ hội hiếm hoi? Người trẻ (Gen Z) khát khao thể hiện cá tính qua tà áo truyền thống, nhưng lại thường e ngại ranh giới mong manh giữa "phá cách" và "phản cảm", sợ mặc sai hoặc thiếu tôn trọng lịch sử. Sợi Nguồn được xây dựng để xoá bỏ nỗi sợ đó, biến di sản thành thời trang ứng dụng.
                                    </p>
                                </section>
                                
                                <section>
                                    <h3 className="font-display text-2xl mb-3 text-[#2B2118]">Giải pháp (Định hướng)</h3>
                                    <p className="text-[#4A3F35] mb-3">
                                        Chúng tôi tiên phong kết hợp Trí tuệ nhân tạo (Google Gemini) cùng hệ thống Lưới lọc Văn hoá (Cultural Guard) để tạo ra một "Cố vấn thời trang đa vũ trụ".
                                    </p>
                                    <p className="text-[#4A3F35]">
                                        Sợi Nguồn không cấm đoán hay gò ép người dùng vào những quy chuẩn cứng nhắc. Trái lại, ứng dụng khuyến khích sự tự do sáng tạo (remix) – từ Áo Tứ Thân phối cùng Streetwear bụi bặm, đến Áo Ngũ Thân diện cùng Sneaker năng động – nhưng luôn được AI giám sát, cảnh báo và tinh chỉnh để đảm bảo mọi sự phá cách đều nằm trong khuôn khổ của sự chuẩn mực và phù hợp với từng ngữ cảnh (đi chùa, cà phê, dạo phố).
                                    </p>
                                </section>
                                
                                <section>
                                    <h3 className="font-display text-2xl mb-4 text-[#2B2118]">Giá trị cốt lõi (Hướng tới)</h3>
                                    <ul className="space-y-4">
                                        <li className="flex items-start gap-3">
                                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#B3261E] shrink-0" />
                                            <p className="text-[#4A3F35]"><strong className="text-[#2B2118]">Bảo tồn bằng cách "Sống" cùng di sản:</strong> Di sản chỉ thực sự tồn tại khi nó được sử dụng mỗi ngày. Sợi Nguồn đưa cổ phục hòa vào nhịp sống hiện đại.</p>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#B3261E] shrink-0" />
                                            <p className="text-[#4A3F35]"><strong className="text-[#2B2118]">Sáng tạo có nền tảng (Hiểu để phối):</strong> Cung cấp kiến thức lịch sử gốc gọn gàng, trực quan ngay trong lúc người dùng đang "chơi" với thời trang, giúp giáo dục văn hoá một cách tự nhiên.</p>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#B3261E] shrink-0" />
                                            <p className="text-[#4A3F35]"><strong className="text-[#2B2118]">Tôn trọng sự đa dạng:</strong> Kết nối nét đẹp của quá khứ với cá tính độc bản của mỗi cá nhân trong hiện tại và tương lai.</p>
                                        </li>
                                    </ul>
                                </section>
                            </div>
                            
                            <div className="mt-10 flex justify-center">
                                <button 
                                    onClick={() => setShowAbout(false)}
                                    className="px-8 py-3 bg-[#B3261E] text-white rounded-full font-medium hover:shadow-lg hover:-translate-y-0.5 transition-all"
                                >
                                    Đã hiểu
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
export default function App() {
    const [started, setStarted] = useState(() => {
        return sessionStorage.getItem('appStarted') === 'true';
    });
    
    useEffect(() => {
        if (started) {
            sessionStorage.setItem('appStarted', 'true');
        } else {
            sessionStorage.removeItem('appStarted');
        }
    }, [started]);

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
