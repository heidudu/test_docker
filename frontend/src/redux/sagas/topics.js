import {call, put, select} from "redux-saga/effects";
import {actionTypes} from "../action/topic";
import {get} from "../../utils/fetch";


export function* topicGetFlow() {
    try {
        const tab = yield select(state => state.topics.tab);
        const page = yield select(state => state.topics.page);
        const limit = yield select(state => state.topics.limit);
        const url = '/topics?tab='+ tab + '&page=' + page + '&limit=' + limit;
        let response = yield call(get,url );
        if (response.data && response.data.success) {
            yield put({
                type:actionTypes.TOPIC_GET_SUCCESS,
                topics:response.data.data
            });
        }
    } catch (error) {
        yield put({
            type: actionTypes.TOPIC_GET_FAIL,
        });
    }
}