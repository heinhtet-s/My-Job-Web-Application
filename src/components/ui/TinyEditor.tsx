"use client";
import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

function TinyEditor({
  text,
  setTextEditor,
}: {
  text: string;
  setTextEditor: (data: string) => void;
}) {
  return (
    <Editor
      apiKey="fbpjktvpic9ufku85fq6wl0z6tpkv42u3od43j37zypyeqzn"
      value={text}
      onEditorChange={(a, editor) => {
        setTextEditor(a);
      }}
      init={{
        height: 500,
        menubar: true,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "code",
          "help",
          "wordcount",
        ],
        toolbar:
          "undo redo | blocks | " +
          "bold italic forecolor underline | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent table | " +
          "code | removeformat | help",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        forced_root_block: "div",
      }}
    />
  );
}

export default TinyEditor;
