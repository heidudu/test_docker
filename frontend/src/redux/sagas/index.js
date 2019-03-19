import {takeLatest} from 'redux-saga/effects'
import{loginFlow,messageCountFlow} from "./users";
import{topicGetFlow} from "./topics";
import {articleGetFlow,replyPostFlow,upPostFlow,collectPostFlow,deletePostFlow} from "./article";
import {articlePostFlow} from "./publicArticle";
import {updateArticlePostFlow} from "./updateArticle";
import {authorGetFlow,collectGetFlow} from "./authorInfo";
import {messageGetFlow} from "./message";
import {actionTypes as userActionTypes} from "../action/users";
import {actionTypes as topicActionTypes} from "../action/topic";
import {actionTypes as articleActionTypes} from "../action/article";
import {actionTypes as publicArticleActionTypes} from "../action/publicArticle";
import {actionTypes as updateArticleActionTypes } from "../action/updateArticle";
import {actionTypes as authorInfoActionTypes } from "../action/authorInfo";
import {actionTypes as messageActionTypes } from "../action/message";


export default function* rootSaga() {
    yield takeLatest(userActionTypes.USER_LOGIN,loginFlow);
    yield takeLatest(topicActionTypes.TOPIC_GET,topicGetFlow);
    yield takeLatest(articleActionTypes.ARTICLE_GET,articleGetFlow);
    yield takeLatest(publicArticleActionTypes.PUBLIC_ARTICLE_POST,articlePostFlow);
    yield takeLatest(articleActionTypes.REPLY_POST,replyPostFlow);
    yield takeLatest(articleActionTypes.UP_POST,upPostFlow);
    yield takeLatest(articleActionTypes.COLLECT_POST,collectPostFlow);
    yield takeLatest(updateArticleActionTypes.UPDATE_ARTICLE_POST,updateArticlePostFlow);
    yield takeLatest(articleActionTypes.DELETE_POST,deletePostFlow);
    yield takeLatest(authorInfoActionTypes.AUTHOR_GET,authorGetFlow);
    yield takeLatest(authorInfoActionTypes.COLLECT_GET,collectGetFlow);
    yield takeLatest(messageActionTypes.MESSAGE_GET,messageGetFlow);
    yield takeLatest(userActionTypes.MESSAGE_COUNT_GET,messageCountFlow);
}