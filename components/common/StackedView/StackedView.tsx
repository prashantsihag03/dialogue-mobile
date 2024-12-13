import { ThemedView, ThemedViewProps } from "@/components/ThemedView";
import { DimensionValue, FlexAlignType, ViewStyle } from "react-native";

export type StackedViewProps = Omit<ThemedViewProps, "style"> & {
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  justify?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  align?: FlexAlignType;
  width?: DimensionValue;
  height?: DimensionValue;
  style?: ViewStyle;
};

export default function StackedView({
  direction = "row",
  justify = "center",
  align = "center",
  width,
  height,
  style,
  ...otherProps
}: StackedViewProps) {
  return (
    <ThemedView
      style={{
        display: "flex",
        flexDirection: direction,
        justifyContent: justify,
        alignItems: align,
        width: width,
        height: height,
        ...style,
      }}
      {...otherProps}
    />
  );
}
