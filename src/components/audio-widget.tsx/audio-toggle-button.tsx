import { motion } from "framer-motion";

type ExpandState = "stretchX" | "stretchY" | null;

interface AudioToggleButtonProps {
  expand: ExpandState;
  onClick: () => void;
}

export const AudioToggleButton = ({ expand, onClick }: AudioToggleButtonProps) => {
  return (
    <motion.div
      whileTap={{ scale: 0.85 }}
      onClick={onClick}
      animate={{
        backgroundColor: expand ? "#fff" : "#f4f4f4",
      }}
      transition={{
        backgroundColor: { duration: 0.05, delay: !expand ? 0.5 : 0 },
        scale: { type: "spring" },
      }}
      className="absolute right-[5.9px] top-[5.9px] flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-full bg-[#f4f4f4]"
    >
      <img src="/audio-widget/audio.png" className="w-6" alt="" />
    </motion.div>
  );
};