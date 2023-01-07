import { Modal } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { cancelRequestImmediately } from 'store/Actions/products';

export const CancelRequest = ({ show, setShow, id }) => {
  const { product, loading } = useSelector((state) => state?.products);
  const dispatch = useDispatch();

  return (
    <Modal
      heading="Cancellation Request"
      cancelButtonText="Go Back"
      customBody={
        <div className="mb-[32px] text-center">
          <div className="bg-[#3A2434] w-[80px] h-[80px] ml-[auto] mr-[auto] rounded-[8px] mt-[32px] flex items-center relative cursor-pointer">
            <div className="relative shadow-xl rounded-[50%] h-[54px] w-[54px] flex items-center justify-center ml-[auto] mr-[auto]">
              <img src="/img/bulk-card-slash.svg" alt="edit-icon" />
            </div>
          </div>
          <div className='p-[20px] pb-[10px]'>
            Cancel Immediately
          </div>
          <div className='p-[20px] pt-[5px] pb-[10px] text-[#474761] w-[300px] ml-[auto] mr-[auto]'>
            Are you sure you wish to cancel this service immediately?
          </div>
        </div>
      }
      initialValues={{ id }}
      submitText="Cancel Immediately"
      loading={loading}
      handleSubmit={async () => {

        await dispatch(cancelRequestImmediately(product?.id));
        setShow(false);
      }}
      show={show}
      setShow={setShow}
    />
  );
};