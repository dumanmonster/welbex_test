import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Text, View } from "../../components/Themed";

export default function SettingsScreen() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("ru");
  const [items, setItems] = useState([
    { label: 'EN', value: "en" },
    { label: "RU", value: "ru" },
  ]);

  useEffect(() => {
    i18n.changeLanguage(value);
  }, [value]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("translation.language")}</Text>

      <View>
        <DropDownPicker
          showArrowIcon={true}
          style={styles.dropdown}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",

    display: "flex",
    flexDirection: "column",
    gap: 10,
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
  dropdown: {
    width: "50%",
  },
});
