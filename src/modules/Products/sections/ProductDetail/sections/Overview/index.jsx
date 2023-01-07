import { GenericInfo, LineItems } from "./sub-sections";
import { Sidebar } from "../Sidebar";
import { Form } from "formik";
import { Spin } from "antd";
import { useSelector } from "react-redux";

export const Overview = ({ isView }) => {
  const { loading } = useSelector((state) => state?.products);

  return (
    <Form>
      <div className="users d-flex justify-center">
        {loading ?
          <Spin
            size="large"
            className="pt-[20px]"
          />
          :
          <div className="admin-details min-w-[60vh] pt-[20px]">
            <>
              <div className="admin-details__left">
                <Sidebar />
              </div>
              <div className="admin-details__right">
                <GenericInfo isView />
                <LineItems isView />
              </div>
            </>
          </div>
        }
      </div>
    </Form>
  );
};