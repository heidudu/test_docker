import {actionTypes} from "../action/article";

const initialState = {
    id:'',
    article:{},
    mdrender:'',
    success:false,
    author:{},
    replyContent:'',
    replyId:'',
    replySuccess:false,
    replyData:'',
    replyArticleId:'',
    upSuccess:false,
    upId:'',
    upData:'',
    collectId:'',
    collectType:'',
    collectSuccess:'',
    deleteSuccess:false,
    deleteId:'',





};

export const article = (state = initialState,action) => {
    switch (action.type){
        case actionTypes.ARTICLE_GET:
            return {...state,id:action.id,success:false,mdrender:action.mdrender};
        case actionTypes.ARTICLE_GET_SUCCESS:
            return {...state,article:action.article,success:true,author:action.article.author};
        case actionTypes.TOPIC_GET_FAIL:
            return {...state,success:false,id:'',article:{},author:{},mdrender:''};
        case actionTypes.REPLY_POST:
            return {...state,replyId:action.replyId,replyContent:action.content,replySuccess:false,replyArticleId:action.replyArticleId};
        case actionTypes.REPLY_POST_SUCCESS:
            return {...state,replyData:action.data,replySuccess:true};
        case actionTypes.REPLY_POST_FAIL:
            return {...state,replySuccess:false,replyId:'',replyData:'',replyContent:'',replyArticleId:''};
        case actionTypes.UP_POST:
            return {...state,upId:action.upId,upSuccess:false,};
        case actionTypes.UP_POST_SUCCESS:
            return {...state,upData:action.data,upSuccess:true};
        case actionTypes.UP_POST_FAIL:
            return {...state,upSuccess:false,upId:'',upData:''};
        case actionTypes.COLLECT_POST:
            return {...state,collectId:action.collectId,collectSuccess:false,collectType:action.collectType};
        case actionTypes.COLLECT_POST_SUCCESS:
            return {...state,collectSuccess:true};
        case actionTypes.COLLECT_POST_FAIL:
            return {...state,collectSuccess:false,collectId:'',collectType:''};
        case actionTypes.DELETE_POST:
            return {...state,deleteId:action.deleteId,deleteSuccess:false};
        case actionTypes.DELETE_POST_SUCCESS:
            return {...state,deleteSuccess:true};
        case actionTypes.DELETE_POST_FAIL:
            return {...state,deleteSuccess:false,deleteId:''};

        default:
            return state
    }
};