import { Button } from "components";
import { Dropdown as DropdownIcon } from "icons";
import { Dropdown } from "antd";
import { useState } from "react";
import "../ProductDetail.styles.scss";
import { CancelRequest } from "./CancelRequest.section";
import { useSelector } from "react-redux";
import { CancelBillingServiceRequest } from "./CancelBillingServiceRequest";
import { RemoveCancelRequest } from "./RemoveCancelRequest";

export const Navigation = ({ links, active, }) => {
  const [showDelete, setShowDelete] = useState(false);
  const [showDelete1Billing, setShowDeleteBilling] = useState(false);
  const [showDeleteRequest, setshowDeleteRequest] = useState(false);
  const { product } = useSelector((state) => state?.products);

  return (
    <div className="navigation p-3 bg-[#1E1E2D] rounded-lg">
      <div className="bg-[#323248] rounded-lg px-[40px] py-[20px] flex items-center gap-[40px] justify-between">
        <div className="flex items-center gap-[40px]">
          {links.map((link) => (
            <div
              onClick={link?.onClick}
              key={link?.label}
              className={`text-[14px] ${active === link?.label ? "text-[#3699FF]" : "text-[#6D6D80]"
                } uppercase cursor-pointer transition-all hover:text-[#3699FF]`}
            >
              {link?.label}
            </div>
          ))}
        </div>
        <CancelRequest
          show={showDelete}
          setShow={setShowDelete}
          type="order"
        />
        <CancelBillingServiceRequest
          show={showDelete1Billing}
          setShow={setShowDeleteBilling}
          type="order"
        />
        <RemoveCancelRequest
          show={showDeleteRequest}
          setShow={setshowDeleteRequest}
          type="order"
        />
        {
          product?.status === 2 ?
            ""
            :

            product?.terminationDate ?
              <Button className="bg-[#FFA800] focus:bg-[#FFA800] "
                onClick={() => {
                  setshowDeleteRequest(true);
                }} >
                Remove Cancellation Request
              </Button>
              :
              product?.status === 0 || product?.status === 1 || product?.status === 3 ?
                <Dropdown
                  overlayClassName="custom-table__table-dropdown-overlay w-[300px] p-[15px] ant-dropdown"
                  className="custom-table__table-dropdown"
                  destroyPopupOnHide
                  placement="bottomRight"
                  overlay={
                    <>
                      <button className="pt-[15px] pl-[15px] pb-[10px]"
                        onClick={() => {
                          setShowDelete(true);
                        }} >
                        Cancel Immediately
                      </button>
                      <button className="pt-[15px] pl-[15px] pb-[10px]"
                        onClick={() => {
                          setShowDeleteBilling(true);
                        }}>
                        Cancel at End of Billing Period
                      </button>
                    </>
                  }
                  trigger={["click"]}
                >
                  <Button>
                    <div className="flex items-center justify-between">
                      <div><p>Cancellation Request </p> </div>
                      <div><p className="pl-[8px]"><DropdownIcon /></p></div>
                    </div>
                  </Button>
                </Dropdown>
                :
                ""
        }
      </div>
    </div>
  );
};