export const actionTypes = {
    PUBLIC_ARTICLE_POST:'PUBLIC_ARTICLE_POST',
    PUBLIC_ARTICLE_POST_SUCCESS:'PUBLIC_ARTICLE_POST_SUCCESS',
    PUBLIC_ARTICLE_POST_FAIL:'PUBLIC_ARTICLE_POST_FAIL',
};

export const actions = {
    public_article_post:function (title,tab,content) {
        return{
            type:actionTypes.PUBLIC_ARTICLE_POST,
            title:title,
            tab:tab,
            content:content,
        }
    },
    public_article_post_success:function (data) {
        return{
            type:actionTypes.PUBLIC_ARTICLE_POST_SUCCESS,
            data:data,
        }
    },
    public_article_post_fail:function (article) {
        return{
            type:actionTypes.PUBLIC_ARTICLE_POST_FAIL,
        }
    }
};