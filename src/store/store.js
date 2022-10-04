import {configureStore} from '@reduxjs/toolkit';
import { apiSlice } from '../api/api';
import { dataApiSlice } from '../api/dataApi';

const store = configureStore({
    reducer: {[apiSlice.reducerPath]: apiSlice.reducer, [dataApiSlice.reducerPath]: dataApiSlice.reducer},
    middleware: getDefaultMiddleware=> getDefaultMiddleware().concat(apiSlice.middleware, dataApiSlice.middleware),
    devTools: process.env.NODE_ENV !== "production"
});

export default store;