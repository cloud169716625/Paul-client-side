import { Radio } from "antd";
import { Button, SimpleModal } from "components";
import { useRef, useState } from "react";
import _ from 'lodash';

const paymentMethods = [
  "Credit Card",
  "PayPal",
  "Crypto",
  "Alipay",
  "Wire Transfer",
  "Gift Code",
];

const amounts = [10, 25, 50, 100];

export function MakePayment({
  show,
  setShow,
  handleSubmit,
  currentCreditBalance,
}) {
  const inputRef = useRef(null);
  const [cardType, setCardType] = useState('creditCard1');
  const [amount, setAmount] = useState(amounts[0]);
  const [activeMethod, setActiveMethod] = useState(0);

  const onSubmit = () => {
    handleSubmit(amount, () => {
      activeMethod(0);
      setAmount(amounts[0]);
      setCardType('creditCard1');
    });
  }

  const handleClose = () => {
    setShow(false);
    setAmount(amounts[0]);
  };

  const onChangeAmount = _.debounce(() => setAmount(parseInt(inputRef.current.value || amounts[0])), 200);

  return (
    <SimpleModal
      show={show}
      setShow={setShow}
      onHide={handleClose}
      heading="Make Payment"
      submitText="Make Payment"
      cancelButtonText="Cancel"
      handleSubmit={onSubmit}
    >
      <div className="flex gap-4">
        <div className="border-1 border-[#323248] border-dashed rounded p-[20px] flex flex-col gap-2">
          {paymentMethods.map((method, idx) => (
            <button
              key={method}
              className={`${
                activeMethod === idx ? "text-[#3699FF]" : "text-[#494B74]"
              }`}
              onClick={() => setActiveMethod(idx)}
            >
              {method}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-[10px]">
            <h5 className="mb-[10px] text-white">My Credit Cards</h5>
            <div className={`rounded h-[60px] ${cardType === 'creditCard1' ? 'bg-[#3699FF]' : 'bg-[#151521]'} px-[12px] flex items-center`}>
              <Radio name="creditCards" id="creditCard1" checked={cardType === 'creditCard1'} onChange={() => setCardType('creditCard1')} />
              <span>Card ending with 5158</span>
            </div>

            <div className={`rounded h-[60px] ${cardType === 'creditCard2' ? 'bg-[#3699FF]' : 'bg-[#151521]'} px-[12px] flex items-center`}>
              <Radio name="creditCards" id="creditCard2" checked={cardType === 'creditCard2'} onChange={() => setCardType('creditCard2')} />
              <span>Add a New Credit Card</span>
            </div>
          </div>

          <div className="flex flex-col gap-[20px]">
            <h5 className="text-white">Choose Payment Amount</h5>
            <div className="flex gap-2">
              {amounts.map((value, idx) => (
                <Button
                  key={value}
                  className={`w-[60px] h-[60px] p-0 ${value !== amount && 'bg-[#151521] hover:bg-[#151521] focus:bg-[#151521]'}`}
                  onClick={() => setAmount(value)}
                >${value}</Button>
              ))}
            </div>
          </div>

          <div>
            <input
              ref={inputRef}
              type="number"
              name="otherAmount"
              className="bg-[#151521] w-full h-12 px-3 text-gray-300 rounded-md placeholder:text-gray-400 placeholder:text-sm placeholder:font-light mb-0"
              id="enterPassword"
              placeholder="Other amount…"
              onChange={() => onChangeAmount()}
              max={currentCreditBalance}
            />
          </div>
        </div>
      </div>
    </SimpleModal>
  );
}
