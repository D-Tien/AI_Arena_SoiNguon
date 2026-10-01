import type { WardrobeState } from '../WardrobeWizard';

interface Props {
    state: WardrobeState;
    updateState: (updates: Partial<WardrobeState>) => void;
}

export default function Step1GenderHair({ state, updateState }: Props) {
    return (
        <div className="flex flex-col gap-12">
            {/* Giới tính */}
            <div>
                <h3 className="text-xl font-display text-[#2B2118] mb-4">Giới tính</h3>
                <div className="flex gap-4">
                    {(['female', 'male'] as const).map(g => (
                        <button
                            key={g}
                            onClick={() => updateState({ gender: g })}
                            className={`flex-1 py-4 border ${
                                state.gender === g 
                                ? 'border-[#B3261E] bg-[#B3261E]/5 text-[#B3261E]' 
                                : 'border-[#2B2118]/20 text-[#2B2118]/60 hover:border-[#2B2118]/50'
                            } transition-colors font-bold tracking-widest text-sm uppercase`}
                        >
                            {g === 'female' ? 'Nữ' : 'Nam'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Kiểu tóc */}
            <div>
                <h3 className="text-xl font-display text-[#2B2118] mb-4">Kiểu tóc</h3>
                <div className="grid grid-cols-2 gap-4">
                    {['Tóc xõa dài', 'Tóc búi cao', 'Tóc ngắn', 'Tóc thắt bím'].map(hair => (
                        <button
                            key={hair}
                            onClick={() => updateState({ hair })}
                            className={`py-4 border ${
                                state.hair === hair 
                                ? 'border-[#B3261E] bg-[#B3261E]/5 text-[#B3261E]' 
                                : 'border-[#2B2118]/20 text-[#2B2118]/60 hover:border-[#2B2118]/50'
                            } transition-colors font-bold tracking-widest text-sm uppercase`}
                        >
                            {hair}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
