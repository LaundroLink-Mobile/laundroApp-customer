import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function Invoice() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>LaundroLink Invoice</Text>
      </View>

      {/* Invoice Details */}
      <View style={styles.section}>
        <Text>Invoice #: INV-2025-0911-001</Text>
        <Text>Invoice Date: 25 Sept 2025</Text>
      </View>

      {/* Customer Details */}
      <View style={styles.section}>
        <Text>Customer: MJ Dimapas</Text>
        <Text>Contact: +63123456789</Text>
        <Text>Delivery Address: 123 St., Cebu City</Text>
      </View>

      {/* Order Breakdown (TABLE) */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>Order Breakdown</Text>

        {/* Table Header */}
        <View style={[styles.row, styles.tableHeader]}>
          <Text style={[styles.cell, styles.bold]}>Item</Text>
          <Text style={[styles.cell, styles.bold]}>Qty</Text>
          <Text style={[styles.cell, styles.bold]}>Price</Text>
          <Text style={[styles.cell, styles.bold]}>Total</Text>
        </View>

        {/* Row 1 */}
        <View style={styles.row}>
          <Text style={styles.cell}>Laundry (Wash & Fold)</Text>
          <Text style={styles.cell}>5 kg</Text>
          <Text style={styles.cell}>₱50/kg</Text>
          <Text style={styles.cell}>₱250</Text>
        </View>

        {/* Row 2 */}
        <View style={styles.row}>
          <Text style={styles.cell}>Service Fee</Text>
          <Text style={styles.cell}>-</Text>
          <Text style={styles.cell}>-</Text>
          <Text style={styles.cell}>₱50</Text>
        </View>

        {/* Row 3 */}
        <View style={styles.row}>
          <Text style={styles.cell}>Delivery Fee</Text>
          <Text style={styles.cell}>-</Text>
          <Text style={styles.cell}>-</Text>
          <Text style={styles.cell}>₱70</Text>
        </View>

        {/* Row 4 */}
        <View style={styles.row}>
          <Text style={styles.cell}>Discount Promo</Text>
          <Text style={styles.cell}>-</Text>
          <Text style={styles.cell}>-</Text>
          <Text style={styles.cell}>-₱20</Text>
        </View>
      </View>

      {/* Summary */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>Summary</Text>
        <Text>Subtotal: ₱370</Text>
        <Text>Discount: -₱20</Text>
        <Text style={styles.bold}>Total: ₱350</Text>
      </View>

      {/* Payment */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>Payment</Text>
        <Text>Method: GCash</Text>
        <Text>Status: Paid (9 Sept 25)</Text>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>Thank you for trusting LaundroLink! 💙</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { backgroundColor: "#89CFF0", padding: 15 },
  headerText: { fontSize: 20, fontWeight: "bold", color: "#000" },
  section: { padding: 15, borderBottomWidth: 1, borderColor: "#ddd" },
  subHeader: { fontWeight: "bold", marginBottom: 5 },
  row: { flexDirection: "row", borderBottomWidth: 1, borderColor: "#eee" },
  tableHeader: { backgroundColor: "#f1f1f1" },
  cell: { flex: 1, padding: 5, fontSize: 14 },
  bold: { fontWeight: "bold" },
  footer: { textAlign: "center", marginVertical: 20, fontStyle: "italic" },
});
