import {actionTypes} from "../action/publicArticle";

const initialState = {
    title:'',
    tab:'',
    content:'',
    success:false,
    data:''


};

export const publicArticle = (state = initialState,action) => {
    switch (action.type){
        case actionTypes.PUBLIC_ARTICLE_POST:
            return {...state,title:action.title,tab:action.tab,content:action.content,success:false,};
        case actionTypes.PUBLIC_ARTICLE_POST_SUCCESS:
            return {...state,data:action.data,success:true,};
        case actionTypes.PUBLIC_ARTICLE_POST_FAIL:
            return {...state,success:false,title:'',tab:'',content:'',data:''};
        default:
            return state
    }
};