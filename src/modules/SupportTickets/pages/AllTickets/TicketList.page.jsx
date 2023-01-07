import { Navigation } from "./sections";
import { Ticket as TicketIcon } from "icons";
import { useEffect, useState } from "react";
import { Table, TicketMenu } from "components";
import { checkModule } from "lib/checkModule";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { groupBy } from "lib";
import { useNavigate } from "react-router-dom";
import { getTickets } from "store";
import { AssignTicket } from "components/TicketModals";

export const AllTickets = () => {
  const { t } = useTranslation("/Tickets/ns");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state?.tickets);
  const tickets = useSelector((state) => state?.tickets?.allTickets);
  const { userModules } = useSelector((state) => state?.modules);

  let activeTicket = tickets ? groupBy(tickets, "ticketStatus") : {};
  useEffect(() => {
    (async () => {
      await dispatch(getTickets());
    })();
  }, [dispatch]);

  const [active, setActive] = useState(t("active"));
  const links = [
    {
      label: t("active"),
      count: activeTicket ? activeTicket[0].length : 0,
      onClick: () => handleActive(0, t("active")),
    },
    {
      label: t("waiting"),
      count:
        activeTicket && Object.keys(activeTicket).length > 2
          ? activeTicket[2].length
          : 0,
      onClick: () => handleActive(2, t("waiting")),
    },
    {
      label: t("closed"),
      count:
        activeTicket && Object.keys(activeTicket).length > 1
          ? activeTicket[1].length
          : 0,
      onClick: () => handleActive(1, t("closed")),
    },
  ];

  const handleActive = (v, text) => {
    setActive(text);
    if (tickets.length) {
      const dataToSet = tickets
        ?.filter(function (el) {
          return el.ticketStatus === v;
        })
        .map((b) => {
          return {
            ...b,
            key: b?.id,
          };
        });
      setData(dataToSet);
    }
  };

  const { permissions } = checkModule({
    module: "Support",
    modules: userModules,
  });

  const columns = [
    {
      title: "",
      dataIndex: "description",
      key: "description",
      render: (description, record) => {
        return (
          <div
            className="flex cursor-pointer"
            onClick={() => {
              navigate(
                `/admin/dashboard/support/tickets/show-all/list/details/${record?.id}`
              );
            }}
          >
            <div className="w-[20px]">
              <TicketIcon />
            </div>
            <div className="ml-[8px]">
              <h3 className={`text-[#FFFFFF]`}>
                {record?.ticketTitle}{" "}
                {`${
                  record?.tagTitle ? (
                    <span
                      className={`uppercase ml-[12px] text-[10px] bg-[#323248] pt-[4px] pb-[4px] pl-[8px] pr-[8px]`}
                    >
                      ${record?.tagTitle}
                    </span>
                  ) : (
                    ""
                  )
                }`}
              </h3>
              <p className={"text-[#474761] text-[14px] mt-[12px]"}>
                {description}
              </p>
            </div>
          </div>
        );
      },
    },
  ];

  // Setting data properly
  const [data, setData] = useState([]);
  useEffect(() => {
    setData([]);
    if (tickets.length) {
      const dataToSet = tickets
        ?.filter(function (el) {
          return el.ticketStatus === 0;
        })
        .map((b) => {
          return {
            ...b,
            key: b?.id,
          };
        });
      setData(dataToSet);
    }
  }, [tickets]);

  const [visible, setVisible] = useState(false);
  const [popup, setPopup] = useState(null);

  // Assign Ticket Modal
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");

  const menuItems = [
    {
      label: "Assign Ticket",
      onClick: (record) => {
        setShow(true);
        setId(record?.id);
      },
    },
  ];
  return (
    <div className="p-[40px] dashboard-ticket">
      <Navigation active={active} links={links} />
      <AssignTicket show={show} setShow={setShow} id={id} />
      <div className={`p-[40px] mt-[20px] bg-[#1E1E2D]`}>
        <Table
          columns={columns}
          data={data}
          loading={loading}
          fieldToFilter="ticketRelatedTo"
          permissions={permissions}
          hideActions={true}
          headingTitle={
            active === t("active")
              ? "Active Tickets"
              : active === t("waiting")
              ? "Waiting Tickets"
              : "Closed Tickets"
          }
          t={t}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {}, // click row
              onDoubleClick: (event) => {}, // double click row
              onContextMenu: (event) => {
                event.preventDefault();
                if (!visible) {
                  document.addEventListener(`click`, function onClickOutside() {
                    setVisible(false);
                    document.removeEventListener(`click`, onClickOutside);
                  });
                }
                setVisible(true);
                setPopup({
                  record,
                  x: event.clientX,
                  y: event.clientY,
                });
              }, // right button click row
              onMouseEnter: (event) => {}, // mouse enter row
              onMouseLeave: (event) => {}, // mouse leave row
            };
          }}
        />
        {<TicketMenu options={menuItems} visible={visible} {...popup} />}
      </div>
    </div>
  );
};
