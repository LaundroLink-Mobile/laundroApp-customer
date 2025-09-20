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
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// Profile type
interface Profile {
  avatar: string | null;
  name: string;
  phone: string;
  email: string;
  addresses: string[];
  paymentMethod: string;
}

// Default profile data
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

  // Update profile fields
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

  return (
    <SafeAreaView style={styles.safe}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#89CFF0" },
          headerShadowVisible: false,
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
            <Text style={{ color: "#2d2d2dff", fontSize: 20, fontWeight: "600", marginLeft: 20 }}>
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
            <TouchableOpacity style={styles.avatarWrap}>
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
            />

            <TextInput
              style={[styles.input, !isEditing && styles.readonly]}
              value={profile.email}
              onChangeText={(t) => updateField("email", t)}
              editable={isEditing}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={styles.sectionTitle}>Saved Addresses</Text>
            {profile.addresses.map((addr, i) => (
              <View key={i} style={styles.addrRow}>
                <TextInput
                  style={[styles.input, styles.addressInput, !isEditing && styles.readonly]}
                  value={addr}
                  onChangeText={(t) => updateField("addresses", t, i)}
                  editable={isEditing}
                  multiline
                />
                {isEditing && (
                  <TouchableOpacity style={styles.removeBtn} onPress={() => removeAddress(i)}>
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
            />
          </View>
        </ScrollView>

        {/* Edit/Save Button */}
        <View style={styles.editRow}>
          <TouchableOpacity
            style={[styles.editButton, isEditing && styles.saveButton]}
            onPress={toggleEdit}
          >
            <Text style={styles.editButtonText}>{isEditing ? "Save" : "Edit"}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#e6f7fb" },
  flex: { flex: 1 },
  container: { padding: 20, paddingBottom: 80 },
  header: { alignItems: "center", paddingVertical: 20, marginTop: 20 },
  avatarWrap: { marginBottom: 8 },
  avatar: { width: 90, height: 90, borderRadius: 45 },
  avatarPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#2f6b78",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarInitial: { color: "#fff", fontSize: 36, fontWeight: "600" },
  name: { fontSize: 20, fontWeight: "700", marginTop: 4 },
  form: { marginTop: 14 },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e2e2e2",
  },
  readonly: { color: "#333" },
  sectionTitle: { fontSize: 18, fontWeight: "600", marginBottom: 8 },
  addrRow: { marginBottom: 8 },
  addressInput: { minHeight: 48, textAlignVertical: "top" },
  removeBtn: { alignSelf: "flex-end", marginTop: 6 },
  removeText: { color: "#a33", fontSize: 13 },
  addAddrBtn: { marginVertical: 8 },
  addAddrText: { color: "#0b5170", fontWeight: "600" },
  editRow: { position: "absolute", left: 0, right: 0, bottom: 18, paddingHorizontal: 20 },
  editButton: { backgroundColor: "#0D47A1", paddingVertical: 14, borderRadius: 6, alignItems: "center" },
  saveButton: { backgroundColor: "#0D47A1" },
  editButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
