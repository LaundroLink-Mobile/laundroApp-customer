import { useLayoutEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useNavigation } from "expo-router";
import { HeaderTitle } from "@react-navigation/elements";


export default function Message() {
  const router = useRouter();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerStyle: {
        backgroundColor: "#89CFF0",
        borderBottomWidth: 1.5,
        borderBottomColor: "#5EC1EF",
      },
      headerTintColor: "#2d2d2dff",
      headerShadowVisible: false,
      headerTitle: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
      
          <Text style={styles.headerTitle}>Messages</Text>
        </View>
      ),
    });
  }, [navigation]);

  // Sample message data
  const messages = [
    {
      logo: require("@/assets/images/washndry.png"),
      title: "Wash n' Dry",
      message: "Order update: Price confirmed",
      time: "08:26PM",
    },
    {
      logo: require("@/assets/images/24hour.jpg"),
      title: "24-Hour Laundry",
      message: "Good day! I just wanted to say thank you for your excellent laundry service...",
      time: "08:26PM",
    },
    {
      logo: require("@/assets/images/laundry.avif"),
      title: "Laundry Cleaning",
      message: "Thank you for the great service! My clothes came back fresh and neatly folded...",
      time: "05:50PM",
    },
    {
      logo: require("@/assets/images/sparklean.jpg"),
      title: "Sparklean Laundry",
      message: "Appreciate your fast and reliable laundry service. Always happy with the results!",
      time: "01:15PM",
    },
    {
      logo: require("@/assets/images/washnwait.jpg"),
      title: "Wash n Wait",
      message: "Clothes were perfectly cleaned and well taken care of. Thank you for the excellent work!",
      time: "27 Mar 2025",
    },
    {
      logo: require("@/assets/images/vlaundry.jpg"),
      title: "V Laundry",
      message: "Very impressed with your service, as always! Keep up the good work.",
      time: "07 Mar 2025",
    },
    {
      logo: require("@/assets/images/fauget.jpg"),
      title: "Fauget Laundry",
      message: "Thank you!",
      time: "15 Feb 2025",
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      {messages.map((item, index) => (
        <Pressable
          key={index}
          style={styles.card}
          onPress={() => {
            router.push({
              pathname: "/message/message_pay",
              params: {
                shopName: item.title,
                message: item.message,
                time: item.time,
              },
            });
          }}
        >
          <Image source={item.logo} style={styles.logo} />
          <View style={styles.messageContent}>
            <View style={styles.headerRow}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
            <Text style={styles.message} numberOfLines={1}>
              {item.message}
            </Text>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
  },
  headerTitle:{
    color: "#2d2d2dff",
                fontSize: 20,
                fontWeight: "600",          
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  messageContent: {
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  time: {
    fontSize: 12,
    color: "#666",
  },
  message: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
});
