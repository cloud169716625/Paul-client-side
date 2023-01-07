import { getConfig } from 'lib';

const ArticleFeedbackCR = 'Articles';

const prefix = '/api/articlefeedbackcommentreplies';
const articleFeedbackCRC = (action) =>
  getConfig({ module: ArticleFeedbackCR, action });

// Create Article Feedback Comments Replies
export const createarticleFCReplyConfig = () => ({
  url: prefix,
  config: articleFeedbackCRC('Create'),
});

// Delete Article Feedback Comments Replies
export const deletearticleFCReplyConfig = (id) => ({
  url: `${prefix}/${id}`,
  config: articleFeedbackCRC('Remove'),
});

// Update Article Feedback Comments Replies
export const updateArticleFCReplyConfig = (id) => ({
  url: `${prefix}/${id}`,
  config: articleFeedbackCRC('Update'),
});

// Get Article Feedback Comments Replies By ID
export const getArticleFCReplyByIDConfig = (id) => ({
  url: `${prefix}/${id}`,
  config: articleFeedbackCRC('View'),
});
