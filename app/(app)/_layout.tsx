import { Stack } from "expo-router";
import "react-native-reanimated";
import { SafeAreaView, Text } from "react-native";
import { useAppSelector } from "@/store/hooks";
import { getLoggedIn } from "@/store/auth/selectors";
import { useGetMyProfileQuery } from "@/store/api/slice";
import { useEffect } from "react";

export default function AppLayout() {
  const login = useAppSelector(getLoggedIn);
  const {
    data: myProfile,
    isFetching,
    isError,
    isSuccess,
  } = useGetMyProfileQuery();

  useEffect(() => {
    console.log(
      "profile request sent again and response is: ",
      isFetching,
      isError,
      isSuccess
    );
  }, [isFetching, isError, isSuccess]);

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
