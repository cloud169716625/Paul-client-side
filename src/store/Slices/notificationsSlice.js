import { createSlice } from "@reduxjs/toolkit";

const initialState = {    
    notificationLists:[]    
}

const notificationsSlice = createSlice({
    name:'notifications',
    initialState,
    reducers:{        
        getNotificationLists: (state, {payload}) => {
            state.notificationLists = payload;
        }
    }
})

const {reducer, actions} = notificationsSlice;

export const { getNotificationLists } = actions;

export default reducer;

