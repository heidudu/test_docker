export const actionTypes = {
    UPDATE_ARTICLE_POST:'UPDATE_ARTICLE_POST',
    UPDATE_ARTICLE_POST_SUCCESS:'UPDATE_ARTICLE_POST_SUCCESS',
    UPDATE_ARTICLE_POST_FAIL:'UPDATE_ARTICLE_POST_FAIL',
};

export const actions = {
    update_article_post:function (title,tab,content,updateId) {
        return{
            type:actionTypes.UPDATE_ARTICLE_POST,
            title:title,
            tab:tab,
            content:content,
            updateId:updateId
        }
    },
   update_article_post_success:function (data) {
        return{
            type:actionTypes.UPDATE_ARTICLE_POST_SUCCESS,
            data:data,
        }
    },
   update_article_post_fail:function () {
        return{
            type:actionTypes.UPDATE_ARTICLE_POST_FAIL,
        }
   }
};