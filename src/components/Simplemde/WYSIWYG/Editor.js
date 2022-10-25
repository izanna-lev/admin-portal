import React from "react";
import {SimpleMDE} from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import "./Editor.css";

function Editor({ options = {}, onChange}) {
  return (
    <SimpleMDE
      id="editor"
      onChange={onChange}
      className='WYSIWYG'
      value={options.initialValue}
      options={{
        autofocus: true,
        spellChecker: false,
        status: false,
        toolbar: [],
        toolbarTips: false,
        shortcuts: { toggleFullScreen: null, toggleSideBySide: null },
        hideIcons: ["quote", "side-by-side", "fullscreen", "image"],
        maxHeight: "400px",
        minHeight: "400px",
      }}
    />
  );
}

export default Editor;
