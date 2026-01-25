import { LogItem } from "@/lib/constants";
import React from "react";

interface QueueInfoLogProps {
  logs: LogItem[];
}

const QueueInfoLog: React.FC<QueueInfoLogProps> = ({ logs }) => {
  const getAccent = (operation: string): string => {
    switch (operation) {
      case "enQueue":
        return "bg-green-50";

      case "deQueue":
        return "bg-red-50";

      case "front":
        return "bg-blue-50";

      default:
        return "bg-gray-50";
    }
  };
  return (
    <div className="border rounded-xl p-6 h-[85%]">
      <h2 className="text-lg font-semibold mb-4">Queue Operation Log</h2>

      <div className="space-y-3 text-md overflow-y-auto max-h-70 pr-2">
        {logs.length === 0 ? (
          <p className="text-gray-500">No activity yet.</p>
        ) : (
          logs.map((log) => (
            <div
              key={log.id}
              className={`p-3 font-semibold rounded-lg ${getAccent(
                log.operation,
              )}`}
            >
              {log.message}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default QueueInfoLog;
