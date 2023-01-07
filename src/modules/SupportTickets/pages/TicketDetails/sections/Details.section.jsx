import { Ticket as TicketIcon } from "icons";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTicketById } from "store";
import moment from "moment";
import { getDifference } from "lib";
import { Navigation } from ".";
import { Comments } from "./Comments.section";

export const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { detailsLoading, ticket } = useSelector((state) => state?.tickets);
  // const deptLoading = useSelector((state) => state?.departments?.loading);
  // const userLoading = useSelector((state) => state?.users?.loading);
  const loading = detailsLoading;
  let search = window.location.search;
  let params = new URLSearchParams(search);
  let repliesId = params.get("tid");

  // const { permissions } = checkModule({
  //   module: 'Users',
  //   modules: userModules,
  // });

  useEffect(() => {
    (async () => {
      await dispatch(getTicketById(id));
      // await dispatch(getUsers());
      goToViolation(repliesId);
    })();
  }, [id]);

  const goToViolation = (id) => {
    const violation = document.getElementById(id);
    if (violation) {
      violation.scrollIntoView();
    }
  };

  const linksArr = ["Comments", "History"];
  // Handle Navigation
  const [active, setActive] = useState(linksArr[0]);
  const links = linksArr?.map((link) => {
    return {
      label: link,
      count: 2,
      onClick: () => setActive(link),
    };
  });
  return (
    <div className="ticket-wrap bg-[#1E1E2D] text-[#ffffff] p-[40px] rounded-[8px]">
      {loading || ticket === null ? (
        <div className="text-center">
          <Spin
            size="large"
            style={{ gridColumn: "1/3", alignSelf: "center" }}
          />
        </div>
      ) : (
        <div className="">
          <div className="flex">
            <div className="w-[50px] tick">
              <TicketIcon />
            </div>
            <div className="ml-[20px]">
              <h3 className={"text-[24px] text-[#fff]"}>
                {ticket?.ticketTitle}
              </h3>
              <p className={"mt-[8px] text-[#474761]"}>
                <span className="mr-[20px]">By {ticket?.createdByName}</span>{" "}
                <span>{`Created ${getDifference(
                  new Date(ticket?.createdOn)
                )} - ${moment(ticket?.createdOn).format(
                  "MMMM Do, YYYY h:m A"
                )}`}</span>
              </p>
            </div>
          </div>

          <Comments />
        </div>
      )}
    </div>
  );
};
