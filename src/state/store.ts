import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import verifyOtpReducer from "./verifyOtp/verifyOtpSlice";
import { persistStore, persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import tokenReducer from "./token/tokenSlice";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['token'], // Add reducers you want to persist here
};

const rootReducer = combineReducers({
    user: userReducer,
    verifyOtp: verifyOtpReducer,
    token: tokenReducer
});


const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer
})

export const persistor = persistStore(store)


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch