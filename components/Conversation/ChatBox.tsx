import { useGetMessagesQuery, useGetMyProfileQuery } from "@/store/api/slice";
import StackedView from "../common/StackedView/StackedView";
import { useAppSelector } from "@/store/hooks";
import {
  getActiveConversationId,
  getActiveConversationName,
} from "@/store/conversation/selectors";
import ProfilePicture from "../profile/ProfilePicture";
import { ThemedText } from "../ThemedText";
import { useColorScheme } from "react-native";
import cleanTimeUTCInstant from "@/utils/date-time-utils";
import { Colors } from "@/constants/Colors";

interface ChatBoxProps {}

export default function ChatBox({}: ChatBoxProps) {
  const colorScheme = useColorScheme();
  const activeConversationId = useAppSelector(getActiveConversationId);
  const activeConversationName = useAppSelector(getActiveConversationName);
  const { data: myProfile } = useGetMyProfileQuery();

  const { data: allOldMessages } = useGetMessagesQuery(activeConversationId!, {
    skip: activeConversationId == null || activeConversationName == null,
  });

  if (activeConversationId == null || activeConversationName == null) {
    return "Loading ...";
  }

  return (
    <StackedView
      width={"100%"}
      direction="column"
      style={{ gap: 25, padding: 15 }}
    >
      {allOldMessages?.map((message) => (
        <StackedView
          key={message.messageId}
          direction="column"
          align={
            message.senderUserId === myProfile?.id ? "flex-end" : "flex-start"
          }
          width={"100%"}
        >
          <StackedView
            align="center"
            style={{ gap: 5 }}
            direction={
              message.senderUserId === myProfile?.id ? "row-reverse" : "row"
            }
          >
            <ProfilePicture id={message.senderUserId} size={20} />
            <ThemedText
              style={{
                fontSize: 10,
                color: "grey",
              }}
            >
              {message.senderUserId === myProfile?.id
                ? `${cleanTimeUTCInstant(Number(message.timestamp))} | ${
                    message.senderUserId
                  }`
                : `${message.senderUserId} | ${cleanTimeUTCInstant(
                    Number(message.timestamp)
                  )}`}
            </ThemedText>
          </StackedView>
          <StackedView
            width={"100%"}
            direction={
              message.senderUserId === myProfile?.id ? "row-reverse" : "row"
            }
            justify={
              message.senderUserId === myProfile?.id
                ? "flex-start"
                : "flex-start"
            }
          >
            <ThemedText
              style={{
                minWidth: 70,
                maxWidth: "70%",
                backgroundColor:
                  message.senderUserId === myProfile?.id
                    ? "#2B6BFF"
                    : colorScheme === "dark"
                    ? "#222222"
                    : "white",
                color:
                  message.senderUserId === myProfile?.id
                    ? Colors.dark.text
                    : colorScheme === "dark"
                    ? Colors.dark.text
                    : Colors.light.text,
                padding: 10,
                borderRadius: 20,
                borderTopRightRadius:
                  message.senderUserId === myProfile?.id ? 0 : 20,
                borderTopLeftRadius:
                  message.senderUserId === myProfile?.id ? 20 : 0,
                letterSpacing: 1,
                fontSize: 13,
              }}
            >
              {message.text}
            </ThemedText>
          </StackedView>
        </StackedView>
      ))}
    </StackedView>
  );
}
