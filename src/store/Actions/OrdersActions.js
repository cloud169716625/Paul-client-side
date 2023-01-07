import {
  getError,
  axios,
  getOrdersConfig,
  getOrdersByClientConfig,
  createOrderConfig,
  getOrderTemplatesConfig,
  createOrderTemplateConfig,
  editOrderTemplateConfig,
  getOrderConfig,
} from "lib";
import { toast } from "react-toastify";
import {
  getOrdersDispatch,
  getOrderTemplatesDispatch,
  setOrderLoading,
  getOrderTemplate,
} from "store/Slices";
import { getOrder } from "store/Slices/ordersSlice";

export const createOrder = ({ data }) => {
  return async (dispatch) => {
    dispatch(setOrderLoading(true));
    try {
      const { url, config } = createOrderConfig();
      const res = await axios.post(url, data, config);

      if (res?.status === 200) {
        const { url, defaultData, config } = getOrdersConfig();
        const res = await axios.post(url, defaultData, config);
        dispatch(getOrdersDispatch(res?.data?.data));
        toast.success("Order created successfully");
      }
      dispatch(setOrderLoading(false));
    } catch (e) {
      toast.error(getError(e));
      dispatch(setOrderLoading(false));
    } finally {
      dispatch(setOrderLoading(false));
    }
  };
};

export const editOrder = (id, data) => {
  return async (dispatch) => {
    dispatch(setOrderLoading(true));
    try {
      const { url, config } = getOrderConfig(id);
      const res = await axios.put(url, { ...data }, config);
      if (res?.status === 200) {
        dispatch(getOrders());
        toast.success("Order status updated successfully");
      }
      dispatch(setOrderLoading(false));
    } catch (e) {
      toast.error(getError(e));
      dispatch(setOrderLoading(false));
    } finally {
      dispatch(setOrderLoading(false));
    }
  };
};

// Get All Admin Orders
export const getOrders = (params) => {
  return async (dispatch) => {
    dispatch(setOrderLoading(true));
    try {
      const { url, defaultData, config } = getOrdersConfig();
      const res = await axios.post(url, defaultData, config);
      dispatch(getOrdersDispatch(res?.data?.data));
      dispatch(setOrderLoading(false));
    } catch (e) {
      toast.error(getError(e));
      dispatch(setOrderLoading(false));
    }
  };
};

// Get All Orders By Client
export const getOrdersByClient = ({ id }) => {
  return async (dispatch) => {
    dispatch(setOrderLoading(true));
    try {
      const { url, defaultData, config } = getOrdersByClientConfig({ id });
      const res = await axios.post(url, defaultData, config);
      dispatch(getOrdersDispatch(res?.data?.data));
      dispatch(setOrderLoading(false));
    } catch (e) {
      toast.error(getError(e));
      dispatch(setOrderLoading(false));
    }
  };
};

// Delete Order Template By ID
export const deleteOrderByID = (id) => {
  return async (dispatch) => {
    dispatch(setOrderLoading(true));

    try {
      const res = await axios.delete(`/api/v1/admin/orders/${id}`);
      if (res.status === 200) {
        dispatch(getOrders());
        toast.success("Order deleted successfully");
      }
      dispatch(setOrderLoading(false));
    } catch (e) {
      toast.error(getError(e));
      dispatch(setOrderLoading(false));
    } finally {
      dispatch(setOrderLoading(false));
    }
  };
};

// Get All Admin Orders
export const getOrderDetails = (params) => {
  return async (dispatch) => {
    dispatch(setOrderLoading(true));
    try {
      const { url } = getOrderConfig(params);
      const res = await axios.get(url);
      dispatch(getOrder(res?.data?.data));
      dispatch(setOrderLoading(false));
    } catch (e) {
      toast.error(getError(e));
      dispatch(setOrderLoading(false));
    }
  };
};

// Get All Order Templates
export const getOrderTemplates = () => {
  return async (dispatch) => {
    dispatch(setOrderLoading(true));
    try {
      const { url, defaultData, config } = getOrderTemplatesConfig();
      const res = await axios.post(url, defaultData, config);
      dispatch(getOrderTemplatesDispatch(res?.data?.data));
      dispatch(setOrderLoading(false));
    } catch (e) {
      toast.error(getError(e));
    } finally {
      dispatch(setOrderLoading(false));
    }
  };
};

// Create Order Template
export const createOrderTemplate = ({ data }) => {
  return async (dispatch) => {
    dispatch(setOrderLoading(true));
    try {
      const { url, config } = createOrderTemplateConfig();
      const res = await axios.post(url, data, config);
      if (res?.status === 200) {
        toast.success("Template created successfuly");
        const { url, defaultData, config } = getOrderTemplatesConfig();
        const res = await axios.post(url, defaultData, config);
        dispatch(getOrderTemplates(res?.data?.data));
      }
      dispatch(setOrderLoading(false));
    } catch (e) {
      toast.error(getError(e));
      dispatch(setOrderLoading(false));
    } finally {
      dispatch(setOrderLoading(false));
    }
  };
};

// Get Order Template By ID
export const getOrderTemplateByID = (id) => {
  return async (dispatch) => {
    dispatch(setOrderLoading(true));
    try {
      const res = await axios.get(`/api/v1/admin/ordertemplates/${id}`);
      dispatch(getOrderTemplate(res?.data?.data));
      dispatch(setOrderLoading(false));
    } catch (e) {
      toast.error(getError(e));
      dispatch(setOrderLoading(false));
    } finally {
      dispatch(setOrderLoading(false));
    }
  };
};

// Edit Order Template By ID
export const editOrderTemplateByID = (id, data) => {
  return async (dispatch) => {
    dispatch(setOrderLoading(true));
    try {
      const res = await axios.put(`/api/v1/admin/ordertemplates/${id}`, data);
      toast.success("Changes saved successfully");
      if (res?.status === 200) {
        const { url, defaultData, config } = getOrderTemplatesConfig();
        const res = await axios.post(url, defaultData, config);
        dispatch(getOrderTemplatesDispatch(res?.data?.data));
      }
      dispatch(setOrderLoading(false));
    } catch (e) {
      toast.error(getError(e));
      dispatch(setOrderLoading(false));
    } finally {
      dispatch(setOrderLoading(false));
    }
  };
};

// Delete Order Template By ID
export const deleteOrderTemplateByID = (id) => {
  return async (dispatch) => {
    dispatch(setOrderLoading(true));
    try {
      const res = await axios.delete(`/api/v1/admin/ordertemplates/${id}`);
      if (res?.status === 200) {
        const { url, defaultData, config } = getOrderTemplatesConfig();
        const res = await axios.post(url, defaultData, config);
        dispatch(getOrderTemplatesDispatch(res?.data?.data));
      }
      dispatch(setOrderLoading(false));
    } catch (e) {
      toast.error(getError(e));
      dispatch(setOrderLoading(false));
    } finally {
      dispatch(setOrderLoading(false));
    }
  };
};

// Edit Order Template
export const editOrderTemplate = ({ data }) => {
  return async (dispatch) => {
    dispatch(setOrderLoading(true));
    try {
      const { url, config } = editOrderTemplateConfig({ id: data?.id });
      const res = await axios.put(url, data, config);
      if (res?.status === 200) {
        const { url, defaultData, config } = getOrderTemplatesConfig();
        const res = await axios.post(url, defaultData, config);
        dispatch(getOrderTemplates(res?.data?.data));
      }
      dispatch(setOrderLoading(false));
    } catch (e) {
      toast.error(getError(e));
      dispatch(setOrderLoading(false));
    } finally {
      dispatch(setOrderLoading(false));
    }
  };
};
