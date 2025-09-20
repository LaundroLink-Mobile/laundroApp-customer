import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
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
} from "react-native";

const EditProfileScreen: React.FC = () => {
  const router = useRouter();

  // Get data from login/index
  const { fullName, phone: passedPhone, email: passedEmail } = useLocalSearchParams();

  const [addresses, setAddresses] = useState<string[]>([""]);
  const [payments, setPayments] = useState<any[]>([]);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [phone, setPhone] = useState(passedPhone ? String(passedPhone) : "");
  const [email, setEmail] = useState(passedEmail ? String(passedEmail) : "");

  // Modal states
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentType, setPaymentType] = useState<"GCash" | "Cash" | null>(null);

  // Payment form states
  const [gcashNumber, setGcashNumber] = useState("");
  const [gcashName, setGcashName] = useState("");

  const addAddress = () => {
    setAddresses([...addresses, ""]);
  };

  const removeAddress = (index: number) => {
    const updated = addresses.filter((_, i) => i !== index);
    setAddresses(updated);
  };

  const addPayment = () => {
    setShowPaymentModal(true);
    setPaymentType(null);
  };

  const savePayment = () => {
    if (paymentType === "GCash") {
      if (!gcashName || !gcashNumber) {
        Alert.alert("Please enter GCash info");
        return;
      }
      setPayments([...payments, { type: "GCash", name: gcashName, number: gcashNumber }]);
      setGcashName("");
      setGcashNumber("");
    } else if (paymentType === "Cash") {
      setPayments([...payments, { type: "Cash", name: "Cash Payment", number: "" }]);
    }

    setShowPaymentModal(false);
    setPaymentType(null);
  };

  const removePayment = (index: number) => {
    const updated = payments.filter((_, i) => i !== index);
    setPayments(updated);
  };

  const saveProfile = () => {
    console.log({ phone, email, addresses, payments, profilePic });
    Alert.alert("Profile saved!");
    router.replace("/homepage/homepage");
  };

  const changeProfilePic = () => {
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
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.content}>
        {/* Avatar */}
        <View style={styles.avatarWrap}>
          {profilePic ? (
            <Image source={{ uri: profilePic }} style={styles.avatarImg} />
          ) : (
            <View style={styles.avatar}>
              <Text style={styles.avatarInitials}>
                {fullName ? String(fullName).charAt(0) : "C"}
              </Text>
            </View>
          )}

          {/* Pen icon overlay */}
          <TouchableOpacity style={styles.editIconWrap} onPress={changeProfilePic}>
            <MaterialIcons name="edit" size={22} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        {/* Full Name (display only) */}
        <Text style={styles.name}>{fullName ? String(fullName) : "Customer Name"}</Text>

        {/* Phone (editable) */}
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="Edit phone number"
          placeholderTextColor={COLORS.placeholder}
          keyboardType="phone-pad"
        />

        {/* Email (editable) */}
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Edit email address"
          placeholderTextColor={COLORS.placeholder}
          keyboardType="email-address"
        />

        {/* Address */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Address</Text>
            <TouchableOpacity onPress={addAddress}>
              <Text style={styles.addBtn}>Add</Text>
            </TouchableOpacity>
          </View>

          {addresses.map((addr, index) => (
            <View key={index} style={styles.addressRow}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                value={addresses[index]}
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

        {/* Payment */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Payment Method</Text>
            <TouchableOpacity onPress={addPayment}>
              <Text style={styles.addBtn}>Add</Text>
            </TouchableOpacity>
          </View>

          {payments.map((p, index) => (
            <View key={index} style={styles.addressRow}>
              <Text style={{ flex: 1 }}>
                {p.type === "GCash"
                  ? `GCash - ${p.name} (${p.number})`
                  : `Cash - ${p.name} (${p.number})`}
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

        {/* Save Button */}
        <TouchableOpacity style={styles.saveBtn} onPress={saveProfile}>
          <Text style={styles.saveBtnText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal */}
      <Modal visible={showPaymentModal} animationType="slide" transparent>
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
                {paymentType === "GCash" ? (
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
                ) : null}
                <TouchableOpacity style={styles.modalBtn} onPress={savePayment}>
                  <Text style={styles.modalBtnText}>Save</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

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
  content: { padding: 20, paddingBottom: 32 },
  avatarWrap: { alignItems: "center", marginVertical: 12 },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#5B8FB9",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarImg: { width: 100, height: 100, borderRadius: 50 },
  avatarInitials: { fontSize: 32, fontWeight: "800", color: COLORS.white },
  editIconWrap: {
    position: "absolute",
    bottom: 0,
    right: 120,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    padding: 6,
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 16,
  },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: COLORS.borderGray,
    color: COLORS.textDark,
  },
  section: {
    marginTop: 18,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderGray,
    paddingTop: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  sectionTitle: { fontSize: 18, fontWeight: "700" },
  addBtn: { fontSize: 16, color: COLORS.primary, fontWeight: "600" },
  addressRow: { flexDirection: "row", alignItems: "center", marginVertical: 4 },
  removeBtn: {
    marginLeft: 10,
    backgroundColor: COLORS.lightGray,
    borderRadius: 4,
    padding: 6,
  },
  removeText: { color: COLORS.iconGray, fontWeight: "700", fontSize: 14 },
  saveBtn: {
    marginTop: 28,
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
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
    borderRadius: 12,
    padding: 20,
    width: "100%",
  },
  modalTitle: { fontSize: 20, fontWeight: "700", marginBottom: 12, textAlign: "center" },
  modalBtn: {
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
    alignItems: "center",
  },
  modalBtnText: { color: COLORS.white, fontSize: 16, fontWeight: "600" },
});

export default EditProfileScreen;
