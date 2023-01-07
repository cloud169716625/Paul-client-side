import { Check } from "icons";
import { SimpleModal } from "components";

export function PaymentSuccess({
  show,
  setShow,
  handleCancel
}) {
  const handleClose = () => {
    setShow(false);
  };

  return (
    <SimpleModal
      show={show}
      setShow={setShow}
      onHide={handleClose}
      heading="Payment Successfully"
      cancelButtonText="Continue"
      handleCancel={handleCancel}
    >
      <div className="text-center flex flex-col gap-[20px] mb-[8px]">
        <div className="flex justify-center">
          <div className="w-[60px] h-[60px] bg-[#1C3238] flex justify-center items-center rounded-[8px]">
            <Check />
          </div>
        </div>
        <h5 className="text-[16px] text-white">{`Invoice Paid`}</h5>
        <p className="text-[#474761]">
          Congratulations! Your payment has been successfully processed. You may go back and continue.
        </p>
      </div>
    </SimpleModal>
  );
}
