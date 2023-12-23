"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useQuery } from "convex/react";

import { Doc, Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import Item from "./item";
import { cn } from "@/lib/utils";
import { FileIcon } from "lucide-react";

interface DocumentListProps {
  parentDocumentId?: Id<"documents">;
  level?: number;
  data?: Doc<"documents">[];
}

export const DocumentList = ({
  parentDocumentId,
  level = 0,
}: DocumentListProps) => {
  const params = useParams();
  const router = useRouter();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  /**
   * @description triggers expand sidebar
   */
  const onExpand = (documentId: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId],
    }));
  };

  /**
   * @description fetch sidebar open state
   */
  const documents = useQuery(api.documents.getSidebar, {
    parentDocument: parentDocumentId,
  });
  console.log(documents);

  /**
   * @description redirect to respective document when clicked
   */
  const handleRedirect = (documentId: string) => {
    //router.push(`/documents/${documentId}`);
  };

  if (documents === undefined) {
    return (
      <>
        <Item.Skeleton level={level} />
        {level === 0 && (
          <>
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
          </>
        )}
      </>
    );
  }

  return (
    <>
      <p
        style={{ paddingLeft: level ? `${level * 12 + 25}px` : undefined }}
        className={cn(
          "hidden text-sm font-medium text-muted-foreground/80",
          expanded && "last:block",
          level === 0 && "hidden"
        )}
      >
        No pages inside
      </p>
      {documents.map((doc) => {
        return (
          <div key={doc._id}>
            <Item
              id={doc._id}
              onClick={() => handleRedirect(doc._id)}
              label={doc.title}
              icon={FileIcon}
              documentIcon={doc.icon}
              active={params.documentId === doc._id}
              level={level}
              expanded={expanded[doc._id]}
              onExpand={() => onExpand(doc._id)}
            />
            {expanded[doc._id] && (
              <DocumentList parentDocumentId={doc._id} level={level + 1} />
            )}
          </div>
        );
      })}
    </>
  );
};
