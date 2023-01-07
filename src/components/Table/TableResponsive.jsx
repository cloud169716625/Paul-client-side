import { Dropdown as DropdownIcon } from "icons";
import { Button, Dropdown } from "antd";

import TableCell from "./TableCell";

const TableHeadCell = ({ children }) => (
  <TableCell className="py-custom-4 text-[12px] uppercase">
    {children}
  </TableCell>
);

TableHeadCell.defaultProps = {
  className: "",
};

const TableResponsive = ({ fields, records }) => {
  return (
    <div className="table w-full">
      <div className="table-header-group text text-custom-grey">
        <div className="table-row">
          {fields.map((field, i) => (
            <TableHeadCell key={`tf_${i}`}>{field.label}</TableHeadCell>
          ))}
          <TableHeadCell>action</TableHeadCell>
        </div>
      </div>
      <div className="table-row-group text-white border-dashed text-normal border-t-1 border-secondary-light">
        {records.map((row, i) => (
          <div key={`tr${i}`} className="table-row">
            {fields.map((field, j) => (
              <TableCell key={`rtc_${i + j}`}>
                {!!field.formatter && typeof field.formatter === "function"
                  ? field.formatter(row[field.id])
                  : row[field.id]}
              </TableCell>
            ))}
            <TableCell key={`at_${i}`}>
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
                      <Button
                        onClick={() => { alert('Edit' )}}
                      >
                        View Details
                      </Button>
                      <Button
                        onClick={() => { alert('Edit event called')}}
                      >
                        Download PDF
                      </Button>
                    </>
                  }
                  trigger={["click"]}
                >
                  <Button
                    type="primary"
                    className="custom-table__table-dropdown-btn"
                  >
                    <div>{"Actions"}</div>
                    <div>
                      <DropdownIcon />
                    </div>
                  </Button>
                </Dropdown>
              </div>
            </TableCell>
          </div>
        ))}
      </div>
    </div>
  );
};

TableResponsive.defaultProps = {
  rows: [],
};

export default TableResponsive;
