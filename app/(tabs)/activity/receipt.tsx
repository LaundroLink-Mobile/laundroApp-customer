import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Receipt() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}>
      {/* Logo + Icon */}
      <View style={styles.header}>
        <Text style={styles.logo}>LaundroLink</Text>
        <Ionicons name="checkmark-done-circle-outline" size={80} color="#004aad" />
        <Text style={styles.successText}>Payment Successful!</Text>
      </View>

      {/* Receipt Details */}
      <View style={styles.section}>
        <Text style={styles.label}>Receipt #: <Text style={styles.value}>RCPT-2025-0911-001</Text></Text>
        <Text style={styles.label}>Date Issued: <Text style={styles.value}>01 Sept 2025</Text></Text>
      </View>

      {/* Payment Summary */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>Payment Summary</Text>
        <View style={styles.row}>
          <Text>Laundry (Wash & Fold – 5kg)</Text>
          <Text>₱250</Text>
        </View>
        <View style={styles.row}>
          <Text>Service Fee</Text>
          <Text>₱50</Text>
        </View>
        <View style={styles.row}>
          <Text>Delivery Fee</Text>
          <Text>₱70</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.bold}>Total Paid</Text>
          <Text style={styles.bold}>₱370</Text>
        </View>
      </View>

      {/* Thank You Note */}
      <View style={styles.section}>
        <Text style={styles.thankYou}>Thank you for using LaundroLink!</Text>
        <Text style={styles.note}>
          We appreciate your trust and look forward to serving you again.
        </Text>
      </View>

      {/* Contact Info */}
      <View style={styles.section}>
        <Text style={styles.note}>Need help? Send as a direct message or call (123) 456-7890
        </Text>
      </View>

      {/* Track My Order Button */}
      <TouchableOpacity style={styles.button} onPress={() => router.push("/(tabs)/activity/track_order")}>
        <Text style={styles.buttonText}>Track My Order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#89CFF0" 
},

  header: { 
    alignItems: "center", 
    marginVertical: 20 
},

  logo: { 
    fontSize: 22, 
    fontWeight: "bold", 
    color: "#004aad", 
    marginBottom: 10 
},

  successText: { 
    fontSize: 18, 
    fontWeight: "bold", 
    color: "#004aad", 
    marginTop: 10 
},

  section: { 
    padding: 20, 
    borderBottomWidth: 1, 
    borderColor: "#a3c8f0" 
},

  label: { 
    fontSize: 14, 
    marginVertical: 3 
},

  value: { 
    fontWeight: "bold" 
},

  subHeader: { 
    fontWeight: "bold", 
    fontSize: 16, 
    marginBottom: 8, 
    color: "#004aad" 
},

  row: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    marginVertical: 4 
},

  bold: { 
    fontWeight: "bold" 
},

  thankYou: { 
    fontWeight: "bold", 
    fontSize: 15, 
    marginBottom: 5, 
    textAlign: "center" 
},

  note: { 
    fontSize: 13, 
    textAlign: "center", 
    color: "#333" 
},

  button: {
    margin: 20,
    backgroundColor: "#004aad",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: { 
    color: "#fff", 
    fontWeight: "bold", 
    fontSize: 16 
},
});
