"use client";

import { ElementRef, useRef, useState } from "react";
import { ImagePlusIcon, SmilePlusIcon, X } from "lucide-react";
import { useMutation } from "convex/react";
import TextareaAutosize from "react-textarea-autosize";

import { Doc } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { IconPicker } from "./icon-picker";
import { Button } from "./ui/button";
import { useCoverImage } from "@/hooks/use-cover-image";

interface ToolbarProps {
  initialData: Doc<"documents">;
  preview?: boolean;
}

/**
 * @description toolbar component to `add new icons and/or cover image` when adding new documents, also used to update documents
 */
export const Toolbar = ({ initialData, preview }: ToolbarProps) => {
  const inputRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialData.title);
  const coverImage = useCoverImage();

  const update = useMutation(api.documents.updateDocuments);
  const remove = useMutation(api.documents.removeIcon);

  const enableInput = () => {
    if (preview) {
      return;
    }

    setIsEditing(true);
    setTimeout(() => {
      setValue(initialData.title);
      inputRef.current?.focus();
    }, 0);
  };

  const disableInput = () => {
    setIsEditing(false);
  };

  const handleInputChange = (value: string) => {
    setValue(value);
    update({
      id: initialData._id,
      title: value || "Untitled",
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      disableInput();
    }
  };

  //update the document with icon
  const handleIconSelect = (icon: string) => {
    update({ id: initialData._id, icon });
  };

  const handleRemoveIcon = () => {
    remove({ id: initialData._id });
  };

  return (
    <>
      <div className="pl-[54px] group relative">
        {!!initialData.icon && !preview && (
          <div className="flex items-center gap-x-2 group/icon pt-6">
            <IconPicker onChange={handleIconSelect}>
              <p className="text-6xl hover:opacity-75 transition-all">
                {initialData.icon}
              </p>
            </IconPicker>
            <Button
              onClick={handleRemoveIcon}
              className="rounded-full opacity-0 group-hover/icon:opacity-100 transition-all text-muted-foreground text-xs"
              variant="outline"
              size="icon"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
        {!!initialData.icon && preview && (
          <p className="text-6xl pt-6">{initialData.icon}</p>
        )}
        <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4">
          {!initialData.icon && !preview && (
            <IconPicker asChild onChange={handleIconSelect}>
              <Button
                className="text-muted-foreground text-xs"
                variant="outline"
                size="sm"
              >
                <SmilePlusIcon className="h-4 w-4" />
              </Button>
            </IconPicker>
          )}
          {!initialData.coverImage && !preview && (
            <Button
              onClick={coverImage.onOpen}
              className="text-muted-foreground text-xs"
              variant="outline"
              size="sm"
            >
              <ImagePlusIcon className="h-4 w-4" />
            </Button>
          )}
        </div>
        {isEditing && !preview ? (
          <TextareaAutosize
            ref={inputRef}
            onBlur={disableInput}
            onKeyDown={handleKeyDown}
            value={value}
            onChange={(e) => handleInputChange(e.target.value)}
            className="text-5xl bg-transparent font-bold break-words outline-none text-[#3f3f3f] dark:text-[#cfcfcf] resize-none"
          />
        ) : (
          <div
            onClick={enableInput}
            className="pb-[11.5px] text-5xl font-bold break-words outline-none text-[#3f3f3f] dark:text-[#cfcfcf]"
          >
            {initialData.title}
          </div>
        )}
      </div>
    </>
  );
};
