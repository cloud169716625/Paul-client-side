import { getConfig } from 'lib';
const ticketCommentsConfig = (action) =>
  getConfig({ module: 'Tickets', action });

const prefix = `/api/ticketcomments`;

export const getTicketCommentsConfig = () => ({
  url: `${prefix}/search`,
  defaultData: {
    advancedSearch: {
      fields: [],
      keyword: '',
    },
    keyword: '',
    pageNumber: 0,
    pageSize: 0,
    orderBy: [''],
  },
  config: ticketCommentsConfig('View'),
});

export const addTicketCommentConfig = () => ({
  url: `${prefix}`,
  config: ticketCommentsConfig('Create'),
});
