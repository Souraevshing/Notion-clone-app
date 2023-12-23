import React from "react";
import Image from "next/image";

import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import Link from "next/link";

const font = Poppins({ subsets: ["latin"], weight: ["400", "600"] });

const Logo = () => {
  return (
    <>
      <div className="hidden md:flex items-center gap-x-2 cursor-pointer">
        <Image
          src="/icons/logo-light.svg"
          height="30"
          width="30"
          alt="logo"
          className="dark:hidden"
        />
        <Image
          src="/icons/logo-dark.svg"
          height="30"
          width="30"
          alt="logo"
          className="hidden dark:block"
        />
        <p
          className={cn("font-semibold", font.className)}
          style={{
            background:
              " linear-gradient(to right, #047857 0%, #be185d 50%, #a855f7 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Jotion
        </p>
      </div>
    </>
  );
};

export { Logo };
