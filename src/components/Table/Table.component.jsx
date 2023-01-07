import { Input, Button, Table as AntTable, Dropdown, DatePicker } from "antd";
import { Dropdown as DropdownIcon } from "icons";
import { Search } from "icons";
import { axios, getOrdersConfig } from "lib";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SearchComponent from "./SearchComponent";
import "./Table.styles.scss";

// Methods to Select Rows
// const rowSelectionMethods = {
//   onChange: (selectedRowKeys, selectedRows) => {
//     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
//   },
//   getCheckboxProps: (record) => ({
//     disabled: record.name === 'Disabled User', // Column configuration not to be checked
//     name: record.name,
//   }),
// };

export const Table = ({
  columns,
  data,
  fieldToFilter = "name",
  btnData,
  pagination,
  rowSelection,
  emptyText,
  customFilterSort,
  loading,
  permissions,
  editAction,
  deleteAction,
  viewAction,
  additionalBtns,
  hideActions,
  hideHeaders,
  customAdditionalBody,
  dateRangeSelector,
  dateRageFilter = false,
  statusFilter = [],
  handleStatus,
  statusFilterPlaceholder,
  handleDateRange,
  hideSearch,
  theme,
  rowKey,
  scroll,
  size,
  headingTitle,
  onRow,
  rowClassName,
  AdvancedSearchOptions,
  onPaginationChange,
  onSearchHandler,
  searchValue,
  ...props
}) => {
  const { user } = useSelector((state) => state.auth);
  const [dataSource, setDataSource] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchData, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [paginationData, setPaginationData] = useState({})
  const [values, setValues] = useState({
    ...AdvancedSearchOptions?.searchValues,
  });

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const searchOrderHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const defaultData = {
      keyword: values?.title ? values?.title : null,
      pageNumber: 0,
      pageSize: values?.numResult ? parseInt(values?.numResult) : 2,
      orderBy: [""],
      orderStatus: values.status ? parseInt(values.status) : null,
      adminAssigned: values?.admin ? values?.admin : null,
      orderNo: values?.orderId ? parseInt(values?.orderId) : null,
      amount: values.total ? parseInt(values.total) : null,
      clientId: values?.client ? values?.client : null,
      startDate: values?.dateAdded[0] ? values?.dateAdded[0] : null,
      endDate: values?.dateAdded[1] ? values?.dateAdded[1] : null,
    };

    const { url } = getOrdersConfig();
    // const res = await axios.post(url, defaultData);  // TODO: This is for using DataTable API
    setIsLoading(false);
    // if (res.status === 200) {
    setData(data);
    // }
  };

  const keyWordHandler = (e) => {
    const { value } = e.target;
    setSearch(value);

    if (search !== "") {
      const Results = data?.filter((Result) => {
        return Object.values(Result)
          .join(" ")
          .replace(/-/g, " ")
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      setSearchResults(Results);
    }
  };

  useEffect(() => {
    setPaginationData(pagination)
  }, [pagination])

  useEffect(() => {
    if (fieldToFilter !== null && fieldToFilter !== undefined) {
      const filteredData = data?.filter((item) => {
        if (
          item?.[fieldToFilter] !== null &&
          item?.[fieldToFilter] !== undefined
        ) {
          return item?.[fieldToFilter]
            ?.toString()
            ?.toLowerCase()
            ?.includes(search?.toLowerCase());
        }
        return false;
      });
      setFiltered(filteredData);
    }
  }, [data, fieldToFilter, search]);

  // Only Set Data if there are view permissions
  useEffect(() => {
    let dataViewer = [];
    if (
      permissions !== undefined &&
      permissions !== null &&
      permissions?.View
    ) {
      dataViewer = filtered?.length ? filtered : data;
    }
    setDataSource(dataViewer);
  }, [data, filtered, permissions]);

  // Only Add Actions if there are Update & Delete permissions
  useEffect(() => {
    if (permissions !== undefined && permissions !== null && !hideActions) {
      const actionColumn =
        (permissions?.View && viewAction) ||
          permissions?.Remove ||
          permissions?.Update
          ? {
            title: "Actions",
            key: "actions",
            align: "left",
            width: '120px',
            render: (text, record) => (
              <div
                className="flex items-center justify-end"
                onClick={(event) => event.stopPropagation()}
              >
                <Dropdown
                  overlayClassName="custom-table__table-dropdown-overlay"
                  className="custom-table__table-dropdown"
                  destroyPopupOnHide
                  placement="bottomRight"
                  overlay={
                    <>
                      {viewAction && permissions?.View && viewAction(record)}
                      {editAction &&
                        permissions?.Update &&
                        editAction(record)}
                      {deleteAction &&
                        permissions?.Remove &&
                        deleteAction(record)}
                    </>
                  }
                  trigger={["click"]}
                >
                  <Button
                    type="primary"
                    className={`custom-table__table-dropdown-btn dropdown-${record?.id}`}
                  >
                    <div>{"Actions"}</div>
                    <div>
                      <DropdownIcon />
                    </div>
                  </Button>
                </Dropdown>
              </div>
            ),
          }
          : {};
      setTableColumns([...columns, actionColumn]);
    } else {
      setTableColumns(columns);
    }
  }, []);

  const { RangePicker } = DatePicker;

  return (
    <div
      className={`custom-table ${theme === "dark" ? "custom-table-dark" : ""}`}
    >
      {/* Header */}
      {permissions !== undefined && permissions !== null ? (
        <>
          <div className="flex items-center justify-between custom-table__top-row">
            <div className="w-full mr-3">
              {
                <>
                  {permissions?.View ? (
                    <>
                      {customFilterSort ? (
                        customFilterSort
                      ) : (
                        <>
                          {hideSearch ? (
                            <></>
                          ) : (
                            <>
                              {!AdvancedSearchOptions && (
                                <Input
                                  placeholder={
                                    props?.searchText
                                      ? props?.searchText
                                      : "Search"
                                  }
                                  prefix={<Search />}
                                  className="custom-table__input"
                                  onChange={(e) => onSearchHandler(e.target.value, paginationData)}
                                  value={searchValue ? searchValue : ""}
                                />
                              )}
                            </>
                          )}
                        </>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                </>
              }
            </div>

            <div className="flex items-center gap-[8px]">
              {dateRageFilter && (
                <RangePicker
                  onChange={(date, dateString, id) =>
                    handleDateRange(date, dateString, id)
                  }
                  popupClassName="custom-date-picker-dd"
                  format="YYYY-MM-DD    "
                  placeholder={["Date Range"]}
                  className="custom-date-picker w-full h-[52px] bg-[#171723] rounded-[8px] text-[#92928F] flex items-center justify-between px-[16px]"
                />
              )}
              {statusFilter?.length ? (
                <select
                  onChange={(e) => handleStatus(e?.target?.value)}
                  className="custom-select form-select appearance-none block w-full px-[16px] h-[52px] text-base font-normal text-[#92928f] bg-[#171723] bg-clip-padding bg-no-repeat border-none rounded-[8px] transition ease-in-out m-0"
                >
                  <option value="">
                    {statusFilterPlaceholder || "Status"}
                  </option>
                  {statusFilter?.map((data, i) => (
                    <option value={data?.value || i} key={"status-" + i}>
                      {data?.name}
                    </option>
                  ))}
                </select>
              ) : (
                <></>
              )}

              {additionalBtns?.length ? (
                additionalBtns?.map((btn) => {
                  return (
                    <Button
                      type="primary"
                      className={`px-[32px] border-none rounded-[8px] h-[52px] bg-[#212E48] hover:bg-[#212E48] active:bg-[#212E48] focus:bg-[#212E48] text-[#3699FF] hover:text-[#3699FF] active:text-[#3699FF] focus:text-[#3699FF] ${btn?.customClass}`}
                      onClick={btn?.onClick}
                    >
                      {btn?.text}
                    </Button>
                  );
                })
              ) : customAdditionalBody ? (
                <>{customAdditionalBody}</>
              ) : (
                <></>
              )}
              {dateRangeSelector ? dateRangeSelector : <></>}
              {btnData?.text && btnData?.onClick && permissions?.Create ? (
                <Button
                  type="primary"
                  className={`custom-table__btn px-[32px] ${btnData?.customClass}`}
                  onClick={btnData?.onClick}
                >
                  {btnData?.text}
                </Button>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="w-full">
            {AdvancedSearchOptions && (
              <SearchComponent
                AdvancedSearchOptions={AdvancedSearchOptions}
                values={values}
                setValues={setValues}
                OnChange={inputChangeHandler}
                onSubmit={searchOrderHandler}
                isLoading={isLoading}
              />
            )}
          </div>
          {headingTitle && (
            <h3 className={"text-[#fff] text-[32px] mt-[40px]"}>
              {headingTitle}
            </h3>
          )}

          <div
            className={`custom-table__table ${hideHeaders ? "custom-table__table-hide-headers" : ""
              }`}
          >
            <AntTable
              columns={tableColumns}
              rowKey={rowKey}
              rowClassName={rowClassName}
              sortDirections={["ascend", "descend", "ascend"]}
              showSorterTooltip={false}
              scroll={scroll}
              dataSource={
                search?.length > 0
                  ? searchResults
                  : searchData?.length > 0
                    ? searchData
                    : dataSource
              }
              size={size}
              pagination={{
                defaultPageSize: user?.recordsToDisplay > 0 ? user?.recordsToDisplay : 5,
                showSizeChanger: true,
                position: ["bottomLeft"],
                pageSizeOptions: ["5", "10", "20", "50", "100", "200"],
                total: paginationData.totalCount,
                current: paginationData.currentPage,
              }}
              rowSelection={rowSelection}
              loading={permissions?.View ? loading || isLoading : false}
              locale={{
                emptyText:
                  search?.length > 0 && searchResults < 1
                    ? "No data matching search query found"
                    : permissions?.View
                      ? emptyText || "No Data"
                      : "You are not authorized to view this data.",
              }}
              onRow={onRow}
              onChange={(data) => onPaginationChange && onPaginationChange(data)}
            />
          </div>
        </>
      ) : (
        <h3 className="text-white">
          Please enable permissions to view the table.
        </h3>
      )}
      {/* Table End */}
    </div>
  );
};