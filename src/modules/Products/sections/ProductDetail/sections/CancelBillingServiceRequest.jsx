import { Modal } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { cancelRequestAtTheEnd } from 'store/Actions/products';
import "../ProductDetail.styles.scss"

export const CancelBillingServiceRequest = ({ show, setShow, id }) => {
    const { loading, product } = useSelector((state) => state?.products);
    const dispatch = useDispatch();
    return (
        <Modal
            heading="Cancelation Request"
            cancelButtonText="Go Back"
            customBody={
                <div className="mb-[32px] text-center">
                    <div className="bg-[#3A2434] w-[80px] h-[80px] ml-[auto] mr-[auto] rounded-[8px] mt-[32px] flex items-center relative cursor-pointer">
                        <div className="relative shadow-xl rounded-[50%] h-[54px] w-[54px] flex items-center justify-center ml-[auto] mr-[auto]">
                            <img src="/img/bulk-card-slash.svg" alt="edit-icon" />
                        </div>
                    </div>
                    <div className='p-[20px] pb-[10px]'>
                        Cancel at End of Billing Period
                    </div>
                    <div className='p-[20px] pt-[5px] pb-[10px] text-[#474761] w-[300px] ml-[auto] mr-[auto]'>
                        Are you sure you wish to cancel this service at End of Billing Period?
                    </div>
                </div>
            }
            initialValues={{ id }}
            submitText="Cancel at End of Billing Period"
            loading={loading}
            handleSubmit={async () => {
                await dispatch(cancelRequestAtTheEnd(product?.id));
                setShow(false);
            }}
            show={show}
            setShow={setShow}
        />
    );
};