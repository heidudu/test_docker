import {createStore,applyMiddleware,compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from '../reducer/index'
import rootSaga from '../sagas/index'

const sagaMiddleware = createSagaMiddleware();
const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(
    reducer,
    compose(applyMiddleware(sagaMiddleware),reduxDevtools)


);
sagaMiddleware.run(rootSaga);
export default store;
