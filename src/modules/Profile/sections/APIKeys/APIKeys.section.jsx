import {
  Button,
  // Select,
  Tooltip,
} from "antd";
import {
  Copy,
} from "icons";
import moment from "moment";
import { Table } from "components";
import { useEffect, useState } from "react";
import { Add, Delete, EditAPIKey, EditPermissions } from "./sections";
import { useSelector, useDispatch } from "react-redux";
import { getAPIKeyByID } from "store";
import { checkModule } from "lib/checkModule";
import { getAllAPIKeys, getSearchAPIKeys } from "store";
import { getClientAppModules } from "store/Actions/ModuleActions";

export const APIKeys = () => {

  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [editPermissions, setEditPermissions] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [recordToDel, setRecordToDel] = useState(false);
  const [searchData, setSearchData] = useState("")
  const [paginationData, setPaginationData] = useState({})

  const { apiKeys, loading, paginationProps } = useSelector((state) => state?.apiKeys);
  const { settings } = useSelector((state) => state.appSettings);
  const { permissions } = checkModule({
    module: "Dashboard",
    modules: {},
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllAPIKeys());
    dispatch(getClientAppModules());
  }, []);

  const columns = [
    {
      title: "LABEL",
      dataIndex: "label",
      key: "label",
    },
    {
      title: "API KEY",
      dataIndex: "apiKey",
      key: "apiKey",
      render: (text) => {
        return (
          <div className="flex gap-[8px] items-center">
            <div>{text}</div>
            <Tooltip title="Copied!" trigger="click">
              <div
                onClick={() => {
                  navigator.clipboard.writeText(text);
                }}
                className="cursor-pointer"
              >
                <Copy />
              </div>
            </Tooltip>
          </div>
        );
      },
    },
    {
      title: "IP ADDRESS",
      dataIndex: "safeListIpAddresses",
      key: "safeListIpAddresses",
    },
    {
      title: "CREATION DATE",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) => (moment(a?.createdOn) < moment(b?.createdOn) ? -1 : 1),
      render: (createdOn) => createdOn !== "N/A" ? moment(createdOn).format(settings?.dateFormat) : "N/A",
    },
    {
      title: "EXPIRATION DATE",
      dataIndex: "validTill",
      key: "validTill",
      sorter: (a, b) => (moment(a?.validTill) < moment(b?.validTill) ? -1 : 1),
      render: (validTill) => validTill !== "N/A" ? moment(validTill).format(settings?.dateFormat) : "N/A",
    },
    {
      title: "STATUS",
      key: "status",
      dataIndex: "status",
      render: (status) => (
        <div
          className={`${status
            ? "bg-[#1C3238] text-[#0BB783]"
            : "bg-[#3A2434] text-[#F64E60]"
            } px-[8px] py-[4px] w-[fit-content] rounded-[4px]`}
        >
          {status ? "ENABLED" : "DISABLED"}
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (apiKeys) {
      let dataArr = [];
      apiKeys.forEach((key, index) => {
        dataArr.push({
          key: key?.id,
          label: key?.label !== null ? key?.label : "N/A",
          apiKey: key?.applicationKey,
          safeListIpAddresses: key?.safeListIpAddresses,
          createdAt: key?.createdAt ? key?.createdAt : "N/A",
          status: key?.statusApi,
          validTill: key?.validTill ? key?.validTill : "N/A",
          tenant: key?.tenant,
        });
      });
      setData(dataArr);
    }
  }, [apiKeys]);

  const onPaginationChange = (data) => {
    const { current, pageSize } = data
    const paginationData = {
      keyword: '',
      pageNumber: current,
      pageSize: pageSize,
      orderBy: [''],
    };
    data &&
      current &&
      pageSize &&
      dispatch(getSearchAPIKeys(paginationData));
  }
  
  function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(
      () => {
        const handler = setTimeout(() => {
          setDebouncedValue(value);
        }, delay);
        return () => {
          clearTimeout(handler);
        };
      },
      [value, delay]
    );
    return debouncedValue;
  }
  const debouncedSearchTerm = useDebounce(searchData, 500);
  useEffect(
    () => {
      const { pageSize } = paginationData
      const searchData = {
        advancedSearch: {
          fields: [
            "ApplicationKey",
            "label"
          ],
          keyword: debouncedSearchTerm
        },
        keyword: '',
        pageNumber: 0,
        pageSize: pageSize,
        orderBy: [''],
      };
      paginationData &&
        pageSize &&
        dispatch(getSearchAPIKeys(searchData));
    },
    [debouncedSearchTerm]
  );

  const onSearchHandler = (data, paginationData) => {
    setSearchData(data)
    setPaginationData(paginationData)
  }

  return (
    <div className="mt-[20px] bg-[#1E1E2D] rounded-[8px] pb-[32px]">
      <div className="p-4 up-api-keys__table">
        <Table
          data={data}
          columns={columns}
          loading={loading || "userLoading"}
          btnData={{ text: "Add New API Key", onClick: () => setShow(true) }}
          fieldToFilter="label"
          searchText="Search API Keys"
          permissions={permissions}
          // style={{outerWidth:800}}
          pagination={
            paginationProps ?
              paginationProps :
              {
                defaultPageSize: 5,
                showSizeChanger: true,
                position: ["bottomLeft"],
                pageSizeOptions: ["5", "10", "20", "50", "100", "200"],
                current: 1,
              }
          }
          onPaginationChange={onPaginationChange}
          onSearchHandler={onSearchHandler}
          // rowSelection={rowSelection}
          editAction={(record) => (
            <>
              <Button
                onClick={async () => {
                  await dispatch(getAPIKeyByID(record?.key));
                  setShowEdit(true);
                }}
              >
                Edit
              </Button>
              <Button
                onClick={async () => {
                  await dispatch(getAPIKeyByID(record?.key));
                  setEditPermissions(true);
                }}
              >
                Edit Permissions
              </Button>
            </>
          )}
          deleteAction={(record) => {
            return (
              <Button
                onClick={async () => {
                  setRecordToDel(record?.key);
                  setShowDelete(true);
                }}
              >
                Delete
              </Button>
            );
          }}
        // permissions={{ View: true, Update: true, Remove: true }}
        // t={t}
        />
      </div>
      {/* Modals */}
      <Add show={show} setShow={setShow} />
      <EditAPIKey show={showEdit} setShow={setShowEdit} />
      <EditPermissions show={editPermissions} setShow={setEditPermissions} />
      <Delete show={showDelete} setShow={setShowDelete} id={recordToDel} />
    </div>
  );
};