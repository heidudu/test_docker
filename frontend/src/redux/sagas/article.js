import {call, put, select} from "redux-saga/effects";
import {get, post} from "../../utils/fetch";
import {actionTypes} from "../action/article";


export function* articleGetFlow() {
    try {
        const id = yield select(state => state.article.id);
        const accessToken = yield select(state => state.users.accessToken);
        const mdrender = yield select(state => state.article.mdrender);
        const url = '/topic/' + id + '?accesstoken=' + accessToken + '&mdrender='  + mdrender;
        let response = yield call(get,url );
        if (response.data && response.data.success) {
            yield put({
                type:actionTypes.ARTICLE_GET_SUCCESS,
                article:response.data.data
            });
        }
    } catch (error) {
        yield put({type: actionTypes.ARTICLE_GET_FAIL});
    }
}

export function* replyPostFlow() {
    try {
        const replyArticleId = yield select(state => state.article.replyArticleId);
        const replyId = yield select(state => state.article.replyId);
        const replyContent = yield select(state => state.article.replyContent);
        const accessToken = yield select(state => state.users.accessToken);
        var data = {};
        if(replyId){
            data = {accesstoken:accessToken,content:replyContent,reply_id:replyId,};
        }else {
            data = {accesstoken:accessToken,content:replyContent};
        }
        let response = yield call(post, '/topic/' + replyArticleId + '/replies',data);
        if (response.data && response.data.success) {
            yield put({
                type:actionTypes.REPLY_POST_SUCCESS,
                data:response.data.reply_id
            });
        }
    } catch (error) {
        yield put({type: actionTypes.REPLY_POST_FAIL});
    }
}

export function* upPostFlow() {
    try {
        const upId = yield select(state => state.article.upId);
        const accessToken = yield select(state => state.users.accessToken);
        let response = yield call(post, '/reply/' + upId + '/ups',{accesstoken:accessToken});
        if (response.data && response.data.success) {
            yield put({
                type:actionTypes.UP_POST_SUCCESS,
                data:response.data.action
            });
        }
    } catch (error) {
        yield put({type: actionTypes.UP_POST_FAIL});
    }
}

export function* collectPostFlow() {
    try {
        const collectId = yield select(state => state.article.collectId);
        const accessToken = yield select(state => state.users.accessToken);
        const collectType = yield select(state => state.article.collectType);
        let response = yield call(post, '/topic_collect/' + collectType,{accesstoken:accessToken,topic_id:collectId});
        if (response.data && response.data.success) {
            yield put({
                type:actionTypes.COLLECT_POST_SUCCESS,
            });
        }
    } catch (error) {
        yield put({type: actionTypes.COLLECT_POST_FAIL});
    }
}

export function* deletePostFlow() {
    try {
        const deleteId = yield select(state => state.article.deleteId);
        const accessToken = yield select(state => state.users.accessToken);
        let response = yield call(post, '/topic_collect/de_collect',{accesstoken:accessToken,topic_id:deleteId});
        if (response.data && response.data.success) {
            yield put({
                type:actionTypes.DELETE_POST_SUCCESS,
            });
        }
    } catch (error) {
        yield put({type: actionTypes.DELETE_POST_FAIL});
    }
}