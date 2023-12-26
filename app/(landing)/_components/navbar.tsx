"use client";

import Link from "next/link";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";

import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { ToggleMode } from "@/components/toggle-mode";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";

import { Logo } from "./logo";

const Navbar = () => {
  const scroll = useScrollTop(); //check if user scrolled the page

  /**
   * @descriptions get auth status of user
   */
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <>
      <div
        className={cn(
          "z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6",
          scroll && "border-b shadow-sm"
        )}
      >
        <Logo />
        <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2 outline-none">
          {isLoading && <Spinner />}
          {!isAuthenticated && !isLoading && (
            <>
              <SignInButton mode="modal">
                <Button variant="outline" size="sm">
                  Log In
                </Button>
              </SignInButton>

              <SignInButton mode="modal">
                <Button variant="outline" size="sm">
                  Get Jotion for free
                </Button>
              </SignInButton>
            </>
          )}
          {isAuthenticated && !isLoading && (
            <>
              <Button variant="outline" size="sm" asChild>
                <Link href="/documents">Enter Jotion</Link>
              </Button>
              <UserButton afterSignOutUrl="/" />
            </>
          )}
          <ToggleMode />
        </div>
      </div>
    </>
  );
};

export { Navbar };
