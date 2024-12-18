import { Loader2 } from 'lucide-react';

interface TaskFormSubmitButtonProps {
  isSubmitting: boolean;
}

export function TaskFormSubmitButton({ isSubmitting }: TaskFormSubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="w-full flex items-center justify-center px-4 py-2 bg-[#10a37f] text-white rounded-lg 
      hover:bg-[#0e906f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isSubmitting ? (
        <>
          <Loader2 className="animate-spin h-4 w-4 mr-2" />
          Creating...
        </>
      ) : (
        'Create Task'
      )}
    </button>
  );
}