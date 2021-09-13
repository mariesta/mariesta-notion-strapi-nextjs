import React, { useState } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import Button from "@material-ui/core/Button";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function CustomEditor({ saveBlock, content }) {
  var initalStateEditor;
  if (content) {
    const contentBlock = htmlToDraft(content);
    const contentState = ContentState.createFromBlockArray(
      contentBlock.contentBlocks
    );
    initalStateEditor = EditorState.createWithContent(contentState);
  } else {
    initalStateEditor = EditorState.createEmpty();
  }
  const [editorState, setEditorState] = useState(initalStateEditor);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const onEditorSave = () => {
    const newContent = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    );
    saveBlock(newContent);
  };

  return (
    <div>
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={onEditorStateChange}
        />
      </div>
      <Button variant="outlined" color="secondary" onClick={onEditorSave}>
        Save
      </Button>
    </div>
  );
}
