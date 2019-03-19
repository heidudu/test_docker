import {actionTypes} from '../action/message';


const initialState = {
    success: false,
    messageData:'',

};

export const message = (state = initialState,action) => {
    switch (action.type){
        case actionTypes.MESSAGE_GET:
            return {...state,success:false};
        case actionTypes.MESSAGE_GET_SUCCESS:
            return {...state,success:true,messageData:action.messageData,};
        case actionTypes.MESSAGE_GET_FAIL:
            return {...state,success:false,messageData:'', };
        default:
            return state
    }

};