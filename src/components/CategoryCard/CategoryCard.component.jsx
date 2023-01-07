import "./CategoryCard.styles.scss";
import { useDispatch,useSelector } from "react-redux";
import { getAllArticleCategoriesChild } from "store";
import { useEffect,useState } from "react";
import { List } from 'antd';
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ name, id }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { articleSubCategories } = useSelector((state) => state?.articleCategories);
    const [loading, setloading] = useState(true);
    const [data, setData] = useState([]);
    useEffect(() => {
        dispatch(getAllArticleCategoriesChild(id));
    }, []);
    useEffect(() => {
        if(articleSubCategories[id]){
            setData(articleSubCategories[id]);
            setloading(false);
        }
    },
     [articleSubCategories[id]]);
    
    return (
        <div
        className="p-[12px] flex flex-col gap-[10px] custom-cat-card">
        <div className="title-cat">{name}</div>
        <div className="categories-list-sub">
        <List
            dataSource={data}
            loading={loading}
            rowKey={(category) => category?.id}
            renderItem={(item) => {
            return (
                <List.Item>
                <div 
                style={{cursor: "pointer"}}
                onClick={
          () => navigate(
            `/client/dashboard/support/knowledge-base/articles/all-articles?category=${item?.id}`
          )
        } className="list-sub-item">
                    {item?.name}
                </div>
                </List.Item>
            );
            }}
        />
        </div>
        <div className="footer-cat">
            <div style={
                {cursor: "pointer"}
            } onClick={
          () => navigate(
            `/client/dashboard/support/knowledge-base/articles/all-articles?category=${id}`
          )
        }>
            {"View All Category Articles →"}
            </div>
            </div>
        </div>
    );
};

export default CategoryCard;