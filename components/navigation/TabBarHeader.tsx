import {
  DimensionValue,
  SafeAreaView,
  useColorScheme,
  View,
} from "react-native";
import { useGetMyProfileQuery } from "@/store/api/slice";
import { ThemedText } from "../ThemedText";
import { useRouter } from "expo-router";
import Avatar from "../Avatar.tsx/Avatar";
import React from "react";
import ProfilePicture from "../profile/ProfilePicture";
import StackedView from "../common/StackedView/StackedView";

interface TabBarHeaderProps {
  title?: string;
  titleImg?: React.JSX.Element;
  height?: DimensionValue;
  showMenuIcon?: boolean;
  justify?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | undefined;
}

export default function TabBarHeader({
  title,
  titleImg,
  height,
  showMenuIcon = false,
  justify = "space-between",
}: TabBarHeaderProps) {
  const { data: myProfileData } = useGetMyProfileQuery();
  const colorScheme = useColorScheme();
  const router = useRouter();

  return (
    <SafeAreaView>
      <StackedView
        justify={justify}
        width="100%"
        height={height}
        style={{
          padding: 15,
        }}
      >
        {titleImg ? <StackedView width={"15%"}>{titleImg}</StackedView> : null}
        {title ? (
          <ThemedText
            style={{
              fontWeight: "bold",
              fontSize: 22,
              letterSpacing: 1,
              width: "70%",
            }}
          >
            {title}
          </ThemedText>
        ) : null}
        {showMenuIcon === true ? (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              width: "15%",
            }}
          >
            {myProfileData?.profileImg != null ? (
              <Avatar
                imgUri={`data:image;base64,${myProfileData?.profileImg}`}
                onPress={() => router.push("/(app)/menu")}
                width={36}
                height={36}
              />
            ) : (
              <Avatar
                imgUri={require("@/assets/images/no-profile-picture.jpg")}
                onPress={() => router.push("/(app)/menu")}
                width={36}
                height={36}
              />
            )}
          </View>
        ) : null}
      </StackedView>
    </SafeAreaView>
  );
}
