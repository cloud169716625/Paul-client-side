import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllRecentArticles } from "store";
import "./RecentArticle.styles.scss";

const ArticleCard = ({ id, imagePath, title, bodyText }) => {
  const [imgError, setImgError] = useState(false);
  const navigate = useNavigate();
  return (
    <div
    key={id+title}
      className="cursor-pointer"
      onClick={() => {
        navigate(`/client/dashboard/support/knowledge-base/articles/view/${id}`);
      }}
    >
      <div className="article-card flex gap-[20px] items-center">
        <div className="h-[83px] w-[83px]">
          {imagePath && !imgError ? (
            <img
              className="h-full w-full rounded-[8px] object-cover"
              onError={() => setImgError(true)}
              src={imagePath}
              alt={title}
            />
          ) : (
            <div className="h-[83px] w-[83px] rounded-[8px] object-cover border-1 border-blue-600 flex items-center justify-center text-white text-[16px] font-medium text-center">
              No Img
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <h5 className="text-xs text-[#FFFFFF]">{title}</h5>
          <div className="txt-recent">
            <p
              className="text-[#474761] text-sm mt-[4px]"
              dangerouslySetInnerHTML={{ __html: bodyText?.substring(0, 50) }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export const RecentArticle = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllRecentArticles());
  }, []);
  const { recentArticles } = useSelector((state) => state?.articles);
  return (
    <div className="recent-article">
      <div className="">
        <h5 className="text-2xl text-[#FFFFFF]">Recent Articles</h5>
      </div>
      <div className="recent-article__btm-border flex flex-col ">
        {recentArticles?.length ? (
          recentArticles?.map((article) => {
            return <ArticleCard {...article} />;
          })
        ) : (
          <>No Recent Articles</>
        )}
      </div>
    </div>
  );
};
