import { Stack } from "expo-router";
import "react-native-reanimated";
import { Button, SafeAreaView, Text } from "react-native";
import { useGetMyProfileQuery, useLogoutMutation } from "@/store/api/slice";
import { getItemAsync } from "expo-secure-store";

export default function AppLayout() {
  const { isFetching, isError, isSuccess, error, refetch } =
    useGetMyProfileQuery();

  const [logout] = useLogoutMutation();

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
    return (
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    );
  }

  if (isSuccess) {
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
          <Text>Hello. You are logged In.</Text>
          <Button
            title="Logout"
            onPress={async () => {
              const refreshToken = await getItemAsync("refreshToken");
              if (refreshToken) logout({ refreshToken });
            }}
          />
          <Button
            title="Refresh Profile"
            onPress={() => {
              refetch();
            }}
          />
        </SafeAreaView>
      </SafeAreaView>
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
