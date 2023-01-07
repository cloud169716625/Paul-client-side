import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export function CustomEditor({
  editorState,
  onChange,
  wrapperClassName,
  editorClassName,
  placeholder,
}) {
  return (
    <Editor
      editorState={editorState}
      wrapperClassName={wrapperClassName}
      editorClassName={editorClassName}
      onEditorStateChange={onChange}
      placeholder={placeholder}
      toolbar={{
        options: ['inline', 'textAlign', 'link'],
        inline: {
          options: ['bold', 'italic', 'underline'],
          bold: {
            icon: '/icon/dashboard/bold.svg',
            className: 'demo-option-custom',
          },
          italic: {
            icon: '/icon/dashboard/italic.svg',
            className: 'demo-option-custom',
          },
          underline: {
            icon: '/icon/dashboard/underline.svg',
            className: 'demo-option-custom',
          },
        },
        textAlign: {
          left: {
            icon: '/icon/dashboard/left.svg',
            className: 'demo-option-custom',
          },
          center: {
            icon: '/icon/dashboard/center.svg',
            className: 'demo-option-custom',
          },
          right: {
            icon: '/icon/dashboard/right.svg',
            className: 'demo-option-custom',
          },
          justify: {
            icon: '/icon/dashboard/justify.svg',
            className: 'demo-option-custom',
          },
        },
        link: {
          options: ['link'],
          popupClassName: 'ep__container-link',
          link: {
            icon: '/icon/dashboard/link.svg',
            className: 'demo-option-custom',
          },
          // unlink: { icon: Icons.unlink, className: 'demo-option-custom' },
        },
      }}
    />
  );
}
