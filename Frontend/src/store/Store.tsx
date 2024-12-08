import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import { createTransform } from 'redux-persist';

import { authService } from "../services/service";
import authSlice from "../forms/Auth/UserSlice";
import AdminSlice from "../forms/Auth/AdminSlice";

// Create a transform for persisting only the token
const tokenTransform = createTransform(
    (inboundState: { token: string }) => {
        return { token: inboundState.token };
      },
    (outboundState) => {
        return { token: outboundState.token }; // Restore the token
    },
    { whitelist: ['auth', 'adminAuth'] }
);

// Persist configuration for auth
const authPersistConfig = {
    key: 'auth',
    storage,
    transforms: [tokenTransform]
};

// Persist configuration for adminAuth
const adminAuthPersistConfig = {
    key: 'adminAuth',
    storage,
    transforms: [tokenTransform]
};

// Apply persistReducer to authSlice
const persistedAuthReducer = persistReducer(authPersistConfig, authSlice);

// Apply persistReducer to AdminSlice
const persistedAdminAuthReducer = persistReducer(adminAuthPersistConfig, AdminSlice);

export const store = configureStore({
    reducer: {
        [authService.reducerPath]: authService.reducer,
        auth: persistedAuthReducer,
        adminAuth: persistedAdminAuthReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
        .concat(authService.middleware)
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;