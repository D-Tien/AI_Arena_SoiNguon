import type { WardrobeState } from '../WardrobeWizard';

interface Props {
    state: WardrobeState;
    updateState: (updates: Partial<WardrobeState>) => void;
    setGuardMessage: (msg: string | null) => void;
}

export default function Step6Mode({ state, updateState, setGuardMessage }: Props) {
    const handleModeChange = (newMode: 'traditional' | 'modern') => {
        if (newMode === 'traditional') {
            // Auto revert logic
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
            }
            
            updateState({ mode: newMode, bottom: newBottom, accessories: newAccessories });
        } else {
            // Modern mode
            updateState({ mode: newMode });
        }
    };

    return (
        <div className="flex flex-col items-center pt-8">
            <p className="text-center text-[#2B2118]/60 italic mb-10 max-w-sm text-sm">
                Lựa chọn phong cách để hoàn thiện bộ trang phục. <br/>Chế độ Truyền thống sẽ gợi ý các món đồ về chuẩn mực văn hóa.
            </p>
            <div className="flex border border-[#2B2118] p-1 bg-white/30 backdrop-blur-sm w-full max-w-sm shadow-sm">
                <button
                    onClick={() => handleModeChange('traditional')}
                    className={`flex-1 py-4 font-bold tracking-widest text-sm uppercase transition-colors ${
                        state.mode === 'traditional'
                        ? 'bg-[#2B2118] text-[#F5EFE6]'
                        : 'text-[#2B2118] hover:bg-[#2B2118]/5'
                    }`}
                >
                    Truyền thống
                </button>
                <button
                    onClick={() => handleModeChange('modern')}
                    className={`flex-1 py-4 font-bold tracking-widest text-sm uppercase transition-colors ${
                        state.mode === 'modern'
                        ? 'bg-[#B3261E] text-[#F5EFE6]'
                        : 'text-[#B3261E] hover:bg-[#B3261E]/5'
                    }`}
                >
                    Hiện đại
                </button>
            </div>
            
            <div className="mt-16 text-center border-t border-[#2B2118]/10 pt-8 w-full max-w-sm">
                <h4 className="font-display text-2xl text-[#B3261E] mb-2">Hoàn tất thử đồ</h4>
                <p className="text-xs text-[#2B2118]/40 uppercase tracking-widest">Sẵn sàng tương tác với nhân vật</p>
            </div>
        </div>
    );
}
