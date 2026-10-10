import React, { useState } from 'react';

const SKIN_COLORS = ['#FAD6C6', '#F2C9A5', '#E6B893', '#D19A6C', '#AF7245', '#7A4B29'];
const MATERIALS = ['Lụa', 'Đũi', 'Gấm', 'Cotton'];
const PATTERNS = ['Trơn', 'Sen', 'Sóng', 'Trống đồng', 'Chấm'];
const SHOES = ['Sneaker', 'Guốc mộc', 'Dép quai'];

export const StudioDo = () => {
    const [primary, setPrimary] = useState('#72B8D9'); 
    const [secondary, setSecondary] = useState('#FFFFFF'); 
    const [skin, setSkin] = useState('#FAD6C6');
    
    // Toggles
    const [zoom, setZoom] = useState(false);
    const [darkBg, setDarkBg] = useState(false);
    
    // Layers
    const [showSkin, setShowSkin] = useState(true);
    const [showHair, setShowHair] = useState(true);
    const [showUnderwear, setShowUnderwear] = useState(true);
    const [showPants, setShowPants] = useState(true);
    const [showAoDai, setShowAoDai] = useState(true);
    const [showShoes, setShowShoes] = useState(true);

    // Styling choices
    const [material, setMaterial] = useState('Lụa');
    const [pattern, setPattern] = useState('Trơn');
    const [shoeType, setShoeType] = useState('Dép quai');

    return (
        <div className={`w-full h-screen flex flex-col md:flex-row font-sans text-than overflow-hidden p-8 gap-8 transition-colors duration-500 ${darkBg ? 'bg-than text-giay-sang' : 'bg-giay-do'}`}>
            <div className="flex-[0.8] max-w-[350px] space-y-6 overflow-y-auto hidden-scrollbar pr-4">
                <div>
                    <h1 className="font-display text-4xl">Studio Đồ</h1>
                    <p className={`font-label text-sm uppercase tracking-widest mt-1 ${darkBg ? 'text-giay-sang/70' : 'text-son'}`}>Xưởng thử trang phục</p>
                </div>
                
                {/* Controls */}
                <div className={`space-y-6 neo-card p-6 border-2 ${darkBg ? 'bg-than/50 border-giay-sang' : 'bg-giay-sang border-than'}`}>
                    {/* Da */}
                    <div>
                        <label className="font-label text-xs block mb-2">MÀU DA</label>
                        <div className="flex gap-2">
                            {SKIN_COLORS.map(c => (
                                <button key={c} onClick={() => setSkin(c)} className={`w-8 h-8 rounded-full border-2 ${skin === c ? 'border-son scale-110' : 'border-than'}`} style={{ backgroundColor: c }} />
                            ))}
                        </div>
                    </div>

                    {/* Áo & Quần */}
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="font-label text-xs block mb-2">MÀU ÁO</label>
                            <input type="color" value={primary} onChange={e => setPrimary(e.target.value)} className="w-full h-10 border-2 border-than cursor-pointer p-0" />
                        </div>
                        <div className="flex-1">
                            <label className="font-label text-xs block mb-2">MÀU QUẦN</label>
                            <input type="color" value={secondary} onChange={e => setSecondary(e.target.value)} className="w-full h-10 border-2 border-than cursor-pointer p-0" />
                        </div>
                    </div>

                    {/* Chất liệu & Hoạ tiết */}
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="font-label text-xs block mb-2">CHẤT LIỆU</label>
                            <select value={material} onChange={e => setMaterial(e.target.value)} className="w-full font-label text-xs p-2 border-2 border-than bg-transparent">
                                {MATERIALS.map(m => <option key={m} className="text-than">{m}</option>)}
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="font-label text-xs block mb-2">HOẠ TIẾT</label>
                            <select value={pattern} onChange={e => setPattern(e.target.value)} className="w-full font-label text-xs p-2 border-2 border-than bg-transparent">
                                {PATTERNS.map(p => <option key={p} className="text-than">{p}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Giày */}
                    <div>
                        <label className="font-label text-xs block mb-2">GIÀY DÉP</label>
                        <div className="flex gap-2">
                            {SHOES.map(s => (
                                <button key={s} onClick={() => setShoeType(s)} className={`px-3 py-1 font-label text-xs border-2 ${shoeType === s ? 'bg-than text-giay-sang border-than' : 'border-than bg-transparent'}`}>{s}</button>
                            ))}
                        </div>
                    </div>

                    <hr className="border-than/20" />

                    {/* Layers */}
                    <div>
                        <label className="font-label text-xs block mb-2">HIỆN LỚP (LAYERS)</label>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={showSkin} onChange={e=>setShowSkin(e.target.checked)} /> Da</label>
                            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={showHair} onChange={e=>setShowHair(e.target.checked)} /> Tóc</label>
                            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={showUnderwear} onChange={e=>setShowUnderwear(e.target.checked)} /> Áo lót</label>
                            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={showPants} onChange={e=>setShowPants(e.target.checked)} /> Quần lụa</label>
                            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={showAoDai} onChange={e=>setShowAoDai(e.target.checked)} /> Áo dài</label>
                            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={showShoes} onChange={e=>setShowShoes(e.target.checked)} /> Giày</label>
                        </div>
                    </div>

                    <hr className="border-than/20" />

                    {/* View Controls */}
                    <div className="flex gap-2">
                        <button onClick={() => setZoom(!zoom)} className="flex-1 neo-button-secondary font-label text-xs">{zoom ? 'THU NHỎ' : 'PHÓNG TO ×2'}</button>
                        <button onClick={() => setDarkBg(!darkBg)} className="flex-1 neo-button-secondary font-label text-xs">{darkBg ? 'NỀN SÁNG' : 'NỀN TỐI'}</button>
                    </div>
                </div>
            </div>

            <div className={`flex-[2] relative overflow-auto rounded-2xl border-2 ${darkBg ? 'border-giay-sang bg-than' : 'border-than bg-giay-sang'} shadow-2xl flex items-center justify-center`} 
                 style={{ backgroundImage: darkBg ? 'none' : 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.15\'/%3E%3C/svg%3E")' }}>
                
                <div className={`transition-transform duration-500 ease-out origin-center flex justify-center items-center h-full ${zoom ? 'scale-[1.8]' : 'scale-[0.9]'}`}>
                    <img src="/images/costumes/ao-ngu-than.jpg" alt="Ao Dai" className="h-full max-h-[800px] w-auto drop-shadow-2xl object-contain" />
                </div>
            </div>
        </div>
    );
};
