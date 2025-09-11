import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
} from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { useRouter, Stack } from "expo-router"; 

export default function AvailableServices() {
  const router = useRouter();
  const [selectedServices, setSelectedServices] = useState<number[]>([]);

  const services = [
    {
      id: 1,
      name: "WASHING",
      icon: <MaterialCommunityIcons name="washing-machine" size={40} color="#004aad" />,
    },
    {
      id: 2,
      name: "STEAM PRESS",
      icon: <MaterialCommunityIcons name="iron" size={40} color="#004aad" />,
    },
    {
      id: 3,
      name: "DRY CLEANING",
      icon: <FontAwesome5 name="tshirt" size={40} color="#004aad" />,
    },
    {
      id: 4,
      name: "FOLDING",
      icon: <Ionicons name="basket" size={40} color="#004aad" />,
    },
  ];

  const toggleService = (id: number) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#89CFF0",
          },
          headerShadowVisible: false,
          headerTintColor: "#2d2d2dff",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#000" style={{ marginLeft: 10 }} />
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <Text
              style={{
                color: "#2d2d2dff",
                fontSize: 20,
                fontWeight: "600",
                marginLeft: 20,
              }}
            >
              Available Services
            </Text>
          ),
        }}
      />

      {/* Content */}
      <View style={styles.wrapper}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.shopSection}>
            <Image
              source={require("@/assets/images/washndry.png")}
              style={styles.shopImage}
            />
            <Text style={styles.shopName}>Wash n’ Dry</Text>
          </View>

          <Text style={styles.instruction}>
            Please select the service(s) you need:
          </Text>

          <View style={styles.grid}>
            {services.map((service) => (
              <TouchableOpacity
                key={service.id}
                style={[
                  styles.card,
                  selectedServices.includes(service.id) && styles.cardSelected,
                ]}
                onPress={() => toggleService(service.id)}
              >
                {service.icon}
                <Text style={styles.serviceName}>{service.name}</Text>
                {selectedServices.includes(service.id) && (
                  <Ionicons
                    name="checkmark-circle"
                    size={22}
                    color="#2ecc71"
                    style={styles.checkIcon}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Next Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => router.push("/(tabs)/homepage/laundry_details")}
        >
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  safeArea: { 
    flex: 1, 
    backgroundColor: "#f6f6f6" 
  },

  container: { 
    alignItems: "center", 
    padding: 20, 
    paddingBottom: 100 
  },

  wrapper: { 
    flex: 1 
  },

  shopSection: { 
    alignItems: "center", 
    marginTop: 20 
  },

  shopImage: { 
    width: 120, 
    height: 120, 
    resizeMode: "contain", 
    borderRadius: 10 
  },
  
  shopName: { 
    fontSize: 18, 
    fontWeight: "bold", 
    color: "#000", 
    marginTop: 8 
  },

  instruction: { 
    textAlign: "center", 
    marginVertical: 15, 
    fontSize: 14, 
    color: "#333" 
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 38,
  },

  card: {
    width: "45%",
    backgroundColor: "#D8F1FF",
    borderRadius: 12,
    paddingVertical: 30,
    alignItems: "center",
    marginBottom: 20,
    position: "relative",
  },

  cardSelected: { 
    borderColor: "#004aad", 
    borderWidth: 2 
  },

  serviceName: { 
    fontSize: 15, 
    fontWeight: "bold", 
    color: "#000", 
    marginTop: 10 
  },

  checkIcon: { 
    position: "absolute", 
    top: 8, 
    right: 8 
  },

  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    backgroundColor: "#f6f6f6",
  },

  nextButton: {
    backgroundColor: "#004aad",
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: "center",
  },

  nextText: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "bold" 
  },
});
