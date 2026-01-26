import React from "react";
import { Progress } from "@/components/ui/progress";

interface ProgressTrackerProps {
  value: number;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ value }) => {
  return (
    <div className="w-full border rounded-xl p-4">
      {/* <p className="text-sm font-semibold mb-2">
        Queue Learning Progress: {value}%
      </p> */}

      <Progress value={value} className="h-10" />
    </div>
  );
};

export default ProgressTracker;
