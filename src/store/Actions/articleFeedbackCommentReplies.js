import { axios, getError } from 'lib';
import {
  createarticleFCReplyConfig,
  deletearticleFCReplyConfig,
  getArticleFCReplyByIDConfig,
  updateArticleFCReplyConfig,
} from 'lib/requests/articleFeedbackCommentReplies';

import { toast } from 'react-toastify';
import {
  setArticlesFeedbackCommentRepliesLoading,
  getArticleFeedbackCommentReplies,
  getArticleFeedbackCommentReply,
} from 'store/Slices';

// Create an Article Feedback Comment Reply
export const createArticleFeedbackCommentReply = (data) => {
  return async (dispatch) => {
    dispatch(setArticlesFeedbackCommentRepliesLoading(true));
    try {
      const { url, config } = createarticleFCReplyConfig();
      const res = await axios.post(url, data, config);
      if (res?.status === 200) {
        // const { url, defaultData, config } = getArticleFeedbackCommentReplies();
        // const res = await axios.post(url, defaultData, config);
        // dispatch(getArticleFeedbackCommentReply(res?.data?.data));
      }
    } catch (e) {
      toast.error(getError(e));
    }
  };
};

// View an Article Feedback Comment Reply By Id
export const getArticleFeedbackCommentReplyByID = (id) => {
  return async (dispatch) => {
    dispatch(setArticlesFeedbackCommentRepliesLoading(true));
    try {
      const { url, config } = getArticleFCReplyByIDConfig(id);
      const res = await axios.get(url, config);
      dispatch(getArticleFeedbackCommentReply(res?.data?.data));
    } catch (e) {
      toast.error(getError(e));
    } finally {
      dispatch(setArticlesFeedbackCommentRepliesLoading(false));
    }
  };
};

// Update an Article Feedback Comment Reply
export const updateArticleFeedbackCommentReply = ({ id, data }) => {
  return async (dispatch) => {
    dispatch(setArticlesFeedbackCommentRepliesLoading(true));
    try {
      const { url, config } = updateArticleFCReplyConfig(id);
      const res = await axios.put(url, data, config);
      if (res.status === 200) {
        const { url, config } = getArticleFCReplyByIDConfig(id);
        const res = await axios.get(url, config);
        dispatch(updateArticleFCReplyConfig(res?.data?.data));
        toast.success('Article Feedback Comment Reply updated successfully');
      }
    } catch (e) {
      toast.error(getError(e));
    } finally {
      dispatch(setArticlesFeedbackCommentRepliesLoading(false));
    }
  };
};

// Delete an Article Feedback Comment Reply
export const deleteArticleCommentReply = ({ id }) => {
  return async (dispatch) => {
    dispatch(setArticlesFeedbackCommentRepliesLoading(true));
    try {
      const { url, config } = deletearticleFCReplyConfig(id);
      const res = await axios.delete(url, config);
      if (res.status === 200) {
        const { url, config } = getArticleFCReplyByIDConfig(id);
        const res = await axios.get(url, config);
        dispatch(updateArticleFCReplyConfig(res?.data?.data));
        toast.success('Article Feedback Comment Reply deleted successfully');
      }
    } catch (e) {
      toast.error(getError(e));
    } finally {
      dispatch(setArticlesFeedbackCommentRepliesLoading(false));
    }
  };
};
