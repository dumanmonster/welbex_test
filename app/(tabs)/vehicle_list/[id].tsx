import * as Linking from "expo-linking";
import { Stack, useSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Text, View } from "../../../components/Themed";
import { Vehicle } from "../../../types";

export default function VehicleDetailScreen() {
  const { id } = useSearchParams();
  const { t } = useTranslation();

  // states
  const [vehicle, setVehicle] = useState<Vehicle>();
  const [mapRegion, setMapRegion] = useState({
    latitude: 51.1594579876684,
    longitude: 71.4608407113076,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  // side
  useEffect(() => {
    const data = require("../../../assets/data.json");

    setVehicle(data.filter((v: any) => v.id === id)[0]);
  }, []);

  // handle call
  const handleCall = () => {
    Linking.openURL(`tel:+7${vehicle?.driver.phone}`);
  };

  // handle message
  const handleMessage = () => {
    Linking.openURL(
      `whatsapp://send?text=Добрый день, подскажите пожалуйста, какой номер заказа у вас сейчас в работе&phone=${vehicle?.driver.phone}`
    );
  };
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ headerTitle: `${t("translation.item.V")} #${id}` }}
      />

      <MapView style={styles.map} region={vehicle?.location}>
        {vehicle && (
          <Marker
            coordinate={vehicle?.location}
            title={vehicle?.driver?.name}
          />
        )}
      </MapView>
      <View style={styles.info}>
        <Text style={styles.info_text}>
          {t("translation.info.vehicle_category")}: {vehicle?.type}
        </Text>
        <Text style={styles.info_text}>
          {t("translation.info.driver_name")}: {vehicle?.driver.name}
        </Text>
        <Text style={styles.info_text}>
          {t("translation.info.driver_phone")}: +7{vehicle?.driver.phone}
        </Text>
      </View>

      <View style={styles.buttons}>
        <Button
          title={t("translation.info.call")}
          color="green"
          onPress={handleCall}
        />
        <Button
          title={t("translation.info.message")}
          color="blue"
          onPress={handleMessage}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "30%",
  },
  buttons: {
    display: "flex",
    width: "100%",
    height: "20%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  info: {
    flex: 1,
    gap: 10,
    padding: 2,
  },
  info_text: {
    fontSize: 18,
  },
});
