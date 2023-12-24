"use client";

import { useMutation } from "convex/react";
import React, { useRef, useState } from "react";

import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface TitleProps {
  initialData: Doc<"documents">;
}

export const Title = ({ initialData }: TitleProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialData?.title || "Untitled");

  const inputRef = useRef<HTMLInputElement>(null);

  const update = useMutation(api.documents.updateDocuments);

  //enable editing when clicked on document, update title and set cursor at end of title
  const enableInput = () => {
    setTitle(initialData?.title);
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    }, 0);
  };

  //disable edit mode
  const disableInput = () => {
    setIsEditing(false);
  };

  //update documents title by id
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    update({
      title: e.target.value || "Untitled",
      id: initialData._id,
    });
  };

  //disable edit mode when done editing by pressing Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      disableInput();
    }
  };

  return (
    <>
      <div className="flex items-center gap-x-1">
        {!!initialData.icon && <p>{initialData.icon}</p>}
        {isEditing ? (
          <Input
            ref={inputRef}
            onClick={enableInput}
            onBlur={disableInput}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            value={title}
            className="h-7 px-2 focus-visible:ring-transparent"
          />
        ) : (
          <Button
            onClick={enableInput}
            variant="outline"
            size="sm"
            className="font-normal h-auto p-1"
          >
            <span className="truncate">{initialData?.title}</span>
          </Button>
        )}
      </div>
    </>
  );
};

Title.Skeleton = function TitleSkeleton() {
  return (
    <>
      <Skeleton className="h-6 w-20 rounded-md" />
    </>
  );
};
