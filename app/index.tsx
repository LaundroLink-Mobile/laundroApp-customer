import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet 
} from "react-native";
import { Stack, Link, useRouter, useLocalSearchParams } from "expo-router";
import { AntDesign, FontAwesome } from "@expo/vector-icons"; 

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Data from Verify
  const { fullName, signupEmail, phone } = useLocalSearchParams();

  const handleLogin = () => {
    router.replace({
      pathname: "/editProfile",
      params: {
        fullName: fullName ? String(fullName) : "Customer Name",
        phone: phone ? String(phone) : "",
        email: signupEmail ? String(signupEmail) : email,
      },
    });
  };

  return (
    <>
      {/* Hide header + back arrow */}
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Login to continue with LaundroLink</Text>

          {/* Email */}
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#aaa"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />

          {/* Password */}
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {/* Login Button */}
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          {/* Sign Up Redirect */}
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don’t have an account?</Text>
            <Link href="/SignUp" style={styles.signupLink}>
              Sign Up
            </Link>
          </View>

          {/* Divider */}
          <Text style={styles.orText}>────────  or  ────────</Text>

          {/* Google Login */}
          <TouchableOpacity style={styles.socialButton}>
            <AntDesign name="google" size={20} color="#DB4437" style={{ marginRight: 8 }} />
            <Text style={styles.socialText}>Login with Google</Text>
          </TouchableOpacity>

          {/* Phone Login */}
          <TouchableOpacity style={styles.socialButton}>
            <FontAwesome name="phone" size={20} color="#000000ff" style={{ marginRight: 8 }} />
            <Text style={styles.socialText}>Login with Phone</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#89CFF0",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 16,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#003366",
    marginBottom: 5,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 14,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    width: "100%",
    backgroundColor: "#004080",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  signupText: {
    color: "#000",
    fontSize: 14,
  },
  signupLink: {
    color: "#004080",
    fontWeight: "bold",
    fontSize: 14,
    marginLeft: 5,
  },
  orText: {
    marginVertical: 20,
    color: "#7f8c8d",
    fontSize: 14,
    textAlign: "center",
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fdfdfd",
    marginBottom: 15,
  },
  socialText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#2c3e50",
  },
});
