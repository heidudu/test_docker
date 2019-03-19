import {select,put, call} from 'redux-saga/effects'
import {actionTypes} from "../action/authorInfo";
import {get} from "../../utils/fetch";



export function* authorGetFlow() {
        try {
            const authorName = yield select(state => state.authorInfo.authorName);
            let response = yield call(get, '/user/' + authorName );
            if (response.data && response.data.success) {
                yield put({
                    type: actionTypes.AUTHOR_GET_SUCCESS,
                    info:response.data.data

                });
            }
        } catch (error) {
            yield put({type: actionTypes.AUTHOR_GET_FAIL});
        }
}

export function* collectGetFlow() {
        try {
            const collectName = yield select(state => state.authorInfo.collectName);
            let response = yield call(get, '/topic_collect/' + collectName );
            if (response.data && response.data.success) {
                yield put({
                    type: actionTypes.COLLECT_GET_SUCCESS,
                    collectTopics:response.data.data

                });
            }
        } catch (error) {
            yield put({type: actionTypes.COLLECT_GET_FAIL});
        }
}