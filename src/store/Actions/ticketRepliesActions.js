import {
  getError,
  axios,
  addTicketRepliesConfig,
  deleteTicketRepliesConfig,
} from "lib";
import { toast } from "react-toastify";
import { setTicketRepliesLoading } from "store/Slices";

// Add Replies
export const addTicketReplies = (data) => {
  return async (dispatch) => {
    dispatch(setTicketRepliesLoading(true));
    try {
      const { url, config } = addTicketRepliesConfig();
      const res = await axios.post(url, data, config);
      if (res.status === 200) {
        toast.success("Ticket Comments replies Added Successfully");
      }
    } catch (e) {
      toast.error(getError(e));
    } finally {
      dispatch(setTicketRepliesLoading(false));
    }
  };
};
// Delete Replies
export const deleteTicketReplies = (id) => {
  return async (dispatch) => {
    dispatch(setTicketRepliesLoading(true));
    try {
      const { url, config } = deleteTicketRepliesConfig(id);
      const res = await axios.delete(url, config);
      if (res.status === 200) {
        toast.success("Ticket reply deleted Successfully");
      }
    } catch (e) {
      toast.error(getError(e));
    } finally {
      dispatch(setTicketRepliesLoading(false));
    }
  };
};
