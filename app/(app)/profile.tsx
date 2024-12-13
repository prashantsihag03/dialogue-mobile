import { SafeAreaView, View } from "react-native";
import Avatar from "@/components/Avatar.tsx/Avatar";
import { useGetMyProfileQuery } from "@/store/api/slice";
import CustomInputField from "@/components/profile/CustomInputField";

export default function Profile() {
  const { data: myProfileData } = useGetMyProfileQuery();

  return (
    <SafeAreaView>
      <View
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        {myProfileData?.profileImg != null ? (
          <Avatar
            imgUri={`data:image;base64,${myProfileData?.profileImg}`}
            onPress={() => {}}
            width={150}
            height={150}
            marginTop={35}
          />
        ) : (
          <Avatar
            imgUri={require("@/assets/images/no-profile-picture.jpg")}
            onPress={() => {}}
            width={150}
            height={150}
            marginTop={35}
          />
        )}
        <CustomInputField
          type="row"
          disabled={true}
          inputBgColor={"transparent"}
          inputWidth={"90%"}
          value={myProfileData?.id ?? ""}
          placeholder="username"
          inputTextAlign="left"
          inputFontSize={15}
          labelFontSize={10}
          labelText="userid:"
          color={"gray"}
        />
        <CustomInputField
          type="column"
          inputBgColor={"white"}
          inputWidth={"90%"}
          value={myProfileData?.fullname ?? ""}
          placeholder="username"
          inputTextAlign="left"
          inputFontSize={14}
          labelFontSize={10}
          labelText="Full Name: "
        />
        <CustomInputField
          type="column"
          inputBgColor={"white"}
          inputWidth={"90%"}
          value={myProfileData?.bio ?? ""}
          placeholder="write about yourself"
          inputTextAlign="left"
          inputFontSize={14}
          labelFontSize={10}
          labelText="Bio: "
          multiLine={true}
        />
        <CustomInputField
          type="column"
          inputBgColor={"white"}
          inputWidth={"90%"}
          value={myProfileData?.email ?? ""}
          placeholder="email address"
          inputTextAlign="left"
          inputFontSize={14}
          labelFontSize={10}
          labelText="Email: "
        />
      </View>
    </SafeAreaView>
  );
}
