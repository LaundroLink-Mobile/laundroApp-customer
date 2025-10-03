import { Link, useRouter, Stack } from "expo-router";
import { View, Text, Pressable, StyleSheet, Image, FlatList } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const shops = [
  {
    id: "1",
    name: "Wash n’ Dry - Lahug",
    distance: "1.7km",
    rating: "4.5",
    image: require("@/assets/images/washndry.png"),
    description:
      "Experience top-notch laundry facilities equipped with state-of-the-art machines and a clean, comfortable environment.",
    addDescription:
      "We accept a wide variety of fabrics, including cotton, linen, polyester, denim, wool, and delicate materials like silk and lace. Whether it's everyday wear or specialty garments, your laundry is in good hands.",
    address: "Wilson St., Lahug, Cebu City",
    contact: "09223324839",
    hours: "8am-6pm",
    availability: "Available",
  },
  {
    id: "2",
    name: "Sparklean - Apas",
    distance: "1km",
    rating: "4.0",
    image: require("@/assets/images/sparklean.jpg"),
    description:
      "Offering comprehensive laundry services with a focus on quality and customer satisfaction.",
    addDescription:
      "From wash and fold to dry cleaning, we handle all types of laundry with care. Our eco-friendly detergents ensure your clothes are not only clean but also safe for the environment.",
    address: "Apas, Cebu City",
    contact: "09171234567",
    hours: "9am-7pm",
    availability: "Available",
  },
  {
    id: "3",
    name: "Laundry Cleaning - Cebu",
    distance: "1.1km",
    rating: "4.5",
    image: require("@/assets/images/laundry.avif"),
    description:
      "Your go-to laundry service for fast, reliable, and affordable cleaning solutions.",
    addDescription:
      "We specialize in handling all types of garments, ensuring they are cleaned to perfection. Our friendly staff and efficient service make laundry day a breeze.",
    address: "Cebu City",
    contact: "09339876543",
    hours: "8am-8pm",
    availability: "Available",
  },
  {
    id: "4",
    name: "Wash n’ Wait - Lahug",
    distance: "1.7km",
    rating: "4.5",
    image: require("@/assets/images/washnwait.jpg"),
    description:
      "Convenient and quick laundry services designed to fit your busy lifestyle.",
    addDescription:
      "With our state-of-the-art machines and experienced staff, we guarantee your clothes will be fresh, clean, and ready to wear in no time.",
    address: "Wilson St., Lahug, Cebu City",
    contact: "09451237890",
    hours: "7am-5pm",
    availability: "Available",
  },
];

export default function Homepage() {
  const router = useRouter();

  return (
    <>
      {/* ✅ Header setup */}
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#89CFF0",
            borderBottomWidth: 1.5,
            borderBottomColor: "#5EC1EF",
          },
          headerTintColor: "#2d2d2dff",
          headerShadowVisible: false,
          headerLeft: () => null,
          headerTitle: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="location-outline" size={20} color="#2d2d2dff" />
              <Text
                style={{
                  color: "#2d2d2dff",
                  marginLeft: 5,
                  fontSize: 20,
                  fontWeight: "600",
                }}
              >
                Home ▼
              </Text>
            </View>
          ),
          headerRight: () => (
            <Pressable onPress={() => router.push("/(tabs)/homepage/profile")}>
              <Ionicons
                name="person-circle-outline"
                size={32}
                color="#2d2d2dff"
                style={{ marginRight: 10 }}
              />
            </Pressable>
          ),
        }}
      />

      {/* ✅ Page body */}
      <View style={styles.container}>
        {/* Search bar */}
        <Link href="./search_laundry" asChild>
          <Pressable style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#888" style={styles.icon} />
            <Text style={styles.placeholder}>Search laundry shops</Text>
          </Pressable>
        </Link>

        {/* Section title */}
        <Text style={styles.sectionTitle}>Laundry Shops Nearby</Text>

        {/* Shops grid */}
        <FlatList
          data={shops}
          numColumns={2}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.shopList}
          renderItem={({ item }) => (
            <Link
              href={{
                pathname: "./about_laundry",
                params: {
                  id: item.id,
                  name: item.name,
                  distance: item.distance,
                  rating: item.rating,
                  image: item.image,
                  description: item.description,
                  addDescription: item.addDescription,
                  address: item.address,
                  contact: item.contact,
                  hours: item.hours,
                  availability: item.availability,
                },
              }}
              asChild
            >
              <Pressable style={styles.shopCard}>
                <Image source={item.image} style={styles.shopImage} />
                <Text style={styles.shopName}>{item.name}</Text>
                <Text style={styles.shopDetails}>
                  {item.distance} • ⭐ {item.rating}
                </Text>

                {/* ✅ Availability badge */}
                <View
                  style={[
                    styles.badge,
                    { backgroundColor: item.availability === "Available" ? "#4CAF50" : "#FF5252" },
                  ]}
                >
                  <Text style={styles.badgeText}>{item.availability}</Text>
                </View>
              </Pressable>
            </Link>
          )}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fb",
    paddingTop: 30,
    paddingHorizontal: 16,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 22,
  },
  icon: {
    marginRight: 8,
  },
  placeholder: {
    fontSize: 16,
    color: "#777",
    fontWeight: "500",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
    color: "#2d2d2d",
  },
  shopList: {
    paddingBottom: 20,
  },
  shopCard: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 8,
    borderRadius: 16,
    padding: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 3,
  },
  shopImage: {
    width: 110,
    height: 110,
    borderRadius: 12,
    marginBottom: 10,
  },
  shopName: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    color: "#333",
  },
  shopDetails: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  badge: {
    marginTop: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
  },
});
