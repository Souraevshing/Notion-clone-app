import React from "react";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <>
      <div className="flex items-center w-full p-6 bg-background z-50 dark:bg-[#1f1f1f]">
        <Logo />
        <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground"></div>
        <Button variant="ghost" size="sm">
          Privacy Policy
        </Button>
        <Button variant="ghost" size="sm">
          Terms & Conditions
        </Button>
      </div>
    </>
  );
};
