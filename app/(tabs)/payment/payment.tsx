import { Link, router, useNavigation, useRouter } from "expo-router";
import { useLayoutEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

export default function Payment() {
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
            Payment
          </Text>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Recent Payment */}
      <Text style={styles.sectionTitle}>Recent Payment</Text>
      <View style={styles.recentCard}>
        <View style={styles.recentRow}>
          <Text style={styles.date}>Apr 30, 2025</Text>
          <Text style={styles.amount}>₱ 450.00</Text>
        </View>
        <View style={styles.recentRow}>
          <Text style={styles.invoice}>#LAU123456</Text>
          <Text style={styles.paid}>Paid</Text>
        </View>
         <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/(tabs)/payment/invoice")}
      >
        <Text style={styles.buttonText}>View Invoice</Text>
      </TouchableOpacity>
      </View>

      {/* Payment History */}
      <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Payment History</Text>
      
      {[
        { date: "Apr 30", amount: "₱ 450.00", status: "Paid", invoice: "#LAU123456" },
        { date: "Apr 02", amount: "₱ 250.00", status: "Cancelled", invoice: "#ABC078365" },
        { date: "Mar 15", amount: "₱ 300.00", status: "Paid", invoice: "#IJE638975" },
        { date: "Feb 27", amount: "₱ 400.00", status: "Refunded", invoice: "#CBI927648" },
        { date: "Feb 10", amount: "₱ 350.00", status: "Paid", invoice: "#XYZ123456" },
        { date: "Jan 25", amount: "₱ 500.00", status: "Paid", invoice: "#LMN654321" },
        { date: "Jan 10", amount: "₱ 275.00", status: "Cancelled", invoice: "#QRS987654" },
        { date: "Dec 30", amount: "₱ 600.00", status: "Paid", invoice: "#TUV321987" },
        { date: "Dec 15", amount: "₱ 425.00", status: "Refunded", invoice: "#GHI456789" },
        { date: "Nov 28", amount: "₱ 375.00", status: "Paid", invoice: "#JKL789123" },    
        // you can add more here for testing scrolling
      ].map((item, index) => (
        <View key={index} style={styles.historyCard}>
          <View style={styles.historyRow}>
            <Text style={styles.historyDate}>{item.date}</Text>
            <Text style={styles.historyAmount}>{item.amount}</Text>

            <Text 
              style={[
                styles.historyStatus,
                item.status == "Cancelled" && {color: "red"},
                item.status == "Refunded" && {color: "orange"},
                item.status == "Paid" && {color: "green"},
              ]}
              >
                {item.status}
                </Text>
          </View>
          <Text style={styles.historyInvoice}>{item.invoice}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40, 
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
     color: "#000",
  },
  recentCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  recentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  date: { fontSize: 16, fontWeight: "500" },
  amount: { fontSize: 16, fontWeight: "600" },
  invoice: { fontSize: 14, color: "#555" },
  paid: { fontSize: 14, color: "green", fontWeight: "500" },
  
  button: {
    backgroundColor: "#89CFF0",
    borderRadius: 8,
    paddingVertical: 8,
    marginTop: 8,
    alignItems: "center",
     borderWidth: 1.5,
    borderColor: "#0D47A1",
  },
  buttonText: {
    color: "#000",
    fontWeight: "600",
  },
  historyCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: "#ccc",
  },
  historyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  historyDate: { 
    fontSize: 14, 
    fontWeight: "500",
    flex: 1, 
  },
  historyAmount: { 
  fontSize: 14, 
  fontWeight: "600", 
  width: 90,      
  textAlign: "center",
},
historyStatus: { 
  fontSize: 14, 
  fontWeight: "500", 
  flex: 1, 
  textAlign: "right", 
},
  historyInvoice: { fontSize: 12, color: "#555", marginTop: 2 },
});
