"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { CheckCircle2Icon, CopyIcon, Globe2Icon } from "lucide-react";

import { Doc } from "@/convex/_generated/dataModel";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useOrigin } from "@/hooks/use-origin";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";

interface PublishProps {
  initialData: Doc<"documents">;
}

/**
 * @description publish documents so that any guest users can see it
 */
export const Publish = ({ initialData }: PublishProps) => {
  const origin = useOrigin();
  const update = useMutation(api.documents.updateDocuments);

  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * @description custom `URL` on which it can be previewed
   */
  const url = `${origin}/preview/${initialData._id}`;

  /**
   * @description publish document
   */
  const handlePublish = () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: true,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: "Publishing note...",
      success: "Success!",
      error: "Something went wrong!",
    });
  };

  /**
   * @description unpublish document
   */
  const handleUnpublish = () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: false,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: "Unpublishing note...",
      success: "Success!",
      error: "Something went wrong!",
    });
  };

  /**
   * @description copy the `URL` hosted
   */
  const handleCopyUrl = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button>
            Publish{" "}
            {initialData.isPublished && (
              <Globe2Icon className="text-sky-600 w-4 h-4 ml-2" />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72" align="end" alignOffset={8} forceMount>
          {initialData.isPublished ? (
            <div className="space-y-4">
              <div className="flex items-center gap-x-2">
                <Globe2Icon className="text-sky-600 animate-pulse w-4 h-4" />
                <p>This note is hosted live on web</p>
              </div>
              <div className="flex items-center">
                <input
                  value={url}
                  disabled
                  className="flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate"
                />
                <Button
                  onClick={handleCopyUrl}
                  disabled={copied}
                  className="h-8 rounded-l-none"
                >
                  {copied ? (
                    <CheckCircle2Icon className="h-4 w-4" />
                  ) : (
                    <CopyIcon className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <Button
                size="sm"
                disabled={isSubmitting}
                onClick={handleUnpublish}
                className="w-full text-xs"
              >
                Unpublish
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <Globe2Icon className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm font-medium mb-2">Publish this note</p>
              <span className="text-xs text-muted-foreground mb-4">
                Share with others
              </span>
              <Button
                disabled={isSubmitting}
                onClick={handlePublish}
                size="sm"
                className="w-full text-xs"
              >
                Publish
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </>
  );
};
