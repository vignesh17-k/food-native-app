import LoginReducer from "./slices/LoginSlice";
import UserReducer from "./slices/User";
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { thunk } from "redux-thunk";


const root_reducer = combineReducers({
  login: LoginReducer,
  user: UserReducer,
})

const persist_config = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
}

const middleware = [thunk]

const persistedReducer = persistReducer(persist_config, root_reducer)


export const store = createStore(persistedReducer, applyMiddleware(...middleware));
export const persistor = persistStore(store);