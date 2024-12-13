import { RootState } from "..";

export const getActiveConversationId = (state: RootState) =>
  state.conversation.activeConversationId;

export const getActiveConversationName = (state: RootState) =>
  state.conversation.activeConversationName;

export const getActiveConversationDisplayName = (state: RootState) =>
  state.conversation.activeConversationDisplayName;
