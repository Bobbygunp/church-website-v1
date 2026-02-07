// src/components/TiptapEditor.tsx
"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Paragraph from "@tiptap/extension-paragraph"; // Ensure Paragraph is imported

import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaListUl,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
  FaPalette,
} from "react-icons/fa";

const TiptapEditor = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Disable default extensions that we want to override or reconfigure
        bulletList: false, // will use custom BulletList
        listItem: false,   // will use custom ListItem
        paragraph: false,  // will use custom Paragraph
      }),
      Paragraph, // Add Paragraph for more control over text blocks
      BulletList.configure({
        HTMLAttributes: {
          class: 'list-disc pl-5', // Add Tailwind classes
        },
      }),
      ListItem,
      TextAlign.configure({
        types: ["heading", "paragraph"],
        defaultAlignment: "left",
      }),
      TextStyle, // TextStyle is required for Color extension
      Color,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  if (!editor) {
    return null;
  }

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    editor.chain().focus().setColor(e.target.value).run();
  };

  return (
    <div className="border border-gray-300 rounded-md">
      <div className="flex flex-wrap items-center gap-2 border-b border-gray-300 p-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`p-2 rounded-md ${editor.isActive("bold") ? "bg-blue-200" : "bg-gray-100"} hover:bg-gray-200`}
          title="Bold"
        >
          <FaBold />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`p-2 rounded-md ${editor.isActive("italic") ? "bg-blue-200" : "bg-gray-100"} hover:bg-gray-200`}
          title="Italic"
        >
          <FaItalic />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editor.can().chain().focus().toggleUnderline().run()}
          className={`p-2 rounded-md ${editor.isActive("underline") ? "bg-blue-200" : "bg-gray-100"} hover:bg-gray-200`}
          title="Underline"
        >
          <FaUnderline />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded-md ${editor.isActive("bulletList") ? "bg-blue-200" : "bg-gray-100"} hover:bg-gray-200`}
          title="Bullet List"
        >
          <FaListUl />
        </button>

        <span className="h-6 w-px bg-gray-300 mx-1" aria-hidden="true" /> {/* Separator */}

        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={`p-2 rounded-md ${editor.isActive({ textAlign: "left" }) ? "bg-blue-200" : "bg-gray-100"} hover:bg-gray-200`}
          title="Align Left"
        >
          <FaAlignLeft />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={`p-2 rounded-md ${editor.isActive({ textAlign: "center" }) ? "bg-blue-200" : "bg-gray-100"} hover:bg-gray-200`}
          title="Align Center"
        >
          <FaAlignCenter />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={`p-2 rounded-md ${editor.isActive({ textAlign: "right" }) ? "bg-blue-200" : "bg-gray-100"} hover:bg-gray-200`}
          title="Align Right"
        >
          <FaAlignRight />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={`p-2 rounded-md ${editor.isActive({ textAlign: "justify" }) ? "bg-blue-200" : "bg-gray-100"} hover:bg-gray-200`}
          title="Justify"
        >
          <FaAlignJustify />
        </button>

        <span className="h-6 w-px bg-gray-300 mx-1" aria-hidden="true" /> {/* Separator */}
        
        <div className="relative">
          <input
            type="color"
            onChange={handleColorChange}
            value={editor.getAttributes("textStyle").color || "#000000"}
            className="h-8 w-8 cursor-pointer rounded-md overflow-hidden bg-gray-100 hover:bg-gray-200"
            title="Text Color"
          />
        </div>
      </div>
      <EditorContent editor={editor} className="p-2 min-h-[150px] focus:outline-none" />
    </div>
  );
};

export default TiptapEditor;