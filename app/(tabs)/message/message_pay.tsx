import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function MessagePay() {
  const { shopName, message, time } = useLocalSearchParams();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
      <Ionicons name="arrow-back" size={18} color="#2d2d2dff"  />

        <Image
          source={require("@/assets/images/washndry.png")}
          style={styles.logo}
        />
        <Text style={styles.headerTitle}>{shopName}</Text>
        <Entypo name="dots-three-vertical" size={20} color="#000" />
      </View>

      {/* Date */}
      <Text style={styles.dateText}>Tuesday, 15 April</Text>

      {/* Order Card */}
      <View style={styles.card}>
        <Text style={styles.cardText}>
          {message} {"\n\n"}
          Your laundry order has been reviewed by our staff.{"\n\n"}
          <Text style={{ fontWeight: "bold" }}>Total Amount Due:</Text> ₱500.00
          {"\n\n"}
          Breakdown:{"\n"}
          Weight: 0.75kg{"\n"}
          Wash & Dry: ₱200.00{"\n"}
          Steam Press: ₱100.00{"\n"}
          Folding: ₱50.00{"\n"}
          Pickup & Delivery Fee: ₱150.00{"\n\n"}
          Please review and confirm to proceed.
        </Text>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.payBtn}
            onPress={() => alert("Proceeding to Payment")}
          >
            <Text style={styles.payBtnText}>Proceed to Pay</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => router.back()}
          >
            <Text style={styles.cancelBtnText}>Cancel Order</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Timestamp */}
      <Text style={styles.timestamp}>{time}</Text>

      {/* Message Input Bar */}
      <View style={styles.inputBar}>
        <Ionicons name="image-outline" size={24} color="#555" />
        <Ionicons name="camera-outline" size={24} color="#555" style={{ marginLeft: 10 }} />
        <Entypo name="plus" size={24} color="#555" style={{ marginLeft: 10 }} />
        <TextInput
          placeholder="Type a message"
          style={styles.textInput}
          placeholderTextColor="#888"
        />
        <Ionicons name="happy-outline" size={24} color="#555" />
        <Ionicons name="mic-outline" size={24} color="#555" style={{ marginLeft: 10 }} />
        <Ionicons name="send" size={24} color="#555" style={{ marginLeft: 10 }} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#87CEFA",
    padding: 10,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  dateText: {
    textAlign: "center",
    marginVertical: 10,
    color: "#555",
  },
  card: {
    backgroundColor: "#fff",
    margin: 15,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  cardText: {
    fontSize: 16,
    color: "#000",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
  },
  payBtn: {
    backgroundColor: "#89CFF0",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  payBtnText: {
    color: "#000000ff",
    fontWeight: "bold",
    fontSize: 16,
  },
  cancelBtn: {
    backgroundColor: "rgba(248, 0, 0, 1)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  cancelBtnText: {
    color: "#000000ff",
    fontWeight: "bold",
    fontSize: 16,
  },
  timestamp: {
    textAlign: "right",
    marginRight: 20,
    color: "#555",
  },
  inputBar: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#e6e6e6",
  padding: 8,
  borderRadius: 20,
  position: "absolute",   
  bottom: 10,
  left: 10,
  right: 10,
},

  textInput: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 16,
    paddingVertical: 5,
    color: "#000",
  },
});
