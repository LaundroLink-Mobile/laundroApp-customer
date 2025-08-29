import { Link, useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import { View, Text, Pressable, StyleSheet, Image, FlatList } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";


const shops = [
  { id: "1", name: "Wash n’ Dry - Lahug", distance: "1.7km", rating: "4.5", image: "https://via.placeholder.com/100/0000FF/FFFFFF?text=Wash+Dry" },
  { id: "2", name: "Sparklean - Apas", distance: "1km", rating: "4.0", image: "https://via.placeholder.com/100/90EE90/000000?text=Sparklean" },
  { id: "3", name: "Laundry Cleaning - Cebu", distance: "1.1km", rating: "4.5", image: "https://via.placeholder.com/100/FFD580/000000?text=Laundry" },
  { id: "4", name: "Wash n’ Wait - Lahug", distance: "1.7km", rating: "4.5", image: "https://via.placeholder.com/100/4682B4/FFFFFF?text=Wash+Wait" },
];

export default function Homepage() {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
        headerShown: true,
        headerStyle: { backgroundColor: "#47cbe2ff" },
        headerTintColor: "#fff",
        headerShadowVisible: false,
        headerTitle: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="location-outline" size={20} color="#2d2d2dff" />
            <Text style={{ color: "#2d2d2dff", marginLeft: 5, fontSize: 16, fontWeight: "600" }}>
                Home ▼
            </Text>
            </View>
        ),
        headerRight: () => (
            <Ionicons name="person-circle-outline" size={32} color="#2d2d2dff" style={{ marginRight: 10 }} />
        ),
        });
    }, [navigation]);

  return (
    <View style={styles.container}>
        {/* Search bar */}
        <Link href="./search_laundry" asChild>
            <Pressable style={styles.searchBar} onPress={() => console.log("Search Laundry Shops")}>
                <Ionicons name="search" size={20} color="#888" style={styles.icon} />
                <Text style={styles.placeholder}>Search laundry shops</Text>
            </Pressable>
        </Link>

        {/* Section title */}
        <Text style={styles.sectionTitle}>Laundry Shops nearby</Text>

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
                    params: { id: item.id, name: item.name, image: item.image, distance: item.distance, rating: item.rating }
                }}
                asChild
                >
                <Pressable style={styles.shopCard}>
                    <Image source={{ uri: item.image }} style={styles.shopImage} />
                    <Text style={styles.shopName}>{item.name}</Text>
                    <Text style={styles.shopDetails}>{item.distance} • ⭐ {item.rating}</Text>
                </Pressable>
                </Link>
            )}
        />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3ff',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitleText: {
    color: "#fff",
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "600",
  },
  headerRight: {
    marginRight: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 20,
  },
  icon: {
    marginRight: 8,
  },
  placeholder: {
    fontSize: 16,
    color: '#888',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  shopList: {
    paddingBottom: 20,
  },
  shopCard: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 8,
    borderRadius: 12,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  shopImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginBottom: 8,
  },
  shopName: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  shopDetails: {
    fontSize: 12,
    color: "#555",
    marginTop: 4,
  },
});
