import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

interface Profile {
  avatar: string | null;
  name: string;
  phone: string;
  email: string;
  addresses: string[];
  paymentMethod: string;
}

const defaultProfile: Profile = {
  avatar: null,
  name: "MJ Dimpas",
  phone: "+639123456789",
  email: "mjdimpas123@gmail.com",
  addresses: ["123 Jasmine St., Cebu City", "456 Main St., Lapu-Lapu City"],
  paymentMethod: "GCash",
};

export default function ProfileScreen() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Update field logic remains the same
  const updateField = (
    field: keyof Profile,
    value: string,
    index: number | null = null
  ) => {
    if (field === "addresses" && index !== null) {
      const newAddrs = [...profile.addresses];
      newAddrs[index] = value;
      setProfile({ ...profile, addresses: newAddrs });
    } else if (field !== "avatar" && field !== "name") {
      setProfile({ ...profile, [field]: value } as Profile);
    }
  };

  const addAddress = () => {
    setProfile({ ...profile, addresses: [...profile.addresses, ""] });
  };

  const removeAddress = (index: number) => {
    const newAddrs = profile.addresses.filter((_, i) => i !== index);
    setProfile({ ...profile, addresses: newAddrs });
  };

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  // 📸 Pick Image Function
  const pickImage = async () => {
    if (!isEditing) return; // only allow when editing

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission needed", "Please allow photo library access.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfile({ ...profile, avatar: result.assets[0].uri });
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#6EC1E4" },
          headerShadowVisible: false,
          headerTintColor: "#fff",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons
                name="arrow-back"
                size={24}
                color="#fff"
                style={{ marginLeft: 10 }}
              />
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <Text
              style={{
                color: "#fff",
                fontSize: 20,
                fontWeight: "700",
                marginLeft: 20,
              }}
            >
              Profile
            </Text>
          ),
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        <ScrollView contentContainerStyle={styles.container}>
          {/* Profile Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.avatarWrap} onPress={pickImage}>
              {profile.avatar ? (
                <Image source={{ uri: profile.avatar }} style={styles.avatar} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Text style={styles.avatarInitial}>
                    {profile.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </Text>
                </View>
              )}
              {isEditing && (
                <View style={styles.cameraOverlay}>
                  <Ionicons name="camera" size={22} color="#fff" />
                </View>
              )}
            </TouchableOpacity>
            <Text style={styles.name}>{profile.name}</Text>
          </View>

          {/* Profile Info */}
          <View style={styles.form}>
            <TextInput
              style={[styles.input, !isEditing && styles.readonly]}
              value={profile.phone}
              onChangeText={(t) => updateField("phone", t)}
              editable={isEditing}
              keyboardType="phone-pad"
              placeholder="Phone number"
              placeholderTextColor="#aaa"
            />

            <TextInput
              style={[styles.input, !isEditing && styles.readonly]}
              value={profile.email}
              onChangeText={(t) => updateField("email", t)}
              editable={isEditing}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="Email address"
              placeholderTextColor="#aaa"
            />

            <Text style={styles.sectionTitle}>Saved Addresses</Text>
            {profile.addresses.map((addr, i) => (
              <View key={i} style={styles.addrRow}>
                <TextInput
                  style={[
                    styles.input,
                    styles.addressInput,
                    !isEditing && styles.readonly,
                  ]}
                  value={addr}
                  onChangeText={(t) => updateField("addresses", t, i)}
                  editable={isEditing}
                  multiline
                  placeholder="Enter address"
                  placeholderTextColor="#aaa"
                />
                {isEditing && (
                  <TouchableOpacity
                    style={styles.removeBtn}
                    onPress={() => removeAddress(i)}
                  >
                    <Text style={styles.removeText}>Remove</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}

            {isEditing && (
              <TouchableOpacity style={styles.addAddrBtn} onPress={addAddress}>
                <Text style={styles.addAddrText}>+ Add address</Text>
              </TouchableOpacity>
            )}

            <Text style={styles.sectionTitle}>Payment Method</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.readonly]}
              value={profile.paymentMethod}
              onChangeText={(t) => updateField("paymentMethod", t)}
              editable={isEditing}
              placeholder="Payment Method"
              placeholderTextColor="#aaa"
            />
          </View>
        </ScrollView>

        {/* Edit/Save Button */}
        <View style={styles.editRow}>
          <TouchableOpacity
            style={[styles.editButton, isEditing && styles.saveButton]}
            onPress={toggleEdit}
          >
            <Text style={styles.editButtonText}>
              {isEditing ? "Save" : "Edit"}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#E9F8FF" },
  flex: { flex: 1 },
  container: { padding: 20, paddingBottom: 100 },
  header: { alignItems: "center", paddingVertical: 25, marginTop: 10 },
  avatarWrap: {
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  avatar: { width: 100, height: 100, borderRadius: 50 },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#1976D2",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  avatarInitial: { color: "#fff", fontSize: 38, fontWeight: "700" },
  cameraOverlay: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#0D47A1",
    borderRadius: 20,
    padding: 6,
  },
  name: { fontSize: 22, fontWeight: "700", color: "#0B3954", marginTop: 6 },
  form: {
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    backgroundColor: "#F8FAFB",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#DCE3E7",
    color: "#333",
  },
  readonly: { color: "#555" },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0B3954",
    marginVertical: 10,
  },
  addrRow: {
    marginBottom: 10,
    backgroundColor: "#F8FAFB",
    borderRadius: 10,
    padding: 6,
  },
  addressInput: { minHeight: 50, textAlignVertical: "top" },
  removeBtn: { alignSelf: "flex-end", marginTop: 4 },
  removeText: { color: "#E53935", fontSize: 13, fontWeight: "500" },
  addAddrBtn: {
    marginVertical: 8,
    backgroundColor: "#E1F5FE",
    paddingVertical: 10,
    borderRadius: 8,
  },
  addAddrText: {
    color: "#0277BD",
    fontWeight: "700",
    textAlign: "center",
  },
  editRow: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 20,
    paddingHorizontal: 20,
  },
  editButton: {
    backgroundColor: "#1565C0",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  saveButton: { backgroundColor: "#0D47A1" },
  editButtonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
