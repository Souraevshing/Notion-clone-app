"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { toast } from "sonner";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/confirm-modal";

interface BannerProps {
  documentId: Id<"documents">;
}

export const Banner = ({ documentId }: BannerProps) => {
  const router = useRouter();

  const remove = useMutation(api.documents.removeDocument);
  const restore = useMutation(api.documents.restoreDocuments);

  //remove documents
  const handleRemove = () => {
    console.log("delete doc");
    const promise = remove({ id: documentId });

    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Success!",
      error: "Something went wrong!",
    });

    router.push("/documents");
  };

  //restore documents
  const handleRestore = () => {
    console.log("restore doc");
    const promise = restore({ id: documentId });

    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Success!",
      error: "Something went wrong!",
    });
  };

  return (
    <div className="w-full bg-green-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
      <p>Document is currently in trash</p>
      <Button
        size="sm"
        onClick={handleRestore}
        variant="outline"
        className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
      >
        Restore
      </Button>
      <ConfirmModal onConfirm={handleRemove}>
        <Button
          size="sm"
          variant="outline"
          className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
        >
          Delete Permanently
        </Button>
      </ConfirmModal>
    </div>
  );
};
