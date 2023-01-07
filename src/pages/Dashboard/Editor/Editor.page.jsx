import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import { CustomEditor } from 'components';
import './Editor.styles.scss';
import { useTranslation } from "react-i18next";

function EditorPage() {
  const { t } = useTranslation("/Editor/ns");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (state) => {
    setEditorState(state);
  };

  return (
    <div className="ep">
      <h1 className="ep__heading">{t("WYSIWYG")}</h1>
      <div className="ep__container">
        <CustomEditor
          editorState={editorState}
          wrapperClassName="ep__container-wrapper"
          editorClassName="ep__container-editor"
          onChange={onEditorStateChange}
          placeholder="Start typing here..."
        />
      </div>
    </div>
  );
}

export default EditorPage;
