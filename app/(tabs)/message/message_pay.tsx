import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";

type Message = {
  id: string;
  text: string;
  sender: string;
  type?: string;
};

export default function MessagePay() {
  const { shopName, message, time } = useLocalSearchParams();
  const router = useRouter();

  // Create initial messages
  const initialMessages: Message[] = [
    { id: "1", text: message as string, sender: "shop" },
  ];

  // Add confirmation message only for certain shops
  if (shopName === "Wash n' Dry") {
    initialMessages.push({
      id: "2",
      text:
        "Your laundry order has been reviewed by our staff.\n\n" +
        "🧾 Breakdown:\n" +
        "• Weight: 0.75kg\n" +
        "• Wash & Dry: ₱200.00\n" +
        "• Steam Press: ₱100.00\n" +
        "• Folding: ₱50.00\n" +
        "• Pickup & Delivery Fee: ₱150.00\n\n" +
        "💵 Total Amount Due: ₱500.00\n\n" +
        "Please review and confirm to proceed.",
      sender: "shop",
      type: "confirmation",
    });
  }

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState("");

  // Send message function
  const handleSend = () => {
    if (inputMessage.trim() === "") return;
    const newMsg = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
    };
    setMessages([...messages, newMsg]);
    setInputMessage("");
  };

  // Handle actions for confirmation
// Handle actions for confirmation
const handleConfirm = () => {
  router.push("/(tabs)/payment/pay"); 
};

const handleCancel = () => {
  alert("Order Cancelled ❌");
  router.push("/(tabs)/message/message");
};


  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => router.push("/(tabs)/message/message")}>
            <Ionicons name="arrow-back" size={24} color="#2d2d2dff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{shopName}</Text>
        </View>
        <Entypo name="dots-three-vertical" size={20} color="#000" />
      </View>

      {/* Messages List */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        style={{ flex: 1, padding: 15 }}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageBubble,
              item.sender === "user" ? styles.userBubble : styles.shopBubble,
            ]}
          >
            <Text style={styles.messageText}>{item.text}</Text>

            {/* Confirm/Cancel buttons only if it's a confirmation type */}
            {item.type === "confirmation" && (
              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.payBtn} onPress={handleConfirm}>
                  <Text style={styles.payBtnText}>Confirm & Pay</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
                  <Text style={styles.cancelBtnText}>Cancel Order</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      />

      {/* Timestamp */}
      <Text style={styles.timestamp}>{time}</Text>

      {/* Input Bar */}
      <View style={styles.inputBar}>
        <Ionicons name="image-outline" size={24} color="#555" />
        <Ionicons
          name="camera-outline"
          size={24}
          color="#555"
          style={{ marginLeft: 10 }}
        />
        <Entypo name="plus" size={24} color="#555" style={{ marginLeft: 10 }} />

        <TextInput
          placeholder="Type a message"
          value={inputMessage}
          onChangeText={setInputMessage}
          style={styles.textInput}
          placeholderTextColor="#888"
        />

        <Ionicons name="happy-outline" size={24} color="#555" />
        <Ionicons
          name="mic-outline"
          size={24}
          color="#555"
          style={{ marginLeft: 10 }}
        />
        <TouchableOpacity onPress={handleSend}>
          <Ionicons
            name="send"
            size={24}
            color="#1E90FF"
            style={{ marginLeft: 10 }}
          />
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
    justifyContent: "space-between",
    backgroundColor: "#87CEFA",
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 10,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: "80%",
  },
  shopBubble: { backgroundColor: "#eee", alignSelf: "flex-start" },
  userBubble: { backgroundColor: "#89CFF0", alignSelf: "flex-end" },
  messageText: { fontSize: 16, color: "#000" },
  timestamp: {
    textAlign: "center",
    color: "#555",
    marginVertical: 10,
    fontSize: 12,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  payBtn: {
    backgroundColor: "#89CFF0",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  payBtnText: {
    color: "#000000ff",
    fontWeight: "bold",
    fontSize: 14,
  },
  cancelBtn: {
    backgroundColor: "rgba(248, 0, 0, 1)",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  cancelBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e6e6e6",
    padding: 8,
    borderRadius: 20,
    margin: 10,
  },
  textInput: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 16,
    paddingVertical: 5,
    color: "#000",
  },
});
