import {actionTypes} from "../action/updateArticle";

const initialState = {
    title:'',
    tab:'',
    content:'',
    success:false,
    data:'',
    updateId:''


};

export const updateArticle = (state = initialState,action) => {
    switch (action.type){
        case actionTypes.UPDATE_ARTICLE_POST:
            return {...state,title:action.title,tab:action.tab,content:action.content,success:false,updateId:action.updateId};
        case actionTypes.UPDATE_ARTICLE_POST_SUCCESS:
            return {...state,data:action.data,success:true,};
        case actionTypes.UPDATE_ARTICLE_POST_FAIL:
            return {...state,success:false,title:'',tab:'',content:'',data:'',updateId:''};
        default:
            return state
    }
};