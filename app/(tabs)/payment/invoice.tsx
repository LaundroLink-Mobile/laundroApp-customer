import React, { useLayoutEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useNavigation, useLocalSearchParams } from "expo-router";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

export default function Invoice() {
  const router = useRouter();
  const navigation = useNavigation();
  const { invoice, amount, status, date } = useLocalSearchParams();

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
      headerTitle: () => <Text style={styles.headerText}>INVOICE</Text>,
      headerLeft: () => (
        <TouchableOpacity onPress={() => router.back()} style={{ paddingHorizontal: 15 }}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleDownload = async () => {
    try {
      const html = `
        <html>
          <head>
            <style>
              body { font-family: Arial; padding: 20px; background-color: #f4f6f8; }
              h2 { text-align: center; color: #004aad; }
              .section { background-color: #fff; padding: 15px; margin-bottom: 15px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); }
              h3 { color: #333; margin-bottom: 8px; }
              p { margin: 3px 0; }
              .table { width: 100%; border-collapse: collapse; }
              .table th, .table td { border: 1px solid #eee; padding: 8px; word-wrap: break-word; }
              .table th { background-color: #f1f1f1; text-align: center; }
              .table td.item { text-align: left; min-width: 120px; }
              .table td.qty, .table td.price, .table td.total { text-align: center; min-width: 60px; }
              .discount { color: red; font-weight: bold; }
              .summary-row { display: flex; justify-content: space-between; margin: 5px 0; }
              .summary-row .label { font-weight: bold; }
              .footer { text-align: center; font-style: italic; margin-top: 20px; color: #555; }
            </style>
          </head>
          <body>
            <div class="section">
              <h2>LaundroLink Invoice</h2>
              <p><b>Invoice #:</b> ${invoice || "INV-2025-0911-001"}</p>
              <p><b>Invoice Date:</b> ${date || "25 Sept 2025"}</p>
            </div>

            <div class="section">
              <h3>Customer Details</h3>
              <p>👤 MJ Dimapas</p>
              <p>📞 +63 123 456 789</p>
              <p>🏠 123 St., Cebu City</p>
            </div>

            <div class="section">
              <h3>Order Breakdown</h3>
              <table class="table">
                <tr>
                  <th>Item</th><th>Qty</th><th>Price</th><th>Total</th>
                </tr>
                <tr>
                  <td class="item">Laundry (Wash & Fold)</td>
                  <td class="qty">5 kg</td>
                  <td class="price">₱50/kg</td>
                  <td class="total">₱250</td>
                </tr>
                <tr>
                  <td class="item">Service Fee</td>
                  <td class="qty">-</td>
                  <td class="price">-</td>
                  <td class="total">₱50</td>
                </tr>
                <tr>
                  <td class="item">Delivery Fee</td>
                  <td class="qty">-</td>
                  <td class="price">-</td>
                  <td class="total">₱70</td>
                </tr>
                <tr>
                  <td class="item discount">Discount Promo</td>
                  <td class="qty">-</td>
                  <td class="price">-</td>
                  <td class="total discount">-₱20</td>
                </tr>
              </table>
            </div>

            <div class="section">
              <h3>Summary</h3>
              <div class="summary-row"><span class="label">Subtotal:</span> <span>₱370</span></div>
              <div class="summary-row"><span class="label">Discount:</span> <span class="discount">-₱20</span></div>
              <div class="summary-row"><span class="label">Total:</span> <span><b>${amount || "₱350"}</b></span></div>
            </div>

            <div class="section">
              <h3>Payment</h3>
              <p>💳 Method: GCash</p>
              <p>Status: <b>${status || "Paid"}</b> (${date || "9 Sept 2025"})</p>
            </div>

            <p class="footer">💙 Thank you for trusting LaundroLink! 💙</p>
          </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({ html });
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
      } else {
        Alert.alert("PDF Generated", `Saved to: ${uri}`);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to generate invoice PDF");
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
      {/* Invoice Info */}
      <View style={styles.sectionCard}>
        <Text style={styles.label}>Invoice #:</Text>
        <Text style={styles.value}>{invoice || "INV-2025-0911-001"}</Text>
        <Text style={styles.label}>Invoice Date:</Text>
        <Text style={styles.value}>{date || "25 Sept 2025"}</Text>
      </View>

      {/* Customer Details */}
      <View style={styles.sectionCard}>
        <Text style={styles.subHeader}>Customer Details</Text>
        <View style={styles.customerRow}>
          <Ionicons name="person-circle-outline" size={20} color="#004aad" />
          <Text style={styles.customerText}>MJ Dimpas</Text>
        </View>
        <View style={styles.customerRow}>
          <Ionicons name="call-outline" size={20} color="#004aad" />
          <Text style={styles.customerText}>+63 123 456 789</Text>
        </View>
        <View style={styles.customerRow}>
          <Ionicons name="location-outline" size={20} color="#004aad" />
          <Text style={styles.customerText}>123 St., Cebu City</Text>
        </View>
      </View>

      {/* Order Breakdown */}
      <View style={styles.sectionCard}>
        <Text style={styles.subHeader}>Order Breakdown</Text>
        <View style={[styles.row, styles.tableHeader]}>
          <Text style={styles.tableItem}>Item</Text>
          <Text style={styles.tableQty}>Qty</Text>
          <Text style={styles.tablePrice}>Price</Text>
          <Text style={styles.tableTotal}>Total</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.tableItem}>Laundry (Wash & Fold)</Text>
          <Text style={styles.tableQty}>5 kg</Text>
          <Text style={styles.tablePrice}>₱50/kg</Text>
          <Text style={styles.tableTotal}>₱250</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.tableItem}>Service Fee</Text>
          <Text style={styles.tableQty}>-</Text>
          <Text style={styles.tablePrice}>-</Text>
          <Text style={styles.tableTotal}>₱50</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.tableItem}>Delivery Fee</Text>
          <Text style={styles.tableQty}>-</Text>
          <Text style={styles.tablePrice}>-</Text>
          <Text style={styles.tableTotal}>₱70</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.tableItem, styles.discount]}>Discount Promo</Text>
          <Text style={styles.tableQty}>-</Text>
          <Text style={styles.tablePrice}>-</Text>
          <Text style={[styles.tableTotal, styles.discount]}>-₱20</Text>
        </View>
      </View>

      {/* Summary */}
      <View style={styles.sectionCard}>
        <Text style={styles.subHeader}>Summary</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.label}>Subtotal:</Text>
          <Text style={styles.value}>₱370</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.label}>Discount:</Text>
          <Text style={[styles.value, styles.discount]}>-₱20</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={[styles.label, styles.bold]}>Total:</Text>
          <Text style={[styles.value, styles.bold]}>{amount || "₱350"}</Text>
        </View>
      </View>

      {/* Payment Info */}
      <View style={styles.sectionCard}>
        <Text style={styles.subHeader}>Payment</Text>
        <View style={styles.paymentRow}>
          <Ionicons name="card-outline" size={20} color="#004aad" />
          <Text style={styles.paymentText}>GCash</Text>
        </View>
        <View style={styles.paymentRow}>
          <Ionicons name="checkmark-circle-outline" size={20} color={status === "Paid" ? "green" : status === "Cancelled" ? "red" : "orange"} />
          <Text style={[styles.paymentText, status === "Paid" ? { color: "green", fontWeight: "bold" } : status === "Cancelled" ? { color: "red", fontWeight: "bold" } : { color: "orange", fontWeight: "bold" }]}>
            {status || "Paid"} ({date || "9 Sept 2025"})
          </Text>
        </View>
      </View>

      {/* Download Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.btn} onPress={handleDownload}>
          <Ionicons name="download-outline" size={20} color="#fff" />
          <Text style={styles.btnText}>Download / Share PDF</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>💙 Thank you for trusting LaundroLink! 💙</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f6f8" },
  headerText: { fontSize: 20, fontWeight: "bold", color: "#000" },

  sectionCard: {
    backgroundColor: "#f0f8ff",
    padding: 15,
    marginHorizontal: 10,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },

  subHeader: { fontWeight: "bold", fontSize: 16, marginBottom: 8, color: "#333" },

  customerRow: { flexDirection: "row", alignItems: "center", marginVertical: 3 },
  customerText: { fontSize: 14, color: "#333", marginLeft: 8 },

  row: { 
    flexDirection: "row", 
    borderBottomWidth: 1, 
    borderColor: "#eee", 
    paddingVertical: 8, 
    alignItems: "center",
    flexWrap: "wrap",
  },
  tableHeader: { backgroundColor: "#d6e8ff" },
  tableItem: { flex: 3, fontSize: 14, color: "#333", paddingRight: 5, minWidth: 120 },
  tableQty: { flex: 1, textAlign: "center", fontSize: 14, minWidth: 40 },
  tablePrice: { flex: 1, textAlign: "center", fontSize: 14, minWidth: 60 },
  tableTotal: { flex: 1, textAlign: "center", fontSize: 14, fontWeight: "bold", minWidth: 60 },

  bold: { fontWeight: "bold" },
  discount: { color: "red", fontWeight: "bold" },

  label: { fontSize: 14, color: "#555", flex: 1 },
  value: { fontSize: 14, color: "#000", marginBottom: 3, flex: 1, textAlign: "right" },

  summaryRow: { flexDirection: "row", justifyContent: "space-between", marginVertical: 3, alignItems: "center" },

  paymentRow: { flexDirection: "row", alignItems: "center", marginVertical: 5 },
  paymentText: { fontSize: 14, color: "#333", marginLeft: 8 },

  buttonContainer: { padding: 15, alignItems: "center" },
  btn: {
    flexDirection: "row",
    backgroundColor: "#1E90FF",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  btnText: { color: "#fff", fontWeight: "bold", marginLeft: 10, fontSize: 15 },

  footer: { textAlign: "center", marginVertical: 20, fontStyle: "italic", color: "#555", fontSize: 13 },
});
