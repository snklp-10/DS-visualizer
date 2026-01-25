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
import { div } from "framer-motion/client";

const QueuePage: React.FC = () => {
  const [queue, setQueue] = useState<number[]>([]);
  const [activeOperation, setActiveOperation] =
    useState<QueueOperations>("idle");
  const [logs, setLogs] = useState<LogItem[]>([]);

  const addLog = (message: string, operation: QueueOperations): void => {
    setLogs((prev) => [{ id: nanoid(), message, operation }, ...prev]);

    if (operation === "enQueue") toast.success(message);
    if (operation === "deQueue") toast.info(message);
    if (operation === "front") toast(message);
  };

  const enqueue = (val: number): void => {
    setActiveOperation("enQueue");
    setQueue((prev) => [...prev, val]);

    addLog(`Enqueue ${val} into queue`, "enQueue");
  };

  const dequeue = (): void => {
    setActiveOperation("deQueue");

    if (queue.length === 0) {
      addLog("Queue Underflow: Nothing to dequeue", "deQueue");
      return;
    }

    const removed = queue[0];

    setQueue((prev) => prev.slice(1));

    addLog(`Dequeued ${removed} from queue`, "deQueue");
  };

  const front = (): void => {
    setActiveOperation("front");

    if (queue.length === 0) {
      toast.error("Queue is empty");
      addLog("Queue is empty. No front element.", "front");
      return;
    }

    addLog(`Front element is ${queue[0]}`, "front");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <MaxWidthWrapper className="flex flex-col grow py-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          Queue Data Structure Visualizer
        </h1>

        {/* Queue Display */}

        <div className="mb-6">
          <QueueVisualiser queue={queue} />
        </div>

        {/* Panels */}
        <div className="grid grid-cols-2 gap-6 grow">
          <QueueInfoLog logs={logs} />
          <QueueCodePanel activeOperation={activeOperation} />
        </div>

        {/* Controls */}
        <div className="mt-4">
          <QueueCtrls onEnqueue={enqueue} onDequeue={dequeue} onFront={front} />
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default QueuePage;
