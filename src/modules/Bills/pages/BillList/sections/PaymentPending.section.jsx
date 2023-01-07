import { Info as InfoIcon } from "icons";
import { SimpleModal } from "components";

export function PaymentPending({
  show,
  setShow,
}) {
  const handleClose = () => {
    setShow(false);
  };

  return (
    <SimpleModal
      show={show}
      setShow={setShow}
      onHide={handleClose}
      heading="Payment Pending"
      cancelButtonText="Continue"
    >
      <div className="text-center flex flex-col gap-[20px] mb-[8px]">
        <div className="flex justify-center">
          <div className="w-[60px] h-[60px] bg-[#392F28] flex justify-center items-center rounded-[8px]">
            <InfoIcon fill="#ffa800" />
          </div>
        </div>
        <h5 className="text-[16px] text-white">{`Payment Being Processed`}</h5>
        <p className="text-[#474761]">
          It looks like we're still processing your payment. Please check back in a while for an update.
        </p>
      </div>
    </SimpleModal>
  );
}
