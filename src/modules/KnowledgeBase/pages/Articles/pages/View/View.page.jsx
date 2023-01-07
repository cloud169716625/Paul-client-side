import {
  Article,
  // GenerateTicket,
  RecentArticle,
} from './sections';
import './View.styles.scss';
import ArticlesToc from '../../toc2';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ArticleFeedbacks } from './sections/ArticleFeedBack';
import { useSelector } from 'react-redux';

export const View = () => {
  const [headers, setHeaders] = useState([]);
  const [show, setShow] = useState(false);
  const { id } = useParams();
  const {hasFeedback } = useSelector((state) => state.articlesFeedback);

  useEffect(() => {
    console.log("hasfed", hasFeedback);
  }, [hasFeedback]);

  function changeShow(value) {
    console.log("value", value);
    setShow(value);
  }

  return (
    <>
      <div className="view-article-grid ">
            <div>
              <ArticlesToc headers={headers} />
            </div>
        <div className=" bg-[#1E1E2D] rounded-[8px] m-[20px] ml-[0px]">
          <div className="view-article__box">
            <div className="view-article__box-left pt-[32px] pl-[32px] pr-[20px] pb-[24px]">
              <Article setHeaders={setHeaders} show={show} />
            </div>
            <div className="view-article__box-border">
              <div className="view-article__box-right pt-[32px] pr-[20px] pl-[20px]">
                <RecentArticle />
              </div>
            </div>
          </div>
        </div>
      </div>
      {hasFeedback?
      <div style={
        {
          marginLeft: "30px",
        }
      }
      className=" bg-[#1E1E2D] rounded-[8px] p-[20px] m-[20px] ml-[0px]">
        <ArticleFeedbacks
          id={id}
          setShow={changeShow}
          ></ArticleFeedbacks>
      </div>:null}
    </>
  );
};
