import { useLocalSearchParams, Stack } from "expo-router";
import { View, Text, Image, StyleSheet } from "react-native";

export default function AboutLaundry() {
  const { id, name, image, distance, rating } = useLocalSearchParams();

  return (
    <>
      {/* Header with back button */}
      <Stack.Screen
        options={{
          headerShown: true,
          title: name ? String(name) : "Laundry Shop",
          headerStyle: { backgroundColor: "#47cbe2ff" },
          headerTintColor: "#fff",
        }}
      />

      <View style={styles.container}>
        
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.info}>{distance} • ⭐ {rating}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#fff" },
  image: { width: 150, height: 150, borderRadius: 12, marginBottom: 20 },
  title: { fontSize: 20, fontWeight: "bold" },
  info: { fontSize: 16, color: "#555", marginTop: 10 },
});
