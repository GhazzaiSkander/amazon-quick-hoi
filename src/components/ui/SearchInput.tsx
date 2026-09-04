import type { InputHTMLAttributes } from "react";
import { Search } from "lucide-react";

/**
 * The search field used across the vault workspace: a magnifier pinned to the
 * inline start (so it mirrors under `dir="rtl"`) over the shared `.form-input`.
 *
 * Free of hooks and state, so it renders in Server Components (uncontrolled)
 * and Client Components (controlled) alike.
 */
type SearchInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "children"
> & {
  /** Classes for the positioning wrapper, e.g. `flex-1` inside a filter row. */
  containerClassName?: string;
};

export default function SearchInput({
  containerClassName = "",
  className = "",
  ...inputProps
}: SearchInputProps) {
  return (
    <div className={`relative ${containerClassName}`}>
      <Search
        size={18}
        className="absolute start-3 top-1/2 -translate-y-1/2 text-hoi-muted"
      />

      <input
        type="search"
        className={`form-input w-full ps-10 ${className}`}
        {...inputProps}
      />
    </div>
  );
}
