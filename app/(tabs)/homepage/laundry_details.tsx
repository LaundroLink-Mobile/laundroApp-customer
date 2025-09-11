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
import { useRouter, Stack } from "expo-router";

export default function LaundryDetails() {
  const router = useRouter();

  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([]);
  const [otherFabric, setOtherFabric] = useState("");
  const [detergent, setDetergent] = useState("Regular");
  const [instructions, setInstructions] = useState("");
  const [useSoftener, setUseSoftener] = useState(false);
  const [stainTreatment, setStainTreatment] = useState(false);
  const [dryerSheet, setDryerSheet] = useState(false);

  const toggleFabric = (fabric: string) => {
    if (fabric === "Other fabric type") {
      // toggle separately for otherFabric
      if (selectedFabrics.includes(fabric)) {
        setSelectedFabrics(selectedFabrics.filter((f) => f !== fabric));
        setOtherFabric(""); // clear when deselected
      } else {
        setSelectedFabrics([...selectedFabrics, fabric]);
      }
    } else {
      setSelectedFabrics((prev) =>
        prev.includes(fabric)
          ? prev.filter((f) => f !== fabric) // remove
          : [...prev, fabric] // add
      );
    }
  };

  const handleConfirm = () => {
    // merge "Other fabric type" with custom input
    const finalFabrics = selectedFabrics.includes("Other fabric type")
      ? [...selectedFabrics.filter((f) => f !== "Other fabric type"), otherFabric]
      : selectedFabrics;

    console.log({
      fabrics: finalFabrics,
      detergent,
      instructions,
      useSoftener,
      stainTreatment,
      dryerSheet,
    });
    alert("Services confirmed!");
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
        {["Cotton", "Delicates (silk, linen, nylon, polyester, lace)", "Leather", "Denim"].map(
          (item, index) => (
            <Pressable
              key={index}
              style={styles.optionRow}
              onPress={() => toggleFabric(item)}
            >
              <Ionicons
                name={
                  selectedFabrics.includes(item) ? "checkbox" : "square-outline"
                }
                size={20}
                color="#0D47A1"
              />
              <Text style={styles.optionText}>{item}</Text>
            </Pressable>
          )
        )}

        {/* Other fabric type with input */}
        <View style={{ marginVertical: 5 }}>
          <Pressable
            style={styles.optionRow}
            onPress={() => toggleFabric("Other fabric type")}
          >
            <Ionicons
              name={
                selectedFabrics.includes("Other fabric type")
                  ? "checkbox"
                  : "square-outline"
              }
              size={20}
              color="#0D47A1"
            />
            <Text style={styles.optionText}>Other fabric type</Text>
          </Pressable>

          {selectedFabrics.includes("Other fabric type") && (
            <TextInput
              style={styles.input}
              placeholder="Enter fabric type"
              value={otherFabric}
              onChangeText={setOtherFabric}
            />
          )}
        </View>

        {/* Detergent */}
        <Text style={styles.sectionTitle}>Detergent Preference</Text>
        {["Regular", "Hypoallergenic", "Eco-Friendly", "Unscented"].map(
          (item, index) => (
            <Pressable
              key={index}
              style={styles.optionRow}
              onPress={() => setDetergent(item)}
            >
              <Ionicons
                name={
                  detergent === item
                    ? "radio-button-on"
                    : "radio-button-off-outline"
                }
                size={20}
                color="#0D47A1"
              />
              <Text style={styles.optionText}>{item}</Text>
            </Pressable>
          )
        )}

        {/* Special Instructions */}
        <Text style={styles.sectionTitle}>Special Instructions</Text>
        <TextInput
          style={styles.input}
          placeholder="E.g., Wash separately, do not tumble dry..."
          value={instructions}
          onChangeText={setInstructions}
          multiline
        />

        {/* Checkboxes */}
        <View style={styles.optionRow}>
          <Pressable onPress={() => setUseSoftener(!useSoftener)}>
            <Ionicons
              name={useSoftener ? "checkbox" : "square-outline"}
              size={20}
              color="#0D47A1"
            />
          </Pressable>
          <Text style={styles.optionText}>Use fabric softener</Text>
        </View>

        <View style={styles.optionRow}>
          <Pressable onPress={() => setStainTreatment(!stainTreatment)}>
            <Ionicons
              name={stainTreatment ? "checkbox" : "square-outline"}
              size={20}
              color="#0D47A1"
            />
          </Pressable>
          <Text style={styles.optionText}>Stain treatment</Text>
        </View>

        <View style={styles.optionRow}>
          <Pressable onPress={() => setDryerSheet(!dryerSheet)}>
            <Ionicons
              name={dryerSheet ? "checkbox" : "square-outline"}
              size={20}
              color="#0D47A1"
            />
          </Pressable>
          <Text style={styles.optionText}>Use dryer sheet</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.confirmBtn} 
          onPress={()=> router.push('/(tabs)/homepage/order_summary')}
          >
          <Text style={styles.confirmText}>Confirm Services</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  safeArea: { 
    flex: 1, 
    backgroundColor: "#fff" 
    },

  container: { 
    flex: 1, 
    padding: 20 
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
    fontWeight: "600" 
},
});
