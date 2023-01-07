import { Close as CloseIcon } from "icons";
import { SimpleModal } from "components";

export function PaymentFailed({
  show,
  setShow,
  handleCancel,
}) {
  const handleClose = () => {
    setShow(false);
  };

  return (
    <SimpleModal
      show={show}
      setShow={setShow}
      onHide={handleClose}
      heading="Payment Failed"
      cancelButtonText="Continue"
      handleCancel={handleCancel}
    >
      <div className="text-center flex flex-col gap-[20px] mb-[8px]">
        <div className="flex justify-center">
          <div className="w-[60px] h-[60px] bg-[#3A2434] flex justify-center items-center rounded-[8px]">
            <CloseIcon />
          </div>
        </div>
        <h5 className="text-[16px] text-white">{`Something Went Wrong`}</h5>
        <p className="text-[#474761]">
          Oops! It looks something went wrong. Please choose another payment method or try again later.
        </p>
      </div>
    </SimpleModal>
  );
}
