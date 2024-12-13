import { LoginFormData, useLoginMutation } from "@/store/api/slice";
import { useRouter } from "expo-router";
import { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import AuthForm from "@/components/AuthForm";
import DarkDialogueLogo from "@/assets/images/allDarkDialogueLogo.svg";
import SignUpImage from "@/assets/images/messaging.svg";
import LogInImage from "@/assets/images/chatting.svg";

export default function Auth() {
  const [login] = useLoginMutation();
  const [showLogin, setShowLogin] = useState<boolean>(true);

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
        {showLogin ? (
          <LogInImage width={250} height={150} />
        ) : (
          <SignUpImage width={250} height={150} />
        )}
      </View>
      <AuthForm
        title={showLogin ? "Login" : "Signup"}
        onSubmit={showLogin ? submitLoginForm : () => {}}
        width={"100%"}
        height={"60%"}
      />
      <TouchableOpacity
        style={{
          width: "100%",
          height: "10%",
        }}
        onPress={() => {
          setShowLogin(!showLogin);
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
          {showLogin ? "sign up" : "log in"} instead
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
