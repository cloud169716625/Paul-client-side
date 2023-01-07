import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  articles: [],
  article: null,
  loading: false,
  recentArticles: [],
  searchResults: [],
  searchLoading: false,
  submissions: [],
  submissionsLoading: false,
};

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setArticlesLoading: (state, { payload }) => {
      state.loading = payload;
    },
    getArticles: (state, { payload }) => {
      state.articles = payload;
    },
    getArticle: (state, { payload }) => {
      state.article = payload;
    },
    getRecentArticles: (state, { payload }) => {
      state.recentArticles = payload;
    },
    getSearchResults: (state, { payload }) => {
      state.searchResults = payload;
    },
    setSearchLoading: (state, { payload }) => {
      state.searchLoading = payload;
    },
    getSubmissions: (state, { payload }) => {
      state.submissions = payload;
    },
    setSubmissionsLoading: (state, { payload }) => {
      state.submissionsLoading = payload;
    },
  },
});

const { actions, reducer } = articlesSlice;

export const {
  setArticlesLoading,
  getArticles,
  getArticle,
  getRecentArticles,
  getSearchResults,
  setSearchLoading,
  getSubmissions,
  setSubmissionsLoading,
} = actions;

export default reducer;
