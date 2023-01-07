import { Button } from "antd";
import { useEffect, useState } from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { checkModule } from "lib/checkModule";
import { Table } from "components";
import { getAllArticleCategories } from "store";
import { AddCategory, Delete } from "./sections";
import { EditCategory } from "./sections/EditCategory.section";
import { getArticleCategoryByID } from "store";

export const CategoryList = () => {
  const { t } = useTranslation("/Bills/ns");
  const { settings } = useSelector((state) => state.appSettings);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(getAllArticleCategories());
    })();
  }, [dispatch]);

  const { articleCategories, loading } = useSelector(
    (state) => state?.articleCategories
  );
  const { userModules } = useSelector((state) => state?.modules);

  const { permissions } = checkModule({
    module: "KnowledgeBase",
    modules: userModules,
  });

  const columns = [
    {
      title: "Category ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => (a?.id < b?.id ? -1 : 1),
      render: (text) => {
        return (
          <div className="">
            <p className="text-sm">{text.substring(0, 4)}</p>
          </div>
        );
      },
    },

    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => (a?.name < b?.name ? -1 : 1),
      width: 600,
      render: (text, record) => {
        return (
          <div className="flex items-center gap-[12px]">
            {record?.categoryIcon ? (
              <div className="h-[45px] w-[45px]">
                <img
                  src={record?.categoryIcon}
                  alt="category"
                  className="h-full w-full object-cover"
                />
              </div>
            ) : null}
            <div>{text}</div>
          </div>
        );
      },
    },
    {
      title: "Articles Under Category",
      dataIndex: "undercategory",
      key: "undercategory",
      render: () => {
        return <div className="text-sm">4 Articles</div>;
      },
    },
    {
      title: "Creation Date",
      dataIndex: "createdOn",
      key: "createdOn",
      sorter: (a, b) => (moment(a?.createdOn) < moment(b?.createdOn) ? -1 : 1),
      render: (createdOn) => moment(createdOn).format(settings?.dateFormat),
    },
  ];

  // Setting data properly
  const [addModalShow, setAddModalShow] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    setData([]);
    if (articleCategories.length) {
      let dataToSet = [];
      articleCategories?.forEach((b) => {
        if (b?.parentCategoryId === "00000000-0000-0000-0000-000000000000") {
          dataToSet.push({ ...b, key: b?.id });
        }
      });
      setData(dataToSet);
    }
  }, [articleCategories]);

  // Edit Category
  const [edit, setEdit] = useState(false);
  const [del, setDel] = useState(false);
  const [id, setId] = useState("");
  return (
    <div className="mt-[20px]">
      <div className="p-[40px] pb-[24px] bg-[#1E1E2D] rounded-[8px]">
        <AddCategory show={addModalShow} setShow={setAddModalShow} />
        <EditCategory show={edit} setShow={setEdit} id={id} />
        <Delete show={del} setShow={setDel} id={id} />
        <Table
          columns={columns}
          data={data}
          loading={loading}
          pagination={{
            defaultPageSize: 5,
            showSizeChanger: true,
            position: ["bottomRight"],
            pageSizeOptions: ["5", "10", "20", "50", "100", "200"],
          }}
          btnData={{
            text: "Add Category",
            onClick: () => setAddModalShow(true),
          }}
          editAction={(record) => (
            <Button
              onClick={async () => {
                await dispatch(getArticleCategoryByID(record.id));
                setId(record?.id);
                setEdit(true);
              }}
            >
              Edit
            </Button>
          )}
          deleteAction={(record) => (
            <Button
              className="focus:bg-[unset]"
              onClick={async () => {
                setId(record?.id);
                setDel(true);
              }}
            >
              Delete
            </Button>
          )}
          permissions={permissions}
          t={t}
        />
      </div>
    </div>
  );
};
