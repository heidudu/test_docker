import {actionTypes} from "../action/topic";

const initialState = {
    success:false,
    tab: 'all',
    page:1,
    limit:20,
    topics:[],
};

export const topics = (state = initialState,action) => {
    switch (action.type){
        case actionTypes.TOPIC_GET: //准备获取topic内容
            return {...state,success:false,tab:action.tab,page:action.page};
        case actionTypes.TOPIC_GET_SUCCESS: //获取成功
            return {...state,success:true,topics:action.topics};
        case actionTypes.TOPIC_GET_FAIL:
            return {...state,success:false,topics:[],tab:'all',page:1};
        default:
            return state
    }
};