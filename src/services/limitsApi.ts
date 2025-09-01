import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const limitsApi = createApi({
  reducerPath: "limitsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
  endpoints: (builder) => ({
    getLimits: builder.query<any, void>({
      query: () => "/c/a022-21ef-4179-910f",
    }),
  }),
});

export const { useGetLimitsQuery } = limitsApi;
