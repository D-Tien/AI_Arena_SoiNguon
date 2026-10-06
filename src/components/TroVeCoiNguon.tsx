import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { MapPin, Upload, ScanLine, CheckCircle, Calendar, Edit3, Footprints, Compass, Map as MapIcon, Crown, Mountain, Waves, Palmtree, X } from 'lucide-react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import useSound from 'use-sound';

interface Province {
  id: string;
  name: string;
}

interface CheckInRecord {
  url: string;
  date: string;
  note: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  type: 'MILESTONE' | 'REGION';
  requiredCount: number;
  icon: string;
}

const ACHIEVEMENTS: Achievement[] = [
  // MILESTONES
  { id: 'm1', type: 'MILESTONE', title: 'Dấu Chân Khởi Nguyên', description: 'Đánh thức di sản tại vùng đất đầu tiên.', requiredCount: 1, icon: 'Footprints' },
  { id: 'm7', type: 'MILESTONE', title: 'Thất Dặm Phong Trần', description: 'Băng đèo vượt suối, ghi dấu tại 7 tỉnh thành.', requiredCount: 7, icon: 'Compass' },
  { id: 'm21', type: 'MILESTONE', title: 'Kẻ Lãng Du Xuyên Mộc', description: 'Đi qua 1/3 dải đất hình chữ S.', requiredCount: 21, icon: 'Map' },
  { id: 'm63', type: 'MILESTONE', title: 'Viên Mãn Cội Nguồn', description: 'Mở khóa toàn bộ tinh hoa văn hóa 63 tỉnh thành Việt Nam.', requiredCount: 63, icon: 'Crown' },
  
  // REGIONAL
  { id: 'r_bac', type: 'REGION', title: 'Hào Khí Đất Bắc', description: 'Chinh phục trọn vẹn 25 tỉnh thành Miền Bắc.', requiredCount: 25, icon: 'Mountain' },
  { id: 'r_trung', type: 'REGION', title: 'Hùng Ca Miền Trung', description: 'Ghi dấu ấn tại trọn vẹn 19 tỉnh thành Miền Trung.', requiredCount: 19, icon: 'Waves' },
  { id: 'r_nam', type: 'REGION', title: 'Phương Nam Phóng Khoáng', description: 'Khám phá trọn vẹn 19 tỉnh thành Miền Nam.', requiredCount: 19, icon: 'Palmtree' }
];

// Phân loại chính xác 19 tỉnh Miền Trung và 19 tỉnh Miền Nam (25 tỉnh còn lại sẽ auto là Miền Bắc)
const TRUNG_PROVINCES = [
  "THANH HÓA", "NGHỆ AN", "HÀ TĨNH", "QUẢNG BÌNH", "QUẢNG TRỊ", "THỪA THIÊN HUẾ", "THỪA THIÊN - HUẾ", "HUẾ",
  "ĐÀ NẴNG", "QUẢNG NAM", "QUẢNG NGÃI", "BÌNH ĐỊNH", "PHÚ YÊN", "KHÁNH HÒA", "NINH THUẬN", "BÌNH THUẬN",
  "KON TUM", "GIA LAI", "ĐẮK LẮK", "ĐĂK LĂK", "DAK LAK", "ĐẮK NÔNG", "ĐĂK NÔNG", "DAK NONG", "LÂM ĐỒNG"
];

const NAM_PROVINCES = [
  "BÌNH PHƯỚC", "BÌNH DƯƠNG", "ĐỒNG NAI", "TÂY NINH", "BÀ RỊA - VŨNG TÀU", "BÀ RỊA-VŨNG TÀU", "VŨNG TÀU", "HỒ CHÍ MINH", "HCM",
  "LONG AN", "ĐỒNG THÁP", "TIỀN GIANG", "AN GIANG", "BẾN TRE", "VĨNH LONG", "TRÀ VINH", "HẬU GIANG", "KIÊN GIANG", "SÓC TRĂNG", "BẠC LIÊU", "CÀ MAU", "CẦN THƠ"
];

const getRegion = (provinceName: string) => {
  const upperName = provinceName.toUpperCase();
  if (TRUNG_PROVINCES.some(p => upperName.includes(p))) return 'TRUNG';
  if (NAM_PROVINCES.some(p => upperName.includes(p))) return 'NAM';
  return 'BAC';
};

