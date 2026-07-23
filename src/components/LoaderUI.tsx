import { LoaderIcon } from "lucide-react";

function LoaderUI() {
  // h-16 + 1 for border in navbar => 65px
  return (
    <div className="h-[calc(100vh-4rem-1px)] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="grid size-14 place-items-center rounded-lg border border-border/70 bg-card/80 shadow-sm shadow-black/20">
          <LoaderIcon className="h-7 w-7 animate-spin text-primary" />
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          Loading workspace
        </p>
      </div>
    </div>
  );
}
export default LoaderUI;
