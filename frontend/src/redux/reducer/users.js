import {actionTypes} from '../action/users';


const initialState = {
    success: false,
    accessToken:"",
    loginName:"",
    avatarUrl:"",
    messageCountSuccess:false,
    messageCountData:'',
};

export const users = (state = initialState,action) => {
    switch (action.type){
        case actionTypes.USER_LOGIN://准备登录
            return {...state,success:false,accessToken:action.data};
        case actionTypes.USER_LOGIN_SUCCESS: //登陆成功
            return {...state,loginName:action.loginName,success:true,avatarUrl:action.avatarUrl};
        case actionTypes.USER_LOGIN_FAIL: //登录失败
            return {...state};
        case actionTypes.USER_LOGOUT: //登出
            return {...state,success:false,accessToken:'',loginName:'',avatarUrl:''};
        case actionTypes.MESSAGE_COUNT_GET:
            return {...state,messageCountSuccess:false};
        case actionTypes.MESSAGE_COUNT_GET_SUCCESS:
            return {...state,messageCountSuccess:true,messageCountData:action.messageCountData};
        case actionTypes.MESSAGE_COUNT_GET_FAIL:
            return {...state,messageCountSuccess:false,messageCountData:''};
        default:
            return state
    }
};