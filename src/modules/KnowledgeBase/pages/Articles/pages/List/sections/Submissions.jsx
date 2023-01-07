import { List } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArticleCard } from 'components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSubmissionsByUser } from 'store';
import './styles.scss';

export function Submissions() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { submissions, submissionsLoading } = useSelector((state) => state?.articles);

  useEffect(() => {
    dispatch(getSubmissionsByUser());
  }, []);

  return (
    <div className='articles-bg2'>
    <div className="custom-articles-list2 mr-[15px]">
      <List
        dataSource={submissions}
        loading={submissionsLoading}
        rowKey={(article) => article?.id}
        renderItem={(item) => { 
          return (
            <List.Item>
              <ArticleCard
                onView={() =>
                  navigate(
                    `/client/dashboard/support/knowledge-base/articles/edit/${item?.id}`
                  )
                }
               title={item?.title}
               green={true}
              />
            </List.Item>
          );
        }}
      />
    </div>
    </div>
  );
}
