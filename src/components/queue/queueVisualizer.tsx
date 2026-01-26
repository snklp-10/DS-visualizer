import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ShatterEffect from "@/components/shatterEffect";

interface QueueVisualizerProps {
  queue: number[];
  shatterValue: number | null;
  isDequeuing: boolean;
  highlightFront: boolean;
}

const QueueVisualizer: React.FC<QueueVisualizerProps> = ({
  queue,
  shatterValue,
  isDequeuing,
  highlightFront,
}) => {
  return (
    <MaxWidthWrapper>
      <div className="relative flex gap-6 p-5 border rounded-xl overflow-x-auto items-center min-h-30">
        {queue.length === 0 ? (
          <p className="text-gray-500 text-lg">Queue is empty</p>
        ) : (
          <AnimatePresence mode="popLayout">
            {queue.map((item, index) => {
              const isFront: boolean = index === 0;
              const isRear: boolean = index === queue.length - 1;
              const shouldPulse = highlightFront && isFront;
              // ✅ Turn front element red while dequeuing
              const isBeingDequeued: boolean = isDequeuing && isFront;

              return (
                <motion.div
                  key={`${item}-${index}`}
                  layout
                  className="flex flex-col items-center"
                  /* ✅ Entry animation */
                  initial={{ opacity: 0, scale: 0.9 }}
                  /* ✅ Main animation + Stretch Effect */
                  animate={{
                    opacity: 1,
                    scale: 1,

                    // ✅ Stretch pulse when Front button is clicked
                    scaleX: highlightFront && isFront ? 1.25 : 1,
                    scaleY: highlightFront && isFront ? 0.85 : 1,
                  }}
                  /* ✅ Smooth exit */
                  exit={{ opacity: 0, scale: 0.85 }}
                  /* ✅ Spring for elastic feel */
                  transition={{
                    type: "spring",
                    stiffness: 650,
                    damping: 10,
                  }}
                >
                  {/* Labels */}
                  {isFront && (
                    <span className="text-sm font-semibold text-blue-600 mb-1">
                      FRONT
                    </span>
                  )}

                  {isRear && queue.length > 1 && (
                    <span className="text-sm font-semibold text-green-600 mb-1">
                      REAR
                    </span>
                  )}

                  {/* ✅ Queue Block */}
                  <div
                    className={`w-16 h-16 flex justify-center items-center rounded-xl font-bold text-white text-lg
      ${
        isBeingDequeued
          ? "bg-red-600 ring-4 ring-red-300"
          : highlightFront && isFront
            ? "bg-yellow-400"
            : isFront
              ? "bg-blue-600 ring-4 ring-blue-300"
              : isRear
                ? "bg-green-600 ring-4 ring-green-300"
                : "bg-gray-700"
      }`}
                  >
                    {item}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}

        {/* ✅ Shatter Fragment Overlay */}
        {shatterValue !== null && <ShatterEffect />}
      </div>
    </MaxWidthWrapper>
  );
};

export default QueueVisualizer;
