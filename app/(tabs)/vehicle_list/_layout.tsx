import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";

const VehicleListLayout = () => {
  // hooks
  const { t } = useTranslation();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerTitle: t("translation.vehicle_list") }}
      />
    </Stack>
  );
};

export default VehicleListLayout;