// Từ điển chuẩn hóa tên Tỉnh thành tiếng Việt có dấu
const PROVINCE_MAP: Record<string, string> = {
  "HA NOI": "Hà Nội", "HA NOI CITY": "Hà Nội", "HO CHI MINH": "Hồ Chí Minh", "HO CHI MINH CITY": "Hồ Chí Minh", "HCM CITY": "Hồ Chí Minh", "HCM": "Hồ Chí Minh",
  "HAI PHONG": "Hải Phòng", "HAI PHONG CITY": "Hải Phòng", "DA NANG": "Đà Nẵng", "DA NANG CITY": "Đà Nẵng", "CAN THO": "Cần Thơ", "CAN THO CITY": "Cần Thơ",
  "HA GIANG": "Hà Giang", "CAO BANG": "Cao Bằng", "LAI CHAU": "Lai Châu", "LAO CAI": "Lào Cai",
  "TUYEN QUANG": "Tuyên Quang", "LANG SON": "Lạng Sơn", "DIEN BIEN": "Điện Biên", "YEN BAI": "Yên Bái",
  "THAI NGUYEN": "Thái Nguyên", "SON LA": "Sơn La", "PHU THO": "Phú Thọ", "VINH PHUC": "Vĩnh Phúc",
  "BAC GIANG": "Bắc Giang", "BAC NINH": "Bắc Ninh", "QUANG NINH": "Quảng Ninh", "HAI DUONG": "Hải Dương",
  "HUNG YEN": "Hưng Yên", "THAI BINH": "Thái Bình", "HA NAM": "Hà Nam", "NAM DINH": "Nam Định",
  "NINH BINH": "Ninh Bình", "HOA BINH": "Hòa Bình", "THANH HOA": "Thanh Hóa", "NGHE AN": "Nghệ An",
  "HA TINH": "Hà Tĩnh", "QUANG BINH": "Quảng Bình", "QUANG TRI": "Quảng Trị", "THUA THIEN HUE": "Thừa Thiên Huế", "THUA THIEN - HUE": "Thừa Thiên Huế",
  "QUANG NAM": "Quảng Nam", "QUANG NGAI": "Quảng Ngãi", "KON TUM": "Kon Tum", "GIA LAI": "Gia Lai",
  "BINH DINH": "Bình Định", "PHU YEN": "Phú Yên", "DAK LAK": "Đắk Lắk", "KHANH HOA": "Khánh Hòa",
  "DAK NONG": "Đắk Nông", "LAM DONG": "Lâm Đồng", "NINH THUAN": "Ninh Thuận", "BINH THUAN": "Bình Thuận",
  "BINH PHUOC": "Bình Phước", "TAY NINH": "Tây Ninh", "BINH DUONG": "Bình Dương", "DONG NAI": "Đồng Nai",
  "BA RIA - VUNG TAU": "Bà Rịa - Vũng Tàu", "BA RIA VUNG TAU": "Bà Rịa - Vũng Tàu", "LONG AN": "Long An", 
  "TIEN GIANG": "Tiền Giang", "BEN TRE": "Bến Tre", "TRA VINH": "Trà Vinh", "VINH LONG": "Vĩnh Long", 
  "DONG THAP": "Đồng Tháp", "AN GIANG": "An Giang", "KIEN GIANG": "Kiên Giang", "HAU GIANG": "Hậu Giang", 
  "SOC TRANG": "Sóc Trăng", "BAC LIEU": "Bạc Liêu", "CA MAU": "Cà Mau"
};

const getProperName = (rawName: string) => {
  if (!rawName) return "Unknown";
  const stripped = rawName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().replace(/Đ/g, "D");
  return PROVINCE_MAP[stripped] || rawName;
};

const IconMap: Record<string, any> = {
  Footprints, Compass, Map: MapIcon, Crown, Mountain, Waves, Palmtree
};

const geoUrl = '/vietnam.json';

