import { QuickActionType } from "@/constants";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";

const actionStyles: Record<string, { accent: string; icon: string }> = {
  "New Call": {
    accent: "from-primary via-primary/70 to-accent/70",
    icon: "bg-primary/10 text-primary",
  },
  "Join Interview": {
    accent: "from-fuchsia-500 via-primary/70 to-cyan-400/70",
    icon: "bg-fuchsia-500/10 text-fuchsia-300",
  },
  Schedule: {
    accent: "from-cyan-400 via-accent/80 to-primary/70",
    icon: "bg-cyan-400/10 text-cyan-300",
  },
  Recordings: {
    accent: "from-amber-400 via-fuchsia-400/70 to-primary/70",
    icon: "bg-amber-400/10 text-amber-300",
  },
};

function ActionCard({ action, onClick }: { action: QuickActionType; onClick: () => void }) {
  const style = actionStyles[action.title];

  return (
    <Card
      className="group relative min-h-[178px] overflow-hidden cursor-pointer border-border/80 bg-card/75 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
      onClick={onClick}
    >
      <div
        className={cn("absolute inset-x-0 top-0 h-1 bg-gradient-to-r", style.accent)}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-black/10 opacity-80" />

      <div className="relative flex size-full flex-col justify-between p-5">
        <div className="space-y-4">
          <div
            className={cn(
              "flex size-11 items-center justify-center rounded-lg border border-white/10 shadow-sm transition-transform group-hover:scale-105",
              style.icon
            )}
          >
            <action.icon className="size-5" />
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
              {action.title}
            </h3>
            <p className="text-sm leading-6 text-muted-foreground">{action.description}</p>
          </div>
        </div>
        <div className="mt-5 h-px w-full bg-gradient-to-r from-border via-primary/40 to-transparent" />
      </div>
    </Card>
  );
}

export default ActionCard;
