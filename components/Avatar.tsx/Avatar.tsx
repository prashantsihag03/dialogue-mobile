import {
  AnimatableNumericValue,
  DimensionValue,
  Image,
  TouchableOpacity,
} from "react-native";
import { ThemedView } from "../ThemedView";

interface AvatarProps {
  imgUri: string;
  onPress?: () => void;
  width?: DimensionValue;
  height?: DimensionValue;
  borderRadius?: string | AnimatableNumericValue;
  marginRight?: DimensionValue;
  marginLeft?: DimensionValue;
  marginTop?: DimensionValue;
  marginBottom?: DimensionValue;
}

export default function Avatar({
  imgUri,
  onPress,
  width,
  height,
  marginRight,
  marginLeft,
  marginTop,
  marginBottom,
  borderRadius = "50%",
}: AvatarProps) {
  return (
    <ThemedView
      style={{
        width: width,
        height: height,
        borderRadius: borderRadius,
        marginRight: marginRight,
        marginLeft: marginLeft,
        marginTop: marginTop,
        marginBottom: marginBottom,
        overflow: "hidden",
      }}
    >
      <TouchableOpacity onPress={onPress}>
        <Image
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "contain",
          }}
          source={{
            uri: imgUri,
          }}
        />
      </TouchableOpacity>
    </ThemedView>
  );
}
