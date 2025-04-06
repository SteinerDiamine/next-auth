import { AiOutlineCheckCircle } from "react-icons/ai";

interface FormSuccessProps {
  message?: string;
}

export function FormSucess({ message }: FormSuccessProps) {
  if (!message) return null;

  return (
    <div className="flex items-center gap-x-2 rounded-md bg-emerald-500/15 p-3 text-sm text-emerald-500">
      <AiOutlineCheckCircle className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
}


