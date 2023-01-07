import { getConfig } from 'lib';

const Articles = 'Articles';
const prefix = 'api/v1/client/categories';
const articlesConfig = (action) => getConfig({ module: Articles, action });

// Get Articles
export const getArticleCategoriesConfig = () => ({
  url: `${prefix}/search`,
  defaultData: {
    advancedSearch: {
      fields: [''],
      keyword: '',
    },
    keyword: '',
    pageNumber: 0,
    pageSize: 0,
    orderBy: [''],
    categoryType: 1,
  },
  config: articlesConfig('View'),
});

//parent Categories
export const getArticleCategoriesParentsConfig = () => ({
  url: `${prefix}/parents/search`,
  defaultData: {
    advancedSearch: {
      fields: [''],
      keyword: '',
    },
    keyword: '',
    pageNumber: 0,
    pageSize: 0,
    orderBy: [''],
    categoryType: 1,
  },
  config: articlesConfig('View'),
});

//child Categories
export const getArticleCategoriesChildConfig = (id) => ({
  url: `${prefix}/parents/${id}/childcatergories`,
  defaultData: {
    advancedSearch: {
      fields: [''],
      keyword: '',
    },
    keyword: '',
    pageNumber: 0,
    pageSize: 0,
    orderBy: [''],
    categoryType: 1,
  },
  config: articlesConfig('View'),
});

// Create Article Category
export const createArticleCategoryConfig = () => ({
  url: prefix,
  config: articlesConfig('Create'),
});

// Delete Article Category
export const deleteArticleCategoryConfig = (id) => ({
  url: `${prefix}/${id}`,
  config: articlesConfig('Remove'),
});

// Update Article Category
export const updateArticleCategoryConfig = (id) => ({
  url: `${prefix}/${id}`,
  // config: articlesConfig('Update'),
});

// Get Article Category By ID
export const getArticleCategoryByIDConfig = (id) => ({
  url: `${prefix}/${id}`,
  // config: articlesConfig('View'),
});
