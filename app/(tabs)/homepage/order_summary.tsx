import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";

export default function OrderSummaryScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#89CFF0",
          },
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
            <Text
              style={{
                color: "#2d2d2dff",
                fontSize: 20,
                fontWeight: "600",
                marginLeft: 20,
              }}
            >
              Order Summary
            </Text>
          ),
        }}
      />

      {/* Scrollable content */}
<ScrollView
  style={styles.container}
  contentContainerStyle={{ paddingBottom: 120 }}
>
  {/* Order Info */}
  <View style={styles.card}>
    <View style={styles.rowBetween}>
      <Text style={styles.orderId}>Order ID: #LAU123456</Text>
      <Text style={styles.date}>18 Apr 2025</Text>
    </View>
  </View>

  {/* Selected Services */}
  <View style={styles.card}>
    <Text style={styles.sectionTitle}>Selected Services</Text>
    <View style={styles.listGroup}>
      <Text style={styles.listItem}>• Washing</Text>
      <Text style={styles.listItem}>• Steam Press</Text>
      <Text style={styles.listItem}>• Folding</Text>
    </View>
  </View>

  {/* Laundry Details */}
  <View style={styles.card}>
    <Text style={styles.sectionTitle}>Laundry Details</Text>

    <Text style={styles.subTitle}>Fabric Type(s)</Text>
    <View style={styles.listGroup}>
      <Text style={styles.listItem}>• Cotton</Text>
      <Text style={styles.listItem}>• Denim</Text>
      <Text style={styles.listItem}>• Other fabric type: Wool</Text>
    </View>

    <Text style={styles.subTitle}>Detergent Preference</Text>
    <View style={styles.listGroup}>
      <Text style={styles.listItem}>• Regular</Text>
    </View>

    <Text style={styles.subTitle}>Special Instructions</Text>
    <View style={styles.listGroup}>
      <Text style={styles.listItem}>• Use fabric softener</Text>
      <Text style={styles.listItem}>• Do not tumble dry</Text>
    </View>
  </View>
</ScrollView>


      {/* Fixed Proceed Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/(tabs)/homepage/df_payment")}
        >
          <Text style={styles.buttonText}>Proceed</Text>
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
    paddingHorizontal: 16,
    paddingTop: 30,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  text: {
    fontSize: 18,
    color: "#333",
  },
  section: {
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingVertical: 10,
    marginBottom: 10,
  },
 card: {
  backgroundColor: "#f9f9f9",
  padding: 15,
  borderRadius: 12,
  marginBottom: 15,
  shadowColor: "#000",
  shadowOpacity: 0.05,
  shadowRadius: 4,
  elevation: 2, // Android shadow
},
orderId: {
  fontSize: 16,
  fontWeight: "600",
  color: "#004aad",
},
date: {
  fontSize: 14,
  color: "#666",
},
sectionTitle: {
  fontSize: 18,
  fontWeight: "600",
  marginBottom: 10,
  color: "#000",
},
subTitle: {
  fontSize: 15,
  fontWeight: "500",
  marginTop: 10,
  marginBottom: 6,
  color: "#004aad",
},
listGroup: {
  marginLeft: 10,
},
listItem: {
  fontSize: 14,
  marginBottom: 4,
  color: "#333",
},
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#004aad",
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
