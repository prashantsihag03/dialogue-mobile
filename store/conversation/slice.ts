import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ActiveConversation {
  activeConversationName: string | null;
  activeConversationId: string | null;
  activeConversationDisplayName: string | null;
}

type ConversationInitialState = ActiveConversation & {};

const initialState: ConversationInitialState = {
  activeConversationName: null,
  activeConversationId: null,
  activeConversationDisplayName: null,
};

export const conversationSlice = createSlice({
  name: "conversation",
  initialState: initialState,
  reducers: {
    setActiveConversation: (
      state,
      action: PayloadAction<ConversationInitialState>
    ) => {
      state.activeConversationName = action.payload.activeConversationName;
      state.activeConversationId = action.payload.activeConversationId;
      state.activeConversationDisplayName =
        action.payload.activeConversationDisplayName;
    },
  },
});

export const conversationReducer = conversationSlice.reducer;
export const { setActiveConversation } = conversationSlice.actions;
