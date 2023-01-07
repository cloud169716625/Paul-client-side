import { Ticket as TicketIcon } from "icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getTicketById } from "store";
import { Spin } from "antd";
import { getTimeDiff } from "lib";
import {
  Communication,
} from "./sections";
import { Link } from "react-router-dom";
import { getUsersByDepartmentID } from "store";
import moment from "moment";

export function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export const Details = () => {
  const dispatch = useDispatch();
  const { detailsLoading, ticket } = useSelector(
    (state) => state?.tickets
  );
  const { settings } = useSelector((state) => state.appSettings);
  const { usersLoading } = useSelector((state) => state?.departments);
  const { users, clients } = useSelector((state) => state?.users);
  const { id } = useParams();

  const createdByAdmin = users?.find((user) => user?.id === ticket?.createdBy);
  // const createdByClient = clients?.find(
  //   (user) => user?.id === ticket?.createdBy
  // );
  useEffect(() => {
    (async () => {
      if (id) {
        await dispatch(getTicketById(id));
      }
    })();
  }, [id]);

  useEffect(() => {
    (async () => {
      if (ticket?.departmentId) {
        await dispatch(getUsersByDepartmentID({ id: ticket?.departmentId }));
      }
    })();
  }, [ticket]);

  const ticketStatus = ticket?.ticketStatus;

  return (
    <>
      {id ? (
        <div className="ticket-wrap bg-[#1E1E2D] text-[#ffffff] p-[40px] rounded-[8px]">
          {ticket === null && !detailsLoading && !usersLoading ? (
            <></>
          ) : detailsLoading || usersLoading ? (
            <div className="text-center">
              <Spin
                size="large"
                style={{ gridColumn: "1/3", alignSelf: "center" }}
              />
            </div>
          ) : (
            <div className="">
              <div className="flex">
                <div className="w-[80px] flex items-center">
                  <div className="w-[80px] h-[80px] rounded bg-[#1C3238] tick p-[20px]">
                    <TicketIcon />
                  </div>
                </div>
                <div className="ml-[20px]">
                  <h3 className={"text-[24px] text-[#fff]"}>
                    {ticket?.ticketTitle}
                    <span className="mx-2">-</span>
                    <span
                      className={
                        ticketStatus === 0
                          ? "text-[#0BB783]"
                          : ticketStatus === 1
                          ? "text-[#FFA400]"
                          : "text-[#DD3224]"
                      }
                    >
                      {ticketStatus === 0
                        ? "Active"
                        : ticketStatus === 1
                        ? "Waiting"
                        : ticketStatus === 2
                        ? "Closed"
                        : "Closed and Locked"}
                    </span>
                  </h3>
                  <div className="flex items-center  my-[12px]">
                    <p className="text-[14px] text-[#474761]">
                      {moment(ticket?.createdOn)?.format(settings?.dateFormat)}{" "}
                      -
                    </p>
                    <p className="text-[14px] text-[#6D6D80] bg-[#323248] px-2 rounded-sm mx-2">
                      {`Duration ${getTimeDiff(ticket?.createdOn)}`}
                    </p>
                    <p className="text-[14px] text-[#6D6D80] bg-[#323248] px-2 rounded-sm mr-2">
                      {`Idle ${getTimeDiff(ticket?.lastModifiedOn)}`}
                    </p>
                  </div>
                  <div
                    className={
                      "mt-[8px] text-[#474761] flex items-center gap-[12px]"
                    }
                  >
                    <p className="text-[14px]">
                      By{" "}
                      {!ticket?.incomingFromClient && createdByAdmin?.fullName
                        ? createdByAdmin?.fullName
                        : ticket?.clientFullName
                        ? ticket?.clientFullName
                        : "N/A"}
                    </p>{" "}
                    <Link
                      to={
                        !ticket?.incomingFromClient && createdByAdmin?.fullName
                          ? `/admin/dashboard/settings/users/list/admin-details/${createdByAdmin?.id}`
                          : `/admin/dashboard/billing/clients/list/details/${
                              clients?.find(
                                (client) =>
                                  client?.fullName === ticket?.clientFullName
                              )?.id
                            }`
                      }
                      className={`${
                        !ticket?.incomingFromClient && createdByAdmin?.fullName
                          ? "bg-[#2F264F] text-[#8950FC]"
                          : "bg-[#392F28] text-[#FFA800]"
                      } rounded-[4px] text-[14px] px-[8px] py-[4px]`}
                    >
                      {!ticket?.incomingFromClient && createdByAdmin?.fullName
                        ? "Admin"
                        : ticket?.clientFullName
                        ? "Client"
                        : "N/A"}
                    </Link>
                  </div>
                </div>
              </div>
              <Communication />
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
