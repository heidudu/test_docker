
export const actionTypes = {
    USER_LOGIN:'USER_LOGIN',
    USER_LOGIN_SUCCESS:'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAIL:'USER_LOGIN_FAIL',
    USER_LOGOUT:'USER_LOGOUT',
    MESSAGE_COUNT_GET:'MESSAGE_COUNT_GET',
    MESSAGE_COUNT_GET_SUCCESS:'MESSAGE_COUNT_GET_SUCCESS',
    MESSAGE_COUNT_GET_FAIL:'MESSAGE_COUNT_GET_FAIL',
};


export const actions = {
    user_login:function (accessToken) {
        return{
            type:actionTypes.USER_LOGIN,
            data:accessToken
        }
    },
    user_login_success:function (loginName,accessToken,avatarUrl) {
        return{
            type:actionTypes.USER_LOGIN_SUCCESS,
            loginName:loginName,
            accessToken:accessToken,
            avatarUrl:avatarUrl,
        }
    },
    user_login_fail:function () {
        return {
            type:actionTypes.USER_LOGIN_FAIL,
        }
    },
    user_logout:function () {
        return {
            type:actionTypes.USER_LOGOUT,
        }
    },
    message_count_get:function (accessToken) {
        return{
            type:actionTypes.MESSAGE_COUNT_GET,
            data:accessToken
        }
    },
    message_count_get_success:function (messageCountData) {
        return{
            type:actionTypes.MESSAGE_COUNT_GET_SUCCESS,
            messageCountData:messageCountData,
        }
    },
    message_count_get_fail:function () {
        return {
            type:actionTypes.MESSAGE_COUNT_GET_FAIL,
        }
    },
}