import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { SignedIn, UserButton } from "@clerk/nextjs";
import DasboardBtn from "./DasboardBtn";
import BrandMark from "./BrandMark";

function Navbar() {
  return (
    <nav className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <Link
          href="/"
          className="flex items-center gap-3 mr-6 hover:opacity-90 transition-opacity"
        >
          <span className="grid size-10 place-items-center rounded-lg border border-white/10 bg-slate-950 shadow-sm shadow-primary/20 dark:bg-slate-950">
            <BrandMark className="size-7" />
          </span>
          <span className="leading-tight">
            <span className="block text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              BECARTH.AI Consulting
            </span>
            <span className="block text-lg font-bold text-foreground">TalentVision</span>
          </span>
        </Link>

        <SignedIn>
          <div className="flex items-center space-x-4 ml-auto">
            <DasboardBtn />
            <ModeToggle />
            <UserButton />
          </div>
        </SignedIn>
      </div>
    </nav>
  );
}
export default Navbar;
