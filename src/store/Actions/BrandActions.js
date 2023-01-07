import { defaultTenant } from "lib/constants";
import {
  setBrandId as setBrandIdAction,
  getBrandPending,
  getBrandSuccess,
  getBrandFail,
} from "store/Slices/brandSlice";

export const setBrandId = (id) => {
  return (dispatch) => {
    dispatch(setBrandIdAction(id));
  };
};

export const getBrand = (id) => {
  return async (dispatch) => {
    getBrandPending();

    try {
      const url = `${process.env.REACT_APP_BASEURL}/api/identity/brand/${id}`;
      let res = await fetch(url, {
        headers: {
          "Content-type": "application/json",
          "gen-api-key": process.env.REACT_APP_GEN_APIKEY,
          tenant: defaultTenant,
        },
      });
      if (!res.ok) {
        dispatch(getBrandFail());
        return;
      }

      const { data } = await res.json();
      dispatch(getBrandSuccess({ id, ...data }));
    } catch (e) {
      dispatch(getBrandFail());
    }
  };
};
