import { getConfig } from './getConfig';

export const getLogsConfig = (pageNumber, pageSize) => ({
  url: "/api/v1/client/auditlogs/mine",
  defaultData: {
    advancedSearch: {
      fields: [""],
      keyword: "",
    },
    keyword: "",
    pageNumber: pageNumber,
    pageSize: pageSize,
    orderBy: ["dateTime"],
    OrderType: 0,
  },
  config: getConfig({ module: 'AuditLogs', action: 'View' }),
});

export const getLogsByUserIDConfig = (uid) => ({
  url: `/api/v1/client/auditlogs/user/${uid}`,
  defaultData: {
    advancedSearch: {
      fields: [""],
      keyword: "",
    },
    keyword: "",
    pageNumber: 0,
    pageSize: 0,
    orderBy: [""],
  },
  config: getConfig({ module: 'AuditLogs', action: 'View' }),
});

export const getUserLoginSessions = (userId) => ({
  url: `/api/userloginhistory/loginhistorybyuserid/${userId}`,
});
