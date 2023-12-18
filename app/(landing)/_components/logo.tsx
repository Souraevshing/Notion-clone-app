import React from "react";
import Image from "next/image";

import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({ subsets: ["latin"], weight: ["400", "600"] });

const Logo = () => {
  return (
    <>
      <div className="hidden md:flex items-center gap-x-2">
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
            background: "linear-gradient(to right, #ff99c8 0%, #880d1e 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        ></p>
      </div>
    </>
  );
};

export { Logo };
