import { axios, getError } from 'lib';
import {
  createarticleFeedbackCommentsConfig,
  deletearticleFeedbackCommentsConfig,
  getArticleFeedbackCommentsByIDConfig,
  updateArticleFeedbackCommentsConfig,
  getArticleFeedbackCommentsConfig,
} from 'lib/requests/articleFeedbackComments';

import { toast } from 'react-toastify';
import {
  setArticlesFeedbackCommentsLoading,
  getArticleFeedbackComments,
  getArticleFeedbackComment,
} from 'store/Slices';

// Get All Articles Feedback Comment
export const getAllArticleFeedbackComments = () => {
  return async (dispatch) => {
    dispatch(setArticlesFeedbackCommentsLoading(true));
    try {
      const { url, defaultData, config } = getArticleFeedbackCommentsConfig();
      const res = await axios.post(url, defaultData, config);
      dispatch(getArticleFeedbackComment(res?.data?.data));
    } catch (e) {
      toast.error(getError(e));
    } finally {
      dispatch(setArticlesFeedbackCommentsLoading(false));
    }
  };
};

// Create an Article Feedback Comment
export const createArticleFeedbackComment = (data) => {
  return async (dispatch) => {
    dispatch(setArticlesFeedbackCommentsLoading(true));
    try {
      const { url, config } = createarticleFeedbackCommentsConfig();
      const res = await axios.post(url, data, config);
      // if (res?.status === 200) {
      //   const { url, defaultData, config } = getArticleFeedbackComments();
      //   const res = await axios.post(url, defaultData, config);
      //   dispatch(getArticleFeedbackComment(res?.data?.data));
      // }
    } catch (e) {
      toast.error(getError(e));
    }
  };
};

// View an Article Feedback Comment By Id
export const getArticleFeedbackCommentByID = (id) => {
  return async (dispatch) => {
    dispatch(setArticlesFeedbackCommentsLoading(true));
    try {
      const { url, config } = getArticleFeedbackCommentsByIDConfig(id);
      const res = await axios.get(url, config);
      dispatch(getArticleFeedbackComment(res?.data?.data));
    } catch (e) {
      toast.error(getError(e));
    } finally {
      dispatch(setArticlesFeedbackCommentsLoading(false));
    }
  };
};

// Update an Article Feedback Comment
export const updateArticleFeedbackComment = ({ id, data }) => {
  return async (dispatch) => {
    dispatch(setArticlesFeedbackCommentsLoading(true));
    try {
      const { url, config } = updateArticleFeedbackCommentsConfig(id);
      const res = await axios.put(url, data, config);
      if (res.status === 200) {
        const { url, config } = getArticleFeedbackCommentsConfig();
        const res = await axios.get(url, config);
        dispatch(updateArticleFeedbackCommentsConfig(res?.data?.data));
        toast.success('Article Feedback Comment updated successfully');
      }
    } catch (e) {
      toast.error(getError(e));
    } finally {
      dispatch(setArticlesFeedbackCommentsLoading(false));
    }
  };
};

// Delete an Article Feedback Comment
export const deleteArticleComment = ({ id }) => {
  return async (dispatch) => {
    dispatch(setArticlesFeedbackCommentsLoading(true));
    try {
      const { url, config } = deletearticleFeedbackCommentsConfig(id);
      const res = await axios.delete(url, config);
      if (res.status === 200) {
        const { url, config } = getArticleFeedbackCommentsConfig();
        const res = await axios.get(url, config);
        dispatch(updateArticleFeedbackCommentsConfig(res?.data?.data));
        toast.success('Article Feedback Comment deleted successfully');
      }
    } catch (e) {
      toast.error(getError(e));
    } finally {
      dispatch(setArticlesFeedbackCommentsLoading(false));
    }
  };
};
