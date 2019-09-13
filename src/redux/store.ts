import { applyMiddleware, createStore } from 'redux';
// import createSagaMiddleware from 'redux-saga';
// redux-thunk make action async
import thunk from 'redux-thunk';
// import sagas from "../sagas/index";
import rootReducer from './reducers/index';

// create saga middleware
// const sagaMiddleware = createSagaMiddleware();

// attach to store
const store = createStore(rootReducer, applyMiddleware(thunk));

// run saga
// sagaMiddleware.run(sagas);

export default store;
