import { AlertCircle } from "lucide-react";
import type { ReactNode } from "react";

type ErrorStateProps = {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
};

export default function ErrorState({
  title,
  description,
  action,
  className = "",
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={`rounded-card border border-red-200 bg-red-50 p-10 text-center ${className}`}
    >
      <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-red-700">
        <AlertCircle size={21} />
      </div>
      <p className="text-sm font-semibold text-red-900">{title}</p>
      {description && (
        <p className="mt-2 text-sm leading-6 text-red-800">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
