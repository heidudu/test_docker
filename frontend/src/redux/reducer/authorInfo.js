import {actionTypes} from '../action/authorInfo';


const initialState = {
    success: false,
    authorName:'',
    info:'',
    collectSuccess:false,
    collectName:'',
    collectTopics:'',

};

export const authorInfo = (state = initialState,action) => {
    switch (action.type){
        case actionTypes.AUTHOR_GET:
            return {...state,success:false,authorName:action.authorName};
        case actionTypes.AUTHOR_GET_SUCCESS:
            return {...state,success:true,info:action.info,};
        case actionTypes.AUTHOR_GET_FAIL:
            return {...state,success:false,authorName:'', info:'', };
        case actionTypes.COLLECT_GET:
            return {...state,collectSuccess:false,collectName:action.collectName};
        case actionTypes.COLLECT_GET_SUCCESS:
            return {...state,collectSuccess:true,collectTopics:action.collectTopics,};
        case actionTypes.COLLECT_GET_FAIL:
            return {...state,collectSuccess:false,collectName:'', collectTopics:'', };
        default:
            return state
    }

};