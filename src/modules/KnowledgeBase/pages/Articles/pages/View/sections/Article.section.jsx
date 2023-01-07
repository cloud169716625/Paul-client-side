import { Dropdown, Spin } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { convertFromHTML, } from "draft-convert";
import { getArticleByID } from "store";
import "./Article.styles.scss";
import { Delete } from "./Delete.section";
import { convertToRaw,ContentState } from "draft-js";
import { Button } from "components";
import { ArticleFeedbacks } from "./ArticleFeedBack";
import { getArticleFeedbacksByArticleID } from 'store/Actions/articleFeedbacks';

export const Article = ({setHeaders, show}) => {
  const { id } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getArticleByID({ id }));
    dispatch(getArticleFeedbacksByArticleID({ id }));
  }, [id]);

  const navigate = useNavigate();

  const [showDel, setShowDel] = useState(false);

  const { article, loading } = useSelector((state) => state?.articles);
  const {hasFeedback } = useSelector((state) => state.articlesFeedback);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if(article){
      const html= article?.bodyText;
      const content = convertFromHTML(html);
      const raw = convertToRaw(content);
      const headers = raw.blocks.filter((b) => b.type === "header-one" || b.type === "header-two");
      setHeaders(headers);
    }
  }, [article]);

  useEffect(() => {
  }, [show]);

  return (
    <Spin spinning={loading}>
      <div>
        <Delete show={showDel} setShow={setShowDel} id={id} />
        <div className="flex flex-row justify-between items-center ">
          <h5 className="font-medium text-[24px] text-white">
            {article?.title ? article?.title : "No Title Found"}
          </h5>
          <div className="flex gap-[8px]">
            <div className="px-[8px] py-[4px] bg-[#323248] rounded-[4px] text-white font-medium text-[10px] uppercase">
              {article?.visibility ? "Public Article" : "Private Article"}
            </div>
            <div className="px-[8px] py-[4px] bg-[#2F264F] rounded-[4px] text-[#8950FC] font-medium text-[10px] uppercase">
              {article?.articleCategories?.length
                ? article?.articleCategories[0]?.category?.name
                : "N/A"}
            </div>
          </div>
        </div>
        <div className="relative w-full mt-[32px]">
          {article?.base64Image && !imgError ? (
            <img
              className="h-[292px] w-full rounded-[8px] object-cover"
              src={article?.base64Image}
              onError={() => setImgError(true)}
              alt="article"
            />
          ) : (
            <div className="h-[292px] w-full rounded-[8px] object-cover border-1 border-blue-600 flex items-center justify-center text-white text-[16px] font-medium">
              No Image Found
            </div>
          )}
        </div>
        <div className="mt-[32px]">
          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: article?.bodyText }}
            />
        </div>
      {
        !hasFeedback ? (  <div> <Button 
          onClick={() => navigate(`/client/dashboard/support/knowledge-base/articles/comment/${id}`)}
          className="mt-[32px]">
            {"Suggest & Update"}
          </Button>
        </div>): null
      }
      </div>
    </Spin>
  );
};

            {/* 
                      <Dropdown
                        trigger="click"
                        placement="bottomRight"
                        overlay={
                          <div className="rounded-[8px] custom-article-card__more-dd z-50 flex flex-col gap-[20px] min-w-[120px] py-[20px] px-[12px]">
                            <button
                              className="text-[#6D6D80] text-[12px] hover:text-[#3699FF] text-left"
                              onClick={() =>
                                navigate(
                                  `/client/dashboard/knowledge-base/articles/edit/${id}`
                                )
                              }
                            >
                              Edit
                            </button>
                            <button
                              className="text-[#6D6D80] text-[12px] hover:text-[#3699FF] text-left"
                              onClick={() => {
                                setShowDel(true);
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        }
                      >
                        <div className="p-[8px] absolute h-[32px] w-[32px] top-[12px] right-[12px] article-dropdown__more cursor-pointer">
                          <img src="/icon/more.svg" alt="more" />
                        </div>
                      </Dropdown> */}