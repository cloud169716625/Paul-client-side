import { Formik, Form } from 'formik';
import { Spin } from 'antd';
import { Button as AntButton } from 'antd';
import moment from 'moment';
import { useEffect, useState,} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from "components";
import { useNavigate } from 'react-router-dom';

const CommentCard = ({
    imgSrc,
    imgTxt,
    reply,
    commentText,
    userFullName,
    createdOn,
    id,
  }) => {
    const [active, setActive] = useState(false);
    const dispatch = useDispatch();
    return (
      <>
        <div
          className={` ${
            reply
              ? 'p-[20px] border-[#323248] border-[1px] border-solid rounded-[8px] ml-[40px]'
              : 'p-[20px] border-[#323248] border-[1px] border-solid rounded-[8px]'
          }`}
        >
          <div className="flex justify-between">
            <div className="flex gap-[16px]">
              {imgSrc && (
                <img
                  src={imgSrc}
                  alt="detail"
                  className="w-[48px] h-[48px] object-cover rounded-[8px]"
                />
              )}
              {imgTxt && (
                <p className="w-[48px] h-[48px] flex items-center justify-center bg-[#171723] text-[#0BB783] rounded-[8px]">
                  {imgTxt}
                </p>
              )}
  
              <div className="flex flex-col gap-[4px]">
                <div className="flex gap-[8px]">
                  <h5 className="text-sm text-[#FFFFFF]">
                    {userFullName || 'Admin'}
                  </h5>
                </div>
                <p className="text-xs text-[#474761]">
                  {createdOn
                    ? moment(createdOn)?.format('MMM, DD, YYYY [at] h:mm A')
                    : null}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-[20px]">
            <p className=" text-base text-[#92928F]">{commentText}</p>
          </div>
        </div>
      </>
    );
  };

export const ArticleFeedbacks = ({id, setShow}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { articlesFeedbacks, loading } = useSelector((state) => state.articlesFeedback);

    useEffect(() => {
        if(articlesFeedbacks?.length > 0) {
            setShow(false);
        }else {
            setShow(true);
        }
        console.log(articlesFeedbacks);
    }, [articlesFeedbacks]);

    return (
        <>
        <Spin spinning={loading}>
            <div>
                {<>{
                articlesFeedbacks?.map((articlesFeedback) => (
                    <div style={
                      {
                        borderLeft: '2px dashed #0BB783',
                        paddingLeft: '20px'
                      }
                    } className="m-[40px] flex flex-col gap-[20px]">
                    <div className="title-fb">
                        <h3 className="text-[#FFFFFF] text-base">
                        {"Article Feedback"}
                        </h3>
                        <p dangerouslySetInnerHTML={
                            {__html: articlesFeedback?.description}
                        } className='text-[#92928F] mt-[10px]'>
                        
                        </p>
                    </div>
                    <div className="title2-fb">
                        <h3 className="text-[#FFFFFF] text-small">
                        {"Comments"}
                        </h3>
                    </div>
                    {articlesFeedback?.articleFeedbackComments?.map((comment) => {
                      const image = comment?.userImagePath;
                      const fullName = comment?.userFullName;
                      return (
                        <>
                          <CommentCard
                            imgTxt={
                              !image && !fullName
                                ? 'A'
                                : !image && fullName
                                ? fullName
                                : ''
                            }
                            imgSrc={image}
                            {...comment}
                          />
                        </>
                      )
                    })}
                  </div>
                )
            )
            }
            </>
            }
            </div>
        </Spin>
        </>
    );
};

