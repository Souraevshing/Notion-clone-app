"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <>
      <div className="h-full flex flex-col items-center justify-center space-y-4">
        <Image
          src="/images/error-light.png"
          alt="error"
          height="300"
          width="300"
          className="dark:hidden"
        />
        <Image
          src="/images/error-dark.png"
          alt="error"
          height="300"
          width="300"
          className="hidden dark:block"
        />
        <h2 className="text-xl font-medium text-center justify-center flex">
          Something went wrong!
        </h2>
        <Link href="/documents">
          <Button asChild>Back to homepage</Button>
        </Link>
      </div>
    </>
  );
}
