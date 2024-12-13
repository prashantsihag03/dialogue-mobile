import {
  QuickViewConversation,
  useGetUserProfileQuery,
} from "@/store/api/slice";
import StackedView from "../common/StackedView/StackedView";
import { ThemedText } from "../ThemedText";
import cleanTimeUTCInstant from "@/utils/date-time-utils";
import { Colors } from "@/constants/Colors";
import { View } from "react-native";
import Avatar from "../Avatar.tsx/Avatar";
import { setActiveConversation } from "@/store/conversation/slice";
import { useRouter } from "expo-router";
import { useAppDispatch } from "@/store/hooks";

export default function QuickView({
  conversationId,
  conversationName,
  isGroup,
  lastMessage,
  lastMessageSenderId,
  lastMessageTime,
  unseen,
}: QuickViewConversation) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    isFetching,
    isError,
    isSuccess,
    data: profile,
  } = useGetUserProfileQuery(conversationName);

  return (
    <StackedView
      key={conversationId}
      lightColor={Colors.light.background}
      darkColor={Colors.dark.background}
      width={"100%"}
      style={{ padding: 15, borderRadius: 7, gap: 5 }}
      onTouchEnd={() => {
        dispatch(
          setActiveConversation({
            activeConversationId: conversationId,
            activeConversationName: conversationName,
            activeConversationDisplayName:
              profile?.fullname || conversationName,
          })
        );
        router.push("/(app)/(tabs)/ConversationView");
      }}
    >
      <StackedView width={"15%"}>
        <Avatar
          imgUri={`data:image;base64,${profile?.profileImg}`}
          onPress={() => {}}
          width={40}
          height={40}
        />
      </StackedView>
      <StackedView
        direction="column"
        width={"85%"}
        justify="center"
        align="flex-start"
      >
        <StackedView
          direction="row"
          width={"100%"}
          justify="space-between"
          align="center"
          style={{ gap: 0 }}
        >
          <ThemedText
            lightColor="black"
            darkColor="white"
            style={{ fontSize: 16, fontWeight: "bold", width: "80%" }}
          >
            {profile?.fullname || conversationName}
          </ThemedText>
          <StackedView justify="center" align="center" width={"20%"}>
            <View
              style={{
                width: 10,
                height: 10,
                backgroundColor: Colors.light.primary,
                borderRadius: "50%",
              }}
            />
          </StackedView>
        </StackedView>
        <StackedView
          direction="row"
          width={"100%"}
          justify="space-between"
          align="center"
          style={{ gap: 0 }}
        >
          <ThemedText
            lightColor="gray"
            darkColor="gray"
            style={{ fontSize: 14, width: "80%" }}
          >
            {lastMessage}
          </ThemedText>
          <ThemedText
            lightColor="gray"
            darkColor="gray"
            style={{ fontSize: 14, width: "20%", textAlign: "center" }}
          >
            {cleanTimeUTCInstant(lastMessageTime)}
          </ThemedText>
        </StackedView>
      </StackedView>
    </StackedView>
  );
}
