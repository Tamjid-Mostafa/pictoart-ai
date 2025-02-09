import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Dumbbell, Menu, X } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import VisuallyHidden from "./ui/visually-hidden";

export function Navigation() {
  return (
    <nav className="border-b">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <Dumbbell className="h-6 w-6" />
              <span className="ml-2 text-xl font-bold">FitLife</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <SignedIn>
              <Link
                href="/workouts"
                className="text-sm font-medium hover:text-primary"
              >
                Workouts
              </Link>
              <Link
                href="/nutrition"
                className="text-sm font-medium hover:text-primary"
              >
                Nutrition
              </Link>
              <Link
                href="/progress"
                className="text-sm font-medium hover:text-primary"
              >
                Progress
              </Link>
            </SignedIn>
            <ModeToggle />
            <nav className="flex gap-2">
              <SignedIn>
                <UserButton afterSwitchSessionUrl="/" />
              </SignedIn>
              <SignedOut>
                <Button asChild className="">
                  <Link href="/sign-in">Login</Link>
                </Button>
              </SignedOut>
            </nav>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <ModeToggle />
            <SignedIn>
              <UserButton afterSwitchSessionUrl="/" />
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side={"right"}>
                  <VisuallyHidden>
                    <SheetTitle>Menu</SheetTitle>
                  </VisuallyHidden>
                  <div className="space-y-1 px-4 pb-3 pt-2">
                    <Link
                      href="/workouts"
                      className="block px-3 py-2 text-base font-medium hover:bg-muted"
                    >
                      Workouts
                    </Link>
                    <Link
                      href="/nutrition"
                      className="block px-3 py-2 text-base font-medium hover:bg-muted"
                    >
                      Nutrition
                    </Link>
                    <Link
                      href="/progress"
                      className="block px-3 py-2 text-base font-medium hover:bg-muted"
                    >
                      Progress
                    </Link>
                    <Link
                      href="/profile"
                      className="block px-3 py-2 text-base font-medium hover:bg-muted"
                    >
                      Profile
                    </Link>
                  </div>
                </SheetContent>
              </Sheet>
            </SignedIn>
            <SignedOut>
              <Button asChild className="">
                <Link href="/sign-in">Login</Link>
              </Button>
            </SignedOut>
          </div>
        </div>
      </div>
    </nav>
  );
}
