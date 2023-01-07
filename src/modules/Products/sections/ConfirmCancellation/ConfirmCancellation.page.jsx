import { useQuery } from "pages/sign-in/SignInByToken.page";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {confirmCancelRequest} from "store/Actions/products"
import {useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux"
import React from "react";
import { Spin } from "antd"; 

export function ConfirmCancellation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const query = useQuery();
  const token = query.get("token");
  const { loading } = useSelector((state) => state.products);

  React.useEffect(() => {
    confirmCancel();
  }, []);

  async function confirmCancel() {
    await dispatch(confirmCancelRequest(id, token));
    navigate("/client/dashboard/products");
  }
    

  return (
    <div style={
      {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }
    }>
      <Spin spinning={loading} 
      tip="Confirming Cancellation..."
      />
    </div>
  );
}