"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Search, Trash2Icon, Undo2Icon } from "lucide-react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Spinner } from "@/components/spinner";
import { Input } from "@/components/ui/input";
import { ConfirmModal } from "@/components/modals/confirm-modal";

export const TrashBox = () => {
  const router = useRouter();
  const params = useParams();
  const documents = useQuery(api.documents.getDeletedCount);
  const restore = useMutation(api.documents.restoreDocuments);
  const remove = useMutation(api.documents.removeDocument);

  const [search, setSearch] = useState<string>("");

  //filter/search documents based on title
  const filteredDocuments = documents?.filter((doc) => {
    return doc.title.toLowerCase().includes(search.toLowerCase());
  });

  const handleClick = (documentId: string) => {
    router.push(`/document/${documentId}`);
  };

  //restore documents
  const handleRestore = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: Id<"documents">
  ) => {
    e.stopPropagation();
    const promise = restore({ id: documentId });

    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Success!",
      error: "Something went wrong!",
    });
  };

  //deleting documents
  const handleDelete = (documentId: Id<"documents">) => {
    const promise = remove({ id: documentId });

    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Success!",
      error: "Something went wrong!",
    });

    //if documentId inside url doesn't match with documentId in db, then navigate to `/documents`
    if (params.documentId === documentId) {
      toast.error("Document not found!");
      router.push("/documents");
    }
  };

  if (documents === undefined) {
    return (
      <>
        <div className="h-full flex items-center justify-center p-4">
          <Spinner size="lg" />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="text-sm">
        <div className="flex items-center gap-x-1 p-2">
          <Search className="h-4 w-4" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
            placeholder="Search..."
          />
        </div>
        <div className="mt-2 px-1 pb-1">
          <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
            Document not found
          </p>
          {filteredDocuments?.map((doc) => {
            return (
              <div
                role="button"
                key={doc._id}
                onClick={() => handleClick(doc._id)}
                className="cursor-pointer text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between"
              >
                <span>{doc.title}</span>
                <div className="flex items-center">
                  <div
                    role="button"
                    className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                    onClick={(e) => handleRestore(e, doc._id)}
                  >
                    <Undo2Icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <ConfirmModal onConfirm={() => handleDelete(doc._id)}>
                    <div
                      role="button"
                      className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                    >
                      <Trash2Icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </ConfirmModal>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
