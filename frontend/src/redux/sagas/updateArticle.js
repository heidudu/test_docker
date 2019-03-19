import {call, put, select} from "redux-saga/effects";
import {post} from "../../utils/fetch";
import {actionTypes} from "../action/updateArticle";


export function* updateArticlePostFlow() {
    try {
        const title = yield select(state => state.updateArticle.title);
        const tab = yield select(state => state.updateArticle.tab);
        const content = yield select(state => state.updateArticle.content);
        const topic_id = yield select(state => state.updateArticle.updateId);
        const accessToken = yield select(state => state.users.accessToken);
        let response = yield call(post, '/topics/update',{accesstoken:accessToken,title:title,tab:tab,content:content,topic_id:topic_id});
        if (response.data && response.data.success) {
            yield put({
                type:actionTypes.UPDATE_ARTICLE_POST_SUCCESS,
                data:response.data.topic_id
            });
        }
    } catch (error) {
        yield put({type: actionTypes.UPDATE_ARTICLE_POST_FAIL});
    }
}


