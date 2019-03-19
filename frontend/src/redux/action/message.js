
export const actionTypes = {
    MESSAGE_GET:'MESSAGE_GET',
    MESSAGE_GET_SUCCESS:'MESSAGE_GET_SUCCESS',
    MESSAGE_GET_FAIL:'MESSAGE_GET_FAIL',

};


export const actions = {
    message_get:function (accessToken) {
        return{
            type:actionTypes.MESSAGE_GET,
        }
    },
    message_get_success:function (messageData) {
        return{
            type:actionTypes.MESSAGE_GET_SUCCESS,
            messageData:messageData
        }
    },
    message_get_fail:function () {
        return {
            type:actionTypes.MESSAGE_GET_FAIL,
        }
    },

}