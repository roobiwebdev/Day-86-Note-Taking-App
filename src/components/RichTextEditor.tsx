import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { Bold, Italic, Strikethrough, Heading } from "lucide-icons";

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const RichTextEditor: React.FC<TiptapEditorProps> = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "Start typing here..." }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) return null;

  return (
    <div className="border rounded-md p-4 bg-white dark:bg-slate-950 dark:text-white">
      {/* Toolbar */}
      <div className="flex space-x-2 mb-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 ${editor.isActive("bold") ? "bg-gray-300" : ""}`}
        >
          <Bold size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 ${editor.isActive("italic") ? "bg-gray-300" : ""}`}
        >
          <Italic size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-2 ${editor.isActive("strike") ? "bg-gray-300" : ""}`}
        >
          <Strikethrough size={18} />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`p-2 ${
            editor.isActive("heading", { level: 2 }) ? "bg-gray-300" : ""
          }`}
        >
          <Heading size={18} />
        </button>
      </div>

      {/* Text Editor */}
      <EditorContent
        editor={editor}
        className="min-h-[300px] border p-3 rounded-md"
      />
    </div>
  );
};

export default RichTextEditor;
