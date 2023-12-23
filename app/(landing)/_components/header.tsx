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
          Welcome to <span className="rainbow-text">Jotion</span>
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
      <style jsx>{`
        @keyframes rainbow {
          0% {
            color: #f72585;
          }

          50% {
            color: #e63946;
          }

          100% {
            color: #dc2f02;
          }
        }

        .rainbow-text {
          animation: rainbow 5s infinite; // Adjust the duration as needed
          text-transform: uppercase;
          background: linear-gradient(
            to right,
            #f72585 0%,
            #e63946 50%,
            #dc2f02 100%
          );
          -webkit-background-clip: text;
          transition: color 0.3s ease-in-out;
        }
      `}</style>
    </>
  );
};

export { Heading };
