import { AnimatePresence, motion } from 'framer-motion';

interface Props {
    message: string | null;
}

export default function CulturalGuardAlert({ message }: Props) {
    return (
        <AnimatePresence>
            {message && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute top-8 left-1/2 -translate-x-1/2 bg-[#B3261E] text-[#F5EFE6] px-6 py-3 shadow-xl shadow-[#B3261E]/20 text-sm tracking-wider z-50 flex items-center gap-3 border border-[#F5EFE6]/20 max-w-sm w-full"
                >
                    <span className="text-xl font-display italic">Lưu ý</span>
                    <span className="flex-1 text-xs">{message}</span>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
