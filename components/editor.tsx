"use client";

import {
  BlockConfig,
  BlockNoteEditor,
  BlockSchemaFromSpecs,
  BlockSpecs,
  InlineContentSchema,
  InlineContentSchemaFromSpecs,
  InlineContentSpecs,
  PartialBlock,
  StyleSchema,
  StyleSchemaFromSpecs,
  StyleSpecs,
} from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import { useEdgeStore } from "@/lib/edgestore";
import { useTheme } from "next-themes";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

type BlockConfigMap = Record<string, BlockConfig>;

const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
  const { edgestore } = useEdgeStore();
  const { resolvedTheme } = useTheme();

  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({
      file,
    });

    return response.url;
  };

  const editor: BlockNoteEditor<
    BlockSchemaFromSpecs<BlockSpecs>,
    InlineContentSchemaFromSpecs<InlineContentSpecs>,
    StyleSchemaFromSpecs<StyleSpecs>
  > = useBlockNote({
    editable,
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock<
          BlockConfigMap,
          InlineContentSchema,
          StyleSchema
        >[])
      : undefined,
    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
    uploadFile: handleUpload,
  });

  return (
    <>
      <div>
        <BlockNoteView
          editor={editor}
          theme={resolvedTheme === "dark" ? "dark" : "light"}
        />
      </div>
    </>
  );
};

export default Editor;
