import { Input } from "components";
import { Link } from "react-router-dom";
import "./styles.scss";
import { useSelector } from "react-redux";

export const GenericInfo = ({ isView, ...props }) => {
  const { product } = useSelector((state) => state?.products);
  return (
    <div className="bg-[#1E1E2D] p-[32px] rounded-[8px]">
      <div className="flex items-center justify-between mb-[16px]">
        <h6 className="text-white text-[20px]">General Information</h6>

      </div>
      <hr
        className="w-full border-t-[2px] border-t-[#474761] border-dashed mb-[20px]"
        style={{ height: "0px" }}
      />
      {props?.actionLink ? (
        <div className="flex gap-3 justify-end">
          {props?.actionLink.map((action) => (
            <Link
              to={action?.link}
              className="text-[#3699FF] text-[16px] hover:text-[#0BB783]"
            >
              {action?.text}
            </Link>
          ))}
        </div>
      ) : null}
      <Input
        name="name"
        placeholder={product?.name}
        label="Service Name"
        className="mb-[20px]"
        disabled={isView}
      />
      <Input
        name="description"
        placeholder={product?.description}
        label="Service Description"
        type="textarea"
        rows={4}
        disabled={isView}
        className="descript"
      />
    </div>
  );
};