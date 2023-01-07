import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/authSlice';
import billsReducer from "./Slices/billsSlice";
import brandReducer from "./Slices/brandSlice";
import regReducer from './Slices/userRegistrationSlice';
import settingReducer from './Slices/settingSlice';
import logsReducer from "./Slices/logsSlice";
import moduleReducer from "./Slices/moduleSlice";
import departmentReducer from "./Slices/departmentsSlice";
import userReducer from "./Slices/usersSlice";
import apiKeysReducer from './Slices/apiKeysSlice';
import subUsersReducer from './Slices/subUsersSlice';
import appSettingsReducer from './Slices/appSettings';
import productsReducer from './Slices/productsSlice';
import countReducer from './Slices/dataCountSlice';
import articlesReducer from './Slices/articles';
import articlesFeedbackReducer from './Slices/articlesFeedback';
import getArticleFeedbackCommentsReducer from './Slices/articleFeedbackComments';
import articleCategoriesReducer from './Slices/articleCategories';
import ticketsReducer from './Slices/ticketsSlice';
import ticketCommentsReducer from './Slices/ticketCommentsSlice';
import ticketRepliesReducer from './Slices/ticketRepliesSlice';
import dashboardRedcuer from './Slices/dashboardSlice';
import invoiceReducer from './Slices/invoiceSlices';

const store = configureStore({
  reducer: {
    auth: authReducer,
    bills: billsReducer,
    brand: brandReducer,
    reg: regReducer,
    settings: settingReducer,
    logs: logsReducer,
    modules: moduleReducer,
    departments: departmentReducer,
    users: userReducer,
    apiKeys: apiKeysReducer,
    subUsers: subUsersReducer,
    appSettings: appSettingsReducer,
    products: productsReducer,
    count: countReducer,
    articles: articlesReducer,
    articlesFeedback: articlesFeedbackReducer,
    articlesFeedbackComments: getArticleFeedbackCommentsReducer,
    articleCategories: articleCategoriesReducer,
    tickets: ticketsReducer,
    ticketComments: ticketCommentsReducer,
    ticketReplies: ticketRepliesReducer,
    dashboard: dashboardRedcuer,
    invoice: invoiceReducer,
  },
});

export const messageNotifications = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export * from "./Actions";
export * from './Slices';

export default store;
