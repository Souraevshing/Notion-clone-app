"use client";

import { useQuery } from "convex/react";

import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { Toolbar } from "@/components/toolbar";

interface DocumentIdPageProps {
  params: {
    documentId: Id<"documents">;
  };
}

/**
 * @description page to render for url `/documents/${documentId}`
 */
const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
  const document = useQuery(api.documents.getDocumentById, {
    documentId: params.documentId,
  });

  if (document === undefined) {
    return <div>loading</div>;
  }

  if (document === null) {
    return <div className="text-sm">Document not found!</div>;
  }

  return (
    <>
      <div className="pb-40">
        <div className="h-[35vh]" />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
          <Toolbar initialData={document} />
        </div>
      </div>
    </>
  );
};

export default DocumentIdPage;
