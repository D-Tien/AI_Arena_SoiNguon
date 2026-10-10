import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react';
// @ts-ignore
import HTMLFlipBook from 'react-pageflip';
import { coreCostumes } from '../data/coreCostumes';

const Page = React.forwardRef((props: any, ref: any) => {
    return (
        <div className={`page bg-giay-sang neo-border neo-shadow overflow-hidden relative ${props.className || ''}`} ref={ref} data-density="hard">
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
            <div className="page-content h-full w-full flex flex-col z-10 relative">
                {props.children}
            </div>
        </div>
    );
});

export const BookOfOutfits = ({ onStartPhoi }: { onStartPhoi: () => void }) => {
    const book = useRef<any>(null);

    const renderCover = () => (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-[#8B0000] border-l-[12px] border-[#5A0000] relative overflow-hidden shadow-[inset_-10px_0_20px_rgba(0,0,0,0.3)]">
            {/* Corner decorations */}
            <div className="absolute top-6 left-6 w-16 h-16 border-t-2 border-l-2 border-[#F3EFE0]/40"></div>
            <div className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-[#F3EFE0]/40"></div>
            <div className="absolute bottom-6 left-6 w-16 h-16 border-b-2 border-l-2 border-[#F3EFE0]/40"></div>
            <div className="absolute bottom-6 right-6 w-16 h-16 border-b-2 border-r-2 border-[#F3EFE0]/40"></div>

            <div className="z-10 flex flex-col items-center">
                <div className="w-20 h-20 flex items-center justify-center mb-8 opacity-80 mix-blend-screen bg-white rounded-full p-2">
                    <img src="/brand/logo-soi-nguon.png" alt="Sợi Nguồn" className="w-full h-full object-contain" onError={(e) => e.currentTarget.style.display='none'} />
                </div>
                <h1 className="font-display text-5xl md:text-7xl text-[#F3EFE0] text-center leading-tight drop-shadow-lg">Cuốn Sổ Áo</h1>
                <div className="w-24 h-1 bg-[#F3EFE0]/60 my-8 shadow-sm"></div>
                <p className="font-label text-sm tracking-widest text-[#F3EFE0] mb-2 uppercase text-center opacity-90">Ghi chép về di sản trang phục</p>
            </div>
            
            <p className="text-xs text-[#F3EFE0]/50 font-label mt-12 z-10 animate-pulse tracking-widest">KÉO MÉP TRANG ĐỂ MỞ ↗</p>
        </div>
    );

    const renderEndPage = () => (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-giay-sang text-center relative">
            <div className="absolute inset-6 border-2 border-son/10 p-2"><div className="w-full h-full border border-son/5"></div></div>
            <h2 className="font-display text-4xl text-than mb-6 relative z-10">Remix Có Hiểu Biết</h2>
            <p className="text-than/80 mb-12 max-w-md mx-auto text-base leading-relaxed relative z-10">
                Khi hiểu rõ gốc rễ, bạn hoàn toàn có thể sáng tạo mà không làm mất đi linh hồn của trang phục.
            </p>
            <button 
                onClick={onStartPhoi}
                className="px-8 py-4 bg-son text-giay-sang rounded-full font-label tracking-wide hover:scale-105 transition-transform neo-shadow relative z-10"
            >
                BẮT ĐẦU PHỐI ĐỒ
            </button>
        </div>
    );

    return (
        <div className="w-full h-full bg-[#EADFC8] flex flex-col items-center justify-start relative overflow-y-auto hidden-scrollbar p-2 md:p-8 pt-8">
            <div className="w-full flex flex-col items-center justify-center cursor-grab active:cursor-grabbing pb-24 mt-4">
                <h2 className="font-display text-4xl md:text-5xl mb-4 text-than text-center">Thư Viện & Học Hỏi</h2>
                <p className="font-label text-sm text-son mb-8 text-center max-w-lg uppercase">Lật mở từng trang sách di sản bằng cách kéo mép trang</p>

                {/* @ts-ignore */}
                <HTMLFlipBook 
                    width={450} 
                    height={600} 
                    size="stretch" 
                    minWidth={315} 
                    maxWidth={500} 
                    minHeight={400} 
                    maxHeight={700} 
                    maxShadowOpacity={0.5} 
                    showCover={true} 
                    mobileScrollSupport={true} 
                    className="book-flip neo-shadow"
                    ref={book}
                >
                    
                    {/* Cover Page */}
                    <Page>
                        {renderCover()}
                    </Page>

                    {/* Intro / Blank inside cover */}
                    <Page className="bg-[#EAE0D3]">
                        <div className="w-full h-full flex flex-col items-center justify-center relative p-10">
                            <div className="absolute inset-6 border border-than/10 rounded-sm"></div>
                            <div className="w-14 h-14 mb-8 opacity-30 mix-blend-multiply">
                                <img src="/brand/logo-soi-nguon.png" alt="Logo" className="w-full h-full object-contain" onError={(e) => e.currentTarget.style.display='none'} />
                            </div>
                            <p className="italic text-than/80 font-serif text-xl text-center leading-relaxed">
                                "Y phục xứng kỳ đức"
                            </p>
                            <span className="text-xs mt-6 block text-than/50 font-label tracking-widest uppercase">— Sợi Nguồn —</span>
                        </div>
                    </Page>

                    {/* Title Page to ensure Images start on Left page */}
                    <Page className="bg-giay-sang">
                        <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center relative">
                            <div className="absolute inset-8 border-2 border-son/20 p-2">
                                <div className="w-full h-full border border-son/10"></div>
                            </div>
                            <h2 className="font-display text-4xl text-than mb-4 relative z-10 mt-10">
                                Các Dòng Trang Phục
                                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-son"></div>
                            </h2>
                            <p className="font-label text-xs text-son uppercase mt-12 relative z-10 tracking-[0.2em]">Nền tảng của sự sáng tạo</p>
                            
                            <div className="mt-16 opacity-30 text-son relative z-10">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2L15 8L22 9L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9L9 8L12 2Z" />
                                </svg>
                            </div>
                        </div>
                    </Page>

                    {/* Costume Pages */}
                    {coreCostumes.flatMap((costume, idx) => {
                        return [
                            /* Left Page: Images */
                            <Page key={`${costume.id}-left`}>
                                <div className="w-full h-full relative bg-black overflow-hidden group">
                                    {/* Full screen Background Image */}
                                    <img src={`/images/costumes/${costume.id}.jpg`} alt={costume.name} className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                                    
                                    {/* Gradient Overlay for text readability */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80 pointer-events-none"></div>

                                    {/* Content on top */}
                                    <div className="absolute inset-0 p-6 md:p-8 flex flex-col z-10">
                                        <div className="mb-2">
                                            <span className="font-label text-xs bg-son text-giay-sang px-2 py-1 uppercase">{costume.region}</span>
                                        </div>
                                        <h2 className="font-display text-4xl md:text-5xl text-white mb-4 drop-shadow-md">{costume.name}</h2>
                                        
                                        <div className="absolute top-6 right-6 bg-black/50 backdrop-blur-md px-2 py-1 text-[8px] text-white/80 uppercase tracking-widest border border-white/20 rounded-sm">AI Generated</div>
                                    </div>
                                    {/* Page Number */}
                                    <div className="absolute bottom-4 left-6 text-xs text-white/60 font-display z-20">{idx * 2 + 1}</div>
                                </div>
                            </Page>,

                            /* Right Page: Info */
                            <Page key={`${costume.id}-right`}>
                                <div className="w-full h-full p-6 md:p-8 flex flex-col overflow-y-auto hidden-scrollbar bg-giay-sang text-than relative">
                                    <div className="mb-6">
                                        <h3 className="font-label text-sm text-son mb-2 uppercase border-b-2 border-son inline-block pb-1">Nguồn gốc</h3>
                                        <p className="text-[13px] leading-relaxed">{costume.origin}</p>
                                    </div>

                                    <div className="mb-6">
                                        <h3 className="font-label text-sm text-son mb-2 uppercase border-b-2 border-son inline-block pb-1">Nhận ra qua 5 dấu hiệu</h3>
                                        <ul className="list-disc pl-5 space-y-1">
                                            {costume.recognition.map((item, i) => (
                                                <li key={i} className="text-[13px]">{item}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="flex gap-4 mb-6 bg-nghe/10 p-4 rounded border border-nghe/30">
                                        <div className="flex-1">
                                            <h4 className="font-bold text-[11px] text-luc mb-1">NÊN GIỮ</h4>
                                            <p className="text-[12px]">{costume.keep}</p>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-[11px] text-son mb-1">CÓ THỂ SÁNG TẠO</h4>
                                            <p className="text-[12px]">{costume.creative}</p>
                                        </div>
                                    </div>

                                    <div className="mb-6 flex-1">
                                        <h3 className="font-label text-sm text-son mb-2 uppercase border-b-2 border-son inline-block pb-1">Bạn có biết?</h3>
                                        <p className="text-[13px] italic text-than/80 bg-giay-do p-3 border-l-4 border-than">{costume.didYouKnow}</p>
                                    </div>

                                    <div className="mt-auto border-t border-than/20 pt-4 flex flex-col gap-1">
                                        <div className="flex items-start gap-2 text-[11px] text-than/60">
                                            <AlertTriangle size={12} className="shrink-0 mt-0.5 text-nghe" />
                                            <span>Mức độ tự tin: {costume.confidence}</span>
                                        </div>
                                        <div className="text-[11px] text-than/60">
                                            Nguồn gợi ý tra cứu: <strong>{costume.references}</strong>
                                        </div>
                                    </div>
                                    
                                    {/* Page Number */}
                                    <div className="absolute bottom-4 right-6 text-xs text-than/40 font-display">{idx * 2 + 2}</div>
                                </div>
                            </Page>
                        ];
                    })}

                    {/* Lookbook 1 */}
                    <Page>
                        <div className="w-full h-full p-6 md:p-8 flex flex-col bg-giay-sang overflow-hidden relative">
                            <h2 className="font-display text-4xl text-than mb-2 border-b-2 border-son pb-1 inline-block">Lookbook AI</h2>
                            <h3 className="font-label text-xs text-son mb-4 uppercase">Cảm hứng truyền thống</h3>
                            <div className="flex-1 grid grid-rows-2 gap-4">
                                <div className="flex flex-col relative group h-full border-4 border-white shadow-md">
                                    <img src="/images/lookbook/trad_1.jpg" alt="Ao Ngu Than" className="w-full h-full object-cover" onError={(e) => e.currentTarget.style.display='none'} />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4">
                                        <p className="text-white text-xs text-center mb-3">Áo Ngũ Thân - Huế</p>
                                        <button onClick={onStartPhoi} className="bg-son text-white px-3 py-1.5 text-xs font-bold neo-border hover:scale-105">THỬ NGAY</button>
                                    </div>
                                </div>
                                <div className="flex flex-col relative group h-full border-4 border-white shadow-md">
                                    <img src="/images/lookbook/trad_2.jpg" alt="Ao The" className="w-full h-full object-cover" onError={(e) => e.currentTarget.style.display='none'} />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4">
                                        <p className="text-white text-xs text-center mb-3">Áo The - Hà Nội</p>
                                        <button onClick={onStartPhoi} className="bg-son text-white px-3 py-1.5 text-xs font-bold neo-border hover:scale-105">THỬ NGAY</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Page>

                    {/* Lookbook 2 */}
                    <Page>
                        <div className="w-full h-full p-6 md:p-8 flex flex-col bg-giay-sang overflow-hidden relative">
                            <h2 className="font-display text-4xl text-transparent mb-2 border-b-2 border-transparent pb-1 inline-block select-none">-</h2>
                            <h3 className="font-label text-xs text-luc mb-4 uppercase">Góc phố cách tân</h3>
                            <div className="flex-1 grid grid-rows-2 gap-4">
                                <div className="flex flex-col relative group h-full border-4 border-white shadow-md">
                                    <img src="/images/lookbook/mod_1.jpg" alt="Tu Than Streetwear" className="w-full h-full object-cover" onError={(e) => e.currentTarget.style.display='none'} />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4">
                                        <p className="text-white text-xs text-center mb-3">Tứ Thân Cyberpunk</p>
                                        <button onClick={onStartPhoi} className="bg-luc text-white px-3 py-1.5 text-xs font-bold neo-border hover:scale-105">BÓC TÁCH OUTFIT</button>
                                    </div>
                                </div>
                                <div className="flex flex-col relative group h-full border-4 border-white shadow-md">
                                    <img src="/images/lookbook/mod_2.jpg" alt="Ba Ba Streetwear" className="w-full h-full object-cover" onError={(e) => e.currentTarget.style.display='none'} />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4">
                                        <p className="text-white text-xs text-center mb-3">Jacket Áo Bà Ba</p>
                                        <button onClick={onStartPhoi} className="bg-luc text-white px-3 py-1.5 text-xs font-bold neo-border hover:scale-105">BÓC TÁCH OUTFIT</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Page>
                    {/* End Page (Left) */}
                    <Page>
                        {renderEndPage()}
                    </Page>

                    {/* Blank Page (Right) */}
                    <Page className="bg-[#EAE0D3]">
                        <div className="w-full h-full bg-[#EAE0D3]"></div>
                    </Page>

                    {/* Inside Back Cover (Left) */}
                    <Page className="bg-[#EAE0D3]">
                        <div className="w-full h-full bg-[#EAE0D3]"></div>
                    </Page>

                    {/* Back Cover Inside (Right) */}
                    <Page>
                        <div className="w-full h-full bg-[#8B0000] flex flex-col items-center justify-center p-8 text-center opacity-90 border-r-[2px] border-[#5A0000] shadow-[inset_-10px_0_20px_rgba(0,0,0,0.2)]">
                            <h2 className="font-display text-2xl text-[#F3EFE0] mb-2 drop-shadow-sm">Sợi Nguồn</h2>
                            <div className="w-8 h-px bg-[#F3EFE0]/60 mx-auto mb-2"></div>
                            <p className="font-label text-[10px] text-[#F3EFE0]/80 uppercase tracking-widest">Bảo tồn và Phát huy</p>
                        </div>
                    </Page>

                    {/* Back Cover Outside (Left) */}
                    <Page>
                        <div className="w-full h-full bg-[#8B0000] flex items-center justify-center border-l-[12px] border-[#5A0000] relative overflow-hidden shadow-[inset_10px_0_20px_rgba(0,0,0,0.2)]">
                            {/* Corner decorations */}
                            <div className="absolute top-6 left-6 w-16 h-16 border-t-2 border-l-2 border-[#F3EFE0]/30"></div>
                            <div className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-[#F3EFE0]/30"></div>
                            <div className="absolute bottom-6 left-6 w-16 h-16 border-b-2 border-l-2 border-[#F3EFE0]/30"></div>
                            <div className="absolute bottom-6 right-6 w-16 h-16 border-b-2 border-r-2 border-[#F3EFE0]/30"></div>
                            
                            <div className="w-20 h-20 flex items-center justify-center opacity-70 mix-blend-screen bg-white rounded-full p-2 z-10">
                                <img src="/brand/logo-soi-nguon.png" alt="Sợi Nguồn" className="w-full h-full object-contain" onError={(e) => e.currentTarget.style.display='none'} />
                            </div>
                        </div>
                    </Page>
                </HTMLFlipBook>
            </div>
            
            <div className="flex gap-4 z-50 justify-center w-full mt-8">
                <button onClick={() => book.current?.pageFlip()?.flipPrev()} className="p-3 bg-white text-than rounded-full shadow-lg hover:bg-giay-do neo-border transition-transform hover:scale-110">
                    <ChevronLeft size={20} />
                </button>
                <button onClick={() => book.current?.pageFlip()?.flipNext()} className="p-3 bg-white text-than rounded-full shadow-lg hover:bg-giay-do neo-border transition-transform hover:scale-110">
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
};
