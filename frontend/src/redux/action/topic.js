export const actionTypes = {
    TOPIC_GET:'TOPIC_GET',
    TOPIC_GET_SUCCESS:'TOPIC_GET_SUCCESS',
    TOPIC_GET_FAIL:'TOPIC_GET_FAIL',
};

export const actions = {
    topic_get:function (tab,page) {
        return{
            type:actionTypes.TOPIC_GET,
            tab:tab,
            page:page,
        }
    },
    topic_get_success:function (topics) {
        return{
            type:actionTypes.TOPIC_GET_SUCCESS,
            topics:topics,
        }
    },
    topic_get_fail:function (err) {
        return{
            type:actionTypes.TOPIC_GET_FAIL,

        }

    }

};