import { Alert, SafeAreaView } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import StackedView from "@/components/common/StackedView/StackedView";
import MenuItem from "@/components/menu/MenuItem/MenuItem";

export default function Security() {
  return (
    <SafeAreaView>
      <StackedView
        direction="column"
        justify="flex-start"
        align="center"
        width={"100%"}
        style={{ paddingTop: 10, gap: 15 }}
      >
        <MenuItem
          icon={
            <AntDesign
              name="deleteuser"
              size={24}
              color="orange"
              style={{ padding: 6 }}
            />
          }
          value="Delete All Conversations"
          color="orange"
          onPress={async () => {
            Alert.alert(
              "Delete All Conversations",
              "All current conversations will be deleted permanently. Are you sure you want to delete your account?",
              [
                {
                  text: "Delete",
                  style: "destructive",
                  onPress: () => console.log("delete pressed"),
                },
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
              ],
              { cancelable: true }
            );
          }}
        />
        <MenuItem
          icon={
            <AntDesign
              name="deleteuser"
              size={24}
              color="red"
              style={{ padding: 6 }}
            />
          }
          value="Delete Account"
          color="red"
          onPress={async () => {
            Alert.alert(
              "Delete Account",
              "This action is irreversible and your data will be lost forever!\n\n Are you sure you want to delete your account?",
              [
                {
                  text: "Delete",
                  style: "destructive",
                  onPress: () => console.log("delete pressed"),
                },
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
              ],
              { cancelable: true }
            );
          }}
        />
      </StackedView>
    </SafeAreaView>
  );
}
