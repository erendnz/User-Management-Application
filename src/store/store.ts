import { configureStore } from '@reduxjs/toolkit';
import { limitsApi } from '../services/limitsApi.ts';
import sidebarReducer from './reducers/sidebarSlice.ts';
import globalLoadingReducer from './reducers/globalLoadingSlice.ts';
import globalErrorReducer from './reducers/globalErrorSlice.ts';

export const store = configureStore({
  reducer: {
    [limitsApi.reducerPath]: limitsApi.reducer,
    sidebar: sidebarReducer,
    loading: globalLoadingReducer,
    error: globalErrorReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(limitsApi.middleware),
});
