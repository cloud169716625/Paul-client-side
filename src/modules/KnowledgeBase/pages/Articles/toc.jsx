import "./style.scss"
import { RawDraftContentBlock,convertToRaw,EditorState } from "draft-js";

function ArticlesToc({headers}) {
    const headerx = getHeaders(headers);
  return (
    <div className="toc-X">
    <div className="toc-header">
      {"Table of Contents"}
      </div>
      <div className="toc-body">
        <ul>
            {headerx.map((header,index) => {
                return (
                    <div key={header.key} className={`${header.type}`}>
                        {header.text}
                    </div>
                );
            })}
        </ul>
      </div>
  </div>
  );
}
/**
 * 
 * @param {RawDraftContentBlock[]} headers 
 * @returns {RawDraftContentBlock[]}
 */
function getHeaders(headers) {
   return headers;
}

export default ArticlesToc;