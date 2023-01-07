import { Form } from "formik";
import { Outlet } from "react-router-dom";

export const InvoiceHistory = ({ isView }) => {
  return (
    <Form>
      <div className="users">
        <Outlet />
      </div>
    </Form>
  );
};