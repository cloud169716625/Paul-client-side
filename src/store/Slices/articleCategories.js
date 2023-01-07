// getArticleCategoriesConfig

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  articleCategories: [],
  articleSubCategories: {},
  articleCategory: null,
  loading: false,
};

const articleCategories = createSlice({
  name: 'articleCategories',
  initialState,
  reducers: {
    setArticleCategoriesLoading: (state, { payload }) => {
      state.loading = payload;
    },
    getArticleCategories: (state, { payload }) => {
      state.articleCategories = payload;
    },
    setSubCategories: (state, { payload}) => {
      state.articleSubCategories[payload?.id] = payload?.data;
    },
    getArticleCategory: (state, { payload }) => {
      state.articleCategory = payload;
    },
  },
});

const { actions, reducer } = articleCategories;

export const {
  setArticleCategoriesLoading,
  getArticleCategories,
  getArticleCategory,
  setSubCategories,
} = actions;

export default reducer;
