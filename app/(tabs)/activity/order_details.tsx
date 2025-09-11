import React, { useLayoutEffect } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function OrderDetails() {
  const navigation = useNavigation();

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
            Order Details
          </Text>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        {/* Customer Info */}
        <View style={styles.section}>
          <Text style={styles.customerName}>MJ Dimpas</Text>
          <Text style={styles.customerPhone}>0917-123-4567</Text>
        </View>

        <View style={styles.divider} />

        {/* Order Info */}
        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.sectionTitle}>Order Details</Text>
            <Text style={styles.detailText}>Order ID: #LAU123456</Text>
          </View>
          <Text style={styles.detailText}>01 Sept 2025</Text>
        </View>

        <View style={styles.divider} />

        {/* Service Details */}
        <View>
          <View style={styles.rowBetween}>
            <Text style={styles.label}>Service Type:</Text>
            <Text style={styles.value}>Wash & Fold</Text>
          </View>
          <View style={styles.rowBetween}>
            <Text style={styles.label}>Pickup:</Text>
            <Text style={styles.value}>Sept 1, 2:00 PM</Text>
          </View>
          <View style={styles.rowBetween}>
            <Text style={styles.label}>Delivery:</Text>
            <Text style={styles.value}>Sept 2, 6:00 PM</Text>
          </View>
          <View style={styles.rowBetween}>
            <Text style={styles.label}>Total Amount:</Text>
            <Text style={styles.value}>₱ 370.00</Text>
          </View>
          <View style={styles.rowBetween}>
            <Text style={styles.label}>Payment Method:</Text>
            <Text style={styles.value}>GCash</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Delivery Info */}
        <View>
          <Text style={styles.sectionTitle}>Delivery Information</Text>
          <View style={styles.rowBetween}>
            <Text style={styles.label}>Type:</Text>
            <Text style={styles.value}>Pickup & Delivery</Text>
          </View>
          <View style={styles.rowBetween}>
            <Text style={styles.label}>Address:</Text>
            <Text style={[styles.value, { flex: 1, textAlign: "right" }]}>
              123 Jasmine St., Cebu City
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  card: {
    backgroundColor: "#fff",
    margin: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  section: {
    marginBottom: 12,
  },
  customerName: {
    fontSize: 18,
    fontWeight: "600",
  },
  customerPhone: {
    fontSize: 14,
    color: "#555",
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: "#ddd",
    marginVertical: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  detailText: {
    fontSize: 14,
    color: "#333",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 4,
  },
  label: {
    fontSize: 14,
    color: "#666",
  },
  value: {
    fontSize: 14,
    fontWeight: "500",
  },
});
