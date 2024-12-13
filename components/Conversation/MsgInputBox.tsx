import { useGetUserSettingsQuery } from "@/store/api/slice";
import { TextInput, useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";
import StackedView from "../common/StackedView/StackedView";
import { useRef, useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { getActiveConversationId } from "@/store/conversation/selectors";

interface MsgInputBoxProps {}

export default function MsgInputBox({}: MsgInputBoxProps) {
  const colorScheme = useColorScheme();
  const searchInputRef = useRef<TextInput | null>(null);
  const { data: settings } = useGetUserSettingsQuery("enterSendsMessage");
  const activeConversationId = useAppSelector(getActiveConversationId);

  const [msgValue, setMsgValue] = useState<string>("");

  return (
    <StackedView
      width={"80%"}
      justify="space-between"
      onTouchEnd={(e) => {
        if (searchInputRef.current) searchInputRef.current.focus();
      }}
      style={{
        padding: 7,
        borderRadius: 7,
        backgroundColor:
          colorScheme === "dark"
            ? Colors.dark.background
            : Colors.light.background,
      }}
    >
      <TextInput
        ref={searchInputRef}
        value={msgValue}
        onChangeText={(newMsgValue) => setMsgValue(newMsgValue)}
        multiline={false}
        returnKeyType={settings?.enterSendsMessage ? "send" : "default"}
        textAlign={"left"}
        placeholder={"Type your message here"}
        placeholderTextColor="grey"
        keyboardType="ascii-capable"
        onSubmitEditing={() => {}}
        editable
        style={{
          padding: 13,
          width: "90%",
          color: colorScheme === "dark" ? Colors.dark.text : Colors.light.text,
        }}
      />
    </StackedView>
  );
}
