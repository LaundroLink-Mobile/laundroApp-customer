import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, Stack, useLocalSearchParams } from "expo-router";

export default function LaundryDetails() {
  const router = useRouter();
  const { services } = useLocalSearchParams();

  const [selectedFabric, setSelectedFabric] = useState<string | null>(null);
  const [addons, setAddons] = useState<string[]>([]);
  const [instructions, setInstructions] = useState("");

  const fabricTypes = [
    "Regular Clothes",
    "Blankets, bedsheets, towels, pillowcase",
    "Comforter",
  ];

  const addonOptions = [
    "Powder Detergent",
    "Liquid Detergent",
    "Stain Remover/Stain treatment",
    "Fabric Conditioner/Softener",
    "Dryer sheet",
  ];

  const toggleAddon = (addon: string) => {
    setAddons((prev) =>
      prev.includes(addon) ? prev.filter((a) => a !== addon) : [...prev, addon]
    );
  };

  const handleConfirm = () => {
    router.push({
      pathname: "/(tabs)/homepage/df_payment",
      params: {
        services: services,
        fabrics: JSON.stringify([selectedFabric]),
        addons: JSON.stringify(addons),
        instructions: JSON.stringify([instructions]),
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#89CFF0" },
          headerTitleAlign: "left",
          headerTintColor: "#2d2d2dff",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons
                name="arrow-back"
                size={24}
                color="#000"
                style={{ marginLeft: 10 }}
              />
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <Text style={styles.headerTitle}>Laundry Details</Text>
          ),
        }}
      />

      {/* Content */}
      <View style={styles.container}>
        {/* Fabric Types */}
        <Text style={styles.sectionTitle}>Select Fabric Type(s)</Text>
        {fabricTypes.map((item, index) => (
          <Pressable
            key={index}
            style={styles.optionRow}
            onPress={() => setSelectedFabric(item)}
          >
            <Ionicons
              name={
                selectedFabric === item
                  ? "radio-button-on"
                  : "radio-button-off-outline"
              }
              size={20}
              color="#0D47A1"
            />
            <Text style={styles.optionText}>{item}</Text>
          </Pressable>
        ))}

        {/* Add-ons */}
        <Text style={styles.sectionTitle}>Add-ons</Text>
        {addonOptions.map((addon, index) => (
          <Pressable
            key={index}
            style={styles.optionRow}
            onPress={() => toggleAddon(addon)}
          >
            <Ionicons
              name={
                addons.includes(addon) ? "checkbox" : "square-outline"
              }
              size={20}
              color="#0D47A1"
            />
            <Text style={styles.optionText}>{addon}</Text>
          </Pressable>
        ))}

        {/* Special Instructions */}
        <Text style={styles.sectionTitle}>Special Instructions</Text>
        <TextInput
          style={styles.input}
          placeholder="E.g., Wash separately, do not tumble dry..."
          value={instructions}
          onChangeText={setInstructions}
          multiline
        />
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
          <Text style={styles.confirmText}>Confirm Services</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  headerTitle: {
    color: "#2d2d2dff",
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 10,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 15,
    color: "#2d2d2dff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    textAlignVertical: "top",
  },
  footer: {
    padding: 15,
    backgroundColor: "#fff",
  },
  confirmBtn: {
    backgroundColor: "#004aad",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
  },
  confirmText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});