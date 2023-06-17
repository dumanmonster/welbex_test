import { useRouter } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";

export default function HomeScreen() {
  const router = useRouter();

  const handleLogin = () => {
    router.replace("/(tabs)/vehicle_list");
  };
  return (
    <View style={styles.container}>
      <Pressable onPress={handleLogin}>
        <Text style={styles.title}>Welcome </Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
