import { Text, View, TouchableOpacity, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import AuthForm from "@/components/AuthForm";
import DarkDialogueLogo from "@/assets/images/allDarkDialogueLogo.svg";
import SignUpImage from "@/assets/images/messaging.svg";

export default function Signup() {
  const router = useRouter();

  return (
    <SafeAreaView
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "100%",
          height: "30%",
        }}
      >
        <DarkDialogueLogo width={150} height={100} />
        <SignUpImage width={250} height={150} />
      </View>
      <AuthForm
        title="Signup"
        onSubmit={() => {}}
        width={"100%"}
        height={"60%"}
      />
      <TouchableOpacity
        style={{
          width: "100%",
          height: "10%",
        }}
        onPress={() => {
          router.navigate("/");
        }}
      >
        <Text
          style={{
            width: "100%",
            textAlign: "center",
            fontFamily: "Michroma",
            color: "black",
            letterSpacing: 1,
            fontSize: 15,
          }}
        >
          log in instead
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
