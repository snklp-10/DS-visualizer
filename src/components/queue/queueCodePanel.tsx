import { QueueOperations, queueSnippets } from "@/lib/constants";
import React from "react";

interface QueueCodePanelProps {
  activeOperation: QueueOperations;
}

const QueueCodePanel: React.FC<QueueCodePanelProps> = ({ activeOperation }) => {
  return (
    <div className="ring-1 ring-blue-300 rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-4">Code Snippet</h2>

      <pre className="bg-gray-100 p-4 rounded-lg text-xl whitespace-pre-wrap">
        <div>{queueSnippets[activeOperation]}</div>
      </pre>
    </div>
  );
};

export default QueueCodePanel;
