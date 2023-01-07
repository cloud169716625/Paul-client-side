import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  articlesFeedbackComments: [],
  articlesFeedbackComment: null,
  loading: false,
};

const articlesFeedbackCommentsSlice = createSlice({
  name: 'articlesFeedbackComments',
  initialState,
  reducers: {
    setArticlesFeedbackCommentsLoading: (state, { payload }) => {
      state.loading = payload;
    },
    getArticleFeedbackComments: (state, { payload }) => {
      state.articles = payload;
    },
    getArticleFeedbackComment: (state, { payload }) => {
      state.article = payload;
    },
  },
});

const { actions, reducer } = articlesFeedbackCommentsSlice;

export const {
  setArticlesFeedbackCommentsLoading,
  getArticleFeedbackComments,
  getArticleFeedbackComment,
} = actions;

export default reducer;
