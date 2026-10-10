import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { SmartImage } from './SmartImage';

// Dữ liệu Văn hoá thật (mock) cho một số trang phục lõi
const CULTURE_DATA: Record<string, any> = {
    'ao-dai': {
        origin: 'Tân thời từ thập niên 1930, Áo Dài là biểu tượng thanh lịch của phụ nữ Việt Nam, kết hợp kỹ thuật may phương Tây với vóc dáng phương Đông.',
        keep: ['Cổ đứng (cổ lãnh tụ)', 'Tà áo dài hai vạt', 'Quần ống rộng'],
        change: ['Chất liệu (denim, xuyên thấu)', 'Hoạ tiết in 3D', 'Mix cùng sneaker, boots'],
        trivia: 'Tên gọi "Áo Dài" xuất phát từ thiết kế tà áo dài đặc trưng, ban đầu gọi là "Áo dài Lemur" do họa sĩ Cát Tường sáng tạo.',
        link: 'https://vi.wikipedia.org/wiki/%C3%81o_d%C3%A0i'
    },
    'ao-tu-than': {
        origin: 'Trang phục phổ biến của phụ nữ Kinh Bắc xưa, gồm 4 thân áo ghép lại tượng trưng cho tứ thân phụ mẫu (cha mẹ ruột và cha mẹ chồng).',
        keep: ['Dây thắt lưng (bao sinh)', 'Yếm lót trong', 'Mớ ba mớ bảy'],
        change: ['Độ ngắn của tà áo', 'Thắt lưng bản to hiện đại', 'Phối cùng quần short hoặc váy tennis'],
        trivia: 'Người xưa thường không cài kín tà áo trước ngực để khoe khéo chiếc yếm đào lấp ló đầy tinh tế.',
        link: 'https://vi.wikipedia.org/wiki/%C3%81o_t%E1%BB%A9_th%C3%A2n'
    },
    'ao-ngu-than': {
        origin: 'Xuất hiện từ thế kỷ 18 thời chúa Nguyễn Phúc Khoát, gồm 5 thân áo ghép lại. Thân thứ 5 ẩn bên trong tượng trưng cho sự kín đáo và bản ngã.',
        keep: ['Cổ đứng vuông vức', '5 cúc áo đặc trưng', 'Form áo dáng chữ A'],
        change: ['Chất liệu thô mộc (linens)', 'Họa tiết Graphic, Typo', 'Khoác ngoài mang phong cách Techwear'],
        trivia: '5 chiếc khuy áo không chỉ để cài mà còn tượng trưng cho đạo lý Ngũ Thường của con người: Nhân, Nghĩa, Lễ, Trí, Tín.',
        link: 'https://vi.wikipedia.org/wiki/%C3%81o_ng%C5%A9_th%C3%A2n'
    },
    'ao-ba-ba': {
        origin: 'Trang phục thân thuộc của người dân Nam Bộ, thiết kế không cổ, xẻ tà hai bên, kết hợp với quần lụa đen và khăn rằn mộc mạc.',
        keep: ['Thiết kế xẻ tà, cúc giữa', 'Hai túi to phía trước', 'Đường may ráp lăng tay áo'],
        change: ['Phối cùng quần jeans năng động', 'Họa tiết pop-art', 'Thêm các phụ kiện túi da, kính râm'],
        trivia: 'Tên gọi "Áo Bà Ba" có giả thuyết bắt nguồn từ người gốc Hoa (người Bà Ba) ở Malaysia, sau đó du nhập và cải biên tại Nam Bộ.',
        link: 'https://vi.wikipedia.org/wiki/%C3%81o_b%C3%A0_ba'
    },
    'ao-the': {
        origin: 'Phiên bản nam của áo dài/áo ngũ thân, thường may bằng chất liệu vải the (lụa mỏng), mang lại vẻ thư sinh, nho nhã cho phái mạnh.',
        keep: ['Chất vải mỏng nhẹ (the)', 'Form dáng dài rộng', 'Mặc lót áo trắng bên trong'],
        change: ['Khoác ngoài quần âu áo mi', 'Phối cùng giày da, sneaker', 'Cách điệu vạt áo phi đối xứng'],
        trivia: 'Áo the đen kết hợp với quần ống sớ trắng và khăn xếp từng là "combo" chuẩn mực của tầng lớp trí thức, thầy đồ thời xưa.',
        link: 'https://vi.wikipedia.org/wiki/%C3%81o_d%C3%A0i_(nam)'
    },
    'ao-nhat-binh': {
        origin: 'Triều phục danh giá của bậc hậu phi, công chúa triều Nguyễn. Đặc trưng với cổ áo to bản có thêu hoa văn tinh xảo.',
        keep: ['Cổ áo to bản chữ nhật', 'Hoa văn loan phượng', 'Tay áo thụng rộng'],
        change: ['Mix cùng váy midi, maxi', 'Form croptop hiện đại', 'Phụ kiện kim loại góc cạnh'],
        trivia: 'Chữ "Nhật Bình" bắt nguồn từ hoa văn to bản ở cổ áo, khi cài lại sẽ ghép thành một hình chữ nhật lớn ngay trước ngực.',
        link: 'https://vi.wikipedia.org/wiki/%C3%81o_Nh%E1%BA%ADt_B%C3%ACnh'
    }
};

