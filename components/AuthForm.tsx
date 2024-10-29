import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  DimensionValue,
} from "react-native";

export default function AuthForm({
  title,
  onSubmit,
  width,
  height,
}: {
  title: string;
  onSubmit: () => void;
  width: DimensionValue;
  height: DimensionValue | null;
}) {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: width,
        height: height,
      }}
    >
      <Text
        style={{
          fontFamily: "Michroma",
          marginBottom: 20,
          fontSize: 20,
          letterSpacing: 1.5,
        }}
      >
        {title}
      </Text>

      <TextInput
        style={{
          width: "70%",
          backgroundColor: "#ABC4FE",
          padding: 15,
          marginBottom: 10,
          letterSpacing: 1,
          borderRadius: 5,
          fontFamily: "Michroma",
        }}
        placeholder="username"
        placeholderTextColor="grey"
        keyboardType="ascii-capable"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={{
          width: "70%",
          backgroundColor: "#ABC4FE",
          color: "black",
          padding: 15,
          marginBottom: 10,
          letterSpacing: 1,
          borderRadius: 5,
          fontFamily: "Michroma",
        }}
        placeholder="password"
        placeholderTextColor="grey"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={{
          width: "70%",
          backgroundColor: "black",
          padding: 15,
          marginBottom: 10,
          borderRadius: 5,
        }}
        onPress={() => {
          onSubmit();
        }}
      >
        <Text
          style={{
            width: "100%",
            textAlign: "center",
            fontFamily: "Michroma",
            color: "white",
            fontSize: 15,
            letterSpacing: 1.5,
          }}
        >
          continue
        </Text>
      </TouchableOpacity>
    </View>
  );
}
