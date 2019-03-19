import {select,put, call} from 'redux-saga/effects'
import {actionTypes} from "../action/message";
import {get} from "../../utils/fetch";



export function* messageGetFlow() {
        try {
            const accessToken = yield select(state => state.users.accessToken);
            let response = yield call(get, '/messages?accesstoken=' + accessToken + '&mdrender=false' );
            if (response.data && response.data.success) {
                yield put({
                    type: actionTypes.MESSAGE_GET_SUCCESS,
                    messageData:response.data.data

                });
            }
        } catch (error) {
            yield put({type: actionTypes.MESSAGE_GET_FAIL});
        }
}