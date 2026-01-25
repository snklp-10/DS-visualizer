export type QueueOperations = "enQueue" | "deQueue" | "front" | "idle";

export const queueSnippets: Record<QueueOperations, string> = {
  idle: `//Select an operation to see code`,

  enQueue: `enqueue(x)
    if queue is full:
        overflow
    else:
        rear++
        queue[rear] = x`,

  deQueue: `dequeue()
    if queue is empty:
        underflow
    else:
        front++
        return queue[front]`,

  front: `front():
  if queue is empty:
      return null
  else:
      return queue[front]`,
};

export interface LogItem {
  id: string;
  message: string;
  operation: string;
}
