import { Input } from "antd";
import { Button } from "components";
import { SearchableField } from "components/Table/SearchComponent";
import { RelatedList } from "components/TicketDetails/sections";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { DatePicker as $DatePicker } from "antd";
import { useDispatch } from "react-redux";
import { getCurrentOnlineUsers } from "store";
import { getDepartments } from "store";

export const TicketSearch = (props) => {
  const {
    values,
    OnChange,
    setValues,
    AdvancedSearchOptions,
    onSubmit,
    isLoading,
  } = props;
  return (
    <form onSubmit={onSubmit}>
      <div className="w-full p-2 rounded-md">
        <h4 className="mb-4 font-medium text-white text-md">Advanced Search</h4>
        <div className="flex flex-col flex-wrap justify-between w-full lg:flex-row">
          {AdvancedSearchOptions?.fields?.map((field) => {
            if (field?.variant === "searchable") {
              return (
                <div className="w-full lg:w-1/4" key={field?.name}>
                  <div className="py-1 mr-2 ">
                    <div className="mr-2 mb-[16px] text-white">{field?.label}</div>
                    <SearchableField
                      name="client"
                      placeholder="Type to search client"
                      data={field?.options}
                      values={values}
                      setValues={setValues}
                      className="h-[52px]"
                    />
                  </div>
                </div>
              );
            } else if (field?.variant === "select") {
              return (
                <div className="w-full lg:w-1/4" key={field?.name}>
                  <div className="py-1 mr-2">
                    <div className="mr-2 mb-[16px] text-white">{field?.label}</div>
                    <select
                      value={values[field?.name]}
                      onChange={OnChange}
                      placeholder="Any"
                      name={field?.name}
                      className="form-select appearance-none text-[13px] block w-full h-[52px] p-2 text-base font-normal text-[#92928f] bg-[#171723] bg-clip-padding bg-no-repeat border-none rounded-[8px] transition ease-in-out m-0 focus:bg-[#171723] focus:border-none focus:outline-none"
                    >
                      {field?.options?.map((option) => (
                        <option
                          value={option?.value}
                          key={option?.value}
                          className={option?.isActive ? "text-[#3dff02]" : ""}
                        >
                          {option?.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              );
            } else if (field?.variant === "dateRange") {
              return (
                <div className="w-full lg:w-1/2" key={field?.name}>
                  <div className="py-1 mr-2">
                    <div className="mr-2 mb-[16px] text-white">{field?.label}</div>
                    <$DatePicker.RangePicker
                      onChange={(date) => {
                        const startDate = moment(date[0]).format("DD-MM-YYYY");
                        const endDate = moment(date[1]).format("DD-MM-YYYY");
                        setValues({
                          ...values,
                          [field?.name]: `${startDate}, ${endDate}`,
                        });
                      }}
                      name="dateAdded"
                      dropdownClassName="custom-date-picker-dd"
                      format="MM/DD/YYYY"
                      separator={<></>}
                      className="custom-date-picker w-full h-[52px] bg-[#171723] rounded-[8px] text-[#92928F] flex items-center justify-between px-[16px]"
                    />
                  </div>
                </div>
              );
            } else {
              return (
                <div className="w-full lg:w-1/4" key={field?.name}>
                  <div className="mr-2 mb-[16px] py-1">
                    <div className="mr-2 mb-[16px] text-white">{field?.label}</div>
                    <Input
                      value={values[field?.name]}
                      onChange={OnChange}
                      name={field?.name}
                      type={field?.type}
                      className="custom-table__input p-2 text-[#92928F] h-[52px]"
                    />
                  </div>
                </div>
              );
            }
          })}
        </div>
        <div className="mr-2 text-right">
          <Button htmlType="submit" disabled={isLoading} className="h-[52px]">
            {isLoading ? "Searching..." : "Search"}
          </Button>
        </div>
      </div>
    </form>
  );
};

const AdvancedSearch = () => {
  const { users, onlineUsers } = useSelector((state) => state?.users);
  const { departments } = useSelector((state) => state?.departments);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentOnlineUsers());
    dispatch(getDepartments());
  }, []);

  let usersData = [{ label: "Any", value: "" }];
  if (users?.length) {
    users?.forEach((user) => {
      const isOnline = onlineUsers?.find((admin) => admin?.userId === user?.id)
        ? true
        : false;
      usersData.push({
        value: user?.id,
        label: user?.fullName
          ? `${user?.fullName}${isOnline ? "   (Online)" : ""}`
          : "N/A",
        isActive: isOnline ? true : false,
      });
    });
  }

  let ticketDepartments = [{ label: "Any", value: "" }];
  if (departments?.length) {
    departments?.forEach((dept) => {
      ticketDepartments.push({
        value: dept?.id,
        label: dept?.name,
      });
    });
  }

  const AdvancedSearchOptions = {
    searchValues: {
      ticketNo: "",
      dateAdded: "",
      status: "",
      email: "",
      client: "",
      admin: "",
      title: "",
      priority: "",
      department: "",
      numResult: 100,
    },
    fields: [
      {
        label: "Ticket No.",
        name: "ticketNo",
        type: "text",
        variant: "text",
        placeholder: "36",
      },
      {
        label: "Search String",
        name: "title",
        type: "text",
        variant: "text",
        placeholder: "36",
      },
      {
        label: "Email",
        name: "email",
        type: "email",
        variant: "text",
        placeholder: "100",
      },
      {
        label: "Status",
        name: "status",
        type: "select",
        variant: "select",
        options: [
          { label: "Any", value: "" },
          { label: "Active", value: 0 },
          { label: "Waiting", value: 1 },
          { label: "Closed", value: 2 },
          { label: "Closed and Locked", value: 3 },
        ],
      },
      {
        label: "Date",
        name: "dateAdded",
        type: "date",
        variant: "dateRange",
        placeholder: "12-13-2022",
      },
      {
        label: "Max Results",
        name: "numResult",
        type: "number",
        variant: "text",
        placeholder: 0,
      },
      {
        label: "Department",
        name: "department",
        type: "select",
        // placeholder: "Selec",
        variant: "select",
        options: ticketDepartments,
      },
    ],
  };

  return (
    <div className="p-[40px] flex flex-col gap-[30px]">
      <RelatedList isSearch AdvancedSearchOptions={AdvancedSearchOptions} />
    </div>
  );
};

export default AdvancedSearch;
