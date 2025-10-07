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
import { useLocalSearchParams, useRouter, Stack } from "expo-router";

const EditProfileScreen: React.FC = () => {
  const router = useRouter();

  const { fullName, phone: passedPhone, email: passedEmail } =
    useLocalSearchParams();

  // States
  const [addresses, setAddresses] = useState<string[]>([""]);
  const [payments, setPayments] = useState<any[]>([]);
  const [profilePic, setProfilePic] = useState<string | null>(null);

  const [phone, setPhone] = useState(passedPhone ? String(passedPhone) : "");
  const [email, setEmail] = useState(passedEmail ? String(passedEmail) : "");

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentType, setPaymentType] = useState<"GCash" | "Cash" | null>(null);

  const [gcashNumber, setGcashNumber] = useState("");
  const [gcashName, setGcashName] = useState("");

  // Handlers
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
      setPayments((prev) => [
        ...prev,
        { type: "Cash", name: "Cash Payment", number: "" },
      ]);
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
          const { status } =
            await ImagePicker.requestCameraPermissionsAsync();
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
          const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
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

  // Render
  return (
    <>
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
            {/* Top Profile Card */}
            <View style={styles.profileCard}>
              <View style={{ flex: 1 }}>
                <Text style={styles.fullName}>
                  {fullName ? String(fullName) : "Customer Name"}
                </Text>
              </View>
              <TouchableOpacity onPress={changeProfilePic}>
                {profilePic ? (
                  <Image source={{ uri: profilePic }} style={styles.avatarImg} />
                ) : (
                  <View style={styles.avatarPlaceholder} />
                )}
              </TouchableOpacity>
            </View>

            {/* Contact Info (Phone + Email in one card) */}
<View style={styles.inputCard}>
  {/* Phone */}
  <Text style={styles.label}>Phone #</Text>
  <TextInput
    style={styles.textInput}
    value={phone}
    onChangeText={setPhone}
    placeholder="+639XXXXXXXXX"
    keyboardType="phone-pad"
  />

  {/* Divider Line */}
  <View style={styles.divider} />

  {/* Email */}
  <Text style={styles.label}>Email Address</Text>
  <TextInput
    style={styles.textInput}
    value={email}
    onChangeText={setEmail}
    placeholder="example@mail.com"
    keyboardType="email-address"
    autoCapitalize="none"
  />
</View>


            {/* Places */}
<Text style={styles.sectionTitle}>Places</Text>
<View style={styles.card}>
  {addresses.map((addr, index) => (
    <View key={index} style={styles.row}>
      {/* Gray box with icon */}
      <View style={styles.iconPlaceholder}>
        <Text style={styles.iconText}>🏠</Text>
      </View>

      <TextInput
        style={styles.rowText}
        value={addr}
        onChangeText={(text) => {
          const updated = [...addresses];
          updated[index] = text;
          setAddresses(updated);
        }}
        placeholder="Enter Address"
      />

      {addresses.length > 1 && (
        <TouchableOpacity onPress={() => removeAddress(index)}>
          <Text style={styles.removeText}>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  ))}

  {/* Add Places */}
  <TouchableOpacity style={styles.row} onPress={addAddress}>
    <View style={styles.iconPlaceholder}>
      <Text style={styles.iconText}>➕</Text>
    </View>
    <Text style={styles.addText}>Add Places</Text>
  </TouchableOpacity>
</View>

{/* Payment */}
<Text style={styles.sectionTitle}>Payment Method</Text>
<View style={styles.card}>
  {payments.map((p, index) => (
    <View key={index} style={styles.row}>
      {/* Gray box with dynamic icon */}
      <View style={styles.iconPlaceholder}>
        <Text style={styles.iconText}>{p.type === "GCash" ? "📱" : "💵"}</Text>
      </View>

      <Text style={styles.rowText}>
        {p.type === "GCash"
          ? `GCash - ${p.name} (${p.number})`
          : `Cash - ${p.name}`}
      </Text>

      <TouchableOpacity onPress={() => removePayment(index)}>
        <Text style={styles.removeText}>✕</Text>
      </TouchableOpacity>
    </View>
  ))}

  {/* Add Payment */}
  <TouchableOpacity style={styles.row} onPress={addPayment}>
    <View style={styles.iconPlaceholder}>
      <Text style={styles.iconText}>➕</Text>
    </View>
    <Text style={styles.addText}>Add Payment Method</Text>
  </TouchableOpacity>
</View>


            {/* Save Button */}
            <TouchableOpacity style={styles.saveBtn} onPress={saveProfile}>
              <Text style={styles.saveBtnText}>Save</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>

        {/* Payment Modal */}
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
                 <Text style={styles.modalTitle}>
  {paymentType} Information
</Text>

{paymentType === "GCash" && (
  <View style={styles.modalForm}>
    <View style={styles.modalInputWrapper}>
      <Text style={styles.modalLabel}>GCash Name</Text>
      <TextInput
        style={styles.modalInput}
        placeholder="Enter GCash Name"
        value={gcashName}
        onChangeText={setGcashName}
      />
    </View>

    <View style={styles.modalInputWrapper}>
      <Text style={styles.modalLabel}>GCash Number</Text>
      <TextInput
        style={styles.modalInput}
        placeholder="09XXXXXXXXX"
        value={gcashNumber}
        onChangeText={setGcashNumber}
        keyboardType="phone-pad"
      />
    </View>
  </View>
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

/* 🎨 Styles */
const COLORS = {
  sky: "#89CFF0",
  white: "#FFFFFF",
  primary: "#174EA6",
  gray: "#E0E0E0",
  textDark: "#000",
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.sky },
  content: { padding: 20, paddingBottom: 50 },

  profileCard: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
    marginBottom: 20,
  },
  fullName: { fontSize: 20, fontWeight: "700", color: COLORS.textDark },
  avatarImg: { width: 60, height: 60, borderRadius: 30 },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.gray,
  },

iconPlaceholder: {
  width: 32,
  height: 32,
  backgroundColor: "#F2F2F2",
  borderRadius: 8,
  justifyContent: "center",
  alignItems: "center",
  marginRight: 12,
  shadowColor: "#000",
  shadowOpacity: 0.05,
  shadowRadius: 3,
  elevation: 2,
  borderWidth: 1,
  borderColor: "#E0E0E0",
},

iconText: {
  fontSize: 16, // smaller so it fits nicely
  color: "#555",
  fontWeight: "600",
  textAlign: "center", // ensures alignment inside
  includeFontPadding: false, // removes extra spacing on Android
  textAlignVertical: "center", // ensures vertical alignment on Android
},

  inputCard: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  label: { fontSize: 14, marginBottom: 4, color: COLORS.textDark },
  textInput: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
    paddingVertical: 4,
    color: COLORS.textDark,
  },

  sectionTitle: { fontSize: 16, fontWeight: "600", marginTop: 20, marginBottom: 6 },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
  },
  rowText: { flex: 1, fontSize: 15, marginLeft: 8, color: COLORS.textDark },
 
  addText: { marginLeft: 8, color: COLORS.primary, fontSize: 15 },
  removeText: { color: "red", fontWeight: "700", marginLeft: 6 },

  saveBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 20,
  },
  saveBtnText: { color: COLORS.white, fontSize: 16, fontWeight: "600" },

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
    padding: 20,
    width: "100%",
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
  },
  modalBtn: {
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
    alignItems: "center",
  },
  modalBtnText: { color: COLORS.white, fontSize: 15, fontWeight: "600" },

  modalForm: {
  marginTop: 10,
},

modalInputWrapper: {
  marginBottom: 14,
},

modalLabel: {
  fontSize: 14,
  fontWeight: "500",
  color: "#333",
  marginBottom: 6,
},

modalInput: {
  borderWidth: 1,
  borderColor: "#E0E0E0",
  borderRadius: 8,
  paddingHorizontal: 12,
  paddingVertical: 10,
  fontSize: 15,
  backgroundColor: "#F9F9F9",
  color: "#000",
},


  divider: {
  backgroundColor: "#E5E5E5", 
  opacity: 0.8,              
  marginVertical: 10,        
  borderRadius: 1,          
},


});

export default EditProfileScreen;
