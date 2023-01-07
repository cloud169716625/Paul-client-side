import {
  getError,
  axios,
  getTicketsConfig,
  getTicketConfig,
  editTicketConfig,
  createTicketConfig,
  getTicketsByClintIDConfig,
  getAssignedTicketsByIDConfig,
  getTicketsByDepartmentIdConfig,
  getTicketHistoryByIDConfig,
  getLoggedInUserAssignTicketsConfig,
} from "lib";
import { toast } from "react-toastify";
import {
  getTicketsDispatch,
  setTicketLoading,
  getTicket,
  getDepartmentTickets,
  setTicketCommentLoading,
  getAllTickets,
  setDetailsLoading,
  getTicketHistory,
} from "store/Slices";
import { getDataCounts } from "./count";

// Get All Ticket
export const getTickets = (params = [], isInterval) => {
  return async (dispatch) => {
    !isInterval && dispatch(setTicketLoading(true));
    try {
      const { url, defaultData, config } = getTicketsConfig();
      const res = await axios.post(url, defaultData, config);
      dispatch(getAllTickets(res?.data?.data));
      !isInterval && dispatch(setTicketLoading(false));
      dispatch(getDataCounts());
      // console.log("ticket list res", res);
    } catch (e) {
      toast.error(getError(e));
      !isInterval && dispatch(setTicketLoading(false));
      // console.log(e);
    }
  };
};

// Get All Assigned Tickets
export const getLoggedInUserAssignTickets = () => {
  return async (dispatch) => {
    dispatch(setTicketLoading(true));
    try {
      const { url, config } = getLoggedInUserAssignTicketsConfig();
      const res = await axios.get(url, config);
      dispatch(getAllTickets(res?.data?.data));
      dispatch(setTicketLoading(false));
      dispatch(getDataCounts());
    } catch (e) {
      toast.error(getError(e));
      dispatch(setTicketLoading(false));
    }
  };
};

// Get Ticket By ID
export const getTicketById = (id, noLoading) => {
  return async (dispatch) => {
    if (id) {
      if (!noLoading) {
        dispatch(setDetailsLoading(true));
      }
      try {
        const { url, config } = getTicketConfig(id);
        const res = await axios.get(url, config);
        dispatch(getTicket(res?.data?.data));
        dispatch(getTicketHistoryByID(id));
        dispatch(setDetailsLoading(false));
      } catch (e) {
        toast.error(getError(e));
        dispatch(getTicket(null));
        dispatch(setDetailsLoading(false));
      }
    }
  };
};

// Get Ticket History By ID
export const getTicketHistoryByID = (id) => {
  return async (dispatch) => {
    if (id) {
      try {
        const { url, config } = getTicketHistoryByIDConfig({ id });
        const res = await axios.get(url, config);
        dispatch(getTicketHistory(res?.data?.data));
      } catch (e) {
        toast.error(getError(e));
      }
    }
  };
};

export const getTicketsByClientID = ({ id }) => {
  return async (dispatch) => {
    if (id) {
      dispatch(setTicketLoading(true));
      try {
        const { url, config } = getTicketsByClintIDConfig({ id });
        const res = await axios.get(url, config);
        dispatch(getTicketsDispatch(res?.data?.data));
      } catch (e) {
        toast.error(getError(e));
        dispatch(getTicketsDispatch([]));
      } finally {
        dispatch(setTicketLoading(false));
      }
    }
  };
};

export const getTicketsByAdminID = ({ id }) => {
  return async (dispatch) => {
    if (id) {
      dispatch(setTicketLoading(true));
      try {
        const { url, defaultData, config } = getAssignedTicketsByIDConfig({
          id,
        });
        const res = await axios.post(url, defaultData, config);
        dispatch(getTicketsDispatch(res?.data?.data));
      } catch (e) {
        toast.error(getError(e));
        dispatch(getTicketsDispatch([]));
      } finally {
        dispatch(setTicketLoading(false));
      }
    }
  };
};
// getTicketsByDepartmentId
export const getTicketsByDepartmentId = ({ id }) => {
  return async (dispatch, getState) => {
    if (id) {
      dispatch(setTicketLoading(true));
      // console.log("here, fetching tickets", id);
      try {
        const { url, defaultData, config } = getTicketsByDepartmentIdConfig({
          id,
        });
        const res = await axios.post(url, defaultData, config);
        const tickets = res?.data?.data;
        // const usersTickets = tickets?.filter(
        //   (ticket) => ticket?.assignedTo === getState()?.auth?.user?.id
        // );
        // console.log(getState()?.auth);
        dispatch(getDepartmentTickets(tickets));
        // console.log("dept tickets", res);
        dispatch(setTicketLoading(false));
      } catch (e) {
        toast.error(getError(e));
        // console.log("dept err", e);
        dispatch(getDepartmentTickets([]));
      } finally {
        dispatch(setTicketLoading(false));
      }
    }
  };
};

export const editTicket = ({ data }) => {
  return async (dispatch) => {
    dispatch(setTicketCommentLoading(true));
    dispatch(setTicketLoading(true));
    try {
      const { url, config } = editTicketConfig({ id: data?.id });
      const response = await axios.put(url, data, config);
      dispatch(getTickets());
      if (response?.status === 200) {
        toast.success("Ticket Updated Successfully");
        // dispatch(getTickets());
        dispatch(getTicketsByAdminID(data?.assignedTo));
        dispatch(getTicketHistoryByID(data?.id));
      }
    } catch (error) {
      toast.error(getError(error));
    } finally {
      dispatch(setTicketCommentLoading(false));
      dispatch(setTicketLoading(false));
    }
  };
};

export const createTicket = ({ data }) => {
  return async (dispatch) => {
    dispatch(setTicketLoading(true));
    try {
      const { url, config } = createTicketConfig();
      const response = await axios.post(url, data, config);
      if (response.status === 200) {
        toast.success("Ticket Created Successfully!");
        dispatch(getTickets());
      }
    } catch (error) {
      toast.error(getError(error));
    } finally {
      dispatch(setTicketLoading(false));
    }
  };
};

// Delete Ticket by ID
export const deleteTicket = (id) => {
  return async (dispatch) => {
    if (id) {
      dispatch(setTicketLoading(true));
      try {
        const { url } = getTicketConfig(id);
        const res = await axios.delete(url);
        if (res?.status === 200) {
          toast.success("Ticket deleted Successfully");
          dispatch(getTickets());
          dispatch(setTicketLoading(false));
        }
      } catch (e) {
        dispatch(setTicketLoading(false));
        toast.error(getError(e));
      }
    }
  };
};