const TroVeCoiNguon: React.FC = () => {
  const { width, height } = useWindowSize();
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
  
  // Local storage states
  const [checkInHistory, setCheckInHistory] = useState<Record<string, CheckInRecord[]>>(() => {
    const saved = localStorage.getItem('cultural_ambassador_timeline');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const migrated: Record<string, CheckInRecord[]> = {};
        Object.keys(parsed).forEach(key => {
          const properKey = getProperName(key);
          migrated[properKey] = parsed[key];
        });
        return migrated;
      } catch(e) {
        return {};
      }
    }
    return {};
  });

  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>(() => {
    const saved = localStorage.getItem('cultural_ambassador_achievements');
    return saved ? JSON.parse(saved) : [];
  });

  const [uploadState, setUploadState] = useState<'IDLE' | 'SCANNING'>('IDLE');
  const [editingNote, setEditingNote] = useState<{ province: string; index: number } | null>(null);
  const [tempNoteText, setTempNoteText] = useState("");
  const [showConfettiFor, setShowConfettiFor] = useState<Achievement | null>(null);
  
  // Trạng thái mở/đóng Khay Huy chương (Dropdown)
  const [showAchievements, setShowAchievements] = useState(false);

  // Hiệu ứng Âm thanh (Sensory UX)
  const [playStamp] = useSound('/sound/stamp.mp3', { volume: 0.8 });
  const [playAchievement] = useSound('/sound/achievement.mp3', { volume: 0.6 });

  useEffect(() => {
    try {
      localStorage.setItem('cultural_ambassador_timeline', JSON.stringify(checkInHistory));
    } catch (e) {
      console.error("Local storage quota exceeded:", e);
    }
  }, [checkInHistory]);

  useEffect(() => {
    try {
      localStorage.setItem('cultural_ambassador_achievements', JSON.stringify(unlockedAchievements));
    } catch (e) {
      console.error(e);
    }
  }, [unlockedAchievements]);

  // Achievement logic checker
  useEffect(() => {
    const verifiedProvinces = Object.keys(checkInHistory).filter(key => checkInHistory[key].length > 0);
    const total = verifiedProvinces.length;
    
    let bacCount = 0; let trungCount = 0; let namCount = 0;
    
    verifiedProvinces.forEach(prov => {
      const region = getRegion(prov);
      if (region === 'BAC') bacCount++;
      else if (region === 'TRUNG') trungCount++;
      else if (region === 'NAM') namCount++;
    });

    const newUnlocks: Achievement[] = [];
    
    ACHIEVEMENTS.forEach(ach => {
      if (!unlockedAchievements.includes(ach.id)) {
        let isMet = false;
        if (ach.type === 'MILESTONE' && total >= ach.requiredCount) isMet = true;
        if (ach.type === 'REGION') {
          if (ach.id === 'r_bac' && bacCount >= ach.requiredCount) isMet = true;
          if (ach.id === 'r_trung' && trungCount >= ach.requiredCount) isMet = true;
          if (ach.id === 'r_nam' && namCount >= ach.requiredCount) isMet = true;
        }
        if (isMet) newUnlocks.push(ach);
      }
    });

    if (newUnlocks.length > 0) {
      setUnlockedAchievements(prev => [...prev, ...newUnlocks.map(a => a.id)]);
      setShowConfettiFor(newUnlocks[0]); 
      playAchievement(); // Phát âm thanh vinh danh khi đạt Thành tựu
    }
  }, [checkInHistory, unlockedAchievements, playAchievement]);

  const handleGeographyClick = (geo: any) => {
    const rawName = geo.properties?.Name_VI || geo.properties?.ten_tinh || geo.properties?.name || geo.properties?.Name || geo.id || 'Unknown';
    const name = getProperName(rawName);
    const id = geo.id || geo.properties?.id || name;
    
    setSelectedProvince({ id, name });
    setUploadState('IDLE');
    setEditingNote(null);
    // Đóng dropdown khi click vào bản đồ để tránh vướng
    setShowAchievements(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedProvince) return;
    
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = '';
    setUploadState('SCANNING');
    
    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.onload = () => {
        // Tối ưu hóa kích thước ảnh bằng Canvas để tránh tràn bộ nhớ LocalStorage (Lỗi trắng màn hình)
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        let scale = 1;
        if (img.width > MAX_WIDTH) {
          scale = MAX_WIDTH / img.width;
        }
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // Nén thành định dạng WebP/JPEG chất lượng 70%
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);

        setTimeout(() => {
          playStamp(); // Phát tiếng cộp đóng mộc

          const newRecord: CheckInRecord = {
            url: compressedBase64,
            date: new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }),
            note: `Chạm vào đây để viết nhật ký tại ${selectedProvince.name}...`
          };

          setCheckInHistory(prev => ({
            ...prev,
            [selectedProvince.name]: [...(prev[selectedProvince.name] || []), newRecord]
          }));
          
          setUploadState('IDLE'); 
        }, 2000);
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleSaveNote = () => {
    if (!editingNote) return;
    setCheckInHistory(prev => {
      const provinceRecords = [...(prev[editingNote.province] || [])];
      if (provinceRecords[editingNote.index]) {
        provinceRecords[editingNote.index] = { ...provinceRecords[editingNote.index], note: tempNoteText };
      }
      return { ...prev, [editingNote.province]: provinceRecords };
    });
    setEditingNote(null);
  };

  const completedCount = Object.keys(checkInHistory).filter(key => checkInHistory[key].length > 0).length;

  return (
    <div className="flex flex-col min-h-screen bg-[#F3EFE0] text-[#292524] font-sans overflow-x-hidden relative">
      
      {/* CONFETTI MODAL */}
      {showConfettiFor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <Confetti width={width} height={height} numberOfPieces={500} recycle={false} colors={['#8B0000', '#F59E0B', '#10B981', '#3B82F6', '#F3EFE0']} />
          <div className="bg-[#FAF8F1] rounded-2xl p-8 max-w-sm w-full mx-4 shadow-[0_0_50px_rgba(245,158,11,0.5)] border-4 border-yellow-500 relative flex flex-col items-center transform animate-in zoom-in-75 duration-500">
            <button 
              onClick={() => setShowConfettiFor(null)}
              className="absolute top-3 right-3 text-stone-400 hover:text-[#8B0000] transition-colors"
            >
              <X size={24} />
            </button>
            <div className="w-24 h-24 bg-gradient-to-br from-yellow-200 to-yellow-500 rounded-full flex items-center justify-center border-4 border-yellow-600 shadow-lg mb-6 text-yellow-900">
               {IconMap[showConfettiFor.icon] && React.createElement(IconMap[showConfettiFor.icon], { size: 48 })}
            </div>
            <h2 className="font-serif text-3xl font-bold text-[#8B0000] mb-2 text-center uppercase tracking-wide">Mở Khóa Thành Tựu!</h2>
            <h3 className="text-xl font-bold text-stone-800 mb-3 text-center">{showConfettiFor.title}</h3>
            <p className="text-center text-stone-600 italic font-serif leading-relaxed mb-6">"{showConfettiFor.description}"</p>
            <button 
              onClick={() => setShowConfettiFor(null)}
              className="w-full py-3 bg-[#8B0000] text-white font-bold rounded-lg hover:bg-red-900 transition-colors shadow-md"
            >
              Tiếp Tục Hành Trình
            </button>
          </div>
        </div>
      )}

      {/* TOP SECTION: MAP & TIMELINE (Full Screen Height) */}
      <div className="flex flex-col md:flex-row w-full h-screen relative">
        
        {/* LEFT PANEL - INTERACTIVE MAP */}
        <div className="w-full md:w-[60%] flex flex-col h-full relative overflow-y-auto custom-scrollbar border-b md:border-b-0 md:border-r border-[#8B0000]/20">
          
          {/* NÚT CROWN DROPDOWN ĐẶT Ở GÓC PHẢI TRÊN CÙNG (ABSOLUTE) ĐỂ KHÔNG CHEN VÀO BỐ CỤC CHÍNH */}
          <div className="absolute top-8 right-8 z-40">
            <button 
              onClick={() => setShowAchievements(!showAchievements)}
              className={`w-12 h-12 rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(139,0,0,0.15)] transition-all duration-300 ml-auto ${showAchievements ? 'bg-[#8B0000] text-white scale-110' : 'bg-[#FAF8F1] text-[#8B0000] border border-[#8B0000]/30 hover:border-[#8B0000] hover:bg-[#8B0000]/5'}`}
              title="Xem Bảng Vàng Thành Tựu"
            >
              <Crown size={24} className={showAchievements ? 'animate-pulse' : ''} />
            </button>

            {/* Khung Dropdown trượt dọc xuống (Mở về bên trái) */}
            <div 
              className={`absolute top-full mt-4 right-0 w-[340px] sm:w-[420px] bg-[#FAF8F1]/95 backdrop-blur-md border border-[#8B0000]/20 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] p-6 z-50 transition-all duration-400 origin-top-right flex flex-col items-center ${showAchievements ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}
            >
              <span className="block text-center text-xs font-serif text-[#8B0000]/80 tracking-widest mb-5 uppercase">
                — Bảng Vàng Thành Tựu —
              </span>
              
              <div className="flex flex-wrap justify-center gap-4 sm:gap-5">
                {ACHIEVEMENTS.map(ach => {
                  const isUnlocked = unlockedAchievements.includes(ach.id);
                  const IconComponent = IconMap[ach.icon];
                  
                  return (
                    <div key={ach.id} className="relative group cursor-pointer flex flex-col items-center">
                      {isUnlocked ? (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8B0000] to-[#590000] flex items-center justify-center shadow-[0_0_15px_rgba(139,0,0,0.4)] border-2 border-[#D4AF37] transform hover:scale-110 transition-transform relative text-[#FDFBF7]">
                          {IconComponent && <IconComponent size={20} />}
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-stone-200/50 flex items-center justify-center border border-stone-300 transform hover:scale-105 transition-transform relative text-stone-400">
                          {IconComponent && <IconComponent size={20} />}
                        </div>
                      )}
                      
                      {/* Tooltip */}
                      <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 w-48 bg-[#292524] text-[#F3EFE0] text-xs p-3 rounded-lg shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 text-center">
                        <p className="font-bold font-serif mb-1 text-yellow-400 text-sm">{ach.title}</p>
                        <p className="text-stone-300 leading-relaxed">{ach.description}</p>
                        {!isUnlocked && (
                          <p className="text-[10px] mt-2 text-stone-400 uppercase tracking-widest font-semibold bg-white/10 py-1 rounded">
                            Cần {ach.requiredCount} {ach.type === 'REGION' ? 'tỉnh vùng này' : 'tỉnh thành'}
                          </p>
                        )}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-[#292524]"></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* 1. TOP HEADER & PROGRESS */}
          <div className="w-full flex flex-col items-center pt-10 px-8 z-20 shrink-0">
            <h1 className="text-4xl font-serif font-bold text-[#8B0000] mb-4 text-center drop-shadow-sm pr-12">
              Hành Trình Đại Sứ Văn Hóa
            </h1>
            
            <div className="w-full max-w-2xl bg-[#E7E5E4] rounded-full h-3 mt-1 overflow-hidden border border-stone-300 shadow-inner">
              <div 
                className="bg-[#8B0000] h-3 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${(completedCount / 63) * 100}%` }}
              ></div>
            </div>
            
            <p className="text-center text-stone-600 font-medium mt-4 mb-2">
              Đã hoàn thành: <span className="font-bold text-[#8B0000]">{completedCount}</span>/63 Tỉnh thành
            </p>
          </div>

          {/* 3. MAP CONTAINER (Takes remaining space) */}
          <div className="w-full relative flex items-center justify-center drop-shadow-2xl mt-4 mb-20 z-0 overflow-visible">
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{ scale: 2800, center: [107.5, 15.5] }}
              width={800} 
              height={1000}
              style={{ width: "100%", height: "auto" }}
            >
              <Geographies geography="/vietnam.json">
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const rawName = geo.properties?.Name_VI || geo.properties?.ten_tinh || geo.properties?.Name || geo.properties?.name || "Unknown";
                    const provinceName = getProperName(rawName);
                    
                    const isVerified = (checkInHistory[provinceName]?.length || 0) > 0;
                    const isSelected = selectedProvince?.name === provinceName;

                    return (
                      <Geography
                        key={geo.rsmKey || Math.random()}
                        geography={geo}
                        onClick={() => handleGeographyClick(geo)}
                        fill={isVerified ? "#8B0000" : "#C8C2B3"}
                        stroke={isSelected ? "#F59E0B" : (isVerified ? "#F3EFE0" : "#A39B8A")}
                        strokeWidth={isSelected ? 2 : (isVerified ? 1 : 0.5)}
                        className="focus:outline-none transition-all duration-300" 
                        style={{
                          default: { 
                            fill: isVerified ? "#8B0000" : "#C8C2B3", 
                            stroke: isSelected ? "#F59E0B" : (isVerified ? "#F3EFE0" : "#A39B8A"), 
                            strokeWidth: isSelected ? 2 : (isVerified ? 1 : 0.5), 
                            outline: "none" 
                          },
                          hover: { 
                            fill: isVerified ? "#990000" : "#B5AFA1", 
                            stroke: "#F59E0B", 
                            strokeWidth: 2, 
                            outline: "none", 
                            cursor: "pointer" 
                          },
                          pressed: { 
                            fill: "#7A0000", 
                            stroke: "#F59E0B", 
                            strokeWidth: 2, 
                            outline: "none" 
                          },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ComposableMap>
            
            {/* GHI CHÚ BẢN ĐỒ - TRƯỚC SÁP NHẬP 2025 */}
            <div className="absolute bottom-8 right-8 max-w-[200px] pointer-events-none z-10">
              <div className="bg-[#FAF8F1]/80 backdrop-blur-sm border-l-2 border-[#8B0000] p-3 shadow-sm">
                <p className="text-[10px] uppercase tracking-widest text-[#8B0000] font-bold font-serif mb-1">
                  Lưu ý dữ liệu
                </p>
                <p className="text-[11px] text-stone-600 font-serif italic leading-relaxed">
                  Bản đồ sử dụng địa giới hành chính 63 tỉnh thành thời điểm trước sáp nhập năm 2025.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT PANEL - DYNAMIC DETAIL & AI VERIFICATION */}
        <div className="w-full md:w-[40%] p-6 flex flex-col items-center bg-[#F3EFE0]/40 relative h-full overflow-hidden">
          <div className="w-full h-full max-w-md bg-[#FAF8F1] shadow-2xl rounded-2xl p-6 border border-stone-200 flex flex-col">
            {selectedProvince ? (
              <div className="flex flex-col h-full items-center w-full">
                <h3 className="text-3xl font-bold mb-4 uppercase text-[#8B0000] tracking-wider font-serif text-center">
                  {selectedProvince.name}
                </h3>
                
                {uploadState === 'SCANNING' ? (
                  <div className="w-full flex-1 bg-stone-800 rounded-lg relative overflow-hidden flex flex-col items-center justify-center min-h-[300px]">
                    <div className="absolute top-0 left-0 w-full h-1 bg-red-500 shadow-[0_0_15px_rgba(255,0,0,0.8)] animate-[ping_2s_ease-in-out_infinite]"></div>
                    <div className="text-white animate-pulse">AI Vision đang thẩm định...</div>
                  </div>
                ) : (
                  <>
                    {(checkInHistory[selectedProvince.name]?.length || 0) > 0 ? (
                      <div className="w-full flex-1 flex flex-col overflow-hidden">
                        {/* Vùng cuộn dọc dọc cho Timeline */}
                        <div className="flex-1 overflow-y-auto w-full pr-2 pb-4 space-y-8
                                        [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#8B0000]/20 [&::-webkit-scrollbar-thumb]:rounded-full">
                          
                          <div className="relative pl-6 border-l-2 border-[#8B0000]/30 ml-2 mt-4 space-y-10">
                            {checkInHistory[selectedProvince.name].map((record, index) => {
                              const rotateClass = index % 2 === 0 ? '-rotate-2' : 'rotate-2';
                              const isEditing = editingNote?.province === selectedProvince.name && editingNote?.index === index;
                              
                              return (
                                <div key={index} className="relative">
                                  {/* Dấu chấm Timeline */}
                                  <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-[#FAF8F1] border-[3px] border-[#8B0000] shadow-sm"></div>
                                  
                                  {/* Ngày tháng */}
                                  <div className="flex items-center gap-2 text-[#8B0000] font-semibold mb-3">
                                    <Calendar size={16} />
                                    <span>{record.date}</span>
                                  </div>
                                  
                                  {/* Khung thẻ (Card) */}
                                  <div className="bg-white rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.05)] border border-stone-200 p-4 transform transition-transform hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.1)]">
                                    
                                    {/* Ảnh Polaroid */}
                                    <div className={`w-full max-w-[220px] mx-auto bg-[#FDFBF7] p-3 pb-6 shadow-md border border-stone-200 mb-4 ${rotateClass}`}>
                                      <div className="w-full aspect-[3/4] relative overflow-hidden bg-stone-200 border border-stone-300 shadow-inner">
                                        <img src={record.url} alt="Check-in" className="w-full h-full object-cover" />
                                        <div className="absolute top-2 right-2 w-14 h-14 border-[3px] border-[#8B0000]/90 rounded-full flex items-center justify-center -rotate-12 bg-[#F3EFE0]/40 backdrop-blur-sm shadow-sm mix-blend-multiply">
                                          <span className="text-[#8B0000] font-bold text-[9px] text-center leading-tight tracking-tighter opacity-90">
                                            ĐÃ KIỂM<br/>ĐỊNH
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    
                                    {/* Nội dung ghi chú (Note) có thể Edit inline */}
                                    <div className="relative mt-2">
                                      {isEditing ? (
                                        <div className="w-full animate-in fade-in zoom-in-95 duration-200">
                                          <textarea 
                                            autoFocus
                                            value={tempNoteText}
                                            onChange={(e) => setTempNoteText(e.target.value)}
                                            onBlur={handleSaveNote}
                                            onKeyDown={(e) => {
                                              if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey) {
                                                e.preventDefault();
                                                handleSaveNote();
                                              }
                                            }}
                                            className="w-full bg-[#FAF8F1] border-[1.5px] border-[#8B0000]/50 rounded-lg p-3 font-serif italic text-stone-800 leading-relaxed text-sm focus:outline-none focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/20 min-h-[80px] resize-none shadow-inner"
                                            placeholder="Viết nhật ký của bạn ở đây..."
                                          />
                                          <div className="flex justify-end mt-2">
                                            <button 
                                              onMouseDown={(e) => { e.preventDefault(); handleSaveNote(); }}
                                              className="text-xs bg-[#8B0000] text-white px-4 py-1.5 rounded-full hover:bg-red-900 transition-colors font-medium shadow-sm"
                                            >
                                              Lưu ghi chú
                                            </button>
                                          </div>
                                        </div>
                                      ) : (
                                        <div 
                                          onClick={() => {
                                            setEditingNote({ province: selectedProvince.name, index });
                                            setTempNoteText(record.note);
                                          }}
                                          className="group cursor-pointer p-3 -ml-3 rounded-lg hover:bg-stone-50 transition-colors border border-transparent hover:border-stone-200"
                                        >
                                          <Edit3 size={16} className="absolute left-1 top-4 text-stone-300 group-hover:text-[#8B0000] transition-colors" />
                                          <p className="pl-6 font-serif italic text-stone-700 leading-relaxed text-sm group-hover:text-stone-900">
                                            "{record.note}"
                                          </p>
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                </div>
                              );
                            })}
                          </div>
                        </div>
                        
                        {/* Nút check-in */}
                        <div className="pt-4 border-t border-stone-200/60 mt-2">
                          <label className="w-full py-3 bg-transparent border-[1.5px] border-[#8B0000] text-[#8B0000] 
                                            font-serif font-semibold rounded-lg hover:bg-[#8B0000] hover:text-[#FAF8F1] 
                                            transition-all duration-300 shadow-sm cursor-pointer flex justify-center items-center">
                            + Viết tiếp nhật ký tại {selectedProvince.name}
                            <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                          </label>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full flex-1 bg-[#FDFBF7] border-2 border-dashed border-[#A39B8A] rounded-lg mt-2 flex flex-col items-center justify-center p-6 shadow-inner">
                        <p className="text-stone-500 mb-6 font-serif italic text-lg text-center">Cuốn nhật ký di sản còn đang chờ bạn viết nên những trang đầu tiên.</p>
                        <label 
                          className="px-6 py-3 bg-[#8B0000] text-[#F3EFE0] font-serif font-semibold rounded-md hover:bg-red-950 transition-colors shadow-md cursor-pointer flex items-center gap-2"
                        >
                          <ScanLine size={20} />
                          Tải ảnh & Nhờ AI Kiểm Định
                          <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                        </label>
                      </div>
                    )}
                  </>
                )}
              </div>
            ) : (
              <div className="flex flex-col h-full items-center justify-center text-stone-400 space-y-4 animate-in fade-in duration-500">
                <div className="w-24 h-24 rounded-full bg-stone-200/50 flex items-center justify-center mb-2">
                  <MapPin size={48} className="text-[#8B0000]/40" />
                </div>
                <p className="text-xl font-medium text-center px-4 max-w-xs text-stone-500 italic">
                  Vui lòng chọn một tỉnh thành trên bản đồ để mở Nhật ký Hành trình
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TroVeCoiNguon;
