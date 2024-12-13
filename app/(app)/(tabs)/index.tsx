import { Dimensions, Keyboard, TextInput } from "react-native";
import { useGetConversationsQuery } from "@/store/api/slice";
import { useColorScheme } from "@/hooks/useColorScheme";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import StackedView from "@/components/common/StackedView/StackedView";
import { useRef } from "react";
import QuickView from "@/components/Conversation/QuickView";
import { Colors } from "@/constants/Colors";

export default function Conversations() {
  const colorScheme = useColorScheme();
  const searchInputRef = useRef<TextInput | null>(null);
  const { data: conversationList } = useGetConversationsQuery();

  return (
    <StackedView
      direction="column"
      justify="flex-start"
      align="center"
      width={"100%"}
      height={Dimensions.get("window").height - 120}
      onTouchEnd={() => {
        if (Keyboard.isVisible()) Keyboard.dismiss();
      }}
    >
      <StackedView
        justify="space-between"
        align="center"
        width={"100%"}
        style={{ padding: 15 }}
      >
        <StackedView
          width={"65%"}
          justify="space-between"
          onTouchEnd={(e) => {
            if (searchInputRef.current) searchInputRef.current.focus();
          }}
          style={{
            padding: 17,
            borderRadius: 7,
            backgroundColor: colorScheme === "dark" ? "#111111" : "#ffffff",
          }}
        >
          <TextInput
            ref={searchInputRef}
            multiline={false}
            returnKeyType="search"
            textAlign={"left"}
            placeholder={"Search conversation"}
            placeholderTextColor="grey"
            keyboardType="ascii-capable"
            editable
            style={{
              width: "100%",
              letterSpacing: 1,
              color:
                colorScheme === "dark" ? Colors.dark.text : Colors.light.text,
            }}
          />
        </StackedView>
        <AntDesign
          name="adduser"
          size={24}
          color={colorScheme === "dark" ? "white" : "black"}
          style={{
            padding: 13,
            borderRadius: 7,
            backgroundColor: colorScheme === "dark" ? "#111111" : "white",
          }}
        />
        <FontAwesome
          name="sort-amount-asc"
          size={20}
          color={colorScheme === "dark" ? "white" : "black"}
          style={{
            padding: 15,
            borderRadius: 7,
            backgroundColor: colorScheme === "dark" ? "#111111" : "white",
          }}
        />
      </StackedView>
      <StackedView
        justify="space-between"
        align="center"
        width={"100%"}
        style={{ padding: 10 }}
      >
        {conversationList?.map((conversation) => (
          <QuickView key={conversation.conversationId} {...conversation} />
        ))}
      </StackedView>
    </StackedView>
  );
}
