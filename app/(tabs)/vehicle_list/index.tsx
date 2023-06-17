import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Text, View } from "../../../components/Themed";
import VehicleItem from "../../../components/VehicleItem";
import { Vehicle } from "../../../types";
import MapView, { Marker } from "react-native-maps";

export default function VehicleListScreen() {
  // hooks
  const { t } = useTranslation();

  // dropdown states
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: t("translation.filter.all"), value: "ALL" },
    { label: t("translation.filter.cargo"), value: "CARGO" },
    { label: t("translation.filter.passenger"), value: "PASSENGER" },
    { label: t("translation.filter.special"), value: "SPECIAL" },
  ]);

  // states
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [category, setCategory] = useState<
    "ALL" | "CARGO" | "PASSENGER" | "SPECIAL"
  >("ALL");
  const [mapRegion, setMapRegion] = useState({
    latitude: 51.1594579876684,
    longitude: 71.4608407113076,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  // side effects
  useEffect(() => {
    const data = require("../../../assets/data.json");
    setViewMode("list");
    setCategory("ALL");
    setVehicles(data);
    setFilteredVehicles(vehicles);
    setItems([
      { label: t("translation.filter.all"), value: "ALL" },
      { label: t("translation.filter.cargo"), value: "CARGO" },
      { label: t("translation.filter.passenger"), value: "PASSENGER" },
      { label: t("translation.filter.special"), value: "SPECIAL" },
    ]);
  }, []);

  useEffect(() => {
    if (category === "ALL") {
      setFilteredVehicles(vehicles);
    } else {
      setFilteredVehicles(vehicles.filter((v) => v.type === category));
    }
  }, [category, vehicles]);

  return (
    <View style={styles.container}>
      {/* Toggle between list and map view */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={styles.toggleList}
          onPress={() => setViewMode("list")}
        >
          <Text>{t("translation.view.list")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.toggleMap}
          onPress={() => setViewMode("map")}
        >
          <Text>{t("translation.view.map")}</Text>
        </TouchableOpacity>
      </View>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      {/* Filter buttons */}

      <DropDownPicker
        showArrowIcon={true}
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdown}
        open={open}
        value={category}
        items={items}
        setOpen={setOpen}
        setValue={setCategory}
        setItems={setItems}
      />

      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      {/* Render the vehicle list or map view */}
      {viewMode === "list" ? (
        <FlatList
          style={styles.list}
          data={filteredVehicles}
          renderItem={({ item }) => <VehicleItem item={item} />}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <MapView style={styles.map} region={mapRegion}>
          {filteredVehicles.map((v) => {
            return <Marker coordinate={v.location} title={v.driver.name} />;
          })}
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  filter: {
    display: "flex",
    gap: 2,
    flexDirection: "row",
  },
  filterText: {
    fontSize: 10,
    fontWeight: "600",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 10,
    height: 2,
  },
  toggleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "10%",
  },
  toggleList: {
    width: "20%",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRightWidth: 0,
  },
  toggleMap: {
    width: "20%",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  dropdown: {
    width: "50%",
    zIndex: 2,
    alignSelf: "center",
  },
  list: {
    zIndex: 1,
    width: "90%",
  },
});
