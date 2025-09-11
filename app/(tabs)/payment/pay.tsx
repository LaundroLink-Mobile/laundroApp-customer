import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Payment() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);


  // Example total amount from your order summary
  const totalAmount = 500.0;

  // Handle GCash Payment
  const handleGCashPayment = () => {
  alert("Redirecting to GCash checkout...");
  // Simulate success
  setTimeout(() => {
    alert("✅ Payment Successful!");
    router.push("/(tabs)/message/message");
  }, 2000);
};

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#2d2d2dff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Payment Method</Text>
      </View>

      {/* Payment Options */}
      <View style={styles.content}>
        <Text style={styles.amountTitle}>Total Amount Due</Text>
        <Text style={styles.amount}>₱{totalAmount.toFixed(2)}</Text>

        <Text style={styles.subtitle}>Choose your payment method:</Text>

        {/* GCash */}
        <TouchableOpacity
          style={styles.optionCard}
          onPress={handleGCashPayment}
          disabled={loading}
        >
          <Image
            source={{ uri: "https://tse3.mm.bing.net/th/id/OIP.rEo8KqIw3Wjue1ENEPdZUAHaDt?pid=Api&P=0&h=180" }}
            style={styles.logo}
          />
          <Text style={styles.optionText}>GCash</Text>
          {loading && <ActivityIndicator style={{ marginLeft: 10 }} />}
        </TouchableOpacity>

        {/* Cash on Delivery */}
        <TouchableOpacity
          style={styles.optionCard}
          onPress={() => {
            alert("Cash on Delivery selected. Please prepare exact change. 💵");
            router.push("/(tabs)/message/message");
          }}
        >
          <Ionicons name="cash-outline" size={28} color="#2ecc71" style={styles.icon} />
          <Text style={styles.optionText}>Cash on Delivery (pickup only)</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#87CEFA",
  },
  headerTitle: { fontSize: 18, fontWeight: "bold", marginLeft: 10, color: "#000" },
  content: { padding: 20 },
  amountTitle: { fontSize: 16, color: "#555" },
  amount: { fontSize: 28, fontWeight: "bold", color: "#1E90FF", marginBottom: 20 },
  subtitle: { fontSize: 16, fontWeight: "600", marginVertical: 10 },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  optionText: { fontSize: 16, fontWeight: "600", marginLeft: 10, color: "#333" },
  logo: { width: 40, height: 40, resizeMode: "contain" },
  icon: { marginRight: 5 },
});
