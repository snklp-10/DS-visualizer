import React from "react";
import { motion } from "framer-motion";

const fragments = Array.from({ length: 10 });

const ShatterEffect: React.FC = () => {
  return (
    <div className="absolute left-6 top-10 pointer-events-none">
      {fragments.map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: Math.random() * 140 - 70,
            y: Math.random() * 140 - 70,
            opacity: 0,
            scale: 0.5,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-3 h-3 bg-red-400 rounded-sm absolute"
        />
      ))}
    </div>
  );
};

export default ShatterEffect;
