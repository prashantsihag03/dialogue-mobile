import SwitchSetting from "@/components/setting/SwitchSetting.tsx/SwitchSetting";
import { SafeAreaView, useColorScheme } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import StackedView from "@/components/common/StackedView/StackedView";
import { Colors } from "@/constants/Colors";

export default function Settings() {
  const colorScheme = useColorScheme();
  return (
    <SafeAreaView>
      <StackedView
        direction="column"
        justify="flex-start"
        align="center"
        width={"100%"}
        style={{ paddingTop: 10 }}
      >
        <SwitchSetting
          settingKey="enterSendsMessage"
          settingKeyDisplayName="Enter sends message"
          note="Pressing Enter key will send the typed message"
          icon={
            <AntDesign
              name="enter"
              size={34}
              color={
                colorScheme === "dark" ? Colors.dark.text : Colors.light.text
              }
            />
          }
        />
        <SwitchSetting
          settingKey="greetMeEverytime"
          settingKeyDisplayName="Greet me"
          icon={
            <MaterialIcons
              name="tour"
              size={34}
              color={
                colorScheme === "dark" ? Colors.dark.text : Colors.light.text
              }
            />
          }
          note="Guided Tour dialog will be presented next time site reloads"
        />
        <SwitchSetting
          settingKey="openExistingConversation"
          settingKeyDisplayName="Open Existing Conversation"
          icon={
            <Ionicons
              name="chatbox-ellipses-outline"
              size={34}
              color={
                colorScheme === "dark" ? Colors.dark.text : Colors.light.text
              }
            />
          }
          note="Open conversation if it already exists when searching"
        />
        <SwitchSetting
          settingKey="compactConversationView"
          settingKeyDisplayName="Use Compact Chat View"
          icon={
            <MaterialIcons
              name="view-compact-alt"
              size={34}
              color={
                colorScheme === "dark" ? Colors.dark.text : Colors.light.text
              }
            />
          }
          note="Displays conversation with a compact view"
        />
      </StackedView>
    </SafeAreaView>
  );
}
