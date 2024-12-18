import { AlertCircle } from 'lucide-react';

interface TaskFormErrorProps {
  message: string;
}

export function TaskFormError({ message }: TaskFormErrorProps) {
  return (
    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400">
      <AlertCircle className="h-5 w-5 flex-shrink-0" />
      <p className="text-sm">{message}</p>
    </div>
  );
}