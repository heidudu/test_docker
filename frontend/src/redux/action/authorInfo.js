
export const actionTypes = {
    AUTHOR_GET: 'AUTHOR_GET',
    AUTHOR_GET_SUCCESS: 'AUTHOR_GET_SUCCESS',
    AUTHOR_GET_FAIL: 'AUTHOR_GET_FAIL',
    COLLECT_GET:'COLLECT_GET',
    COLLECT_GET_SUCCESS:'COLLECT_GET_SUCCESS',
    COLLECT_GET_FAIL:'COLLECT_GET_FAIL',
};


export const actions = {
    author_get: function (authorName) {
        return {
            type: actionTypes.AUTHOR_GET,
            authorName: authorName
        }
    },
    author_get_success: function (info) {
        return {
            type: actionTypes.AUTHOR_GET_SUCCESS,
            info:info,

        }
    },
    author_get_fail: function () {
        return {
            type: actionTypes.AUTHOR_GET_FAIL,

        }
    },
    collect_get: function (collectName) {
        return {
            type: actionTypes.COLLECT_GET,
            collectName: collectName
        }
    },
    collect_get_success: function (collectTopics) {
        return {
            type: actionTypes.COLLECT_GET_SUCCESS,
            collectTopics:collectTopics,

        }
    },
    collect_get_fail: function () {
        return {
            type: actionTypes.COLLECT_GET_FAIL,

        }
    },

};