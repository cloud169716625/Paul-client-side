import { Button } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { checkModule } from "lib/checkModule";
import { Table } from "components";
import { Navigation } from "./Navigation.section";
import { getAllArticleFeedbacks } from "store";
import moment from "moment";
import { MarkAsReviewed } from "../../common-sections/MarkAsReviewed.section";
import { getArticleFeedbackByID } from "store";

export const FeedbackList = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("/Bills/ns");
  const { settings } = useSelector((state) => state.appSettings);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(getAllArticleFeedbacks());
    })();
  }, [dispatch]);

  const { articlesFeedbacks, loading } = useSelector(
    (state) => state?.articlesFeedback
  );
  const { userModules } = useSelector((state) => state?.modules);

  const { permissions } = checkModule({
    module: "KnowledgeBase",
    modules: userModules,
  });

  const columns = [
    {
      title: "Article Title",
      dataIndex: "articleTitle",
      key: "articleTitle",
      sorter: (a, b) => (a?.articleTitle < b?.articleTitle ? -1 : 1),
      render: (text, record) => <>{record?.article?.title}</>,
    },
    {
      title: "Article Description",
      dataIndex: "articleDescription",
      key: "articleDescription",
      // bodyText
      render: (text, record) => (
        <p
          dangerouslySetInnerHTML={{
            __html: record?.article?.bodyText
              ? record?.article?.bodyText?.substring(0, 25)
              : "No Description",
          }}
        />
      ),
    },
    {
      title: "Created By",
      dataIndex: "createdByName",
      key: "createdByName",
      sorter: (a, b) => (a?.createdByName < b?.createdByName ? -1 : 1),
      render: (text) => <>{text ? text : "system"}</>,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) => (moment(a?.createdAt) < moment(b?.createdAt) ? -1 : 1),
      render: (text) => <>{moment(text).format(settings?.dateFormat)}</>,
    },
  ];

  const [current, setCurrent] = useState("notReviewed");

  const navData = [
    { label: "NOT REVIEWED", path: "notReviewed" },
    { label: "REVIEWED", path: "reviewed" },
  ];

  // Setting data properly
  const [data, setData] = useState([]);

  useEffect(() => {
    if (articlesFeedbacks?.length && current === "notReviewed") {
      const finalData = articlesFeedbacks?.filter(
        (articleFeedback) => articleFeedback?.isReviewed === false
      );
      setData(finalData);
    } else if (articlesFeedbacks?.length && current === "reviewed") {
      const finalData = articlesFeedbacks?.filter(
        (articleFeedback) => articleFeedback?.isReviewed === true
      );
      setData(finalData);
    } else {
      setData([]);
    }
  }, [articlesFeedbacks, current]);

  const [show, setShow] = useState(false);

  return (
    <div className="p-[40px]">
      <Navigation current={current} setCurrent={setCurrent} navData={navData} />
      <MarkAsReviewed show={show} setShow={setShow} />
      <div className="p-[40px] pb-[24px] bg-[#1E1E2D] rounded-[8px]">
        <Table
          columns={columns}
          data={data}
          loading={loading}
          field="name"
          pagination={{
            defaultPageSize: 5,
            showSizeChanger: true,
            position: ["bottomRight"],
            pageSizeOptions: ["5", "10", "20", "50", "100", "200"],
          }}
          editAction={(record) => (
            <>
              <Button
                onClick={() => {
                  navigate(
                    `/admin/dashboard/knowledge-base/feedback/view/${record?.id}`
                  );
                }}
              >
                View
              </Button>
              {
                <Button
                  onClick={async () => {
                    await dispatch(getArticleFeedbackByID({ id: record?.id }));
                    setShow(true);
                  }}
                >
                  {!record?.isReviewed
                    ? "Mark as Reviewed"
                    : "Mark as Not Reviewed"}
                </Button>
              }
            </>
          )}
          permissions={permissions}
          t={t}
          rowKey={(record) => record?.id}
        />
      </div>
    </div>
  );
};
