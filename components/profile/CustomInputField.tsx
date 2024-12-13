import { useState } from "react";
import { ColorValue, DimensionValue, TextInput } from "react-native";
import { ThemedText } from "../ThemedText";
import StackedView from "../common/StackedView/StackedView";

interface CustomInputFieldProps {
  disabled?: boolean;
  value: string;
  onValueChange?: (newValue: string) => void;
  placeholder?: string;
  inputBgColor: ColorValue;
  inputWidth: DimensionValue;
  inputTextAlign?: "left" | "center" | "right";
  inputFontSize?: number;
  labelFontSize?: number;
  labelText?: string;
  type: "column" | "row" | "row-reverse" | "column-reverse";
  multiLine?: boolean;
  color?: ColorValue;
}

/**
 * NOTE: Value entered by user when input is editable is not recorded by the component.
 * Utilise onValueChange to update the value and pass the updated value as prop to this component.
 */
export default function CustomInputField({
  value,
  onValueChange,
  placeholder,
  inputBgColor,
  inputWidth,
  inputTextAlign,
  inputFontSize,
  labelFontSize,
  labelText,
  type,
  disabled = false,
  multiLine = false,
  color,
}: CustomInputFieldProps) {
  const [isEditable, setIsEditable] = useState<boolean>(false);

  return (
    <StackedView
      width={inputWidth}
      direction={type}
      style={{ marginBottom: 25 }}
    >
      {labelText ? (
        <ThemedText
          style={{
            fontSize: labelFontSize,
            fontFamily: "Michroma",
            letterSpacing: 1,
            width: type === "column" ? "90%" : undefined,
          }}
        >
          {labelText}
        </ThemedText>
      ) : null}
      <TextInput
        style={{
          backgroundColor: inputBgColor,
          padding: 10,
          letterSpacing: 1,
          borderRadius: 5,
          fontSize: inputFontSize,
          width: type === "column" ? "90%" : undefined,
          color: color,
        }}
        multiline={multiLine}
        numberOfLines={multiLine ? 4 : 1}
        returnKeyType="done"
        textAlign={inputTextAlign}
        placeholder={placeholder}
        placeholderTextColor="grey"
        keyboardType="ascii-capable"
        value={value}
        editable={isEditable}
        onPress={() => {
          disabled ? null : setIsEditable(true);
        }}
        onChangeText={(newValue: string) => {
          onValueChange ? onValueChange(newValue) : null;
        }}
      />
    </StackedView>
  );
}
