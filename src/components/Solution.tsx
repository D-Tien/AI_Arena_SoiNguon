import React from 'react';
import { motion } from 'framer-motion';

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
                <p className="font-label text-sm text-son mb-12 text-center max-w-lg uppercase">Nghiên cứu, sách và bài báo về cổ phục Việt Nam</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    
                    {/* Book 1 */}
                    <div className="neo-card bg-giay-sang p-6 flex flex-col justify-between hover:-translate-y-1 transition-transform group cursor-pointer border-cham">
                        <div>
                            <div className="font-label text-[10px] bg-cham/10 text-cham px-2 py-1 inline-block mb-3 neo-border border-cham">SÁCH NGHIÊN CỨU</div>
                            <h3 className="font-display text-2xl text-than mb-2 group-hover:text-son transition-colors">Ngàn Năm Áo Mũ</h3>
                            <p className="text-sm text-than/70 mb-4 line-clamp-3">Nghiên cứu chi tiết và đồ sộ về lịch sử trang phục Việt Nam qua các triều đại, từ trang phục cung đình đến dân gian, tác giả Trần Quang Đức.</p>
                        </div>
                        <div className="flex justify-between items-center mt-4 pt-4 border-t-2 border-than/10">
                            <span className="text-xs font-bold text-than">Tác giả: Trần Quang Đức</span>
                            <span className="text-son">↗</span>
                        </div>
                    </div>

                    {/* Book 2 */}
                    <div className="neo-card bg-giay-sang p-6 flex flex-col justify-between hover:-translate-y-1 transition-transform group cursor-pointer border-luc">
                        <div>
                            <div className="font-label text-[10px] bg-luc/10 text-luc px-2 py-1 inline-block mb-3 neo-border border-luc">SÁCH ẢNH & DỰ ÁN</div>
                            <h3 className="font-display text-2xl text-than mb-2 group-hover:text-son transition-colors">Dệt Nên Triều Đại</h3>
                            <p className="text-sm text-than/70 mb-4 line-clamp-3">Dự án phỏng dựng trang phục triều Lê Sơ của Vietnam Centre, kèm theo minh hoạ sống động và thông tin lịch sử quy chuẩn.</p>
                        </div>
                        <div className="flex justify-between items-center mt-4 pt-4 border-t-2 border-than/10">
                            <span className="text-xs font-bold text-than">Vietnam Centre</span>
                            <span className="text-son">↗</span>
                        </div>
                    </div>

                    {/* Article 1 */}
                    <div className="neo-card bg-giay-sang p-6 flex flex-col justify-between hover:-translate-y-1 transition-transform group cursor-pointer border-son">
                        <div>
                            <div className="font-label text-[10px] bg-son/10 text-son px-2 py-1 inline-block mb-3 neo-border border-son">BÀI VIẾT TẠP CHÍ</div>
                            <h3 className="font-display text-2xl text-than mb-2 group-hover:text-son transition-colors">Sự tiến hoá của Áo Dài</h3>
                            <p className="text-sm text-than/70 mb-4 line-clamp-3">Nhìn lại hành trình từ chiếc áo ngũ thân đến áo dài Le Mur, áo dài Trần Lệ Xuân và hình dáng chiếc áo dài cách tân hiện đại.</p>
                        </div>
                        <div className="flex justify-between items-center mt-4 pt-4 border-t-2 border-than/10">
                            <span className="text-xs font-bold text-than">Tạp chí Heritage</span>
                            <span className="text-son">↗</span>
                        </div>
                    </div>

                    {/* Article 2 */}
                    <div className="neo-card bg-giay-sang p-6 flex flex-col justify-between hover:-translate-y-1 transition-transform group cursor-pointer border-nghe">
                        <div>
                            <div className="font-label text-[10px] bg-nghe/20 text-than px-2 py-1 inline-block mb-3 neo-border border-than">BÀI VIẾT HƯỚNG DẪN</div>
                            <h3 className="font-display text-2xl text-than mb-2 group-hover:text-son transition-colors">Phân biệt Áo Tấc & Áo Ngũ Thân</h3>
                            <p className="text-sm text-than/70 mb-4 line-clamp-3">Hai loại trang phục thường xuyên bị nhầm lẫn trong các bộ ảnh cưới và sự kiện truyền thống. Cách nhận biết qua nếp áo và ống tay.</p>
                        </div>
                        <div className="flex justify-between items-center mt-4 pt-4 border-t-2 border-than/10">
                            <span className="text-xs font-bold text-than">Đại Việt Cổ Phong</span>
                            <span className="text-son">↗</span>
                        </div>
                    </div>

                </div>
                
                <button className="mt-8 neo-button-secondary bg-giay-sang">XEM TẤT CẢ TÀI LIỆU (12+)</button>
            </div>
        </div>
    );
};
