import { motion } from 'framer-motion';
import type { WardrobeState } from '../WardrobeWizard';

interface Props {
    state: WardrobeState;
    updateState: (updates: Partial<WardrobeState>) => void;
}

const eventsData = [
    { id: 'chua', name: 'đi lễ chùa', desc: 'trang nghiêm, thanh tịnh' },
    { id: 'le-hoi', name: 'đi lễ tết', desc: 'rực rỡ, vui tươi' },
    { id: 'bao-tang', name: 'thăm bảo tàng', desc: 'thanh lịch, hoài cổ' },
    { id: 'dao-pho', name: 'dạo phố cổ', desc: 'phóng khoáng, thoải mái' },
    { id: 'su-kien', name: 'dự sự kiện', desc: 'trang trọng, nổi bật' },
    { id: 'ca-phe', name: 'cà phê cuối tuần', desc: 'nhẹ nhàng, thư giãn' },
];

export default function Step2bEvent({ state, updateState }: Props) {
    const handleSelect = (event: string) => {
        updateState({ event });
    };

    const currentEvent = eventsData.find(e => e.id === state.event) || eventsData[0];
    const storyText = `${currentEvent.name}: ${currentEvent.desc}.`;

    return (
        <div className="flex flex-col gap-6 font-label lowercase">
            <p className="text-than text-sm mb-2 italic border-b border-than/10 pb-4 uppercase tracking-widest font-bold">
                {storyText}
            </p>

            <div className="grid grid-cols-2 gap-6">
                {eventsData.map((eventObj, index) => {
                    const isSelected = state.event === eventObj.id || (!state.event && eventObj.id === 'chua');
                    const rotation = index % 2 === 0 ? 'rotate-1' : '-rotate-1';
                    
                    return (
                        <button
                            key={eventObj.id}
                            onClick={() => handleSelect(eventObj.id)}
                            className={`relative p-4 text-center bg-[#FBF5E9] flex flex-col items-center justify-center min-h-[80px] group transition-all duration-300 transform ${!isSelected ? rotation : 'rotate-0'} hover:rotate-0 hover:-translate-y-1 hover:shadow-[6px_8px_0_var(--than)] border-2 ${
                                isSelected 
                                ? 'border-[#B3261E] shadow-[4px_4px_0_var(--than)] z-10' 
                                : 'border-than shadow-[4px_4px_0_var(--than)]'
                            }`}
                        >
                            <h3 className={`text-base leading-tight font-bold tracking-wide ${isSelected ? 'text-[#B3261E]' : 'text-than'}`}>
                                {eventObj.name}
                            </h3>
                            <p className="text-[11px] text-than/70 mt-1 leading-tight tracking-wide">
                                {eventObj.desc}
                            </p>
                        </button>
                    )
                })}
            </div>
        </div>
    );
}
