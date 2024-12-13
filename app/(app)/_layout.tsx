import { Stack } from "expo-router";
import "react-native-reanimated";
import { SafeAreaView, Text, View } from "react-native";
import { useGetMyProfileQuery } from "@/store/api/slice";
import Auth from "../../components/auth";

export default function AppLayout() {
  const { isFetching, isError, isSuccess } = useGetMyProfileQuery();

  if (isFetching) {
    return (
      <SafeAreaView>
        <SafeAreaView
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Text>fetching profile ...</Text>
        </SafeAreaView>
      </SafeAreaView>
    );
  }

  if (isError) {
    return <Auth />;
  }

  if (isSuccess) {
    return (
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            title: "Conversations",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="menu"
          options={{
            title: "Menu",
            headerShown: true,
            headerBackground: () => (
              <View style={{ backgroundColor: "transparent" }}></View>
            ),
          }}
        />
        <Stack.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: true,
            headerBackground: () => (
              <View style={{ backgroundColor: "transparent" }}></View>
            ),
          }}
        />
        <Stack.Screen
          name="settings"
          options={{
            title: "Settings",
            headerShown: true,
            headerBackground: () => (
              <View style={{ backgroundColor: "transparent" }}></View>
            ),
          }}
        />
        <Stack.Screen
          name="security"
          options={{
            title: "Security",
            headerShown: true,
            headerBackground: () => (
              <View style={{ backgroundColor: "transparent" }}></View>
            ),
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
    );
  }

  return (
    <SafeAreaView>
      <SafeAreaView
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <Text>Something went wrong.</Text>
      </SafeAreaView>
    </SafeAreaView>
  );
}
