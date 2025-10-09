import React, { useLayoutEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
  KeyboardAvoidingView,
  Platform,
  Modal,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function NewAddressScreen() {
  const navigation: any = useNavigation();

  // State
  const [region, setRegion] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [barangay, setBarangay] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [street, setStreet] = useState("");
  const [label, setLabel] = useState(null);
  const [isDefault, setIsDefault] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState<"region" | "province" | "city" | "barangay">(
    "region"
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "New Address",
      headerShown: true,
      headerTitleAlign: "left",
    });
  }, [navigation]);

  // Types for DATA
  type BarangayList = string[];
  type CityMap = { [city: string]: BarangayList };
  type ProvinceMap = { [province: string]: CityMap };
  type RegionMap = { [region: string]: ProvinceMap };

  // Mock Data (Region VII - Central Visayas, expanded)
const DATA: RegionMap = {
  "Region VII - Central Visayas": {
    Cebu: {
      "Lapu-Lapu City": [
        "Suba Basbas",
        "Marigondon",
        "Agus",
        "Babag",
        "Gun-ob",
        "Basak",
        "Mactan",
        "Canjulao",
        "Pajo",
        "Bankal",
        "Pusok",
        "Buaya",
      ],
      "Cebu City": [
        "Lahug",
        "Guadalupe",
        "Mabolo",
        "Talamban",
        "Banilad",
        "Tisa",
        "Basak San Nicolas",
        "Pardo",
        "Carreta",
      ],
      "Mandaue City": [
        "Alang-Alang",
        "Bakilid",
        "Banilad",
        "Basak",
        "Centro",
        "Looc",
        "Tipolo",
      ],
    },
  },
};

  const getCurrentOptions = () => {
    switch (step) {
      case "region":
        return Object.keys(DATA);
      case "province":
        return region && DATA[region]
          ? Object.keys(DATA[region] as ProvinceMap)
          : [];
      case "city":
        return region && province && DATA[region]?.[province]
          ? Object.keys((DATA[region] as ProvinceMap)[province] as CityMap)
          : [];
      case "barangay":
        return region && province && city && DATA[region]?.[province]?.[city]
          ? ((DATA[region] as ProvinceMap)[province] as CityMap)[city] as BarangayList
          : [];
      default:
        return [];
    }
  };

  const handleSelect = (item) => {
    if (step === "region") {
      setRegion(item);
      setProvince("");
      setCity("");
      setBarangay("");
      setStep("province");
    } else if (step === "province") {
      setProvince(item);
      setCity("");
      setBarangay("");
      setStep("city");
    } else if (step === "city") {
      setCity(item);
      setBarangay("");
      setStep("barangay");
    } else if (step === "barangay") {
      setBarangay(item);
      setShowModal(false);
      setStep("region");
    }
  };

  const isFormComplete =
    region && province && city && barangay && postalCode.trim() && street.trim();

 const handleSubmit = () => {
  if (!isFormComplete) return;

  const newAddress = {
    region,
    province,
    city,
    barangay,
    postalCode,
    street,
    label,
    isDefault,
  };

  // Optional: Save to AsyncStorage or backend later if needed
  console.log("Saved Address:", newAddress);

  // Navigate back to EditProfile and pass address
  navigation.navigate("editProfile", { savedAddress: newAddress });
};

  const displayAddress = [region, province, city, barangay]
    .filter(Boolean)
    .join(", ");

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Address Section */}
          <View style={styles.card}>
            <Text style={styles.sectionHeader}>Address</Text>

            {/* Region/Province/City/Barangay Selector */}
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowModal(true)}
            >
              <Text
                style={{
                  color: displayAddress ? "#111" : "#888",
                  fontSize: 15,
                }}
              >
                {displayAddress || "Region, Province, City, Barangay"}
              </Text>
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              placeholder="Postal Code"
              placeholderTextColor="#888"
              value={postalCode}
              onChangeText={setPostalCode}
              keyboardType="numeric"
            />

            <TextInput
              style={styles.input}
              placeholder="Street Name, Building, House No."
              placeholderTextColor="#888"
              value={street}
              onChangeText={setStreet}
            />
          </View>

          {/* Default Address + Label */}
          <View style={styles.card}>
            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Set as Default Address</Text>
              <Switch
                value={isDefault}
                onValueChange={setIsDefault}
                thumbColor={isDefault ? "#fff" : "#f4f3f4"}
                trackColor={{ false: "#d3d3d3", true: "#0D47A1" }}
              />
            </View>

            <Text style={styles.labelHeader}>Label As:</Text>
            <View style={styles.labelRow}>
              {["Work", "Home"].map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.labelButton,
                    label === type && styles.activeLabelButton,
                  ]}
                  onPress={() => setLabel(type)}
                >
                  <Text
                    style={[
                      styles.labelText,
                      label === type && styles.activeLabelText,
                    ]}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Submit Button */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.submitButton, !isFormComplete && styles.disabled]}
            onPress={handleSubmit}
            disabled={!isFormComplete}
          >
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Modal for Selection */}
      <Modal visible={showModal} animationType="slide">
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {step === "region"
                ? "Select Region"
                : step === "province"
                ? "Select Province"
                : step === "city"
                ? "Select City"
                : "Select Barangay"}
            </Text>
            <TouchableOpacity onPress={() => setShowModal(false)}>
              <Text style={styles.modalClose}>✕</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={getCurrentOptions()}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.option}
                onPress={() => handleSelect(item)}
              >
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => (
              <View style={styles.separator} />
            )}
          />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

