import StackedView from "@/components/common/StackedView/StackedView";
import { ThemedText } from "@/components/ThemedText";
import { ColorValue, TouchableOpacity } from "react-native";

interface MenuItemProps {
  icon: React.JSX.Element;
  value: string;
  color: ColorValue;
  onPress?: () => void;
}

export default function MenuItem({
  icon,
  value,
  color,
  onPress,
}: MenuItemProps) {
  return (
    <TouchableOpacity
      style={{ width: "95%" }}
      onPress={onPress ? onPress : () => {}}
    >
      <StackedView
        direction="row"
        justify="flex-start"
        align="center"
        width={"100%"}
        style={{
          padding: 15,
          gap: 15,
          borderRadius: 7,
        }}
        lightColor="white"
        darkColor="#131313"
      >
        {icon}
        <ThemedText
          style={{
            fontWeight: "normal",
            letterSpacing: 1.5,
            fontSize: 16,
            textTransform: "capitalize",
            color: color,
          }}
        >
          {value}
        </ThemedText>
      </StackedView>
    </TouchableOpacity>
  );
}
