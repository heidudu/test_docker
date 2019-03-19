export const actionTypes = {
    ARTICLE_GET:'ARTICLE_GET',
    ARTICLE_GET_SUCCESS:'ARTICLE_GET_SUCCESS',
    ARTICLE_GET_FAIL:'ARTICLE_GET_FAIL',
    REPLY_POST:'REPLY_POST',
    REPLY_POST_SUCCESS:'REPLY_POST_SUCCESS',
    REPLY_POST_FAIL:'ARTICLE_POST_FAIL',
    UP_POST:'UP_POST',
    UP_POST_SUCCESS:'UP_POST_SUCCESS',
    UP_POST_FAIL:'UP_POST_FAIL',
    COLLECT_POST:'COLLECT_POST',
    COLLECT_POST_SUCCESS:'COLLECT_POST_SUCCESS',
    COLLECT_POST_FAIL:'COLLECT_POST_FAIL',
    DELETE_POST:'DELETE_POST',
    DELETE_POST_SUCCESS:'DELETE_POST_SUCCESS',
    DELETE_POST_FAIL:'DELETE_POST_FAIL',

};



export const actions = {
    article_get:function (id,mdrender) {
        return{
            type:actionTypes.ARTICLE_GET,
            id:id,
            mdrender:mdrender
        }
    },
    article_get_success:function (article) {
        return{
            type:actionTypes.ARTICLE_GET_SUCCESS,
            article:article,
        }
    },
    reply_post:function (content,replyId,replyArticleId) {
        return{
            type:actionTypes.REPLY_POST,
            content:content,
            replyId:replyId,
            replyArticleId:replyArticleId
        }
    },
    reply_post_success:function (data) {
        return{
            type:actionTypes.REPLY_POST_SUCCESS,
            data:data,
        }
    },
    reply_post_fail:function () {
        return{
            type:actionTypes.REPLY_POST_FAIL,
        }
    },

    up_post:function (upId) {
        return{
            type:actionTypes.UP_POST,
            upId:upId,
        }
    },
    up_post_success:function (data) {
        return{
            type:actionTypes.UP_POST_SUCCESS,
            data:data,
        }
    },
    up_post_fail:function () {
        return{
            type:actionTypes.UP_POST_FAIL,
        }
    },
    collect_post:function (collectType,collectId) {
        return{
            type:actionTypes.COLLECT_POST,
            collectId:collectId,
            collectType:collectType
        }
    },
    collect_post_success:function () {
        return{
            type:actionTypes.COLLECT_POST_SUCCESS,
        }
    },
    collect_post_fail:function () {
        return{
            type:actionTypes.COLLECT_POST_FAIL
        }
    },
    delete_post:function (deleteId) {
        return{
            type:actionTypes.DELETE_POST,
            deleteId:deleteId,
        }
    },
    delete_post_success:function () {
        return{
            type:actionTypes.DELETE_POST_SUCCESS,
        }
    },
    delete_post_fail:function () {
        return{
            type:actionTypes.DELETE_POST_FAIL
        }
    },

};