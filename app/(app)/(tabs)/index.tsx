import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import AuthForm from "@/components/AuthForm";
import DarkDialogueLogo from "@/assets/images/allDarkDialogueLogo.svg";
import LogInImage from "@/assets/images/chatting.svg";
import { LoginFormData, useLoginMutation } from "@/store/api/slice";

export default function Login() {
  const router = useRouter();
  const [login] = useLoginMutation();

  const submitLoginForm = (formData: LoginFormData) => {
    login(formData);
  };
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
        <LogInImage width={250} height={150} />
      </View>
      <AuthForm
        title="Login"
        onSubmit={submitLoginForm}
        width={"100%"}
        height={"60%"}
      />
      <TouchableOpacity
        style={{
          width: "100%",
          height: "10%",
        }}
        onPress={() => {
          router.navigate("/signup");
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
          sign up instead
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
