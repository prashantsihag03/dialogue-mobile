import { useGetUserProfileQuery } from "@/store/api/slice";
import Avatar from "../Avatar.tsx/Avatar";
import { useEffect } from "react";

interface ProfilePictureProps {
  id: string;
  onPress?: () => void;
  size?: number;
}

export default function ProfilePicture({
  id,
  onPress,
  size = 36,
}: ProfilePictureProps) {
  const { data } = useGetUserProfileQuery(id);

  return (
    <Avatar
      imgUri={
        data?.profileImg
          ? `data:image;base64,${data?.profileImg}`
          : require("@/assets/images/no-profile-picture.jpg")
      }
      onPress={onPress}
      width={size}
      height={size}
    />
  );
}
