import { Stack } from "expo-router";
import React from "react";
import TabBarHeader from "@/components/navigation/TabBarHeader";
import { useAppSelector } from "@/store/hooks";
import {
  getActiveConversationDisplayName,
  getActiveConversationName,
} from "@/store/conversation/selectors";
import ProfilePicture from "@/components/profile/ProfilePicture";

export default function TabLayout() {
  const activeConversationDisplayName = useAppSelector(
    getActiveConversationDisplayName
  );
  const activeConversationName = useAppSelector(getActiveConversationName);

  return (
    <Stack
      screenOptions={{
        headerTransparent: false,
      }}
      initialRouteName="index"
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Conversations",
          headerShown: true,
          header: (props) => (
            <TabBarHeader title={props.options.title} showMenuIcon={true} />
          ),
        }}
      />
      <Stack.Screen
        name="ConversationView"
        options={{
          title: activeConversationDisplayName
            ? activeConversationDisplayName
            : "Conversation",
          headerShown: true,
          header: (props) => (
            <TabBarHeader
              title={props.options.title}
              justify="flex-start"
              titleImg={
                activeConversationName ? (
                  <ProfilePicture
                    id={activeConversationName}
                    onPress={() => {
                      console.log(
                        "Attempt to open user profile from conversation. Feature not available yet!"
                      );
                    }}
                  />
                ) : undefined
              }
            />
          ),
        }}
      />
    </Stack>
  );
}
