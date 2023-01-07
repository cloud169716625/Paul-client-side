import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { Input, Table } from "components";
import "./ProductList.styles.scss"
import moment from "moment";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { checkModule } from "lib/checkModule";
import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { getProductById, getFilteredProducts, getProducts, getSearchProducts } from "store/Actions/products";
import ProductName from "layout/components/navbar/ProductProfileCard/ProductName";

export const ProductList = (
  {
    productListStatus,
  }
) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const { t } = useTranslation("/Bills/ns");
  const [imgError, setImgError] = useState(false);
  const { products, loading, paginationProps } = useSelector((state) => state?.products);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [paginationData, setPaginationData] = useState({})
  const [searchData, setSearchData] = useState("")
  const [filterData, setFilterData] = useState("")
  const [isFilterChange, setIsFilterChange] = useState(false)

  const { userModules } = useSelector((state) => state?.modules);
  const { permissions } = checkModule({
    module: "Products",
    modules: userModules,
  });

  const Options = [
    { label: "Hourly", value: 0 },
    { label: "Monthly", value: 1 },
    { label: "Quarterly", value: 2 },
    { label: "SemiAnnually", value: 3 },
    { label: "Annually", value: 4 },
    { label: "Biennially", value: 5 },
    { label: "Triennially", value: 6 },
  ];

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => (a?.id < b?.id ? -1 : 1),
      render: (text, record) => <>{record?.id?.substr(record?.id?.length - 5)}</>,
    },
    {
      title: "Product",
      dataIndex: "Product",
      key: "name",
      sorter: (a, b) => (a?.name < b?.name ? -1 : 1),
      render: (text, record) => {
        return (
          <div className="flex items-center gap-[16px]">
            {record && record.base64Image && !imgError ? (
              <div className="bg-[#171723] flex items-center justify-center w-[47px] h-[47px] rounded-lg p-[4px]">
                <img
                  className="w-full h-full rounded-lg"
                  src={record?.base64Image}
                  alt="user"
                  onError={() => setImgError(true)}
                />
              </div>
            ) : (
              <div className="bg-[#171723] flex items-center justify-center min-w-[47px] h-[47px] rounded-lg p-[4px] text-[#0BB783] text-[18px] font-bold">
                <>{record && <ProductName isLoggedIn={isLoggedIn} product={record} />}</>
              </div>
            )}
            <p className="text-white text-[14px]">{record?.name}</p>
          </div>
        );
      },
      width: "30%",
    },
    {
      title: "Pricing",
      dataIndex: "Pricing",
      key: "billingCycle",
      sorter: (a, b) => (a?.totalPriceOfLineItems < b?.totalPriceOfLineItems ? -1 : 1),
      render: (text, record) => {
        let values = "";
        switch (record.billingCycle) {
          case 0:
            values = Options[0]?.label;
            break;
          case 1:
            values = Options[1]?.label;
            break;
          case 2:
            values = Options[2]?.label;
            break;
          case 3:
            values = Options[3]?.label;
            break;
          case 4:
            values = Options[4]?.label;
            break;
          case 5:
            values = Options[5]?.label;
            break;
          case 6:
            values = Options[6]?.label;
            break;

          default:
            values = "UNKNOWN";
        }
        return `$${record.totalPriceOfLineItems}-${values}`;
      },
    },
    {
      title: "Next Due Date",
      dataIndex: "nextDueDate",
      key: "nextDueDate",
      sorter: (a, b) => (moment(a?.nextDueDate) < moment(b?.nextDueDate) ? -1 : 1),
      render: (text, record) => record?.nextDueDate !== "N/A" ? moment(record?.nextDueDate).format('MMMM Do, YYYY') : "N/A",
      width: "20%",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => (a?.status > b?.status ? 0 : 3),
      render: (status) => {
        let color = "";
        let text = "";
        switch (status) {
          case 0:
            color = "bg-[#392F28] text-[#FFA800]";
            text = "PENDING";
            break;
          case 1:
            color = "bg-[#1C3238] text-[#0BB783]";
            text = "ACTIVE";
            break;
          case 2:
            color = "bg-[#323248] text-[#FFFFFF]";
            text = "CANCELLED";
            break;
          case 3:
            color = "bg-[#3A2434] text-[#F64E60]";
            text = "SUSPENDED";
            break;
          default:
            color = "";
            text = "UNKNOWN";
        }
        return (
          <div
            className={`${color} px-[8px] py-[4px] w-[fit-content] rounded-[4px]`}
          >
            {text}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    setSearchData("")
    setFilterData("")
    const paginationData = {
      advancedSearch: {
        fields: [
          "Name"
        ],
        keyword: ""
      },
      keyword: '',
      pageNumber: 1,
      pageSize: paginationProps?.pageSize ? paginationProps.pageSize : 10,
      orderBy: [''],
    }
    productListStatus ? dispatch(getFilteredProducts(productListStatus, paginationData)) : dispatch(getProducts());
  }, [productListStatus]);

  useEffect(() => {
    if (products) {
      let dataArr = [];
      products.forEach((key) => {
        dataArr.push({
          id: key?.id,
          name: key?.name,
          billingCycle: key?.billingCycle,
          totalPriceOfLineItems: key?.totalPriceOfLineItems,
          nextDueDate: key?.nextDueDate ? key?.nextDueDate : "N/A",
          status: key?.status,
        });
      });
      setData(dataArr);
      setIsFilterChange(false)
    }
  }, [products]);

  const onPaginationChange = (data) => {
    const { current, pageSize } = data
    const paginationData = {
      advancedSearch: {
        fields: [
          "Name"
        ],
        keyword: searchData ? searchData : ""
      },
      keyword: '',
      pageNumber: current,
      pageSize: pageSize,
      orderBy: [''],
    };
    productListStatus || filterData ? dispatch(getFilteredProducts(productListStatus || filterData, paginationData)) :
      data &&
      current &&
      pageSize &&
      !filterData &&
      !productListStatus &&
      dispatch(getSearchProducts(paginationData));
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
            "name"
          ],
          keyword: debouncedSearchTerm
        },
        keyword: '',
        pageNumber: 1,
        pageSize: pageSize,
        orderBy: [''],
      };
      filterData && !isFilterChange ? dispatch(getFilteredProducts(filterData, searchData)) :
        paginationData &&
        pageSize &&
        !isFilterChange &&
        !productListStatus &&
        dispatch(getSearchProducts(searchData));
      productListStatus && setFilterData(productListStatus)
    },
    [debouncedSearchTerm]
  );
  const onSearchHandler = (data, paginationData) => {
    setSearchData(data)
    setPaginationData(paginationData)
  }

  const onFilterChange = (status) => {
    setFilterData(status)
    setIsFilterChange(true)
    setSearchData("")
    const paginationData = {
      advancedSearch: {
        fields: [
          "Name"
        ],
        keyword: ""
      },
      keyword: '',
      pageNumber: 1,
      pageSize: paginationProps?.pageSize,
      orderBy: [''],
    }
    status ? dispatch(getFilteredProducts(status, paginationData)) : dispatch(getProducts());
  }

  return (
    <div className="p-[40px]">
      <div className="p-[40px] pb-[24px] bg-[#1E1E2D] rounded-[8px]">
        <Formik initialValues={{ selectFilter: "" }}>
          {({ values }) => (
            <Form>
              <Table
                columns={columns}
                pagination={
                  paginationProps ?
                    paginationProps :
                    {
                      defaultPageSize: 5,
                      showSizeChanger: false,
                      position: ["bottomLeft"],
                      current: 1,
                    }}
                onPaginationChange={onPaginationChange}
                onSearchHandler={onSearchHandler}
                searchValue={searchData}
                data={data}
                loading={loading}
                fieldToFilter={values?.selectFilter}
                searchText="Search Here"
                onRow={(record) => {
                  return {
                    onClick: () => {
                      dispatch(getProductById(record?.id, navigate));
                    },
                  };
                }}
                editAction={(record) => (
                  <Button
                    onClick={
                      () => dispatch(getProductById(record?.id, navigate))
                    }
                  >
                    View
                  </Button>
                )}
                permissions={permissions}
                customAdditionalBody={
                  <div className="min-w-[250px] flex items-center gap-[10px]">
                    <div className="text-white text-[14px] w-[100px]">
                      Filter By:
                    </div>
                    <Input
                      name="selectFilter"
                      type="select"
                      customOnChange={(e) => onFilterChange(e.target.value)}
                      placeholder="All"
                      options={[
                        { value: "active", label: "Active" },
                        { value: "suspended", label: "Suspended" },
                        { value: "pending", label: "Pending" },
                        { value: "cancelled", label: "Cancelled" },
                      ]}
                      disabled={productListStatus ? true : false}
                      values={{ selectFilter: productListStatus ? productListStatus : filterData }}
                    />
                  </div>
                }
                t={t}
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};