/* 🎨 Styles */
const COLORS = {
  background: "#89CFF0",
  card: "#FFFFFF",
  border: "#E5E7EB",
  textDark: "#111827",
  placeholder: "#9CA3AF",
  primary: "#0D47A1",
  gray: "#D1D5DB",
};

const styles = StyleSheet.create({
  
  safeArea: { 
    flex: 1, 
    backgroundColor: COLORS.background 
},

  scrollContent: { 
    padding: 20, 
    paddingBottom: 50, 
    paddingTop: 33 
},

  card: {
    backgroundColor: COLORS.card,
    borderRadius: 14, 
    padding: 18, 
    marginBottom: 20,
    elevation: 3, 
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
},

  sectionHeader: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.textDark,
    marginBottom: 12,
  },

  input: {
    backgroundColor: "#FAFAFA",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: COLORS.textDark,
    marginBottom: 10,
  },

  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  switchLabel: { 
    fontSize: 15, 
    fontWeight: "600", 
    color: COLORS.textDark 
},

  labelHeader: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.textDark,
    marginBottom: 10,
  },

  labelRow: { 
    flexDirection: "row", 
    gap: 12 
},

  labelButton: {
    flex: 1,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#F3F4F6",
  },

  activeLabelButton: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  labelText: {
    fontSize: 15,
    color: COLORS.textDark,
    fontWeight: "500",
  },

  activeLabelText: { 
    color: "#fff", 
    fontWeight: "700" 
},

  footer: {
  position: "absolute",
  bottom: 10, 
  width: "100%",
  padding: 20,
},

submitButton: {
  backgroundColor: COLORS.primary,
  borderRadius: 12, 
  paddingVertical: 15,
  alignItems: "center",
  justifyContent: "center",
  shadowColor: COLORS.primary,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 6,
  elevation: 3,
},

  disabled: { 
    backgroundColor: COLORS.gray 
},

  submitText: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "700" 
},

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },

  modalTitle: { 
    fontSize: 18, 
    fontWeight: "600", 
    color: COLORS.textDark 
},

  modalClose: { 
    fontSize: 20, 
    color: "#888" 
},

  option: { 
    padding: 16 
},

  optionText: { 
    fontSize: 16, 
    color: COLORS.textDark 
},

  separator: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginHorizontal: 16,
  },
});
