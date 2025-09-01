import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {BASE_URL} from "../constants/apiUrl.ts";

export const limitsApi = createApi({
  reducerPath: "limitsApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getLimits: builder.query<any, void>({
      query: () => "/c/a022-21ef-4179-910f",
    }),
  }),
});

export const { useGetLimitsQuery } = limitsApi;
