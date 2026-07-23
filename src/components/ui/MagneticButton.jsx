import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function MagneticButton({ as: Tag = "a", className = "", children, strength = 18, ...props }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 250, damping: 18, mass: 0.4 });

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set((relX / rect.width) * strength);
    y.set((relY / rect.height) * strength);
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const MotionTag = motion(Tag);

  return (
    <MotionTag
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: sx, y: sy }}
      data-cursor="hover"
      className={className}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
