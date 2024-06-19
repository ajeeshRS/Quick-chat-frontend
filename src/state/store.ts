import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import verifyOtpReducer from "./verifyOtp/verifyOtpSlice";
import { persistStore, persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import tokenReducer from "./token/tokenSlice";
import peerReducer from "./peer/peerSlice";
import messageReducer from "./message/messageSlice";
import onlineUsersReducer from "./onlineUsers/onlineUsersSlice";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['token'], // Add reducers you want to persist here
};

const rootReducer = combineReducers({
    user: userReducer,
    verifyOtp: verifyOtpReducer,
    token: tokenReducer,
    peer: peerReducer,
    messages: messageReducer,
    onlineUsers: onlineUsersReducer
});


const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
                // Optionally ignore paths
                ignoredPaths: ['register', 'rehydrate'],
            },
        }),
});

export const persistor = persistStore(store)


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch