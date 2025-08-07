import React, { useRef, useMemo } from "react";
import JoditEditor from "jodit-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  const editor = useRef(null);

  const config :any = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "Start typing...",
    }),
    [placeholder]
  );

  return (
    <JoditEditor
      ref={editor}
      value={value}
      config={config}
      tabIndex={1}
      onBlur={(newContent) => onChange(newContent)}
      onChange={() => {}}
    />
  );
};

export default RichTextEditor;

{/* <RichTextEditor
  value={content}
  onChange={(newContent) => setContent(newContent)}
  placeholder="Write your description here..."
/>; */}
