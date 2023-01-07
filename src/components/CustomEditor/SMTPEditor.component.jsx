import React from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./editor.styles.scss";

export function SMTPEditor({
  editorState,
  onChange,
  wrapperClassName,
  editorClassName,
  placeholder,
  onBlur,
  onChanged,
}) {
  return (
    <Editor
      editorState={editorState}
      wrapperClassName={wrapperClassName}
      editorClassName={editorClassName}
      onEditorStateChange={onChange}
      spellCheck = {true}
      placeholder={placeholder}
      onBlur={onBlur}
      onChange={onChanged}
      toolbar={{
        options: ["inline", "image", "textAlign", "link", "emoji", "blockType"],
        blockType: {
          inDropdown: false,
          options: ["Normal", "H1", "H2", "H3", "H4", "H5", "H6", "Blockquote"],
          className: "toolBarX",
          component: undefined,
          dropdownClassName: "demo-option-custom",
        },
        inline: {
          options: ["bold", "italic", "underline"],
          bold: {
            icon: "/icon/smtp/bold.svg",
            className: "demo-option-custom",
          },
          italic: {
            icon: "/icon/smtp/italic.svg",
            className: "demo-option-custom",
          },
          underline: {
            icon: "/icon/smtp/underline.svg",
            className: "demo-option-custom",
          },
        },
        image: {
          icon: "/icon/smtp/image.svg",
          urlEnabled: true,
          className: "demo-option-custom",
          // uploadEnabled: true,
          // alignmentEnabled: true,
          // uploadCallback: undefined,
          // previewImage: false,
          // inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
          // alt: { present: false, mandatory: false },
          defaultSize: {
            height: "auto",
            width: "auto",
          },
        },
        textAlign: {
          inDropdown: false,
          className: undefined,
          component: undefined,
          dropdownClassName: undefined,
          options: ["left", "center", "right", "justify"],
          left: { icon: "/icon/smtp/align-left.svg", className: "demo-option-custom"},
          center: { icon: "/icon/smtp/align-center.svg", className: "demo-option-custom" },
          right: { icon: "/icon/smtp/align-right.svg", className: "demo-option-custom" },
          justify: { icon: "/icon/smtp/justify.svg", className: "demo-option-custom" },
        },
        link: {
          inDropdown: false,
          // className: undefined,
          // component: undefined,
          // popupClassName: undefined,
          // dropdownClassName: undefined,
          showOpenOptionOnHover: true,
          defaultTargetOption: "_blank",
          options: ["link"],
          link: { icon: "/icon/smtp/link.svg", className: "demo-option-custom" },
          // linkCallback: undefined,
        },
        emoji: {
          icon: "/icon/smtp/emoji.svg",
          className: "demo-option-custom",
          component: undefined,
          popupClassName: undefined,
          // emojis: [
          //   '😀', '😁', '😂', '😃', '😉', '😋', '😎', '😍', '😗', '🤗', '🤔', '😣', '😫', '😴', '😌', '🤓',
          //   '😛', '😜', '😠', '😇', '😷', '😈', '👻', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '🙈',
          //   '🙉', '🙊', '👼', '👮', '🕵', '💂', '👳', '🎅', '👸', '👰', '👲', '🙍', '🙇', '🚶', '🏃', '💃',
          //   '⛷', '🏂', '🏌', '🏄', '🚣', '🏊', '⛹', '🏋', '🚴', '👫', '💪', '👈', '👉', '👉', '👆', '🖕',
          //   '👇', '🖖', '🤘', '🖐', '👌', '👍', '👎', '✊', '👊', '👏', '🙌', '🙏', '🐵', '🐶', '🐇', '🐥',
          //   '🐸', '🐌', '🐛', '🐜', '🐝', '🍉', '🍄', '🍔', '🍤', '🍨', '🍪', '🎂', '🍰', '🍾', '🍷', '🍸',
          //   '🍺', '🌍', '🚑', '⏰', '🌙', '🌝', '🌞', '⭐', '🌟', '🌠', '🌨', '🌩', '⛄', '🔥', '🎄', '🎈',
          //   '🎉', '🎊', '🎁', '🎗', '🏀', '🏈', '🎲', '🔇', '🔈', '📣', '🔔', '🎵', '🎷', '💰', '🖊', '📅',
          //   '✅', '❎', '💯',
          // ],
        },
      }}
    />
  );
}

export const ConfigurationEditor = ({
  editorState,
  onEditorStateChange,
  onBlur,
  placeholder,
  onChange,
}) => {
  return (
    <div className="custom-configuration-editor">
      <div className="custom-configuration-editor__container">
        <SMTPEditor
          editorState={editorState}
          wrapperClassName="custom-configuration-editor__container-wrapper"
          editorClassName="custom-configuration-editor__container-editor"
          onChange={onEditorStateChange}
          placeholder={placeholder ? placeholder : "Start typing here..."}
          onBlur={onBlur}
          onChanged={onChange}
        />
      </div>
    </div>
  );
};
