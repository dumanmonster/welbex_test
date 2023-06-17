import React, { FC } from "react";
import { View, Text } from "./Themed";
import { StyleSheet } from "react-native";
import { Vehicle } from "../types";
import { useTranslation } from "react-i18next";
import { Link, useRouter } from "expo-router";

type Props = {
  item: Vehicle;
};
export default function VehicleItem({ item }: Props) {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <View style={styles.itemContainer}>
      <Text>{`${t("translation.item.V")} #${item.id}`}</Text>
      <Text>{`${t("translation.item.driver_name")}: ${item.driver.name}`}</Text>
      <Text>{`${t("translation.item.vehicle_category")}: ${item.type}`}</Text>
      <Link href={`vehicle_list/${item.id}`}>Go to Details</Link>
    </View>
  );
}
const styles = StyleSheet.create({
  itemContainer: {
    display: "flex",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    gap: 2,
    justifyContent: "center",

  },
});
