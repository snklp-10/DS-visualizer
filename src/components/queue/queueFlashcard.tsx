import React from "react";
import { QueueOperations } from "@/lib/constants";

interface FlashcardPanelProps {
  activeOperation: QueueOperations;
}

const flashcardText: Record<QueueOperations, string> = {
  idle: "Click any operation button to learn what it does.",

  enQueue:
    "Enqueue operation inserts an element at the rear (end) of the queue.",

  deQueue:
    "Dequeue operation removes an element from the front (start) of the queue.",

  front: "Front operation returns the front element without removing it.",
};

const FlashcardPanel: React.FC<FlashcardPanelProps> = ({ activeOperation }) => {
  return (
    <div className="ring-1 ring-blue-300 rounded-xl p-6 h-30 flex items-center justify-center">
      <p className="text-lg font-medium text-center leading-relaxed">
        {flashcardText[activeOperation]}
      </p>
    </div>
  );
};

export default FlashcardPanel;
