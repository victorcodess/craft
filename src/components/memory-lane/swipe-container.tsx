import type React from "react";
import { motion, useMotionValue } from "framer-motion";

interface SwipeContainerProps {
  children: React.ReactNode;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

const SwipeContainer = ({
  children,
  onSwipeLeft,
  onSwipeRight,
}: SwipeContainerProps) => {
  const x = useMotionValue(0);

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number } },
  ) => {
    if (info.offset.x < -50) {
      onSwipeLeft();
    } else if (info.offset.x > 50) {
      onSwipeRight();
    }
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.05}
      style={{ x }}
      onDragEnd={handleDragEnd}
      className="z-50 cursor-grab touch-manipulation active:cursor-grabbing"
    >
      {children}
    </motion.div>
  );
};

export default SwipeContainer;