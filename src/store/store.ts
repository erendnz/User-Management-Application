import { configureStore } from "@reduxjs/toolkit";
import { limitsApi } from "../services/limitsApi.ts";
import sidebarReducer from "./sidebarSlice.ts";
import globalLoadingReducer from "./globalLoadingSlice.ts";
import globalErrorReducer from "./globalErrorSlice.ts";

export const store = configureStore({
  reducer: {
    [limitsApi.reducerPath]: limitsApi.reducer,
    sidebar: sidebarReducer,
    loading: globalLoadingReducer,
    error: globalErrorReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(limitsApi.middleware),
});
