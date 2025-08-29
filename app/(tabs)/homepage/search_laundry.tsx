import { Text, View, StyleSheet, Pressable, Image, FlatList, ScrollView, Modal, TouchableOpacity, TextInput } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import { Link } from "expo-router";

const shops = [
  { id: "1", name: "Wash N Dry - Agus", distance: "1 km", rating: "4.0", image: "https://via.placeholder.com/100/4169E1/FFFFFF?text=Fauget" },
  { id: "2", name: "Laundry - Ibabao", distance: "1 km", rating: "4.0", image: "https://via.placeholder.com/100/800080/FFFFFF?text=Ibabao" },
  { id: "3", name: "24H-Laundry - Looc", distance: "1 km", rating: "4.0", image: "https://via.placeholder.com/100/FFD580/000000?text=24H" },
  { id: "4", name: "Laundry FS - Apas", distance: "1 km", rating: "4.0", image: "https://via.placeholder.com/100/FFC0CB/000000?text=FS" },
];

const suggestions = ["Laundry Cleaning", "Washdry", "Sparklean"];
const locations = ["Gem's Paradise", "Home", "CTU-Main"];

export default function SearchLaundryScreen() {
  const navigation = useNavigation();
  const [currentLocation, setCurrentLocation] = useState(locations[0]);
  const [modalVisible, setModalVisible] = useState(false);
  const [query, setQuery] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerStyle: { backgroundColor: "#47cbe2ff" },
      headerTintColor: "#fff",
      headerShadowVisible: false,
      headerTitle: () => (
        <Pressable
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="location-outline" size={18} color="#2d2d2dff" />
          <Text style={{ color: "#2d2d2dff", marginLeft: 6, fontSize: 16, fontWeight: "600" }}>
            {currentLocation}
          </Text>
          <Ionicons name="chevron-down" size={16} color="#2d2d2dff" style={{ marginLeft: 4 }} />
        </Pressable>
      ),
    });
  }, [navigation, currentLocation]);

  // 🔎 Filter shops based on query
  const filteredShops = shops.filter(shop =>
    shop.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={{ flex: 1 }}>
      {/* 🔹 Modal Dropdown for locations */}
      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            {locations.map((loc, homepage) => (
              <TouchableOpacity
                key={homepage}
                style={styles.modalItem}
                onPress={() => {
                  setCurrentLocation(loc);
                  setModalVisible(false);
                }}
              >
                <Text style={styles.modalText}>{loc}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>

      <ScrollView style={styles.container}>
        {/* ✅ Real search bar with TextInput */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Search laundry shops"
            placeholderTextColor="#888"
            value={query}
            onChangeText={setQuery}
            autoFocus={true} // 👈 opens keyboard automatically
          />
        </View>

        {/* Suggested keywords */}
        {query === "" && (
          <>
            <Text style={styles.sectionTitle}>You may want to search</Text>
            <View style={styles.suggestionContainer}>
              {suggestions.map((s, homepage) => (
                <Pressable key={homepage} style={styles.suggestionChip} onPress={() => setQuery(s)}>
                  <Text style={styles.suggestionText}>{s}</Text>
                </Pressable>
              ))}
            </View>
          </>
        )}

        {/* Recommended / Filtered shops */}
        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
        {query === "" ? "Recommended" : "Search Results"}
        </Text>
        <FlatList
            data={filteredShops}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.shopList}
            renderItem={({ item }) => (
                <Link 
                href={{
                    pathname: "./about_laundry",
                    params: { id: item.id, name: item.name, image: item.image, distance: item.distance, rating: item.rating }
                }}
                asChild
                >
                <Pressable style={styles.shopRow}>
                    <Image source={{ uri: item.image }} style={styles.shopRowImage} />
                    <View style={styles.shopRowDetails}>
                    <Text style={styles.shopRowName}>{item.name}</Text>
                    <Text style={styles.shopRowInfo}>
                        {item.distance} • ⭐ {item.rating}
                    </Text>
                    </View>
                </Pressable>
                </Link>
            )}
            ListEmptyComponent={() => (
                <Text style={{ textAlign: "center", marginTop: 20, color: "#555" }}>
                No shops found.
                </Text>
            )}
            />

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f3f3f3ff', 
    paddingTop: 20, 
    paddingHorizontal: 16 
  },

  // 🔍 Search Bar
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
  icon: { marginRight: 8 },
  input: { flex: 1, fontSize: 16, color: '#000' },

  // 📌 Section title
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: "bold", 
    marginBottom: 12 
  },

  // 💡 Suggestions (chips)
  suggestionContainer: { 
    flexDirection: "row", 
    flexWrap: "wrap", 
    marginBottom: 10 
  },
  suggestionChip: {
    backgroundColor: "#e0e0e0",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  suggestionText: { fontSize: 14, color: "#333" },

  // 🏪 Shop Grid Card (Recommended view)
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
    marginBottom: 8 
  },
  shopName: { 
    fontSize: 14, 
    fontWeight: "600", 
    textAlign: "center" 
  },
  shopDetails: { 
    fontSize: 12, 
    color: "#555", 
    marginTop: 4 
  },

  // 📋 Shop Row (Search results view)
  shopList: { paddingBottom: 20 },
  shopRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginVertical: 6,
    padding: 10,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  shopRowImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 12,
  },
  shopRowDetails: { flex: 1 },
  shopRowName: { 
    fontSize: 16, 
    fontWeight: "600", 
    marginBottom: 4 
  },
  shopRowInfo: { 
    fontSize: 13, 
    color: "#555" 
  },

  // 📌 Modal
  modalOverlay: { 
    flex: 1, 
    backgroundColor: "rgba(0,0,0,0.3)", 
    justifyContent: "center", 
    alignItems: "center" 
  },
  modalContainer: { 
    backgroundColor: "#fff", 
    borderRadius: 10, 
    padding: 10, 
    width: 250 
  },
  modalItem: { 
    paddingVertical: 12, 
    paddingHorizontal: 10 
  },
  modalText: { 
    fontSize: 16, 
    color: "#333" 
  },
});

