"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface QueueCtrlsProps {
  onEnqueue: (value: number) => void;
  onDequeue: () => void;
  onFront: () => void;
}

const QueueCtrls: React.FC<QueueCtrlsProps> = ({
  onEnqueue,
  onDequeue,
  onFront,
}) => {
  const [value, setValue] = useState<string>("");

  const handleEnqueue = (): void => {
    if (value.trim() === "") return;

    const numValue: number = Number(value);
    if (isNaN(numValue)) return;

    onEnqueue(numValue);
    setValue("");
  };

  return (
    <div className="flex w-full justify-center items-center gap-3 rounded-xl px-4 py-3">
      {/* ✅ Input Tile */}
      <Input
        type="number"
        placeholder="Enter value"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
        className="w-55 h-12 text-lg border border-gray-300 rounded-lg focus-visible:ring-0"
      />

      {/* ✅ Buttons Row */}
      <div className="flex justify-center items-center gap-3">
        <Button
          onClick={handleEnqueue}
          className="h-12 px-6 rounded-lg text-base font-semibold"
        >
          Enqueue
        </Button>

        <Button
          onClick={onDequeue}
          className="h-12 px-6 rounded-lg text-base font-semibold"
        >
          Dequeue
        </Button>

        <Button
          onClick={onFront}
          className="h-12 px-6 rounded-lg text-base font-semibold"
        >
          Front
        </Button>

        {/* ✅ Placeholder for Another Function */}
        <Button
          variant="outline"
          className="h-12 px-6 rounded-lg text-base font-semibold"
        >
          Another Function
        </Button>
      </div>
    </div>
  );
};

export default QueueCtrls;
