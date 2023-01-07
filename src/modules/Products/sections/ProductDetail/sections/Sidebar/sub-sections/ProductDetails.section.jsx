import { MultiSelect } from "components";
import { useSelector } from "react-redux";

export const ProductDetails = () => {
  const { categories } = useSelector((state) => state?.categories);
  const { departments } = useSelector((state) => state.departments);

  return (
    <div className="p-[32px] bg-[#1E1E2D] rounded-[8px] mt-[20px]">
      <h6 className="text-white font-medium text-[16px]">ProductDetails</h6>
      <p className="text-[#474761] text-[14x] mt-[8px] mb-[32px]">
        Set Categories & Tags
      </p>
      <MultiSelect
        disabled
        name="productCategories"
        placeholder="Select Categories"
        label="Cateogries"
        options={categories?.map((category) => ({
          label: category?.name,
          value: category?.id,
        }))}
      />
      <MultiSelect
        disabled
        name="productDepartments"
        placeholder="Select Departments"
        label="Departments"
        options={departments?.map((department) => ({
          label: department?.name,
          value: department?.id,
        }))}
      />
      <MultiSelect
        disabled
        name="tags"
        placeholder="Enter New Tag"
        label="Tags"
        mode="tags"
      />
    </div>
  );
};