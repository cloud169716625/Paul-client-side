import { List } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArticleCard } from 'components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPublicArticles,getArticlesByCat } from 'store';
import { useQuery } from 'pages/sign-in/SignInByToken.page';
import './styles.scss';

export function AllArticles() {
  const navigate = useNavigate();
  const query = useQuery();

  const dispatch = useDispatch();

  const { articles, loading } = useSelector((state) => state?.articles);
  const [catx, setCat] = useState(null);
  useEffect(() => {
    var cat = query.get("category");
    if(cat){
        setCat(cat);
        dispatch(getArticlesByCat(cat));
    }else{
        dispatch(getPublicArticles());
    }
  }, []);

  return (
    <div className="custom-articles-list2 mr-[15px]">
      <div className='list-headerX'>
        <span className="title-listX">
          {catx? "Articles By Catergory":"All Articles"}
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
  );
}