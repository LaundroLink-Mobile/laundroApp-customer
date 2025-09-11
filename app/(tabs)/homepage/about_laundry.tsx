import { useLocalSearchParams, Stack, Link } from "expo-router";
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Alert 
} from "react-native";

export default function AboutLaundry() {
  const { 
    id, name, distance, rating, image,
    description, addDescription, address,
    contact, hours, availability, reviews 
  } = useLocalSearchParams();

  // Parse reviews JSON if passed as string
  const parsedReviews = typeof reviews === "string" ? JSON.parse(reviews) : null;

  const handleConfirm = () => {
      Alert.alert("Confirmed", `You selected ${name}`);
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: name ? String(name) : "Laundry Shop",
          headerStyle: { backgroundColor: "#89CFF0" },
          headerTintColor: "#000",
        }}
      />

      <View style={styles.wrapper}>
        <ScrollView contentContainerStyle={styles.container}>
          
          {/* Shop Image */}
          <Image 
             source={image} style={styles.image} />

          {/* Name + Rating */}
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.info}>{distance} • ⭐ {rating}</Text>

          {/* Availability */}
          <Text style={[
            styles.availability, 
            availability === "Available" ? styles.available : styles.unavailable
          ]}>
            {availability}
          </Text>

          {/* Rating Breakdown */}
          {parsedReviews && (
            <View style={styles.reviewsContainer}>
              <Text style={styles.sectionTitle}>Ratings & Reviews</Text>
              {Object.keys(parsedReviews).reverse().map((star) => (
                <View key={star} style={styles.reviewRow}>
                  <Text style={styles.starLabel}>{star} ★</Text>
                  <View style={styles.barBackground}>
                    <View 
                      style={[
                        styles.barFill, 
                        { width: `${parsedReviews[star]}%` }
                      ]} 
                    />
                  </View>
                  <Text style={styles.count}>{parsedReviews[star]}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Description */}
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.description}>{addDescription}</Text>

          {/* Contact Info */}
          <Text style={styles.sectionTitle}>Contact</Text>
          <Text style={styles.infoText}>📍 {address}</Text>
          <Text style={styles.infoText}>📞 {contact}</Text>
          <Text style={styles.infoText}>⏰ {hours}</Text>
        </ScrollView>

        {/* Confirm Button */}
        <Link href="/(tabs)/homepage/avail_services" asChild>
          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
            <Text style={styles.confirmText}>Confirm</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: { 
    flex: 1, 
    backgroundColor: "#f6f6f6" },

  container: { 
    alignItems: "center", 
    padding: 20, 
    paddingBottom: 100 },

  image: { 
    width: 200, 
    height: 200, 
    borderRadius: 12, 
    marginBottom: 15 },

  title: { 
    fontSize: 22, 
    fontWeight: "bold", 
    textAlign: "center" },

  info: { 
    fontSize: 16, 
    color: "#555", 
    marginTop: 5 },

  availability: { 
    fontSize: 16, 
    marginTop: 8, 
    fontWeight: "600" },

  available: { 
    color: "green" },

  unavailable: { 
    color: "red" },

  sectionTitle: { 
    fontSize: 18, 
    fontWeight: "bold", 
    marginTop: 20, 
    marginBottom: 5, 
    alignSelf: "flex-start" },

  description: { 
    fontSize: 14, 
    color: "#444", 
    lineHeight: 20, 
    marginBottom: 10, 
    textAlign: "justify" },

  infoText: { 
    fontSize: 14, 
    color: "#333", 
    marginBottom: 4, 
    alignSelf: "flex-start" },

  reviewsContainer: { 
    width: "100%", 
    marginTop: 20 },

  reviewRow: { 
    flexDirection: "row", 
    alignItems: "center", 
    marginBottom: 6 },

  starLabel: { 
    width: 30, 
    fontSize: 14 },

  barBackground: { 
    flex: 1, 
    height: 8, 
    backgroundColor: "#ddd", 
    borderRadius: 4, 
    marginHorizontal: 6 },

  barFill: { 
    height: 8, 
    backgroundColor: "#4caf50", 
    borderRadius: 4 },

  count: { 
    width: 30, 
    fontSize: 12, 
    textAlign: "right" },

  confirmButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#0D47A1",
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  confirmText: { 
    fontSize: 18, 
    fontWeight: "bold", 
    color: "#ffffffff" },
});
