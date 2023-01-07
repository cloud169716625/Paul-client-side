import { useEffect, useState } from "react";
import { convertToRaw, EditorState } from "draft-js";
import { convertToHTML } from "draft-convert";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";

// Custom Modules
import { ConfigurationEditor, EmailBodyInput, Button } from "components";
import "./AddComment.scss";
import {createArticleFeedback} from "store";
// import { getBrands } from 'store';

export const AddComment = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const { loading } = useSelector(
    (state) => state?.articlesFeedback
  );
  const initialValues = {
    bodyHolder: EditorState.createEmpty(),
    bodyText: "",
  };

  const navigate = useNavigate();
  return (
    <Formik
    initialValues={initialValues}
      onSubmit={async (values) => {
        const finalValues = {
          articleFeedbackRelatedToId: id,
          description: values.bodyText,
        };
        await dispatch(createArticleFeedback(finalValues));
        navigate("/client/dashboard/knowledge-base/articles/view/"+id);
      }}
    >
      {({ values, errors, touched, setFieldValue, setFieldTouched }) => {
        return (
          <Form>
            <Spin spinning={loading}>
              <div className="grid grid-cols-[1fr] gap-[20px] px-[32px] py-[40px]">
                <div className="flex flex-col gap-[20px]">
                  <div className="bg-[#1E1E2D] rounded-[8px]">
                    <h6 className="text-white font-medium p-[32px] text-[16px]">
                    Suggestions & Comments
                    </h6>
                    <ConfigurationEditor
                      editorState={values.bodyHolder}
                      onBlur={() => setFieldTouched("bodyText", true)}
                      onEditorStateChange={(state) => {
                        setFieldValue("bodyHolder", state);
                        const currentContentAsHTML = convertToHTML({
                          entityToHTML: (entity, originalText) => {
                            if (entity.type === "IMAGE") {
                              return `<img src="${entity.data.src}" />`;
                            }
                            if (entity.type === "LINK") {
                              return ` <a href="${entity.data.url}">${originalText}</a> `;
                            }
                            return originalText;
                          },
                          blockToHTML: (block) => {
                             if (block.type === "unstyled") {
                               return <p />;
                             }
                          }
                        })(state.getCurrentContent());
                        if (
                          convertToRaw(state.getCurrentContent()).blocks
                          .length === 1 &&
                          convertToRaw(state.getCurrentContent()).blocks[0]
                          .text === ""
                        ) {
                          setFieldValue("bodyText", "");
                        } else {
                          setFieldValue("bodyText", currentContentAsHTML);
                        }
                      }}
                    />
                    {touched["bodyText"] && errors["bodyText"] && (
                      <div className="error whitespace-nowrap ml-[32px] mb-[16px] w-[20%]">
                        {errors["bodyText"]}
                      </div>
                    )}
                    <div className="p-[32px] pt-[10px]">
                      <Button
                        htmlType="submit"
                        className="w-[fit_content]"
                        disabled={
                          !values?.bodyText 
                        }
                      >
                        Add Suggestion
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Spin>
          </Form>
        );
      }}
    </Formik>
  );
};
