type MockDataBadgeProps = {
  className?: string;
};

export default function MockDataBadge({ className = "" }: MockDataBadgeProps) {
  return (
    <span
      aria-label="MOCK DATA"
      title="MOCK DATA"
      className={`inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-[10px] font-semibold tracking-[0.16em] text-violet-700 ${className}`}
    >
      MOCK DATA
    </span>
  );
}
