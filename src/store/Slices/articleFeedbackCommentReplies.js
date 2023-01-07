import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  articlesFeedbackCommentReplies: [],
  articlesFeedbackCommentReply: null,
  loading: false,
};

const articlesFeedbackCommentRepliesSlice = createSlice({
  name: 'articlesFeedbackCommentReplies',
  initialState,
  reducers: {
    setArticlesFeedbackCommentRepliesLoading: (state, { payload }) => {
      state.loading = payload;
    },
    getArticleFeedbackCommentReplies: (state, { payload }) => {
      state.articles = payload;
    },
    getArticleFeedbackCommentReply: (state, { payload }) => {
      state.article = payload;
    },
  },
});

const { actions, reducer } = articlesFeedbackCommentRepliesSlice;

export const {
  setArticlesFeedbackCommentRepliesLoading,
  getArticleFeedbackCommentReplies,
  getArticleFeedbackCommentReply,
} = actions;

export default reducer;
