import React from "react";
import { Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";

const RTE = ({ name, label, control, defaultValue = "" }) => {
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}
      <h1>Hello Shahvez</h1>

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => {
          return (
            <Editor
              apiKey="5y1qdo8leuzw4b8f50bb176in8xazt57d2yyj2hbinn7x5s0"
              initialValue={defaultValue}
              init={{
                initialValue: defaultValue,
                height: 500,
                menubar: true,
                plugins: [
                  "image",
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
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
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
              onEditorChange={onChange}
            />
          );
        }}
      />
    </div>
  );
};

export default RTE;
