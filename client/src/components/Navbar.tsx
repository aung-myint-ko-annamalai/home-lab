import { ModeToggle } from "./ModeToggle";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-11 max-w-7xl items-center justify-between px-4 sm:px-6">
        <span className="text-sm font-semibold tracking-tight text-foreground">
          Home-Lab
        </span>
        <ModeToggle />
      </div>
    </nav>
  );
}
