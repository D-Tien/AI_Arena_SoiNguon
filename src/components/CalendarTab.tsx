import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Bell, Plus, X, Edit3, Trash2 } from 'lucide-react';

const CURRENT_YEAR = 2026;
const DEFAULT_MONTH = 9; // 0-indexed (October)
const TODAY_STR = '10-05'; // Assuming today is Oct 5, 2026 for demo

const HOLIDAYS: Record<string, string> = {
    '01-01': 'Tết Dương lịch',
    '02-14': 'Valentine',
    '03-08': 'Quốc tế Phụ nữ',
    '04-30': 'Giải phóng miền Nam',
    '05-01': 'Quốc tế Lao động',
    '09-02': 'Quốc khánh',
    '10-10': 'Giải phóng Thủ đô',
    '10-20': 'Ngày Phụ nữ VN',
    '12-25': 'Giáng sinh'
};

const INITIAL_NOTES: Record<string, string> = {
    '10-15': 'Đi chơi phố Cổ chụp ảnh áo tấc với bạn',
    '10-22': 'Lễ hội Áo dài - Hoàng thành Thăng Long'
};

const MONTH_NAMES = [
    'Tháng Một', 'Tháng Hai', 'Tháng Ba', 'Tháng Tư', 'Tháng Năm', 'Tháng Sáu',
    'Tháng Bảy', 'Tháng Tám', 'Tháng Chín', 'Tháng Mười', 'Tháng Mười Một', 'Tháng Mười Hai'
];

const LotusIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 100 100" fill="currentColor">
        <path d="M50 10 C 30 40 10 55 10 75 C 10 85 20 95 50 90 C 80 95 90 85 90 75 C 90 55 70 40 50 10 Z" opacity="0.8"/>
        <path d="M50 25 C 35 45 25 60 25 75 C 25 85 35 90 50 85 C 65 90 75 85 75 75 C 75 60 65 45 50 25 Z" fill="#FFF" opacity="0.9"/>
        <path d="M50 40 C 40 55 35 65 35 75 C 35 80 40 85 50 82 C 60 85 65 80 65 75 C 65 65 60 55 50 40 Z" opacity="0.6"/>
    </svg>
);

