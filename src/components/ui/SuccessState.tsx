import { CheckCircle2 } from "lucide-react";
import type { ReactNode } from "react";

type SuccessStateProps = {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
};

export default function SuccessState({
  title,
  description,
  action,
  className = "",
}: SuccessStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`rounded-card border border-emerald-200 bg-emerald-50 p-4 text-start ${className}`}
    >
      <div className="flex items-start gap-3">
        <CheckCircle2
          size={20}
          className="mt-0.5 shrink-0 text-emerald-700"
          aria-hidden
        />
        <div>
          <p className="text-sm font-semibold text-emerald-900">{title}</p>
          {description && (
            <p className="mt-1 text-sm leading-6 text-emerald-800">
              {description}
            </p>
          )}
          {action && <div className="mt-3">{action}</div>}
        </div>
      </div>
    </div>
  );
}
