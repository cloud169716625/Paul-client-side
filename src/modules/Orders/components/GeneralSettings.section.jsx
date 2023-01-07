import { Input } from "components";
import { Link } from "react-router-dom";

export const GeneralSettings = ({ isView, ...props }) => {
  return (
    <div className="bg-[#1E1E2D] p-[32px] rounded-[8px]">
      <div className="flex items-center justify-between mb-[16px]">
        <h6 className="text-white font-medium text-[16px]">
          Products / Services
        </h6>
        {props?.actionLink ? (
          <div className="flex justify-end gap-3">
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
      </div>

      <Input
        name="name"
        placeholder="Product Name"
        label="Product Name"
        className="mb-[20px]"
        disabled={true}
      />
      <Input
        name="description"
        placeholder="Product Description"
        label="Product Description"
        type="textarea"
        rows={2}
        disabled={true}
      />
    </div>
  );
};
