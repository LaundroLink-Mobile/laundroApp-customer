import React, { useLayoutEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useNavigation } from "expo-router";

export default function TrackOrder() {
  const router = useRouter();
  const navigation = useNavigation();

  const steps = [
    { icon: "bag-check-outline", title: "Order Placed", time: "Sept 1, 01:45PM" },
    { icon: "water-outline", title: "Washing", time: "Sept 1, 01:45PM" },
    { icon: "shirt-outline", title: "Steam Pressing", time: "Sept 1, 01:45PM" },
    { icon: "layers-outline", title: "Folding", time: "Sept 1, 01:45PM" },
    { icon: "car-outline", title: "Out for Delivery", time: "Sept 1, 01:45PM" },
  ];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerStyle: {
        backgroundColor: "#89CFF0",
        borderBottomWidth: 1.5,
        borderBottomColor: "#5EC1EF",
      },
      headerTintColor: "#000",
      headerShadowVisible: false,
      headerTitle: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              color: "#2d2d2d",
              marginLeft: 5,
              fontSize: 20,
              fontWeight: "600",
            }}
          >
            Track My Order
          </Text>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Scrollable content */}
      <ScrollView style={styles.scrollContent}>
        {/* Pickup Info */}
        <View style={styles.pickupInfo}>
          <Text style={styles.pickupTime}>01:45 - 02:00PM</Text>
          <Text style={styles.pickupNote}>
            Your order has been placed and will be picked up on Sept 1, 02:00PM
          </Text>
        </View>

        {/* Timeline */}
        <View style={styles.timeline}>
          {steps.map((step, index) => (
            <View key={index} style={styles.step}>
              <Ionicons name={step.icon as any} size={28} color="#000" style={styles.stepIcon} />
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepTime}>{step.time}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Fixed Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/(tabs)/activity/order_details")}
        >
          <Text style={styles.buttonText}>View Order Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContent: { flex: 1 },
  pickupInfo: { padding: 20 },
  pickupTime: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  pickupNote: { fontSize: 13, color: "#555" },
  timeline: { marginVertical: 20, marginLeft: 15 },
  step: { flexDirection: "row", alignItems: "flex-start", marginBottom: 25 },
  stepIcon: { marginRight: 15 },
  stepContent: { borderLeftWidth: 1, borderColor: "#aaa", paddingLeft: 15 },
  stepTitle: { fontSize: 15, fontWeight: "bold" },
  stepTime: { fontSize: 12, color: "#666" },
  footer: {
    padding: 15,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#004aad",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
