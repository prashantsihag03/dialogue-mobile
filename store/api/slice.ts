import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setLoggedIn } from "../auth/slice";
import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";

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
  tagTypes: ["profile", "Conversation", "Settings"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.20.3:3000",
    prepareHeaders: (headers, api) => {
      const token = getItemAsync("accessToken");
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
    getMyProfile: builder.query<IProfileData, void>({
      query: () => {
        return `/profile`;
      },
      providesTags: (result, error) => {
        return [{ type: "profile", id: "MyProfile" }];
      },
    }),
  }),
});

export const { useLoginMutation, useGetMyProfileQuery } = apiSlice;
