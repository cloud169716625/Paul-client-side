import {
    getDashboardConfig,
    getNotificationConfig,
    axios } from "lib";
import {  getMultiData, getNotificationLists } from "store/Slices/dashboardSlice";

export const getDashboardMultiData = () =>{
    return async (dispatch) =>{
        const {url, config} = getDashboardConfig();
        const res = await axios.get(url,config);
        dispatch(getMultiData(res.data.data));
    }
}
export const getNotificationsData = () => {
    return async (dispatch) => {
        const {url , defaultData,config} = getNotificationConfig();
        const res = await axios.post(url, defaultData, config)  
        dispatch(getNotificationLists(res.data.data));
    }
}



