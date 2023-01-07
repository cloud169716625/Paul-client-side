import { List } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArticleCard } from 'components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPublicArticles } from 'store';
import './styles.scss';

export function PublicArticles() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { articles, loading } = useSelector((state) => state?.articles);

  useEffect(() => {
    dispatch(getPublicArticles());
  }, []);

  return (
    <div className='articles-bg'>
    <div className="custom-articles-list mr-[15px]">
      <div className='list-headerX'>
        <span className="title-listX">
          {"Popular Articles"}
        </span>
        <span className="more-listX" onClick={
          () => navigate(
            `/client/dashboard/support/knowledge-base/articles/all-articles`
          )
        }>
          {"View More →"}
        </span>
      </div>
      <List
        dataSource={articles}
        loading={loading}
        rowKey={(article) => article?.id}
        renderItem={(item) => { 
          return (
            <List.Item>
              <ArticleCard
                onView={() =>
                  navigate(
                    `/client/dashboard/support/knowledge-base/articles/view/${item?.id}`
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
    <div className="custom-articles-list">
      <div className='list-headerX'>
        <span className="title-listX">
          {"Latest Articles"}
        </span>
        <span className="more-listX-l" onClick={
          () => navigate(
            `/client/dashboard/support/knowledge-base/articles/all-articles`
          )
        }>
          {"View More →"}
        </span>
      </div>
      <List
        dataSource={articles}
        loading={loading}
        rowKey={(article) => article?.id}
        renderItem={(item) => { 
          return (
            <List.Item>
              <ArticleCard
                onView={() =>
                  navigate(
                    `/client/dashboard/support/knowledge-base/articles/view/${item?.id}`
                  )
                }
               title={item?.title}
              />
            </List.Item>
          );
        }}
      />
    </div>
    </div>
  );
}