const DEFAULT_CULTURE = {
    origin: 'Trang phục truyền thống Việt Nam luôn mang đậm tính ứng dụng và triết lý âm dương ngũ hành, thể hiện qua cách xếp nếp, cắt may.',
    keep: ['Form dáng cơ bản', 'Tinh thần dân tộc', 'Sự kín đáo tinh tế'],
    change: ['Chất liệu hiện đại', 'Phụ kiện streetwear', 'Màu sắc phá cách'],
    trivia: 'Nhiều kỹ thuật nhuộm vải tự nhiên của ông cha ta đến nay vẫn được các hãng thời trang bền vững trên thế giới nghiên cứu.',
    link: 'https://vi.wikipedia.org/wiki/Trang_ph%E1%BB%A5c_Vi%E1%BB%87t_Nam'
};

export const CultureCard = ({ isOpen, onClose, outfitName, core }: { isOpen: boolean, onClose: () => void, outfitName: string, core?: string }) => {
    const data = (core && CULTURE_DATA[core]) ? CULTURE_DATA[core] : DEFAULT_CULTURE;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-8">
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }} 
                        onClick={onClose}
                        className="absolute inset-0 bg-than/60 backdrop-blur-md" 
                    />
                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, rotateY: 90 }} 
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }} 
                        exit={{ opacity: 0, scale: 0.9, rotateY: -90 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="relative z-10 w-full h-full md:h-[90vh] max-w-5xl bg-giay-do neo-border neo-shadow flex flex-col md:flex-row overflow-hidden origin-left"
                        style={{ transformPerspective: 2000 }}
                    >
                        <button onClick={onClose} className="absolute top-4 right-4 text-than hover:text-son z-50 bg-giay-sang p-2 rounded-full neo-border"><X size={24} /></button>
                        
                        {/* Left Page (Image/Hero) */}
                        <div className="flex-1 bg-giay-sang p-8 border-b-2 md:border-b-0 md:border-r-2 border-than flex flex-col justify-center items-center relative overflow-hidden">
                            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
                            
                            <h2 className="font-display text-5xl lg:text-7xl text-than text-center mb-8 relative z-10">{outfitName}</h2>
                            <div className="w-full max-w-sm aspect-[3/4] bg-giay-do neo-border relative z-10 flex items-center justify-center p-0 overflow-hidden drop-shadow-xl rotate-2">
                                <SmartImage slot={core ? `costume-${core}` : 'scene-hanoi'} className="w-full h-full absolute inset-0 mix-blend-multiply" />
                            </div>
                        </div>

                        {/* Right Page (Content) */}
                        <div className="flex-[1.2] bg-giay-do p-8 md:p-12 overflow-y-auto hidden-scrollbar flex flex-col gap-8 relative">
                            <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-black/5 to-transparent pointer-events-none" />
                            
                            <section className="shrink-0">
                                <h3 className="font-label text-son mb-3 flex items-center gap-2"><span className="w-2 h-2 bg-son rounded-full" />NGUỒN GỐC & Ý NGHĨA</h3>
                                <p className="text-than/80 leading-relaxed text-lg">
                                    {data.origin}
                                </p>
                            </section>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 shrink-0">
                                <div className="neo-card bg-luc/10 border-luc p-5">
                                    <h4 className="font-label text-luc mb-2 text-sm">NÊN GIỮ</h4>
                                    <ul className="list-disc pl-4 text-than/80 text-sm space-y-1">
                                        {data.keep.map((item: string, i: number) => <li key={i}>{item}</li>)}
                                    </ul>
                                </div>
                                <div className="neo-card bg-nghe/10 border-nghe p-5">
                                    <h4 className="font-label text-nghe mb-2 text-sm">THOẢI MÁI SÁNG TẠO</h4>
                                    <ul className="list-disc pl-4 text-than/80 text-sm space-y-1">
                                        {data.change.map((item: string, i: number) => <li key={i}>{item}</li>)}
                                    </ul>
                                </div>
                            </div>

                            <div className="neo-card border-sen p-6 relative bg-giay-sang mt-4 shrink-0">
                                <h4 className="font-label text-sen mb-3 flex items-center gap-2">BẠN CÓ BIẾT?</h4>
                                <p className="text-than/80 text-sm leading-relaxed relative z-10 break-words whitespace-normal">
                                    {data.trivia}
                                </p>
                            </div>

                            <div className="mt-auto pt-8 flex items-center justify-between border-t-2 border-than/10">
                                <span className="font-label text-[10px] text-than/50 border border-than/20 px-2 py-1 rounded-sm">NỘI DUNG DO VĂN LANG CUNG CẤP</span>
                                <a 
                                    href={data.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-son font-label text-sm flex items-center gap-1 hover:underline transition-all"
                                >
                                    Xem nguồn tham khảo <ExternalLink size={14} />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
