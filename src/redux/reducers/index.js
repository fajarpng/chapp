import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import auth from './auth'
import user from './user'
import friend from './friend'
import storage from '@react-native-community/async-storage'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

const persistConfig = {
  key: 'root',
  stateReconciler: hardSet,
  storage,
  // whitelist: ['auth']
}

const rootReducer = combineReducers({
  auth,
  user,
  friend
})

export default persistReducer(persistConfig, rootReducer);