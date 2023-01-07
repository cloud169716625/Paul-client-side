import { getConfig } from "lib";
const ticketCommentRepliesConfig = (action) =>
  getConfig({ module: "Tickets", action });

const prefix = `/api/ticketcommentreplies`;

export const addTicketRepliesConfig = () => ({
  url: `${prefix}/create`,
  config: ticketCommentRepliesConfig('Create'),
});
export const deleteTicketRepliesConfig = (id) => ({
  url: `${prefix}/${id}`,
  config: ticketCommentRepliesConfig('Delete'),
});
