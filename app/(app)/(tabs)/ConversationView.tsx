import { Dimensions, Keyboard } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import StackedView from "@/components/common/StackedView/StackedView";
import ChatBox from "@/components/Conversation/ChatBox";
import MsgInputBox from "@/components/Conversation/MsgInputBox";

export default function ConversationView() {
  return (
    <StackedView
      direction="column"
      justify="space-between"
      align="center"
      width={"100%"}
      height={Dimensions.get("window").height - 180}
      onTouchEnd={() => {
        if (Keyboard.isVisible()) Keyboard.dismiss();
      }}
    >
      <ChatBox />
      <StackedView style={{ gap: 10 }}>
        <MsgInputBox />
        <AntDesign
          name="arrowup"
          size={28}
          color="white"
          style={{ backgroundColor: "#2B6BFF", padding: 8, borderRadius: 7 }}
        />
      </StackedView>
    </StackedView>
  );
}
