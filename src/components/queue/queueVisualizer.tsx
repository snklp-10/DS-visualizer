import React from "react";
import { motion } from "framer-motion";
import MaxWidthWrapper from "../MaxWidthWrapper";

interface QueueVisualizerProps {
  queue: number[];
}

const QueueVisualiser: React.FC<QueueVisualizerProps> = ({ queue }) => {
  return (
    <MaxWidthWrapper className="min-h-[50%]">
      <div className="flex gap-4 p-6 border rounded-lg overflow-x-auto ">
        {queue.length === 0 ? (
          <p className="text-gray-500">Queue is Empty</p>
        ) : (
          queue.map((item: number, index: number) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.25 }}
              className="min-w-14 h-14 bg-blue-600 text-white flex justify-center items-center rounded-lg font-semibold"
            >
              {item}
            </motion.div>
          ))
        )}
      </div>
    </MaxWidthWrapper>
  );
};

export default QueueVisualiser;
