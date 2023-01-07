import { EditorState, convertToRaw, ContentState, } from "draft-js";
import { convertToHTML, convertFromHTML } from "draft-convert";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";

// Custom Modules
import { ConfigurationEditor, EmailBodyInput, Button } from "components";
import { updateArticle,getArticleByID } from "store/Actions/articles";
import "./Add.styles.scss";
import { useEffect, useState } from "react";
import { getAllArticleCategories } from "store";
import { createServerImage } from "lib";
import ArticlesToc from "../../toc";
export const Edit = () => {
  let initialValues = {
    title: "",
    categories: [],
    visibility: true,
    bodyText: "",
    bodyHolder: EditorState.createEmpty(),
  };

  const dispatch = useDispatch();

  let body = EditorState.createEmpty();
  const {id} = useParams();

  useEffect(() => {
    dispatch(getArticleByID({id}));
    dispatch(getAllArticleCategories());
  }, [id]);

  const { loading, articleCategories } = useSelector(
    (state) => state?.articleCategories
  );
  const articleLoading = useSelector((state) => state?.articles?.loading);
  const {article} = useSelector((state) => state?.articles);
  const [subCategories, setSubCategories] = useState([]);
  const [toc, setToc] = useState([]);

  useEffect(() => {
    if (articleCategories&&(articleCategories.length??0)) {
      const newCat = articleCategories?.filter(
        (c) => c.parentCategoryId !== "00000000-0000-0000-0000-000000000000"
      );
      setSubCategories(newCat);
    }
  }, [articleCategories]);
  
  let headersToc = [];

  useEffect(() => {
    if (article) {
      const {title, ArticleCategories, bodyText, visibility} = article;
      const content = convertFromHTML(bodyText);
      const bodyHolder = EditorState.createWithContent(
        content
      );
      const categories = ArticleCategories?.map((c) => c.categoryId);
      initialValues = {
        title,
        categories,
        visibility,
        bodyText,
        bodyHolder,
      };
    }
  }, [article]);

  const fields = [
    {
      name: "title",
      type: "text",
      label: "Article Ttitle",
      placeholder: "Enter Article Title Here",
    },
    {
      name: "categories",
      type: "multiselect",
      placeholder: "Select Categories",
      options: subCategories?.map((category) => ({
        label: category.name,
        value: category.id,
      })),
      label: "Categories",
    },
    {
      name: "image",
      type: "image",
      label: "Select Image",
    },
  ];

  const navigate = useNavigate();

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={async (values) => {
        const serverImage = await createServerImage(values?.image);
        const brandId = localStorage.getItem("brandId");
        const finalValues = {
          visibility: false,
          image: serverImage,
          categories: values?.categories,
          bodyText: values?.bodyText,
          title: values?.title,
          brandIds: [brandId],
          articleStatus: "submitted",
        };
        await dispatch(updateArticle(id, finalValues));
        navigate("/client/dashboard/support/knowledge-base/articles");
      }}
    >
      {({ values, errors, touched, setFieldValue, setFieldTouched }) => {
          /**
          * 
          * @param {EditorState} state 
          */
         function onEdit (state)  {
          body = state;
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
           const raw = convertToRaw(state.getCurrentContent());
           const blocks = raw.blocks;
           const headers = blocks.filter(block => block.type === "header-one" || block.type === "header-two" );
           headersToc = headers;
         }

        return (
          <Form>
            <Spin spinning={loading || articleLoading}>
              <div className="grid grid-cols-[1fr] gap-[20px] px-[32px] py-[40px]">
                <div className="flex flex-col gap-[20px]">
                  <div className="bg-[#1E1E2D] rounded-[8px]">
                    <h6 className="text-white font-medium p-[32px] text-[16px]">
                      Edit Article
                    </h6>
                    {/* Other Inputs */}
                    <div className="flex flex-col gap-[2px]">
                      {fields?.map((field, idx) => {
                        return (
                          <EmailBodyInput
                            key={`field-${idx}`}
                            options={field?.options}
                            name={field?.name}
                            label={field?.label}
                            type={field?.type}
                            placeholder={field?.placeholder}
                            touched={touched}
                            errors={errors}
                          />
                        );
                      })}
                    </div>
                    <div className="editorX">
                    <ConfigurationEditor
                      editorState={values.bodyHolder}
                      onBlur={() => setFieldTouched("bodyText", true)}
                      onEditorStateChange={onEdit}
                    />
                   <ArticlesToc headers={headersToc}></ArticlesToc>
                    </div>
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
                          !values?.title ||
                          !values?.bodyText ||
                          !values?.categories?.length
                        }
                      >
                        Edit Article
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

