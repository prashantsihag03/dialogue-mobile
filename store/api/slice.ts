import { createApi } from "@reduxjs/toolkit/query/react";
import { deleteItemAsync, getItem, setItemAsync } from "expo-secure-store";
import createBaseQueryWithReauth from "./fetchBaseQueryWithReAuth";

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

export interface QuickViewConversation {
  conversationId: string;
  conversationName: string;
  lastMessage: string;
  lastMessageTime: number;
  unseen: number;
  lastMessageSenderId: string;
  isGroup: boolean;
}

export interface IUserSettings {
  enterSendsMessage: boolean;
  greetMeEverytime: boolean;
  openExistingConversation: boolean;
  compactConversationView: boolean;
}

export type IUserSetting = {
  key: keyof IUserSettings;
  value: unknown;
};

export type IUserSettingResponse = {
  [key in keyof IUserSettings]: unknown;
};

export type MESSAGE_TYPE = "message" | "call";

export interface IMessageData {
  messageId: string;
  senderUserId: string;
  timestamp: string;
  source: "outgoing" | "incoming";
  text: string;
  img?: File;
  file?: string;
  type: MESSAGE_TYPE;
}

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["session", "profile", "Conversation", "Settings"],
  baseQuery: createBaseQueryWithReauth({
    baseUrl: "http://192.168.0.42:3000",
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
        } catch (err) {
          await deleteItemAsync("accessToken");
          await deleteItemAsync("refreshToken");
        }
      },
      invalidatesTags: [{ type: "profile", id: "MyProfile" }],
    }),
    logout: builder.mutation<void, { refreshToken: string }>({
      query: (body) => ({
        url: `/logout`,
        method: "POST",
        body,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          await deleteItemAsync("accessToken");
          await deleteItemAsync("refreshToken");
          dispatch(
            apiSlice.util.invalidateTags([{ type: "profile", id: "MyProfile" }])
          );
        } catch (err) {
          console.error("Failed to logout", err);
        }
      },
    }),
    getMyProfile: builder.query<IProfileData, void>({
      query: () => {
        return { url: `/profile` };
      },
      providesTags: (result, error) => {
        return [{ type: "profile", id: "MyProfile" }];
      },
    }),
    getUserProfile: builder.query<IProfileData, string>({
      query: (data) => {
        return { url: `/profile/${data}` };
      },
      providesTags: (result, error) => {
        return [{ type: "profile", id: result?.id }];
      },
    }),
    getUserSettings: builder.query<IUserSettingResponse, keyof IUserSettings>({
      query: (settingKey) => {
        return `/user/settings/${settingKey}`;
      },
      providesTags: (result, error, settingKey) => {
        // Make sure to provide an array of FullTagDescriptions
        return [{ type: "Settings", id: settingKey }];
      },
    }),
    updateUserSetting: builder.mutation<void, IUserSetting>({
      query: (body) => ({
        url: `/user/settings/${body.key}/${body.value}`,
        method: "POST",
      }),
      invalidatesTags: (result, error, { key }) => [
        { type: "Settings", id: key },
      ],
    }),
    getConversations: builder.query<QuickViewConversation[], void>({
      query: () => {
        return { url: `/conversations` };
      },
      providesTags: (result, error) => {
        return [{ type: "Conversation", id: "allConversation" }];
      },
    }),
    getMessages: builder.query<IMessageData[], string>({
      query: (conversationId: string) =>
        `/conversations/${conversationId}/messages`,
    }),
  }),
});

export const {
  useLoginMutation,
  useGetMyProfileQuery,
  useGetUserProfileQuery,
  useLogoutMutation,
  useGetConversationsQuery,
  useGetUserSettingsQuery,
  useUpdateUserSettingMutation,
  useGetMessagesQuery,
} = apiSlice;
