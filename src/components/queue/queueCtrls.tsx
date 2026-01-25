"use Client";
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
    <div className="flex w-full gap-4 justify-center items-center h-20 border border-blue-300 rounded-xl">
      <Input
        type="number"
        placeholder="Enter value"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
        className="px-3 py-2 rounded h-20 border-0"
      />

      <div className="flex w-full items-center justify-center gap-10">
        <Button
          onClick={handleEnqueue}
          className="px-4 py-2 rounded-2xl  h-full text-lg w-30"
        >
          Enqueue
        </Button>
        <Button
          onClick={onDequeue}
          className="px-4 py-2 rounded-2xl  h-full text-lg w-30"
        >
          Dequeue
        </Button>
        <Button
          onClick={onFront}
          className="px-4 py-2 rounded-2xl  h-full text-lg w-30"
        >
          Front
        </Button>
      </div>
    </div>
  );
};

export default QueueCtrls;
