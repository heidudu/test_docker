import {call, put, select} from "redux-saga/effects";
import {post} from "../../utils/fetch";
import {actionTypes} from "../action/publicArticle";


export function* articlePostFlow() {
    try {
        const title = yield select(state => state.publicArticle.title);
        const tab = yield select(state => state.publicArticle.tab);
        const content = yield select(state => state.publicArticle.content);
        const accessToken = yield select(state => state.users.accessToken);
        let response = yield call(post, '/topics',{accesstoken:accessToken,title:title,tab:tab,content:content});
        if (response.data && response.data.success) {
            yield put({
                type:actionTypes.PUBLIC_ARTICLE_POST_SUCCESS,
                data:response.data.topic_id
            });
        }
    } catch (error) {
        yield put({type: actionTypes.PUBLIC_ARTICLE_POST_FAIL});
    }
}


