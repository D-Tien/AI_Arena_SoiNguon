import React from 'react';
import { motion } from 'framer-motion';
// @ts-ignore
import HTMLFlipBook from 'react-pageflip';
import { SmartImage } from './SmartImage';

const Page = React.forwardRef((props: any, ref: any) => {
    return (
        <div className={`page bg-giay-sang neo-border neo-shadow overflow-hidden relative ${props.className || ''}`} ref={ref} data-density="hard">
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
            <div className="page-content h-full w-full flex flex-col p-6 z-10 relative">
                {props.children}
            </div>
        </div>
    );
});

export const Solution = () => {
    return (
        <div className="w-full h-full bg-giay-sang relative overflow-y-auto hidden-scrollbar p-8 lg:p-16 flex flex-col items-center">
            <h2 className="font-display text-5xl md:text-6xl mb-4 text-than text-center">Về Giải Pháp</h2>
            <p className="font-label text-sm md:text-base text-son mb-16 text-center max-w-lg">SỰ KẾT HỢP GIỮA AI VÀ SỰ TÔN TRỌNG VĂN HOÁ TỐI ĐA.</p>

            <div className="relative w-full max-w-3xl flex flex-col items-center gap-12 pb-24">
                {/* Flowchart Thread SVG */}
                <svg className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-full pointer-events-none z-0" viewBox="0 0 10 1000" preserveAspectRatio="none">
                    <motion.path 
                        d="M 5 0 L 5 1000" 
                        stroke="var(--son)" strokeWidth="4" strokeDasharray="8 8" 
                        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 2 }} viewport={{ once: true }}
                    />
                </svg>

                {/* Nodes */}
                <div className="neo-card bg-giay-do w-full md:w-2/3 p-6 relative z-10 flex flex-col items-center text-center">
                    <span className="font-label text-[10px] bg-than text-giay-sang px-2 py-1 absolute -top-3 left-1/2 -translate-x-1/2">BƯỚC 1</span>
                    <h3 className="font-display text-2xl text-than mb-2 mt-2">Người Dùng Nhập Liệu</h3>
                    <p className="text-sm text-than/80">Chọn Sự kiện, Trang phục, Phong cách, Độ Remix qua giao diện Zine Đông Hồ.</p>
                </div>

                <div className="neo-card bg-nghe/20 border-nghe w-full md:w-2/3 p-6 relative z-10 flex flex-col items-center text-center">
                    <span className="font-label text-[10px] bg-nghe text-than px-2 py-1 absolute -top-3 left-1/2 -translate-x-1/2">BƯỚC 2</span>
                    <h3 className="font-display text-2xl text-than mb-2 mt-2">Rule Guard Tiền Xử Lý</h3>
                    <p className="text-sm text-than/80">Cơ sở dữ liệu văn hoá cứng kiểm tra mức độ an toàn của yêu cầu trước khi gọi AI.</p>
                </div>

                <div className="neo-card bg-cham/10 border-cham w-full md:w-2/3 p-6 relative z-10 flex flex-col items-center text-center">
                    <span className="font-label text-[10px] bg-cham text-giay-sang px-2 py-1 absolute -top-3 left-1/2 -translate-x-1/2">BƯỚC 3</span>
                    <h3 className="font-display text-2xl text-than mb-2 mt-2">{import.meta.env.VITE_AI_MODEL || 'Gemini 1.5 Pro'} (JSON)</h3>
                    <p className="text-sm text-than/80">AI phân tích và trả về cấu trúc trang phục, điểm số hài hoà, và gợi ý mảnh ghép văn hoá chi tiết.</p>
                </div>

                <div className="neo-card bg-luc/20 border-luc w-full md:w-2/3 p-6 relative z-10 flex flex-col items-center text-center">
                    <span className="font-label text-[10px] bg-luc text-giay-sang px-2 py-1 absolute -top-3 left-1/2 -translate-x-1/2">BƯỚC 4</span>
                    <h3 className="font-display text-2xl text-than mb-2 mt-2">Hệ Thống Paper-doll SVG</h3>
                    <p className="text-sm text-than/80">Render tức thời các lớp trang phục theo thời gian thực dựa trên kết quả JSON, đảm bảo chính xác 100%.</p>
                </div>

                <div className="neo-card bg-son/10 border-son w-full md:w-2/3 p-6 relative z-10 flex flex-col items-center text-center">
                    <span className="font-label text-[10px] bg-son text-giay-sang px-2 py-1 absolute -top-3 left-1/2 -translate-x-1/2">BƯỚC 5</span>
                    <h3 className="font-display text-2xl text-than mb-2 mt-2">Hậu Kiểm & Lookbook</h3>
                    <p className="text-sm text-than/80">Đóng dấu Cultural Guard cuối cùng, xuất thẻ ảnh chia sẻ mạng xã hội.</p>
                </div>
            </div>

            <div className="max-w-2xl text-center bg-giay-do neo-border p-8 mt-12 relative">
                <div className="absolute -top-6 -left-6 w-12 h-12 bg-son rounded-full flex items-center justify-center neo-border text-giay-sang">✓</div>
                <h3 className="font-display text-3xl mb-4">Cam kết AI có trách nhiệm</h3>
                <p className="text-than/80 leading-relaxed text-sm md:text-base">
                    Chúng tôi tin rằng Di sản Văn hoá không phải là tro tàn để giữ gìn, mà là ngọn lửa cần được trao truyền. 
                    AI ở đây không thay thế sự sáng tạo hay viết lại lịch sử, mà đóng vai trò như một người Cố vấn Gen Z: 
                    kết nối, gợi ý, và giữ cho ngọn lửa ấy luôn cháy sáng, đúng nhịp đập của thời đại mới.
                </p>
            </div>

            {/* Library / Readings Section */}
            <div className="w-full max-w-4xl mt-24 mb-12 flex flex-col items-center">
                <h2 className="font-display text-4xl md:text-5xl mb-4 text-than text-center">Thư Viện & Học Hỏi</h2>
                <p className="font-label text-sm text-son mb-12 text-center max-w-lg uppercase">Lật mở từng trang sách di sản bằng cách kéo mép trang</p>
                
                <div className="w-full flex justify-center pb-12 cursor-grab active:cursor-grabbing">
                    {/* @ts-ignore */}
                    <HTMLFlipBook width={400} height={550} size="stretch" minWidth={315} maxWidth={500} minHeight={400} maxHeight={700} maxShadowOpacity={0.5} showCover={true} mobileScrollSupport={true} className="book-flip neo-shadow">
                        
                        {/* Cover Page */}
                        <Page className="bg-cham text-giay-sang flex flex-col justify-center items-center text-center p-8 border-l-[12px] border-than/40">
                            <h1 className="font-display text-5xl mb-4 leading-tight">Sách<br/>Di Sản</h1>
                            <div className="w-16 h-1 bg-son mb-8"></div>
                            <p className="font-label text-sm tracking-widest text-giay-sang/80 mb-2">SOI NGUỒN</p>
                            <p className="text-xs text-giay-sang/60 font-label">KÉO MÉP TRANG ĐỂ MỞ ↗</p>
                            <div className="mt-12 opacity-40">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                                </svg>
                            </div>
                        </Page>

                        {/* Page 1 (Image) */}
                        <Page>
                            <div className="w-full h-full relative neo-border overflow-hidden">
                                <SmartImage slot="scene-hanoi" className="absolute inset-0 w-full h-full object-cover mix-blend-multiply transition-transform duration-700 hover:scale-110" />
                            </div>
                        </Page>

                        {/* Page 2 (Content) */}
                        <Page>
                            <div className="font-label text-[10px] bg-cham/10 text-cham px-2 py-1 inline-block mb-4 neo-border border-cham">SÁCH NGHIÊN CỨU</div>
                            <h3 className="font-display text-3xl text-than mb-4">Ngàn Năm Áo Mũ</h3>
                            <p className="text-sm text-than/80 mb-4 leading-relaxed">Nghiên cứu chi tiết và đồ sộ về lịch sử trang phục Việt Nam qua các triều đại, từ trang phục cung đình đến dân gian. Một tài liệu không thể thiếu để hiểu rõ về văn hóa y phục Việt Nam.</p>
                            <div className="mt-auto border-t-2 border-than/10 pt-4 flex justify-between items-center">
                                <span className="font-bold text-xs text-than">Tác giả: Trần Quang Đức</span>
                                <button className="text-son hover:underline text-xs font-bold flex items-center gap-1">Đọc thử ↗</button>
                            </div>
                        </Page>

                        {/* Page 3 (Image) */}
                        <Page>
                            <div className="w-full h-full relative neo-border overflow-hidden">
                                <SmartImage slot="costume-ao-nhat-binh" className="absolute inset-0 w-full h-full object-cover mix-blend-multiply transition-transform duration-700 hover:scale-110" />
                            </div>
                        </Page>

                        {/* Page 4 (Content) */}
                        <Page>
                            <div className="font-label text-[10px] bg-luc/10 text-luc px-2 py-1 inline-block mb-4 neo-border border-luc">DỰ ÁN PHỎNG DỰNG</div>
                            <h3 className="font-display text-3xl text-than mb-4">Dệt Nên Triều Đại</h3>
                            <p className="text-sm text-than/80 mb-4 leading-relaxed">Dự án phỏng dựng trang phục triều Lê Sơ của Vietnam Centre, kèm theo minh hoạ sống động và thông tin lịch sử quy chuẩn, giúp người xem dễ dàng hình dung về một thời kỳ rực rỡ.</p>
                            <div className="mt-auto border-t-2 border-than/10 pt-4 flex justify-between items-center">
                                <span className="font-bold text-xs text-than">Vietnam Centre</span>
                                <button className="text-son hover:underline text-xs font-bold flex items-center gap-1">Khám phá ↗</button>
                            </div>
                        </Page>

                        {/* Page 5 (Image) */}
                        <Page>
                            <div className="w-full h-full relative neo-border overflow-hidden bg-white">
                                <img src="/assets/character/top/ao_dai/female/ao_dai.png" alt="Áo dài" className="absolute inset-0 w-full h-full object-contain mix-blend-multiply transition-transform duration-700 hover:scale-110 scale-150 translate-y-12" />
                            </div>
                        </Page>

                        {/* Page 6 (Content) */}
                        <Page>
                            <div className="font-label text-[10px] bg-son/10 text-son px-2 py-1 inline-block mb-4 neo-border border-son">BÀI VIẾT TẠP CHÍ</div>
                            <h3 className="font-display text-3xl text-than mb-4">Sự tiến hoá của Áo Dài</h3>
                            <p className="text-sm text-than/80 mb-4 leading-relaxed">Nhìn lại hành trình từ chiếc áo ngũ thân đến áo dài Le Mur, áo dài Trần Lệ Xuân và hình dáng chiếc áo dài cách tân hiện đại. Một bức tranh toàn cảnh về sự thay đổi của cái đẹp.</p>
                            <div className="mt-auto border-t-2 border-than/10 pt-4 flex justify-between items-center">
                                <span className="font-bold text-xs text-than">Tạp chí Heritage</span>
                                <button className="text-son hover:underline text-xs font-bold flex items-center gap-1">Xem bài viết ↗</button>
                            </div>
                        </Page>

                        {/* Back Cover */}
                        <Page className="bg-giay-do text-than flex flex-col justify-center items-center text-center p-8 border-l-[12px] border-than/10">
                            <div className="w-16 h-16 rounded-full border-2 border-than flex items-center justify-center mb-4 neo-shadow bg-giay-sang">
                                <span className="font-display text-2xl font-bold">S</span>
                            </div>
                            <h2 className="font-display text-3xl mb-2">Soi Nguồn</h2>
                            <p className="font-label text-[10px] tracking-widest text-than/60">TRỞ VỀ CỘI NGUỒN</p>
                        </Page>

                    </HTMLFlipBook>
                </div>
                
                <button className="mt-8 neo-button-secondary bg-giay-sang">XEM TẤT CẢ TÀI LIỆU (12+)</button>
            </div>
        </div>
    );
};
