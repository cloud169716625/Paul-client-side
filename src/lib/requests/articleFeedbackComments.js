import { getConfig } from 'lib';

const ArticleFeedbackComments = 'KnowledgeBase';

const prefix = '/api/articlefeedbackcomments';
const articleFeedbackCommentsConfig = (action) =>
  getConfig({ module: ArticleFeedbackComments, action });

// Get Articles Feedback Comments
export const getArticleFeedbackCommentsConfig = () => ({
  url: `${prefix}/search`,
  defaultData: {
    advancedSearch: {
      fields: '',
      keyword: '',
    },
    keyword: '',
    pageNumber: 0,
    pageSize: 0,
    orderBy: '',
  },
  // config: articleFeedbackCommentsConfig('View'),
});

// Create Article Feedback Comments
export const createarticleFeedbackCommentsConfig = () => ({
  url: prefix,
  // config: articleFeedbackCommentsConfig('Create'),
});

// Delete Article Feedback Comments
export const deletearticleFeedbackCommentsConfig = (id) => ({
  url: `${prefix}/${id}`,
  // config: articleFeedbackCommentsConfig('Remove'),
});

// Update Article Feedback Comments
export const updateArticleFeedbackCommentsConfig = (id) => ({
  url: `${prefix}/${id}`,
  // config: articleFeedbackCommentsConfig('Update'),
});

// Get Article Feedback Comments By ID
export const getArticleFeedbackCommentsByIDConfig = (id) => ({
  url: `${prefix}/${id}`,
  // config: articleFeedbackCommentsConfig('View'),
});
