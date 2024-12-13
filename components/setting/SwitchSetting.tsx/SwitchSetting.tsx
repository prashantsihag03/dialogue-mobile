import StackedView from "@/components/common/StackedView/StackedView";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import {
  IUserSettings,
  useGetUserSettingsQuery,
  useUpdateUserSettingMutation,
} from "@/store/api/slice";
import isTrue from "@/utils/string-utils";
import { useState } from "react";
import { Switch, useColorScheme } from "react-native";

interface SwitchSettingProps {
  settingKey: keyof IUserSettings;
  settingKeyDisplayName: string;
  icon: React.ReactNode;
  note?: string;
}

export default function SwitchSetting({
  settingKey,
  settingKeyDisplayName,
  icon,
  note,
}: SwitchSettingProps) {
  const colorScheme = useColorScheme();
  const [updateUserSettings, result] = useUpdateUserSettingMutation();
  const { isFetching, isError, data } = useGetUserSettingsQuery(settingKey);
  const [localChecked, setLocalChecked] = useState<boolean>(
    isTrue(data != null ? data[settingKey] : false)
  );

  return (
    <StackedView
      direction="column"
      justify="center"
      align="center"
      width="100%"
      style={{ padding: 10 }}
    >
      <StackedView
        direction="row"
        justify={"space-between"}
        align={"center"}
        width={"100%"}
        style={{
          backgroundColor:
            colorScheme === "dark"
              ? Colors.dark.background
              : Colors.light.background,
          padding: 10,
          borderRadius: 10,
        }}
      >
        <StackedView
          direction="row"
          justify={"flex-start"}
          align="center"
          width={"80%"}
          style={{ gap: 15 }}
        >
          {icon}
          <StackedView
            direction="column"
            justify={"flex-start"}
            align="flex-start"
            width={"100%"}
          >
            <ThemedText style={{ fontSize: 18, lineHeight: 25, width: "100%" }}>
              {settingKeyDisplayName}
            </ThemedText>
            <ThemedText
              style={{
                fontSize: 10,
                lineHeight: 15,
                color: "grey",
                width: "80%",
              }}
            >
              {note ? note : null}
              {result.isError ? "Error updating setting!" : null}
            </ThemedText>
          </StackedView>
        </StackedView>
        {/* {isFetching ? (
          //   <Skeleton variant="rounded" width={"2em"} height={"1em"} />
          <ThemedText>Fetching ...</ThemedText>
        ) : null} */}
        {isError && !isFetching ? (
          // <ErrorIcon fontSize="medium" />
          <ThemedText>error</ThemedText>
        ) : null}
        {data && !isFetching ? (
          <Switch
            disabled={result.isLoading || isFetching}
            value={
              result.isLoading
                ? localChecked
                : isTrue(data != null ? data[settingKey] : false)
            }
            onValueChange={(value) => {
              setLocalChecked(value);
              updateUserSettings({
                key: settingKey,
                value: value,
              });
            }}
          />
        ) : null}
      </StackedView>
    </StackedView>
  );
}
