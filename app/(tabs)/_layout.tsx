import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";

import React from "react";
import Colors from "../../constants/Colors";
import { useTranslation } from "react-i18next";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
      }}
    >
      <Tabs.Screen
        name="vehicle_list"
        options={{
          title: t("translation.vehicle_list"),
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t("translation.settings"),
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="support" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
