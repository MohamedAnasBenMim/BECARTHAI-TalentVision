import { cn } from "@/lib/utils";

function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={cn("size-8", className)}
      fill="none"
    >
      <path
        d="M32 6a11 11 0 1 1 0 22 11 11 0 0 1 0-22Z"
        className="stroke-slate-100/90"
        strokeWidth="5"
      />
      <path d="M13 29h38" className="stroke-slate-100/90" strokeWidth="5" strokeLinecap="round" />
      <path
        d="M32 29 17 57h30L32 29Z"
        className="stroke-slate-100/90"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path
        d="M48 51 55 57"
        className="stroke-fuchsia-400"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default BrandMark;
