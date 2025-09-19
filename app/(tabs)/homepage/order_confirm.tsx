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
import { Stack, useRouter, useLocalSearchParams } from "expo-router";

// ✅ Generate a random Order ID like #LAU123456
function generateOrderId() {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `#LAU${randomNum}`;
}

export default function OrderConfirmationScreen() {
  const router = useRouter();
  const { services, fabrics, addons, instructions, deliveryOption } =
    useLocalSearchParams();

  // Parse arrays safely (if passed as JSON strings)
  const parsedServices = services ? JSON.parse(services as string) : [];
  const parsedFabrics = fabrics ? JSON.parse(fabrics as string) : [];
  const parsedAddons = addons ? JSON.parse(addons as string) : [];
  const parsedInstructions = instructions ? JSON.parse(instructions as string) : [];

  // Generate orderId once
  const [orderId] = React.useState(generateOrderId());

  // Format today's date
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  // Different notes based on delivery option
  const deliveryNotes: Record<string, string> = {
    "Drop-off at Shop":
      "You will bring your laundry directly to the shop. No pickup or delivery fees.",
    "Pickup Only":
      "A rider will be booked by the shop to pick up your laundry. You’ll return to the shop to collect it.",
    "Pickup & Delivery":
      "A rider will be booked by the shop to pick up your laundry and deliver it back to your doorstep.\n\nDelivery fee will be confirmed and sent to you.",
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
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
            <Text style={styles.headerTitle}>Order Confirmation</Text>
          ),
        }}
      />

      {/* Scrollable Content */}
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Order Info */}
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <Text style={styles.orderId}>Order ID: {orderId}</Text>
            <Text style={styles.date}>{formattedDate}</Text>
          </View>
        </View>

        {/* Selected Services */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Selected Services</Text>
          {parsedServices.length > 0 ? (
            parsedServices.map((s: string, i: number) => (
              <Text key={i} style={styles.listItem}>
                • {s}
              </Text>
            ))
          ) : (
            <Text style={styles.listItem}>• No services selected</Text>
          )}
        </View>

        {/* Laundry Details */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Laundry Details</Text>

          {/* Fabrics */}
          <Text style={styles.subTitle}>Fabric Type(s)</Text>
          {parsedFabrics.length > 0 ? (
            parsedFabrics.map((f: string, i: number) => (
              <Text key={i} style={styles.listItem}>
                • {f}
              </Text>
            ))
          ) : (
            <Text style={styles.listItem}>• None</Text>
          )}

          {/* Add-ons */}
          <Text style={styles.subTitle}>Add-ons</Text>
          {parsedAddons.length > 0 ? (
            parsedAddons.map((a: string, i: number) => (
              <Text key={i} style={styles.listItem}>
                • {a}
              </Text>
            ))
          ) : (
            <Text style={styles.listItem}>• None</Text>
          )}

          {/* Instructions */}
          <Text style={styles.subTitle}>Special Instructions</Text>
          {parsedInstructions.length > 0 ? (
            parsedInstructions.map((ins: string, i: number) => (
              <Text key={i} style={styles.listItem}>
                • {ins}
              </Text>
            ))
          ) : (
            <Text style={styles.listItem}>• None</Text>
          )}
        </View>

        {/* Delivery Option */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Delivery Option</Text>
          <Text style={styles.listItem}>
            • {deliveryOption || "Not selected"}
          </Text>
          <Text style={styles.note}>
            {deliveryNotes[deliveryOption as string] || ""}
          </Text>
        </View>
      </ScrollView>

      {/* Back to Home Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/(tabs)/homepage/homepage")}
        >
          <Text style={styles.buttonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 20 },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  headerTitle: {
    color: "#2d2d2dff",
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 20,
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  orderId: { fontSize: 16, fontWeight: "600", color: "#004aad" },
  date: { fontSize: 14, color: "#666" },
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
  listItem: { fontSize: 14, marginBottom: 4, color: "#333" },
  note: { fontSize: 13, color: "#444", marginTop: 6, lineHeight: 18 },
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
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});