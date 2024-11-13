import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { deleteItemAsync, getItem, setItem } from "expo-secure-store";

const logAuthHeader = (val: string | undefined | null) => {
  if (val == null) {
    return "Auth null";
  }
  return "Auth ****";
};

const createBaseQueryWithReauth = (
  baseQueryOptions: FetchBaseQueryArgs
): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> => {
  const baseQuery = fetchBaseQuery(baseQueryOptions);
  return async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    console.log(
      `API - ${api.endpoint} - ${api.type} - ${logAuthHeader(
        result.meta?.request.headers.get("authorization")
      )} - ${result.meta?.response?.status}`
    );
    if (
      result.error &&
      result.meta?.response?.status === 401 &&
      result.meta?.request.url != "/mobile/login"
    ) {
      const refreshToken = getItem("refreshToken");

      if (refreshToken == null) {
        console.log(`API - RE_AUTH - FAILED - refresh token unavailable`);
        return result;
      }

      // try to get a new token
      const refreshResult = await baseQuery(
        {
          url: "/token/refresh",
          method: "POST",
          body: {
            refreshToken,
          },
        },
        api,
        extraOptions
      );

      console.log(
        `API - /token/refresh - mutation - ${logAuthHeader(
          refreshResult.meta?.request.headers.get("authorization")
        )} - ${refreshResult.meta?.response?.status}`
      );

      if (
        refreshResult.data != null &&
        typeof refreshResult.data === "object" &&
        "accessToken" in refreshResult.data &&
        "refreshToken" in refreshResult.data &&
        refreshResult.data.accessToken != null &&
        refreshResult.data.refreshToken != null &&
        typeof refreshResult.data.refreshToken === "string" &&
        typeof refreshResult.data.accessToken === "string"
      ) {
        setItem("accessToken", refreshResult.data.accessToken);
        setItem("refreshToken", refreshResult.data.refreshToken);
        console.log(`API - RE_AUTH - SUCCESS - Tokens updated`);
        result = await baseQuery(args, api, extraOptions);
        console.log(
          `API - RETRY - ${api.endpoint} - ${api.type} - ${logAuthHeader(
            result.meta?.request.headers.get("authorization")
          )} - ${result.meta?.response?.status}`
        );
      } else {
        deleteItemAsync("accessToken");
        deleteItemAsync("refreshToken");
      }
    }
    return result;
  };
};

export default createBaseQueryWithReauth;
