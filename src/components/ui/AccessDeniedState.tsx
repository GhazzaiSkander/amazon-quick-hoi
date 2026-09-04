import { LockKeyhole } from "lucide-react";
import type { ReactNode } from "react";

type AccessDeniedStateProps = {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
};

export default function AccessDeniedState({
  title,
  description,
  action,
  className = "",
}: AccessDeniedStateProps) {
  return (
    <div
      role="alert"
      className={`rounded-card border border-amber-200 bg-amber-50 p-10 text-center ${className}`}
    >
      <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-amber-700">
        <LockKeyhole size={21} />
      </div>
      <p className="text-sm font-semibold text-amber-900">{title}</p>
      {description && (
        <p className="mt-2 text-sm leading-6 text-amber-800">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
