import React, { useEffect } from "react";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";



import {
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
  $createTextNode,
} from "lexical";
import { $generateHtmlFromNodes } from "@lexical/html";
import { HeadingNode, $createHeadingNode } from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import { ListItemNode, ListNode } from "@lexical/list";
import { $createImageNode } from "./ImageNode";
import { ImageNode } from "./ImageNode";
import PastePlugin from "./PastePlugin";

const Toolbar = () => {
  const [editor] = useLexicalComposerContext();

  const handleFormat = (type) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        if (type === "h1" || type === "h2") {
          const headingLevel = type === "h1" ? "h1" : "h2";
          $setBlocksType(selection, () => $createHeadingNode(headingLevel));
        } else {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, type);
        }
      }
    });
  };
};

const OnChangeHandler = ({ onChange }) => {
  const [editor] = useLexicalComposerContext();

  const handleEditorChange = (editorState) => {
    editorState.read(() => {
      const htmlContent = $generateHtmlFromNodes(editor,null);
      onChange(htmlContent);
    });
  };
 

  return <OnChangePlugin onChange={handleEditorChange} />;
};

// Theme config
const theme = {
  paragraph: "editor-paragraph",
  text: {
    bold: "editor-text-bold",
    italic: "editor-text-italic",
  },
  heading: {
    h1: "editor-heading-h1",
    h2: "editor-heading-h2",
  },
};

const EditorComponent = ({ onChange, value, insertImageRef }) => {
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    nodes: [ListNode, ListItemNode, HeadingNode, ImageNode],
    onError(error) {
      console.error(error);
    },
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <EditorContent insertImageRef={insertImageRef} />
      <OnChangeHandler onChange={onChange} />
    </LexicalComposer>
  );
};

const EditorContent = ({ insertImageRef }) => {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    if (insertImageRef) {
      insertImageRef.current = (url) => {
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            const imageNode = $createImageNode(url, "Inserted image");
            selection.insertNodes([imageNode]);
          }
        });
      };
    }
  }, [editor, insertImageRef]);
  return (
    <div className="my-4 bg-white rounded-3xl px-5 py-4">
      <Toolbar />
      <RichTextPlugin
        contentEditable={<ContentEditable className="editor-input" />}
        placeholder={<div className="editor-placeholder"></div>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <AutoFocusPlugin />
      <ListPlugin />
     
    </div>
  );
};

export default EditorComponent;
