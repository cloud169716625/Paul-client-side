import "./Categories.section.scss";
import { useDispatch,useSelector } from "react-redux";
import { getAllArticleCategoriesParents } from "store";
import { useEffect } from "react";
import CategoryCard from "components/CategoryCard/CategoryCard.component";
import { List } from 'antd';

const Categories = () => {
    const dispatch = useDispatch();
    
    const { articleCategories, loading } = useSelector((state) => state?.articleCategories);
    
    useEffect(() => {
        dispatch(getAllArticleCategoriesParents());
    }, []);
    
    return (
        <div className="custom-categories-list">
        <List
            dataSource={articleCategories}
            loading={loading}
            rowKey={(category) => category?.id}
            renderItem={(item) => {
            return (
                <List.Item>
                <CategoryCard name={item?.name} id={item?.id} />
                </List.Item>
            );
            }}
        />
        </div>
    );
}

export default Categories;
export { Categories };