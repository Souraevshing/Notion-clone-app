"use client";

import Image from "next/image";
import React from "react";
import { LucidePlusCircle } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";

const Documents = () => {
  const { user } = useUser();
  const createNote = useMutation(api.documents.createNote); //call createNote fn and pass it to useMutation hook to create new note
  const handleCreateNote = () => {
    const promise = createNote({ title: "Untitled" });

    toast.promise(promise, {
      loading: "Creating note...",
      success: "Success!",
      error: "Something went wrong!",
    });
  };

  return (
    <>
      <div className="h-full flex flex-col items-center justify-center space-y-4">
        <Image
          src="/images/empty-light.png"
          height="300"
          width="300"
          alt="empty-light-img"
          className="dark:hidden"
          priority
        />

        <Image
          src="/images/empty-dark.png"
          height="300"
          width="300"
          alt="empty-dark-img"
          className="hidden dark:block"
        />
        <h2 className="text-lg font-medium">
          Welcome to {user?.firstName}&apos;s Jotion
        </h2>
        <Button
          onClick={handleCreateNote}
          className="transition hover:bg-slate-300 hover:text-slate-800"
        >
          <LucidePlusCircle className="h-4 w-4 mr-2" /> Create a note
        </Button>
      </div>
    </>
  );
};

export default Documents;
