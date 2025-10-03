import React, { useState, useCallback } from "react";
import {
  Alert,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";

const EditProfileScreen: React.FC = () => {
  const router = useRouter();

  // 🟢 Get params from login/index
  const { fullName, phone: passedPhone, email: passedEmail } = useLocalSearchParams();

  /** -----------------------------
   *   STATES
   * ----------------------------- */
  const [addresses, setAddresses] = useState<string[]>([""]);
  const [payments, setPayments] = useState<any[]>([]);
  const [profilePic, setProfilePic] = useState<string | null>(null);

  const [phone, setPhone] = useState(passedPhone ? String(passedPhone) : "");
  const [email, setEmail] = useState(passedEmail ? String(passedEmail) : "");

  // 🟢 Modal states
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentType, setPaymentType] = useState<"GCash" | "Cash" | null>(null);

  // 🟢 Payment form states
  const [gcashNumber, setGcashNumber] = useState("");
  const [gcashName, setGcashName] = useState("");

  /** -----------------------------
   *   HANDLERS
   * ----------------------------- */
  const addAddress = useCallback(() => {
    setAddresses((prev) => [...prev, ""]);
  }, []);

  const removeAddress = useCallback((index: number) => {
    setAddresses((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const addPayment = useCallback(() => {
    setShowPaymentModal(true);
    setPaymentType(null);
  }, []);

  const savePayment = useCallback(() => {
    if (paymentType === "GCash") {
      if (!gcashName.trim() || !gcashNumber.trim()) {
        Alert.alert("Missing Info", "Please enter GCash Name and Number");
        return;
      }

      // Prevent duplicates
      if (payments.some((p) => p.number === gcashNumber.trim())) {
        Alert.alert("Duplicate Entry", "This GCash number already exists.");
        return;
      }

      setPayments((prev) => [
        ...prev,
        { type: "GCash", name: gcashName.trim(), number: gcashNumber.trim() },
      ]);

      setGcashName("");
      setGcashNumber("");
    } else if (paymentType === "Cash") {
      if (payments.some((p) => p.type === "Cash")) {
        Alert.alert("Already Added", "Cash payment is already listed.");
        return;
      }
      setPayments((prev) => [...prev, { type: "Cash", name: "Cash Payment", number: "" }]);
    }

    setShowPaymentModal(false);
    setPaymentType(null);
  }, [gcashName, gcashNumber, paymentType, payments]);

  const removePayment = useCallback((index: number) => {
    setPayments((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const saveProfile = useCallback(() => {
    if (!phone.trim() || !email.trim()) {
      Alert.alert("Missing Info", "Phone and Email cannot be empty.");
      return;
    }

    console.log({ phone, email, addresses, payments, profilePic });
    Alert.alert("Profile saved successfully!");
    router.replace("/homepage/homepage");
  }, [phone, email, addresses, payments, profilePic, router]);

  const changeProfilePic = useCallback(() => {
    Alert.alert("Change Profile Picture", "Choose an option", [
      {
        text: "Camera",
        onPress: async () => {
          const { status } = await ImagePicker.requestCameraPermissionsAsync();
          if (status !== "granted") {
            alert("Camera permission denied!");
            return;
          }

          const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
          });

          if (!result.canceled) {
            setProfilePic(result.assets[0].uri);
          }
        },
      },
      {
        text: "Gallery",
        onPress: async () => {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== "granted") {
            alert("Gallery permission denied!");
            return;
          }

          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
          });

          if (!result.canceled) {
            setProfilePic(result.assets[0].uri);
          }
        },
      },
      { text: "Cancel", style: "cancel" },
    ]);
  }, []);

  /** -----------------------------
   *   RENDER
   * ----------------------------- */
  return (
    <>
      {/* 🟢 Hide default Expo Router header */}
      <Stack.Screen options={{ headerShown: false }} />

      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="dark-content" />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
          >
            {/* 🟢 Avatar */}
            <View style={styles.avatarWrap}>
              {profilePic ? (
                <Image source={{ uri: profilePic }} style={styles.avatarImg} />
              ) : (
                <View style={styles.avatar}>
                  <Text style={styles.avatarInitials}>
                    {fullName ? String(fullName).charAt(0).toUpperCase() : "C"}
                  </Text>
                </View>
              )}

              {/* Pen icon overlay */}
              <TouchableOpacity style={styles.editIconWrap} onPress={changeProfilePic}>
                <MaterialIcons name="edit" size={22} color={COLORS.white} />
              </TouchableOpacity>
            </View>

            {/* 🟢 Full Name */}
            <Text style={styles.name}>
              {fullName ? String(fullName) : "Customer Name"}
            </Text>

            {/* 🟢 Phone */}
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="Edit phone number"
              placeholderTextColor={COLORS.placeholder}
              keyboardType="phone-pad"
            />

            {/* 🟢 Email */}
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Edit email address"
              placeholderTextColor={COLORS.placeholder}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            {/* 🟢 Address Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Address</Text>
                <TouchableOpacity onPress={addAddress}>
                  <Text style={styles.addBtn}>+ Add</Text>
                </TouchableOpacity>
              </View>

              {addresses.map((addr, index) => (
                <View key={index} style={styles.addressRow}>
                  <TextInput
                    style={[styles.input, { flex: 1 }]}
                    value={addr}
                    onChangeText={(text) => {
                      const updated = [...addresses];
                      updated[index] = text;
                      setAddresses(updated);
                    }}
                    placeholder="Edit Address"
                    placeholderTextColor={COLORS.placeholder}
                  />
                  {addresses.length > 1 && (
                    <TouchableOpacity
                      style={styles.removeBtn}
                      onPress={() => removeAddress(index)}
                    >
                      <Text style={styles.removeText}>✕</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </View>

            {/* 🟢 Payment Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Payment Method</Text>
                <TouchableOpacity onPress={addPayment}>
                  <Text style={styles.addBtn}>+ Add</Text>
                </TouchableOpacity>
              </View>

              {payments.map((p, index) => (
                <View key={index} style={styles.addressRow}>
                  <Text style={{ flex: 1 }}>
                    {p.type === "GCash"
                      ? `GCash - ${p.name} (${p.number})`
                      : `Cash - ${p.name}`}
                  </Text>
                  <TouchableOpacity
                    style={styles.removeBtn}
                    onPress={() => removePayment(index)}
                  >
                    <Text style={styles.removeText}>✕</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            {/* 🟢 Save Button */}
            <TouchableOpacity style={styles.saveBtn} onPress={saveProfile}>
              <Text style={styles.saveBtnText}>Save</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>

        {/* 🟢 Payment Modal */}
        <Modal visible={showPaymentModal} animationType="fade" transparent>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {!paymentType ? (
                <>
                  <Text style={styles.modalTitle}>Choose Payment Method</Text>
                  <TouchableOpacity
                    style={styles.modalBtn}
                    onPress={() => setPaymentType("GCash")}
                  >
                    <Text style={styles.modalBtnText}>GCash</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalBtn}
                    onPress={() => setPaymentType("Cash")}
                  >
                    <Text style={styles.modalBtnText}>Cash</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalBtn, { backgroundColor: "#ccc" }]}
                    onPress={() => setShowPaymentModal(false)}
                  >
                    <Text style={styles.modalBtnText}>Cancel</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Text style={styles.modalTitle}>{paymentType} Information</Text>
                  {paymentType === "GCash" && (
                    <>
                      <TextInput
                        style={styles.input}
                        placeholder="GCash Name"
                        value={gcashName}
                        onChangeText={setGcashName}
                      />
                      <TextInput
                        style={styles.input}
                        placeholder="GCash Number"
                        value={gcashNumber}
                        onChangeText={setGcashNumber}
                        keyboardType="phone-pad"
                      />
                    </>
                  )}
                  <TouchableOpacity style={styles.modalBtn} onPress={savePayment}>
                    <Text style={styles.modalBtnText}>Save</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
};

/** -----------------------------
 *   CONSTANTS & STYLES
 * ----------------------------- */
const COLORS = {
  sky: "#89CFF0",
  white: "#FFFFFF",
  primary: "#174EA6",
  placeholder: "#A0A0A0",
  textDark: "#000000",
  borderGray: "#ccc",
  lightGray: "#E0E0E0",
  iconGray: "#666666",
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.sky },
  content: { padding: 20, paddingBottom: 50 },
  avatarWrap: { alignItems: "center", marginVertical: 12, position: "relative" },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#5B8FB9",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  avatarImg: { width: 110, height: 110, borderRadius: 55 },
  avatarInitials: { fontSize: 36, fontWeight: "800", color: COLORS.white },

  editIconWrap: {
    position: "absolute",
    bottom: 0,
    right: "35%",
    backgroundColor: COLORS.primary,
    borderRadius: 18,
    padding: 8,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  name: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 18,
    color: COLORS.textDark,
  },

  input: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: COLORS.borderGray,
    color: COLORS.textDark,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },

  section: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderGray,
    paddingTop: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionTitle: { fontSize: 18, fontWeight: "700" },
  addBtn: { fontSize: 16, color: COLORS.primary, fontWeight: "600" },

  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  removeBtn: {
    marginLeft: 10,
    backgroundColor: COLORS.lightGray,
    borderRadius: 6,
    padding: 6,
  },
  removeText: { color: COLORS.iconGray, fontWeight: "700", fontSize: 14 },

  saveBtn: {
    marginTop: 32,
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },
  saveBtnText: { color: COLORS.white, fontSize: 18, fontWeight: "700" },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 24,
    width: "100%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 14,
    textAlign: "center",
  },
  modalBtn: {
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: 10,
    marginVertical: 8,
    alignItems: "center",
  },
  modalBtnText: { color: COLORS.white, fontSize: 16, fontWeight: "600" },
});

export default EditProfileScreen;
