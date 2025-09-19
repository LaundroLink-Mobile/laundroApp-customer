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
import { Ionicons } from "@expo/vector-icons";
import { useRouter, Stack } from "expo-router";

export default function AvailableServices() {
  const router = useRouter();
  const [selectedServices, setSelectedServices] = useState<number[]>([]);

  const services = [
    { id: 1, name: "Wash, Dry, and Fold" },
    { id: 2, name: "Wash, Dry, and Press" },
    { id: 3, name: "Wash and Dry" },
    { id: 4, name: "Press only" },
    { id: 5, name: "Full Service (Wash, Dry, Press, and Fold)" },
  ];

  const serviceNames = services
    .filter((service) => selectedServices.includes(service.id))
    .map((service) => service.name);

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
              <Ionicons
                name="arrow-back"
                size={24}
                color="#000"
                style={{ marginLeft: 10 }}
              />
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

          <View style={styles.servicesList}>
            {services.map((service) => (
              <TouchableOpacity
                key={service.id}
                style={[
                  styles.serviceOption,
                  selectedServices.includes(service.id) &&
                    styles.serviceOptionSelected,
                ]}
                onPress={() => toggleService(service.id)}
              >
                <Ionicons
                  name={
                    selectedServices.includes(service.id)
                      ? "checkbox"
                      : "square-outline"
                  }
                  size={22}
                  color="#000"
                  style={{ marginRight: 10 }}
                />
                <Text style={styles.serviceText}>{service.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Next Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() =>
            router.push({
              pathname: "/(tabs)/homepage/laundry_details",
              params: { services: JSON.stringify(serviceNames) },
            })
          }
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
    backgroundColor: "#f6f6f6",
  },
  container: {
    alignItems: "center",
    padding: 20,
    paddingBottom: 100,
  },
  wrapper: {
    flex: 1,
  },
  shopSection: {
    alignItems: "center",
    marginTop: 20,
  },
  shopImage: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    borderRadius: 10,
  },
  shopName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginTop: 8,
  },
  instruction: {
    textAlign: "center",
    marginVertical: 15,
    fontSize: 14,
    color: "#333",
  },
  servicesList: {
    marginTop: 20,
    width: "100%",
  },
  serviceOption: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D8F1FF",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  serviceOptionSelected: {
    borderColor: "#004aad",
    borderWidth: 2,
  },
  serviceText: {
    fontSize: 15,
    color: "#000",
    fontWeight: "500",
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
    fontWeight: "bold",
  },
});