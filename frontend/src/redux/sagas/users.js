import {select,put, call} from 'redux-saga/effects'
import {actionTypes} from "../action/users";
import {post,get} from "../../utils/fetch";



export function* messageCountFlow() {
        try {
            const accessToken = yield select(state => state.users.accessToken);
            let response = yield call(get, '/message/count?accesstoken=' + accessToken );
            if (response.data && response.data.success) {
                yield put({
                    type: actionTypes.MESSAGE_COUNT_GET_SUCCESS,
                    messageCountData:response.data.data
                });
            }
        } catch (error) {
            yield put({type: actionTypes.MESSAGE_COUNT_GET_FAIL});
        }
}

export function*  loginFlow() {
        try {
            const accessToken = yield select(state => state.users.accessToken);
            let response = yield call(post, '/accesstoken',{accesstoken:accessToken});
            if (response.data && response.data.success) {
                yield put({
                    type: actionTypes.USER_LOGIN_SUCCESS,
                    loginName: response.data.loginname,
                    accessToken: accessToken,
                    avatarUrl: response.data.avatar_url
                });
            }
        } catch (error) {
            yield put({type: actionTypes.USER_LOGIN_FAIL});
        }
}