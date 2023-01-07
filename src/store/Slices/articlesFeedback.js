import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  articlesFeedbacks: [],
  articlesFeedback: null,
  loading: false,
  hasFeedback: false,
};

const articlesFeedbackSlice = createSlice({
  name: 'articlesFeedback',
  initialState,
  reducers: {
    setArticlesFeedbackLoading: (state, { payload }) => {
      state.loading = payload;
    },
    getArticleFeedbacks: (state, { payload }) => {
      state.articlesFeedbacks = payload;
      console.log('payload', payload);
      if (payload?.length > 0) {
        state.hasFeedback = true;
      }
      if (payload?.length === 0) {
        state.hasFeedback = false;
      }
    },
    getArticleFeedback: (state, { payload }) => {
      state.articlesFeedback = payload;
    },
  },
});

const { actions, reducer } = articlesFeedbackSlice;

export const {
  setArticlesFeedbackLoading,
  getArticleFeedbacks,
  getArticleFeedback,
} = actions;

export default reducer;