const CalendarTab = () => {
    const [currentMonth, setCurrentMonth] = useState(DEFAULT_MONTH);
    const [notes, setNotes] = useState<Record<string, string>>(INITIAL_NOTES);
    const [selectedDateStr, setSelectedDateStr] = useState<string | null>(null);
    const [noteDraft, setNoteDraft] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    // Compute calendar properties
    const daysInMonth = new Date(CURRENT_YEAR, currentMonth + 1, 0).getDate();
    const firstDay = new Date(CURRENT_YEAR, currentMonth, 1).getDay();
    const startDayIndex = firstDay === 0 ? 6 : firstDay - 1;

    const handleDayClick = (day: number) => {
        const mm = String(currentMonth + 1).padStart(2, '0');
        const dd = String(day).padStart(2, '0');
        const dateStr = `${mm}-${dd}`;
        
        setSelectedDateStr(dateStr);
        setNoteDraft(notes[dateStr] || '');
        setIsEditing(false);
    };

    const handleSaveNote = () => {
        if (selectedDateStr) {
            if (noteDraft.trim()) {
                setNotes(prev => ({ ...prev, [selectedDateStr]: noteDraft.trim() }));
            } else {
                const newNotes = { ...notes };
                delete newNotes[selectedDateStr];
                setNotes(newNotes);
            }
            setIsEditing(false);
        }
    };

    const handleDeleteNote = () => {
        if (selectedDateStr) {
            const newNotes = { ...notes };
            delete newNotes[selectedDateStr];
            setNotes(newNotes);
            setIsEditing(false);
            setNoteDraft('');
        }
    };

    const weekDays = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

    // Generate upcoming events for current month (or future)
    const upcoming = Object.keys(notes)
        .filter(dateStr => dateStr >= TODAY_STR)
        .sort()
        .slice(0, 3);

    return (
        <div className="w-full h-full bg-giay-do relative overflow-hidden flex flex-col p-4 md:p-8 lg:p-12">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%231A1410\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'1\'/%3E%3C/g%3E%3C/svg%3E")' }} />

            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 relative z-10 px-4">
                <div className="relative">
                    <p className="font-label text-son uppercase tracking-[0.3em] text-xs md:text-sm mb-3 flex items-center gap-2">
                        <LotusIcon className="w-4 h-4" /> Sự kiện & Lịch trình
                    </p>
                    <h2 className="font-display text-5xl md:text-7xl text-than leading-none relative">
                        {MONTH_NAMES[currentMonth]} <span className="italic text-than/40">{CURRENT_YEAR}</span>
                    </h2>
                    <div className="absolute -bottom-2 left-0 w-[200vw] h-2 bg-son -rotate-1 z-[-1]" />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto hidden-scrollbar relative z-10 pb-32 pt-2">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 px-4 max-w-7xl mx-auto">
                    
                    {/* Left: Calendar Grid */}
                    <div className="flex-[2] bg-giay-sang p-2 border border-son/30 relative overflow-hidden neo-shadow">
                        {/* Big Lotus Watermark in the center of the calendar */}
                        <LotusIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 text-son opacity-10 pointer-events-none" />

                        {/* Traditional Double Frame */}
                        <div className="h-full border-[3px] border-son/40 p-6 relative">
                            {/* Prominent Corner Accents (Họa tiết góc chữ Công) */}
                            <div className="absolute top-0 left-0 w-12 h-12 border-t-[6px] border-l-[6px] border-son -translate-x-1.5 -translate-y-1.5"></div>
                            <div className="absolute top-0 right-0 w-12 h-12 border-t-[6px] border-r-[6px] border-son translate-x-1.5 -translate-y-1.5"></div>
                            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-[6px] border-l-[6px] border-son -translate-x-1.5 translate-y-1.5"></div>
                            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-[6px] border-r-[6px] border-son translate-x-1.5 translate-y-1.5"></div>
                            
                            <div className="flex justify-between items-center mb-6 relative z-10">
                                <button 
                                    onClick={() => setCurrentMonth(prev => Math.max(0, prev - 1))}
                                    className={`p-2 rounded-full transition-colors ${currentMonth === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-giay-do text-son'}`}
                                    disabled={currentMonth === 0}
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <h3 className="font-display text-3xl text-son">Tháng {currentMonth + 1} / {CURRENT_YEAR}</h3>
                                <button 
                                    onClick={() => setCurrentMonth(prev => Math.min(11, prev + 1))}
                                    className={`p-2 rounded-full transition-colors ${currentMonth === 11 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-giay-do text-son'}`}
                                    disabled={currentMonth === 11}
                                >
                                    <ChevronRight size={24} />
                                </button>
                            </div>
                            
                            <div className="grid grid-cols-7 gap-2 md:gap-4 mb-3 relative z-10">
                                {weekDays.map(d => (
                                    <div key={d} className="font-label text-center font-bold text-sm text-than/70">{d}</div>
                                ))}
                            </div>
                            
                            <div className="grid grid-cols-7 gap-2 md:gap-4 relative z-10">
                                {Array.from({ length: startDayIndex }).map((_, i) => (
                                    <div key={`empty-${i}`} className="aspect-square"></div>
                                ))}
                                {Array.from({ length: daysInMonth }).map((_, i) => {
                                    const day = i + 1;
                                    const mm = String(currentMonth + 1).padStart(2, '0');
                                    const dd = String(day).padStart(2, '0');
                                    const dateStr = `${mm}-${dd}`;
                                    
                                    const isToday = dateStr === TODAY_STR;
                                    const hasHoliday = !!HOLIDAYS[dateStr];
                                    const hasNote = !!notes[dateStr];
                                    const isSelected = selectedDateStr === dateStr;
                                    
                                    return (
                                        <motion.div 
                                            key={day}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => handleDayClick(day)}
                                            className={`aspect-square p-1 md:p-2 border cursor-pointer flex flex-col items-center justify-center relative transition-colors ${
                                                isSelected ? 'bg-son border-son text-white shadow-md' :
                                                isToday ? 'bg-son/10 border-2 border-son text-son font-bold' :
                                                'bg-white/80 backdrop-blur-sm border-than/20 hover:border-son/60 hover:text-son text-than'
                                            }`}
                                        >
                                            <span className={`text-sm md:text-xl font-display ${isSelected ? 'text-white' : ''}`}>{day}</span>
                                            
                                            {hasHoliday && (
                                                <span className={`text-[8px] md:text-[10px] text-center leading-tight mt-1 line-clamp-2 ${isSelected ? 'text-white' : 'text-son font-bold'}`}>
                                                    {HOLIDAYS[dateStr]}
                                                </span>
                                            )}
                                            
                                            {hasNote && (
                                                <div className="absolute top-1 right-1 md:top-2 md:right-2">
                                                    <div className={`w-2 h-2 rounded-full ${isSelected ? 'bg-white' : 'bg-cham'}`}></div>
                                                </div>
                                            )}
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Right: Agenda & Note Editing */}
                    <div className="flex-1 flex flex-col gap-6 relative">
                        
                        {/* Selected Day Panel */}
                        <AnimatePresence mode="wait">
                            {selectedDateStr ? (
                                <motion.div 
                                    key="day-detail"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="bg-giay-sang p-2 border border-son/30 flex flex-col relative neo-shadow"
                                >
                                    <div className="h-full border-[2px] border-son/40 p-6 relative bg-white/50 backdrop-blur-sm">
                                        <div className="flex justify-between items-start mb-4 relative z-10">
                                            <h3 className="font-display text-3xl text-son">Ngày {parseInt(selectedDateStr.split('-')[1], 10)} / {parseInt(selectedDateStr.split('-')[0], 10)}</h3>
                                            <button onClick={() => setSelectedDateStr(null)} className="text-than/50 hover:text-son"><X size={20}/></button>
                                        </div>
                                        
                                        {HOLIDAYS[selectedDateStr] && (
                                            <div className="bg-son text-white p-3 mb-6 flex gap-3 items-center relative z-10 neo-shadow">
                                                <CalendarIcon size={18} />
                                                <span className="font-bold text-sm tracking-wide">{HOLIDAYS[selectedDateStr]}</span>
                                            </div>
                                        )}

                                        <div className="flex-1 relative z-10">
                                            <div className="flex justify-between items-center mb-3">
                                                <span className="font-label text-xs uppercase text-than/60 tracking-widest font-bold">Lịch trình của bạn</span>
                                                {notes[selectedDateStr] && !isEditing && (
                                                    <button onClick={() => setIsEditing(true)} className="text-cham hover:text-son flex items-center gap-1 text-xs font-bold">
                                                        <Edit3 size={14}/> SỬA
                                                    </button>
                                                )}
                                            </div>

                                            {isEditing || !notes[selectedDateStr] ? (
                                                <div className="flex flex-col gap-3">
                                                    <textarea 
                                                        value={noteDraft}
                                                        onChange={e => setNoteDraft(e.target.value)}
                                                        placeholder="Thêm ghi chú đi chơi, sự kiện..."
                                                        className="w-full bg-white border border-son/30 p-4 text-sm focus:outline-none focus:border-son h-32 resize-none shadow-inner"
                                                        autoFocus
                                                    />
                                                    <div className="flex gap-2">
                                                        <button onClick={handleSaveNote} className="flex-1 bg-son text-white py-3 text-sm font-bold neo-border hover:bg-son/90">
                                                            LƯU LỊCH TRÌNH
                                                        </button>
                                                        {notes[selectedDateStr] && (
                                                            <button onClick={handleDeleteNote} className="px-5 bg-white border border-son/30 text-son hover:bg-giay-do neo-border flex items-center justify-center">
                                                                <Trash2 size={18}/>
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="bg-white border-l-4 border-son p-4 min-h-[128px] shadow-sm">
                                                    <p className="text-than text-sm whitespace-pre-wrap leading-relaxed font-medium">{notes[selectedDateStr]}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div 
                                    key="upcoming"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="bg-giay-sang p-2 border border-son/30 flex flex-col flex-1 relative neo-shadow"
                                >
                                    <div className="h-full border-[2px] border-son/40 p-6 flex flex-col relative bg-white/50 backdrop-blur-sm">
                                        
                                        <div className="flex items-center gap-3 mb-6 border-b-2 border-son/20 pb-4 relative z-10">
                                            <Bell className="text-son" size={24}/>
                                            <h3 className="font-display text-3xl text-son">Sắp tới</h3>
                                        </div>
                                        
                                        {upcoming.length > 0 ? (
                                            <div className="flex flex-col gap-5 relative z-10">
                                                {upcoming.map(dateStr => {
                                                    const [, d] = dateStr.split('-');
                                                    
                                                    const tMonth = parseInt(TODAY_STR.split('-')[0], 10);
                                                    const tDay = parseInt(TODAY_STR.split('-')[1], 10);
                                                    const uMonth = parseInt(dateStr.split('-')[0], 10);
                                                    const uDay = parseInt(dateStr.split('-')[1], 10);
                                                    
                                                    let daysDiff = -1;
                                                    if (tMonth === uMonth) {
                                                        daysDiff = uDay - tDay;
                                                    }
                                                    
                                                    return (
                                                        <div key={dateStr} className="flex gap-4 group cursor-pointer bg-white p-3 border border-than/10 hover:border-son/40 transition-colors shadow-sm" onClick={() => {
                                                            setCurrentMonth(uMonth - 1);
                                                            setSelectedDateStr(dateStr);
                                                            setNoteDraft(notes[dateStr] || '');
                                                            setIsEditing(false);
                                                        }}>
                                                            <div className="flex flex-col items-center justify-center w-14 shrink-0 border-r-2 border-son/20 pr-4">
                                                                <span className="font-label text-xs text-son font-bold tracking-widest">THÁNG {parseInt(dateStr.split('-')[0], 10)}</span>
                                                                <span className="font-display text-3xl text-than group-hover:text-son transition-colors leading-none mt-1">{parseInt(d, 10)}</span>
                                                            </div>
                                                            <div className="flex flex-col justify-center">
                                                                <p className="text-sm font-medium text-than group-hover:text-son transition-colors line-clamp-2 leading-relaxed">{notes[dateStr]}</p>
                                                                {daysDiff <= 3 && daysDiff > 0 && (
                                                                    <span className="text-[10px] bg-vang text-than px-3 py-1 rounded-full mt-2 w-max font-bold">Sắp đến!</span>
                                                                )}
                                                                {dateStr === TODAY_STR && (
                                                                    <span className="text-[10px] bg-son text-white px-3 py-1 rounded-full mt-2 w-max font-bold uppercase tracking-wider">Hôm nay</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        ) : (
                                            <div className="flex-1 flex flex-col items-center justify-center text-than/40 text-center p-8 relative z-10">
                                                <CalendarIcon size={40} className="mb-4 opacity-20 text-son"/>
                                                <p className="text-sm font-medium">Bạn chưa có lịch trình nào sắp tới.</p>
                                            </div>
                                        )}
                                        
                                        <div className="mt-auto pt-6 relative z-10">
                                            <button onClick={() => {
                                                setCurrentMonth(parseInt(TODAY_STR.split('-')[0], 10) - 1);
                                                setSelectedDateStr(TODAY_STR);
                                                setNoteDraft(notes[TODAY_STR] || '');
                                                setIsEditing(false);
                                            }} className="w-full bg-cham text-white py-3 flex items-center justify-center gap-2 text-sm font-bold neo-border hover:bg-cham/90 tracking-widest">
                                                <Plus size={18}/> THÊM SỰ KIỆN MỚI
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalendarTab;
