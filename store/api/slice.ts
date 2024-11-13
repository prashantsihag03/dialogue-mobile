import { createApi } from "@reduxjs/toolkit/query/react";
import { deleteItemAsync, getItem, setItemAsync } from "expo-secure-store";
import createBaseQueryWithReauth from "./fetchBaseQueryWithReAuth";
import { setLoggedIn } from "../auth/slice";

export interface LoginFormData {
  username: string;
  password: string;
}

export interface LoginTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IProfileData {
  id: string;
  fullname: string;
  email?: string;
  profileImg: string;
  lastOnlineUTCDateTime: string;
  bio: string;
}

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["session", "profile", "Conversation", "Settings"],
  baseQuery: createBaseQueryWithReauth({
    baseUrl: "<local_ip:expo_port>",
    prepareHeaders(headers, api) {
      const token = getItem("accessToken");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginTokenResponse, LoginFormData>({
      query: (body) => ({
        url: `/mobile/login`,
        method: "POST",
        body,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          await setItemAsync("accessToken", result.data.accessToken);
          await setItemAsync("refreshToken", result.data.refreshToken);
          dispatch(setLoggedIn(true));
        } catch (err) {
          await deleteItemAsync("accessToken");
          await deleteItemAsync("refreshToken");
          dispatch(setLoggedIn(false));
        }
      },
      invalidatesTags: [{ type: "profile", id: "MyProfile" }],
    }),
    logout: builder.mutation<void, { refreshToken: string }>({
      query: (data) => ({
        url: `/logout`,
        method: "POST",
        data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          await deleteItemAsync("accessToken");
          await deleteItemAsync("refreshToken");
        } catch (err) {
          console.error("Failed to logout", err);
        }
      },
      invalidatesTags: [{ type: "profile", id: "MyProfile" }],
    }),
    getMyProfile: builder.query<IProfileData, void>({
      query: () => {
        return { url: `/profile` };
      },
      providesTags: (result, error) => {
        return [{ type: "profile", id: "MyProfile" }];
      },
    }),
  }),
});

export const { useLoginMutation, useGetMyProfileQuery, useLogoutMutation } =
  apiSlice;
