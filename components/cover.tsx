"use client";

import Image from "next/image";
import { ImageIcon, X } from "lucide-react";
import { useMutation } from "convex/react";
import { useParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCoverImage } from "@/hooks/use-cover-image";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";

interface CoverImageProps {
  url?: string;
  preview?: boolean;
}

export const Cover = ({ preview, url }: CoverImageProps) => {
  const coverImage = useCoverImage();
  const params = useParams();

  const removeCoverImage = useMutation(api.documents.removeCoverImage);

  const handleRemoveCoverImage = () => {
    removeCoverImage({ id: params.documentId as Id<"documents"> });
  };

  return (
    <div
      className={cn(
        "relative w-full h-[35vh] group",
        !url && "h-[12vh]",
        url && "bg-muted"
      )}
    >
      {!!url && <Image src={url} fill alt="cover" className="object-cover" />}
      {url && !preview && (
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
          <Button
            type="button"
            onClick={coverImage.onOpen}
            variant="outline"
            size="sm"
            className="text-muted-foreground text-xs"
          >
            <ImageIcon className="h-4 w-4" />
            Change Cover Image
          </Button>
          <Button
            type="button"
            onClick={handleRemoveCoverImage}
            variant="outline"
            size="sm"
            className="text-muted-foreground text-xs"
          >
            <X className="h-4 w-4 mr-2" />
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};
