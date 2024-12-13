import { SafeAreaView, useColorScheme } from "react-native";
import Avatar from "@/components/Avatar.tsx/Avatar";
import { useGetMyProfileQuery, useLogoutMutation } from "@/store/api/slice";
import StackedView from "@/components/common/StackedView/StackedView";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MenuItem from "@/components/menu/MenuItem/MenuItem";
import { getItemAsync } from "expo-secure-store";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";

export default function Menu() {
  const router = useRouter();
  const { data: myProfileData } = useGetMyProfileQuery();
  const colorScheme = useColorScheme();
  const [logout] = useLogoutMutation();

  return (
    <SafeAreaView>
      <StackedView
        direction="column"
        justify="flex-start"
        align="center"
        width={"100%"}
        height={"100%"}
        style={{ gap: 15, paddingTop: 15 }}
      >
        <MenuItem
          value={`${myProfileData?.fullname.split(" ")[0]}'s Profile `}
          color={colorScheme === "dark" ? Colors.dark.text : Colors.light.text}
          onPress={() => {
            router.push("/(app)/profile");
          }}
          icon={
            myProfileData?.profileImg != null ? (
              <Avatar
                imgUri={`data:image;base64,${myProfileData?.profileImg}`}
                onPress={() => {}}
                width={36}
                height={36}
              />
            ) : (
              <Avatar
                imgUri={require("@/assets/images/no-profile-picture.jpg")}
                onPress={() => {}}
                width={36}
                height={46}
              />
            )
          }
        />
        <MenuItem
          icon={
            <MaterialIcons
              name="notifications"
              size={24}
              color={
                colorScheme === "dark" ? Colors.dark.text : Colors.light.text
              }
              style={{ padding: 6 }}
            />
          }
          value="Notifications"
          color={colorScheme === "dark" ? Colors.dark.text : Colors.light.text}
          onPress={async () => {}}
        />
        <MenuItem
          icon={
            <MaterialIcons
              name="security"
              size={24}
              color={
                colorScheme === "dark" ? Colors.dark.text : Colors.light.text
              }
              style={{ padding: 6 }}
            />
          }
          value="Security"
          color={colorScheme === "dark" ? Colors.dark.text : Colors.light.text}
          onPress={async () => {
            router.push("/(app)/security");
          }}
        />
        <MenuItem
          icon={
            <Feather
              name="settings"
              size={24}
              color={
                colorScheme === "dark" ? Colors.dark.text : Colors.light.text
              }
              style={{ padding: 6 }}
            />
          }
          onPress={() => {
            router.push("/(app)/settings");
          }}
          value="Settings"
          color={colorScheme === "dark" ? Colors.dark.text : Colors.light.text}
        />
        <MenuItem
          icon={
            <MaterialIcons
              name="logout"
              size={24}
              color={
                colorScheme === "dark" ? Colors.dark.text : Colors.light.text
              }
              style={{ padding: 6 }}
            />
          }
          value="Logout"
          color={colorScheme === "dark" ? Colors.dark.text : Colors.light.text}
          onPress={async () => {
            const refreshToken = await getItemAsync("refreshToken");
            if (refreshToken) logout({ refreshToken });
          }}
        />
      </StackedView>
    </SafeAreaView>
  );
}
