"use client";

import React, { useState } from "react";
import { nanoid } from "nanoid";
import { toast } from "sonner";
import { LogItem, QueueOperations } from "@/lib/constants";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import QueueVisualiser from "@/components/queue/queueVisualizer";
import QueueInfoLog from "@/components/queue/queueInfo";
import QueueCodePanel from "@/components/queue/queueCodePanel";
import QueueCtrls from "@/components/queue/queueCtrls";
import ProgressTracker from "@/components/queue/queueProgress";
import { QueueConcept, calculateProgress } from "@/lib/constants";
import FlashcardPanel from "@/components/queue/queueFlashcard";

const QueuePage: React.FC = () => {
  const [queue, setQueue] = useState<number[]>([]);
  const [activeOperation, setActiveOperation] =
    useState<QueueOperations>("idle");
  const [logs, setLogs] = useState<LogItem[]>([]);
  const [shatterValue, setShatterValue] = useState<number | null>(null);
  const [isDequeuing, setIsDequeuing] = useState<boolean>(false);
  const [completedConcepts, setCompletedConcepts] = useState<Set<QueueConcept>>(
    new Set(),
  );
  const [highlightFront, setHighlightFront] = useState<boolean>(false);

  const markConceptComplete = (concept: QueueConcept): void => {
    setCompletedConcepts((prev) => new Set(prev).add(concept));
  };

  const progress: number = calculateProgress(completedConcepts);

  const addLog = (message: string, operation: QueueOperations): void => {
    setLogs((prev) => {
      const newLog = { id: nanoid(), message, operation };

      return [newLog, ...prev].slice(0, 5);
    });

    if (operation === "enQueue") toast.success(message);
    if (operation === "deQueue") toast.info(message);
    if (operation === "front") toast(message);
  };

  const enqueue = (val: number): void => {
    setActiveOperation("enQueue");
    setQueue((prev) => [...prev, val]);
    markConceptComplete("enqueue");
    addLog(`Enqueue ${val} into queue`, "enQueue");
  };

  const dequeue = (): void => {
    setActiveOperation("deQueue");
    if (queue.length === 0) {
      addLog("Queue Underflow", "deQueue");
      return;
    }

    const removed = queue[0];
    setIsDequeuing(true);
    setShatterValue(queue[0]);
    markConceptComplete("dequeue");

    setTimeout(() => {
      setQueue((prev) => prev.slice(1));
      addLog(`Dequeued ${removed} from queue`, "deQueue");
    }, 300);

    setTimeout(() => {
      setIsDequeuing(false);
      setShatterValue(null);
    }, 600);
  };

  const front = (): void => {
    setActiveOperation("front");
    markConceptComplete("front");

    if (queue.length === 0) {
      toast.error("Queue is empty");
      addLog("Queue is empty. No front element.", "front");
      return;
    }
    setHighlightFront(true);

    setTimeout(() => {
      setHighlightFront(false);
    }, 600);

    addLog(`Front element is ${queue[0]}`, "front");
  };

  return (
    <MaxWidthWrapper className="h-screen flex flex-col py-6 gap-6">
      {/* ✅ Title */}
      <h1 className="text-3xl font-bold text-center">
        Queue Data Structure Visualizer
      </h1>

      {/* ✅ Queue Visualiser Fixed Height */}
      <div className="h-35">
        <QueueVisualiser
          queue={queue}
          shatterValue={shatterValue}
          isDequeuing={isDequeuing}
          highlightFront={highlightFront}
        />
      </div>

      {/* ✅ Middle Section Fixed Height */}
      <div className="flex-1 grid grid-cols-2 gap-6 ">
        {/* Left: Activity Log */}
        <div className="flex flex-col">
          <QueueInfoLog logs={logs} />
          <FlashcardPanel activeOperation={activeOperation} />
        </div>
        {/* Right: Flashcard + Code */}
        <QueueCodePanel activeOperation={activeOperation} />
      </div>

      {/* ✅ Progress Bar Fixed */}
      <div className="h-17.5">
        <ProgressTracker value={progress} />
      </div>

      {/* ✅ Controls Fixed */}
      <div className="h-17.5">
        <QueueCtrls onEnqueue={enqueue} onDequeue={dequeue} onFront={front} />
      </div>
    </MaxWidthWrapper>
  );
};

export default QueuePage;
