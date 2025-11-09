// PastePlugin.js
import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection, $createTextNode } from "lexical";

const PastePlugin = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerRootListener((rootElement) => {
      if (!rootElement) return;

      const handlePaste = (event) => {
        event.preventDefault();
        const pastedText = event.clipboardData.getData("text/plain");

        if (pastedText) {
          editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
              selection.insertNodes([$createTextNode(pastedText)]);
            }
          });
        }
      };

      rootElement.addEventListener("paste", handlePaste);
      return () => rootElement.removeEventListener("paste", handlePaste);
    });
  }, [editor]);

  return null;
};

export default PastePlugin;
