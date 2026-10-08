import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react';
import { Character } from './PaperDoll';
import { coreCostumes } from '../data/coreCostumes';

export const BookOfOutfits = ({ onStartPhoi }: { onStartPhoi: () => void }) => {
    const [isMobile, setIsMobile] = useState(false);
    const [currentPage, setCurrentPage] = useState(0); // 0 to 7 on desktop, 0 to 15 on mobile
    const [direction, setDirection] = useState(0);

    const totalSpreads = coreCostumes.length + 3; // Cover + costumes + lookbook + end page
    const totalPages = isMobile ? totalSpreads * 2 : totalSpreads;

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') nextPage();
            else if (e.key === 'ArrowLeft') prevPage();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentPage, totalPages]);

    const nextPage = () => {
        if (currentPage < totalPages - 1) {
            setDirection(1);
            setCurrentPage(prev => prev + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setDirection(-1);
            setCurrentPage(prev => prev - 1);
        }
    };

    const renderCover = () => (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-giay-sang">
            <h1 className="font-display text-5xl md:text-7xl text-than text-center">Cuốn Sổ Áo</h1>
            <p className="font-label text-son mt-4 text-center text-lg">Ghi chép về di sản trang phục Việt</p>
            <div className="w-24 h-1 bg-son mt-8"></div>
        </div>
    );

    const renderEndPage = () => (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-giay-sang text-center">
            <h2 className="font-display text-4xl text-than mb-6">Remix Có Hiểu Biết</h2>
            <p className="text-than/80 mb-12 max-w-md mx-auto text-base leading-relaxed">
                Khi hiểu rõ gốc rễ, bạn hoàn toàn có thể sáng tạo mà không làm mất đi linh hồn của trang phục.
            </p>
            <button 
                onClick={onStartPhoi}
                className="px-8 py-4 bg-son text-giay-sang rounded-full font-label tracking-wide hover:scale-105 transition-transform"
            >
                BẮT ĐẦU PHỐI ĐỒ
            </button>
        </div>
    );

    const renderLeftPage = (spreadIndex: number) => {
        if (spreadIndex === 0) return renderCover();
        if (spreadIndex === totalSpreads - 1) return <div className="w-full h-full bg-giay-sang"></div>; // Blank left for end page

        if (spreadIndex === totalSpreads - 2) {
            // Lookbook AI (Truyền Thống)
            return (
                <div className="w-full h-full p-6 md:p-10 flex flex-col bg-giay-sang overflow-hidden relative">
                    <h2 className="font-display text-4xl text-than mb-2 border-b-2 border-son pb-1 inline-block">Lookbook AI</h2>
                    <h3 className="font-label text-xs text-son mb-4 uppercase">Cảm hứng truyền thống</h3>
                    <div className="flex-1 grid grid-cols-2 gap-4">
                        <div className="flex flex-col relative group h-[90%] border-4 border-white shadow-md">
                            <img src="/images/lookbook/trad_1.jpg" alt="Ao Ngu Than" className="w-full h-full object-cover" onError={(e) => e.currentTarget.style.display='none'} />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4">
                                <p className="text-white text-xs text-center mb-3">Áo Ngũ Thân - Huế</p>
                                <button onClick={onStartPhoi} className="bg-son text-white px-3 py-1.5 text-xs font-bold neo-border hover:scale-105">THỬ NGAY</button>
                            </div>
                        </div>
                        <div className="flex flex-col relative group h-[90%] border-4 border-white shadow-md mt-6">
                            <img src="/images/lookbook/trad_2.jpg" alt="Ao The" className="w-full h-full object-cover" onError={(e) => e.currentTarget.style.display='none'} />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4">
                                <p className="text-white text-xs text-center mb-3">Áo The - Hà Nội</p>
                                <button onClick={onStartPhoi} className="bg-son text-white px-3 py-1.5 text-xs font-bold neo-border hover:scale-105">THỬ NGAY</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        const costume = coreCostumes[spreadIndex - 1];
        if (!costume) return null;

        const chibiGender = spreadIndex === 2 || spreadIndex === 4 || spreadIndex === 6 ? 'male' : 'female';
        const chibiCore = costume.id; // Map IDs correctly if needed

        return (
            <div className="w-full h-full p-6 md:p-10 flex flex-col relative bg-giay-sang">
                <div className="mb-4">
                    <span className="font-label text-xs bg-son text-giay-sang px-2 py-1 uppercase">{costume.region}</span>
                </div>
                <h2 className="font-display text-4xl md:text-5xl text-than mb-8">{costume.name}</h2>
                
                <div className="flex-1 flex items-end justify-center pb-8 gap-4">
                    {/* Traditional Chibi */}
                    <div className="flex flex-col items-center relative scale-75 md:scale-90 origin-bottom">
                        <div className="absolute -top-8 font-label text-[10px] text-than/50 bg-giay-do px-2 py-1 rounded">Truyền thống</div>
                        <div className="w-[150px] h-[250px] relative pointer-events-none">
                            <Character layers={{ skin: `base-${chibiGender}`, core: chibiCore, overlay: 'none', accessory: 'none', background: 'none' }} />
                        </div>
                    </div>
                    
                    {/* Remix Chibi */}
                    <div className="flex flex-col items-center relative scale-75 md:scale-90 origin-bottom">
                        <div className="absolute -top-8 font-label text-[10px] text-son/80 bg-nghe px-2 py-1 rounded">Cách tân</div>
                        <div className="w-[150px] h-[250px] relative pointer-events-none">
                            <Character layers={{ skin: `base-${chibiGender}`, core: chibiCore, overlay: 'ao-khoac-denim', accessory: 'kinh-ram', background: 'none' }} />
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderRightPage = (spreadIndex: number) => {
        if (spreadIndex === 0) return <div className="w-full h-full bg-giay-sang flex items-center justify-center italic text-than/40">Trang trống</div>;
        if (spreadIndex === totalSpreads - 1) return renderEndPage();

        if (spreadIndex === totalSpreads - 2) {
            // Lookbook AI (Cách Tân)
            return (
                <div className="w-full h-full p-6 md:p-10 flex flex-col bg-giay-sang overflow-hidden relative">
                    <h2 className="font-display text-4xl text-transparent mb-2 border-b-2 border-transparent pb-1 inline-block select-none">-</h2>
                    <h3 className="font-label text-xs text-luc mb-4 uppercase">Góc phố cách tân</h3>
                    <div className="flex-1 grid grid-cols-2 gap-4">
                        <div className="flex flex-col relative group h-[90%] border-4 border-white shadow-md">
                            <img src="/images/lookbook/mod_1.jpg" alt="Tu Than Streetwear" className="w-full h-full object-cover" onError={(e) => e.currentTarget.style.display='none'} />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4">
                                <p className="text-white text-xs text-center mb-3">Tứ Thân Cyberpunk</p>
                                <button onClick={onStartPhoi} className="bg-luc text-white px-3 py-1.5 text-xs font-bold neo-border hover:scale-105">BÓC TÁCH OUTFIT</button>
                            </div>
                        </div>
                        <div className="flex flex-col relative group h-[90%] border-4 border-white shadow-md mt-6">
                            <img src="/images/lookbook/mod_2.jpg" alt="Ba Ba Streetwear" className="w-full h-full object-cover" onError={(e) => e.currentTarget.style.display='none'} />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4">
                                <p className="text-white text-xs text-center mb-3">Jacket Áo Bà Ba</p>
                                <button onClick={onStartPhoi} className="bg-luc text-white px-3 py-1.5 text-xs font-bold neo-border hover:scale-105">BÓC TÁCH OUTFIT</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        const costume = coreCostumes[spreadIndex - 1];
        if (!costume) return null;

        return (
            <div className="w-full h-full p-6 md:p-10 flex flex-col overflow-y-auto hidden-scrollbar bg-giay-sang text-than">
                <div className="mb-6">
                    <h3 className="font-label text-sm text-son mb-2 uppercase border-b-2 border-son inline-block pb-1">Nguồn gốc</h3>
                    <p className="text-base leading-relaxed">{costume.origin}</p>
                </div>

                <div className="mb-6">
                    <h3 className="font-label text-sm text-son mb-2 uppercase border-b-2 border-son inline-block pb-1">Nhận ra qua 5 dấu hiệu</h3>
                    <ul className="list-disc pl-5 space-y-1">
                        {costume.recognition.map((item, i) => (
                            <li key={i} className="text-sm">{item}</li>
                        ))}
                    </ul>
                </div>

                <div className="flex gap-4 mb-6 bg-nghe/10 p-4 rounded border border-nghe/30">
                    <div className="flex-1">
                        <h4 className="font-bold text-xs text-luc mb-1">NÊN GIỮ</h4>
                        <p className="text-sm">{costume.keep}</p>
                    </div>
                    <div className="flex-1">
                        <h4 className="font-bold text-xs text-son mb-1">CÓ THỂ SÁNG TẠO</h4>
                        <p className="text-sm">{costume.creative}</p>
                    </div>
                </div>

                <div className="mb-6 flex-1">
                    <h3 className="font-label text-sm text-son mb-2 uppercase border-b-2 border-son inline-block pb-1">Bạn có biết?</h3>
                    <p className="text-sm italic text-than/80 bg-giay-do p-4 border-l-4 border-than">{costume.didYouKnow}</p>
                </div>

                <div className="mt-auto border-t border-than/20 pt-4 flex flex-col gap-2">
                    <div className="flex items-start gap-2 text-xs text-than/60">
                        <AlertTriangle size={14} className="shrink-0 mt-0.5 text-nghe" />
                        <span>Mức độ tự tin: {costume.confidence}</span>
                    </div>
                    <div className="text-xs text-than/60">
                        Nguồn gợi ý tra cứu: <strong>{costume.references}</strong>
                    </div>
                    <button className="text-xs font-bold text-son text-left hover:underline mt-2">Báo sai chi tiết</button>
                </div>
            </div>
        );
    };

    const pageVariants = {
        enter: (dir: number) => ({
            rotateY: dir > 0 ? 90 : -90,
            opacity: 0,
            zIndex: 0,
        }),
        center: {
            rotateY: 0,
            opacity: 1,
            zIndex: 1,
        },
        exit: (dir: number) => ({
            rotateY: dir < 0 ? 90 : -90,
            opacity: 0,
            zIndex: 0,
        })
    };

    return (
        <div className="w-full h-full bg-[#EADFC8] flex flex-col items-center justify-center relative overflow-hidden p-4 md:p-8">
            
            {/* Book Container */}
            <div className="relative w-full max-w-[1000px] h-full max-h-[700px] shadow-2xl bg-than/5 p-1 rounded-sm flex items-center justify-center" style={{ perspective: '2000px' }}>
                
                {/* Book Shadow/Cover background */}
                <div className="absolute inset-0 bg-[#D4C3A3] rounded-sm shadow-[0_20px_50px_rgba(26,20,16,0.3)] border border-[#2B2118]/10" />

                {/* Left/Right Buttons */}
                <button 
                    onClick={prevPage}
                    disabled={currentPage === 0}
                    className="absolute left-2 md:-left-16 z-50 p-2 md:p-4 bg-giay-sang text-than rounded-full shadow-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-giay-do transition-colors"
                >
                    <ChevronLeft size={24} />
                </button>
                
                <button 
                    onClick={nextPage}
                    disabled={currentPage === totalPages - 1}
                    className="absolute right-2 md:-right-16 z-50 p-2 md:p-4 bg-giay-sang text-than rounded-full shadow-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-giay-do transition-colors"
                >
                    <ChevronRight size={24} />
                </button>

                {/* Pages */}
                <div className="relative w-full h-full flex flex-col md:flex-row bg-giay-sang z-10 overflow-hidden" style={{ transformStyle: 'preserve-3d' }}>
                    
                    <AnimatePresence initial={false} custom={direction} mode="wait">
                        <motion.div
                            key={currentPage}
                            custom={direction}
                            variants={pageVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="w-full h-full flex flex-col md:flex-row absolute inset-0 origin-center"
                            style={{ backfaceVisibility: 'hidden' }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={1}
                            onDragEnd={(_event, { offset, velocity }) => {
                                const swipe = Math.abs(offset.x) * velocity.x;
                                if (swipe < -10000) {
                                    nextPage();
                                } else if (swipe > 10000) {
                                    prevPage();
                                }
                            }}
                        >
                            {!isMobile ? (
                                // DESKTOP: 2 pages side by side
                                <>
                                    <div className="w-1/2 h-full border-r border-than/20 relative shadow-[inset_-10px_0_20px_rgba(0,0,0,0.05)]">
                                        {renderLeftPage(currentPage)}
                                        {/* Page Number */}
                                        <div className="absolute bottom-4 left-6 text-xs text-than/40 font-display">{currentPage * 2 + 1}</div>
                                    </div>
                                    <div className="w-1/2 h-full relative shadow-[inset_10px_0_20px_rgba(0,0,0,0.05)]">
                                        {renderRightPage(currentPage)}
                                        {/* Page Number */}
                                        <div className="absolute bottom-4 right-6 text-xs text-than/40 font-display">{currentPage * 2 + 2}</div>
                                    </div>
                                    {/* Book spine line */}
                                    <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-r from-than/20 to-transparent -translate-x-1/2" />
                                </>
                            ) : (
                                // MOBILE: 1 page at a time
                                <div className="w-full h-full relative shadow-[inset_0_0_20px_rgba(0,0,0,0.05)]">
                                    {currentPage % 2 === 0 ? renderLeftPage(Math.floor(currentPage / 2)) : renderRightPage(Math.floor(currentPage / 2))}
                                    {/* Page Number */}
                                    <div className={`absolute bottom-4 ${currentPage % 2 === 0 ? 'left-4' : 'right-4'} text-xs text-than/40 font-display`}>
                                        {currentPage + 1}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>

                </div>

            </div>

            <div className="absolute bottom-4 text-xs font-label text-than/50 uppercase tracking-widest">
                Vuốt hoặc dùng phím mũi tên để lật trang
            </div>
        </div>
    );
};
