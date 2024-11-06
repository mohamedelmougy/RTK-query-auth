import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = Cookies.get("accessToken");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
const baseQueryWithReauth = async (args, api, extraOptions) => {
  // console.log("🚀args:", args); // request url, method, body
  // console.log("🚀extraOptions:", extraOptions); // signal, dispatch, getState()
  // console.log("🚀api:", api); // custom like {shout: true}

  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    console.log("sending refresh token");
    // need to call refresh api to get new access token
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);
    if (refreshResult?.data) {
      const { accessToken } = refreshResult.data;
      Cookies.set("accessToken", accessToken);
      result = await baseQuery(args, api, extraOptions);
    } else {
      // check if refresh token has been expired
      if (refreshResult?.error?.status === 403) {
        refreshResult.error.data.message = "Your login has Expired.";
      }
      return refreshResult;
    }
  }
  return result;
};

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});

export default apiSlice;
