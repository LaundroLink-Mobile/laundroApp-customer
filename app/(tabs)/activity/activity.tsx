import { Link, useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Activity() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerStyle: { 
        backgroundColor: "#89CFF0",
        borderBottomWidth: 1.5,        
        borderBottomColor: "#5EC1EF",
      },
      headerTintColor: "#5EC1EF",
      headerShadowVisible: false,
      headerTitle: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              color: "#2d2d2dff",
              marginLeft: 5,
              fontSize: 20,
              fontWeight: "600",
            }}
          >
            Activity
          </Text>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      {/* Recent Order */}
      <Text style={styles.sectionTitle}>Recent Order</Text>
      <View style={styles.card}>
        <Image source={require("@/assets/images/washndry.png")} style={styles.logo} />
        <View style={styles.details}>
          <Text style={styles.orderId}>#LAU123456</Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>IN PROGRESS</Text>
          </View>
          <Text style={styles.orderText}>Pickup: Apr 30, 02:00PM</Text>
          <Text style={styles.orderText}>Delivery: May 1, 03:00PM</Text>
          <Text style={styles.orderText}>Total: ₱ 450.00</Text>
          <TouchableOpacity style={styles.viewButton}>
            <Text style={styles.viewButtonText}>View Details</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Order History */}
      <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Order History</Text>

      {[
        { id: "#CBI927648", date: "Feb 27", logo: require("@/assets/images/sparklean.jpg") },
        { id: "#IJE638975", date: "Mar 15", logo: require("@/assets/images/washnwait.jpg") },
        { id: "#ABC078365", date: "Apr 02", logo: require("@/assets/images/laundry.avif") },
      ].map((item, index) => (
        <View key={index} style={styles.historyCard}>
          <Image source={item.logo} style={styles.historyLogo} />
          <View style={styles.historyDetails}>
            <Text style={styles.historyId}>{item.id}</Text>
            <Text style={styles.historyDate}>{item.date}</Text>
          </View>
          <View style={styles.deliveredBadge}>
            <Text style={styles.deliveredText}>DELIVERED</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  orderId: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
   statusBadge: {
    backgroundColor: "#BAFFA6",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 5,
    alignSelf: "flex-end",
    marginVertical: 5,
    borderWidth: 2,
    borderColor: "#35B412",
  },

  statusText: {
    fontWeight: "bold",
    color: "#2d2d2dff",
  },
  orderText: {
    fontSize: 14,
    color: "#333",
  },
  viewButton: {
    backgroundColor: "#89CFF0",
    marginTop: 8,
    paddingVertical: 6,
    borderRadius: 5,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#0D47A1",
  },

  viewButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
  historyCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  historyLogo: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  historyDetails: {
    flex: 1,
  },
  historyId: {
    fontSize: 16,
    fontWeight: "bold",
  },
  historyDate: {
    fontSize: 14,
    color: "#333",
  },
  deliveredBadge: {
    backgroundColor: "#A7D8F7",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: "#0D47A1",
  },

  deliveredText: {
    color: "#000",
    fontWeight: "bold",
  },
});