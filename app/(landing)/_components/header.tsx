"use client";

import Link from "next/link";
import { useConvexAuth } from "convex/react";
import { ArrowRightIcon } from "lucide-react";
import { SignInButton } from "@clerk/clerk-react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";

const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth(); //check auth status

  return (
    <>
      <div className="max-w-3xl space-y-4">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
          Welcome to{" "}
          <span
            style={{
              textTransform: "uppercase",
              background:
                "linear-gradient(to right, #86198f 0%, #15803d 50%, #b91c1c 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Jotion
          </span>
        </h1>
        <h3 className="text-base sm:text-xl md:text-2xl font-medium">
          Jotion is the connected workspace where <br />
          better, faster work happens
        </h3>
        {isLoading && (
          <div className="w-full flex justify-center items-center">
            <Spinner size="lg" />
          </div>
        )}
        {isAuthenticated && !isLoading && (
          <Button asChild className="font-medium">
            <Link href="/documents">
              Enter Jotion
              <ArrowRightIcon className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        )}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <Button>
                Get Jotion
                <ArrowRightIcon className="h-4 w-4 ml-2" />
              </Button>
            </SignInButton>
          </>
        )}
      </div>
    </>
  );
};

export { Heading };
