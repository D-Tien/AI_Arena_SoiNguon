import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Step1GenderHair from './wizard-steps/Step1GenderHair';
import Step2Place from './wizard-steps/Step2Place';
import Step3Top from './wizard-steps/Step3Top';
import Step4Bottom from './wizard-steps/Step4Bottom';
import Step5Accessories from './wizard-steps/Step5Accessories';
import Step6Mode from './wizard-steps/Step6Mode';
import CulturalGuardAlert from './CulturalGuardAlert';

export type Gender = 'female' | 'male';
export type Place = 'Hà Nội' | 'Huế' | 'Sài Gòn' | 'Ninh Bình' | 'Bắc Ninh' | 'Hà Giang' | 'Tuyên Quang' | 'Quảng Ninh' | 'Đà Nẵng' | 'Hội An' | 'Cà Mau' | 'Đà Lạt';
export type Mode = 'traditional' | 'modern';

export interface WardrobeState {
    gender: Gender;
    hair: string;
    place: Place;
    event?: string;
    top: string;
    topColor?: string;
    bottom: string;
    accessories: string[];
    mode: Mode;
    remixLevel?: number;
}

const steps = [
    "Giới tính & Kiểu tóc",
    "Nơi đi",
    "Áo",
    "Quần / Váy",
    "Phụ kiện",
    "Phong cách"
];

interface WardrobeWizardProps {
    onClose: () => void;
    initialConfig?: Partial<WardrobeState>;
}

export default function WardrobeWizard({ onClose, initialConfig }: WardrobeWizardProps) {
    const [currentStep, setCurrentStep] = useState(1);
    const [guardMessage, setGuardMessage] = useState<string | null>(null);
    const [state, setState] = useState<WardrobeState>({
        gender: initialConfig?.gender || 'female',
        hair: initialConfig?.hair || 'default',
        place: initialConfig?.place || 'Hà Nội',
        top: initialConfig?.top || '',
        bottom: initialConfig?.bottom || '',
        accessories: initialConfig?.accessories || [],
        mode: initialConfig?.mode || 'traditional'
    });

    const updateState = (updates: Partial<WardrobeState>) => {
        setState(prev => ({ ...prev, ...updates }));
    };

    const handleNext = () => {
        if (currentStep < 6) setCurrentStep(prev => prev + 1);
    };

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep(prev => prev - 1);
    };

    return (
        <div className="fixed inset-0 z-50 flex bg-[#EAE0D3] font-body">
            <CulturalGuardAlert message={guardMessage} />
            
            {/* LEFT: Preview */}
            <div className="w-1/2 h-full flex flex-col justify-center items-center relative border-r border-[#2B2118]/20 bg-[url('/noise.png')] opacity-95">
                <button 
                    onClick={onClose}
                    className="absolute top-8 left-8 text-[#2B2118]/60 hover:text-[#B3261E] font-bold tracking-widest text-sm uppercase transition-colors"
                >
                    &larr; Đóng
                </button>
                <div className="text-center text-[#2B2118]/50 italic p-10 border border-dashed border-[#B3261E]/30 rounded-lg">
                    [Khu vực Render Nhân Vật 2D SVG]
                    <br /><br />
                    <span className="text-sm">
                        Nơi đi: {state.place} <br />
                        Giới tính: {state.gender === 'female' ? 'Nữ' : 'Nam'}
                    </span>
                </div>
            </div>

            {/* RIGHT: Options & Flow */}
            <div className="w-1/2 h-full flex flex-col bg-[#F5EFE6]">
                {/* Progress Header */}
                <div className="px-12 pt-16 pb-8 shrink-0">
                    <div className="text-[10px] font-bold tracking-widest text-[#2B2118]/40 uppercase mb-4 flex items-center gap-2">
                        <span>BƯỚC {currentStep} / 6</span>
                        <div className="h-[1px] bg-[#2B2118]/10 flex-1"></div>
                    </div>
                    <h2 className="text-4xl font-display text-[#B3261E]">
                        {steps[currentStep - 1]}
                    </h2>
                </div>

                {/* Content Area (Scrollable) */}
                <div className="flex-1 overflow-y-auto px-12 pb-12">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="w-full"
                        >
                            <div className="w-full pt-4">
                                {currentStep === 1 && <Step1GenderHair state={state} updateState={updateState} />}
                                {currentStep === 2 && <Step2Place state={state} updateState={updateState} />}
                                {currentStep === 3 && <Step3Top state={state} updateState={updateState} setGuardMessage={setGuardMessage} />}
                                {currentStep === 4 && <Step4Bottom state={state} updateState={updateState} setGuardMessage={setGuardMessage} />}
                                {currentStep === 5 && <Step5Accessories state={state} updateState={updateState} setGuardMessage={setGuardMessage} />}
                                {currentStep === 6 && <Step6Mode state={state} updateState={updateState} setGuardMessage={setGuardMessage} />}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Normal Footer */}
                <div className="w-full p-8 bg-[#F5EFE6] border-t border-[#2B2118]/10 shrink-0">
                    <div className="flex justify-between items-center w-full px-4">
                        <button 
                            onClick={handleBack}
                            disabled={currentStep === 1}
                            className={`px-6 py-3 font-bold tracking-widest text-sm uppercase transition-all flex items-center gap-2 ${
                                currentStep === 1 
                                ? 'text-[#2B2118]/20 cursor-not-allowed' 
                                : 'text-[#2B2118] hover:text-[#B3261E]'
                            }`}
                        >
                            <span>&larr;</span> Quay lại
                        </button>
                        
                        <button 
                            onClick={handleNext}
                            disabled={currentStep === 6}
                            className={`px-8 py-3 bg-[#B3261E] text-[#F5EFE6] font-bold tracking-widest text-sm uppercase transition-all hover:bg-[#8A1D17] flex items-center gap-2 shadow-lg shadow-[#B3261E]/20 ${
                                currentStep === 6 ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        >
                            Tiếp theo <span>&rarr;</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
