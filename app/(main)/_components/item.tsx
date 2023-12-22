"use client";

import {
  ChevronDown,
  ChevronRight,
  LucideIcon,
  PlusCircle,
} from "lucide-react";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Skeleton } from "@/components/ui/skeleton";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { api } from "@/convex/_generated/api";

interface ItemProps {
  id?: Id<"documents">;
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpand?: () => void;
  label: string;
  onClick: () => void;
  icon: LucideIcon;
}

const Item = ({
  id,
  label,
  onClick,
  icon: Icon,
  active,
  documentIcon,
  isSearch,
  level = 0,
  onExpand,
  expanded,
}: ItemProps) => {
  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

  const router = useRouter();

  const create = useMutation(api.documents.createNote);

  /**
   * @description expand documents with click
   */
  const handleExpand = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    onExpand?.();
  };

  const handleCreate = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (!id) {
      return;
    }
    const promise = create({
      title: "Untitled",
      parentDocument: id,
    }).then((docId) => {
      if (!expanded) {
        onExpand?.();
      }
      // router.push(`/documents/${docId}`);
    });

    toast.promise(promise, {
      loading: "Creating note...",
      success: "Success!",
      error: "Something went wrong!",
    });
  };

  return (
    <>
      <div
        onClick={onClick}
        role="button"
        style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
        className={cn(
          "group min-h-[20px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
          active && "bg-primary/5 text-primary"
        )}
      >
        {!!id && (
          <>
            <div
              role="button"
              className="h-full rounded-sm hover:bg-neutral-300 dark:bg-neutral-500  mr-1"
              onClick={handleExpand}
            >
              <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
            </div>
          </>
        )}
        {documentIcon ? (
          <div className="shrink-0 mr-2 text-[18px]">{documentIcon}</div>
        ) : (
          <Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground" />
        )}
        <span className="truncate">{label}</span>
        {isSearch && (
          <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">&#8984;</span> K
          </kbd>
        )}
        {!!id && (
          <div
            role="button"
            onClick={handleCreate}
            className="ml-auto flex items-center gap-x-2"
          >
            <div className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:bg-neutral-600">
              <PlusCircle className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Item;

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <>
      <div
        style={{ paddingLeft: level ? `${level * 12 + 25}px` : "12px" }}
        className="flex gap-x-2 py-[3px]"
      >
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-[30%]" />
      </div>
    </>
  );
};
