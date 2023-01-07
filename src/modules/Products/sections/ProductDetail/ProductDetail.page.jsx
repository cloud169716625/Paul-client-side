import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import { Navigation } from "./sections";
import "./ProductDetail.styles.scss"
import { createServerImage } from "lib";
import { getProductById } from "store/Actions/products";
import { getAllInvoiceHistory, getInvoiceByID } from "store/Actions/invoiceActions";

export const ProductDetail = () => {
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state?.products);
  const url = window?.location?.pathname
  const para = useParams();
  const navigate = useNavigate();
  const [active, setActive] = useState("OVERVIEW");
  const links = [
    {
      label: "OVERVIEW", onClick: () => {
        dispatch(getProductById(product?.id ? product?.id : para?.id, navigate, setActive));
      }
    },
    {
      label: "INVOICE HISTORY",
      onClick: () => {
        navigate(
          `/client/dashboard/products/list/invoice/list/${product?.id ? product?.id : para?.id}`
        );
        dispatch(getAllInvoiceHistory());
        setActive("INVOICE HISTORY")
      }
    },
  ];

  useEffect(() => {
    const overviewPage = url?.split("/")?.includes("overview")
    if (overviewPage) {
      dispatch(getProductById(para?.id, navigate, setActive));
    } else if (para?.invoiceId) {
      dispatch(getInvoiceByID(para?.invoiceId));
      navigate(
        `/client/dashboard/products/list/invoice/details/${para?.id}/${para?.invoiceId}`
      );
      setActive("INVOICE HISTORY")
    } else {
      navigate(
        `/client/dashboard/products/list/invoice/list/${para?.id}`
      );
      dispatch(getAllInvoiceHistory());
      setActive("INVOICE HISTORY")
    }
  }, []);

  const initVal = {
    preview: product?.base64Image,
    thumbnail: product?.thumbnail,
    status: product?.status,
    name: product?.name,
    description: product?.description,
    productLineItems: product?.productLineItems?.map((item) => ({
      ...item,
      isDeleted: item?.isDeleted || false,
    })),
    paymentType: product?.paymentType,
    registrationDate: moment(product?.registrationDate),
    nextDueDate: moment(product?.nextDueDate),
    terminationDate:
      product?.terminationDate?.split("-")[0] !== "0001"
        ? moment(product?.terminationDate)
        : null,
    billingCycle: product?.billingCycle,
  };
  return (
    <Formik
      initialValues={initVal}
      enableReinitialize
      onSubmit={async (values) => {
        const img = await createServerImage(values.thumbnail);
      }}
    >
      {({ values }) => {
        return (
          <div className="users">
            <div className="col p-[32px]">
              <>
                <Navigation
                  active={active}
                  links={links}
                />
                <Outlet />
              </>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};