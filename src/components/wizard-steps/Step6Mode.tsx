import type { WardrobeState } from '../WardrobeWizard';

interface Props {
    state: WardrobeState;
    updateState: (updates: Partial<WardrobeState>) => void;
    setGuardMessage: (msg: string | null) => void;
}

export default function Step6Mode({ state, updateState, setGuardMessage }: Props) {
    const handleRemixChoice = (remix: boolean) => {
        if (remix) {
            updateState({ mode: 'modern', remixLevel: 26 });
            if (state.top === 'ao-tu-than' && state.gender === 'female') {
                setGuardMessage("Lưu ý văn hóa: Sáng tạo rất thú vị, nhưng việc cách tân vẫn tiềm ẩn nguy cơ làm sai lệch một số chi tiết truyền thống nhỏ.");
            } else {
                setGuardMessage(null);
            }
        } else {
            // Revert logic from before
            let newBottom = state.bottom;
            let newAccessories = [...state.accessories];
            let reverted = false;

            if (state.bottom === 'jeans' || state.bottom === 'quan-short' || state.bottom === 'cargo') {
                newBottom = 'quan-lua';
                reverted = true;
            }
            if (newAccessories.includes('sneaker')) {
                newAccessories = newAccessories.filter(a => a !== 'sneaker');
                reverted = true;
            }

            if (reverted) {
                setGuardMessage("Hệ thống đã tự động điều chỉnh một số món đồ về dạng chuẩn Truyền thống.");
                setTimeout(() => setGuardMessage(null), 5000);
            } else {
                setGuardMessage(null);
            }
            
            updateState({ mode: 'traditional', bottom: newBottom, accessories: newAccessories });
        }
    };

    return (
        <div className="flex flex-col items-center pt-8">
            <h3 className="font-display text-2xl text-[#2B2118] mb-6 text-center">Bạn đang ở trang phục truyền thống,<br/>có muốn remix lại không?</h3>
            
            <div className="flex border border-[#2B2118] p-1 bg-white/30 backdrop-blur-sm w-full max-w-sm shadow-sm mb-10">
                <button
                    onClick={() => handleRemixChoice(false)}
                    className={`flex-1 py-4 font-bold tracking-widest text-sm uppercase transition-colors ${
                        state.mode === 'traditional'
                        ? 'bg-[#2B2118] text-[#F5EFE6]'
                        : 'text-[#2B2118] hover:bg-[#2B2118]/5'
                    }`}
                >
                    Không
                </button>
                <button
                    onClick={() => handleRemixChoice(true)}
                    className={`flex-1 py-4 font-bold tracking-widest text-sm uppercase transition-colors ${
                        state.mode === 'modern'
                        ? 'bg-[#B3261E] text-[#F5EFE6]'
                        : 'text-[#B3261E] hover:bg-[#B3261E]/5'
                    }`}
                >
                    Có
                </button>
            </div>
            
            {state.mode === 'modern' && state.top === 'ao-tu-than' && (
                <div className="w-full max-w-sm py-4 relative">
                    <p className="text-center text-[#2B2118]/60 italic mb-6 text-sm">
                        Kéo thả để chọn mức độ remix
                    </p>
                    <input 
                        type="range" 
                        min="26" 
                        max="100" 
                        value={state.remixLevel || 26} 
                        onChange={(e) => {
                            const val = parseInt(e.target.value);
                            updateState({ remixLevel: val });
                            if (state.top === 'ao-tu-than') {
                                if (val > 60) {
                                    setGuardMessage("Cảnh báo văn hóa: Mức độ remix quá cao có thể làm mất đi đặc trưng của Áo Tứ Thân truyền thống.");
                                } else {
                                    setGuardMessage("Lưu ý văn hóa: Sáng tạo rất thú vị, nhưng việc cách tân vẫn tiềm ẩn nguy cơ làm sai lệch một số chi tiết truyền thống nhỏ.");
                                }
                            } else {
                                setGuardMessage(null);
                            }
                        }} 
                        className="w-full appearance-none h-4 border border-[#2B2118] rounded-full bg-[#EAE0D3] outline-none focus-visible:ring-4 focus-visible:ring-[#B3261E]/50 cursor-ew-resize [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-[#B3261E] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-grab" 
                    />
                    <div className="flex justify-between mt-6 font-bold tracking-widest text-xs uppercase">
                        <div className="flex flex-col items-center text-[#2B2118]/60">
                            <span>Ít</span>
                        </div>
                        <div className="flex flex-col items-center text-[#B3261E]">
                            <span>Nhiều</span>
                        </div>
                    </div>
                </div>
            )}
            
            <div className="mt-8 text-center border-t border-[#2B2118]/10 pt-8 w-full max-w-sm">
                <h4 className="font-display text-2xl text-[#B3261E] mb-2">Hoàn tất thử đồ</h4>
                <p className="text-xs text-[#2B2118]/40 uppercase tracking-widest">Sẵn sàng tương tác với nhân vật</p>
            </div>
        </div>
    );
}
