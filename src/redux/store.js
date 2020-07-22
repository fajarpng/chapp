import {createStore, applyMiddleware} from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import { persistStore } from 'redux-persist';

import pReducer from './reducers'

const middleware = applyMiddleware(promiseMiddleware)
const store = createStore(pReducer, middleware);
const persistor = persistStore(store);

export { persistor, store };