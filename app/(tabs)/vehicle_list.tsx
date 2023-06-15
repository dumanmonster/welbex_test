import { StyleSheet } from "react-native";
import * as vehicleData from "../../assets/data.json";
import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Vehicle, VehicleType } from "../../types";

export default function VehicleListScreen() {
  // states
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [category, setCategory] = useState<
    "ALL" | "CARGO" | "PASSENGER" | "SPECIAL"
  >("ALL");

  // side effects
  useEffect(() => {
    setVehicles(JSON.parse(JSON.stringify(vehicleData)));
  }, []);

  // Function to handle filtering based on vehicle category
  const handleFilter = (
    category: "ALL" | "CARGO" | "PASSENGER" | "SPECIAL"
  ) => {
    if (category === "ALL") {
      setFilteredVehicles(vehicles);
    } else {
      setFilteredVehicles(vehicles.filter((v) => v.type == category));
    }
  };

  // Function to render each vehicle item in the list
  const renderVehicleItem = ({ item }) => (
    <View>
      <Text>{`ТС #${item.id}`}</Text>
      <Text>{`Имя водителя: ${item.driverName}`}</Text>
      <Text>{`Категория ТС: ${item.category}`}</Text>
    </View>
  );
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("translation.vehicle")}</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
