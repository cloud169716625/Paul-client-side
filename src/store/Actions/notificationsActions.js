import {   
    getNotificationConfig,
    axios } from "lib";
import {  getNotificationLists } from "store/Slices/dashboardSlice";

export const getNotificationsData = () => {
    return async (dispatch) => {
        const { url, defaultData, config } = getNotificationConfig();
        const res = await axios.post(url, defaultData, config)  
        dispatch(getNotificationLists(res.data.data));
    }
}



