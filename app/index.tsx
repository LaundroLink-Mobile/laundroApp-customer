import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet 
} from "react-native";
import { Link, useRouter, useLocalSearchParams } from "expo-router";
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
    <View style={styles.container}>
      <Text style={styles.title}>LaundroLink</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <Link href="/SignUp" style={styles.signupLink}>
          Sign Up
        </Link>
      </View>

      <Text style={styles.orText}>────────  or  ────────</Text>

      {/* Login with Google (unchanged) */}
      <TouchableOpacity style={styles.socialButton}>
        <AntDesign name="google" size={20} color="#DB4437" style={{ marginRight: 8 }} />
        <Text style={styles.socialText}>Sign up with Google</Text>
      </TouchableOpacity>

      {/* Login with Phone (unchanged) */}
      <TouchableOpacity style={styles.socialButton}>
        <FontAwesome name="phone" size={20} color="#000000ff" style={{ marginRight: 8 }} />
        <Text style={styles.socialText}>Sign up with Phone</Text>
      </TouchableOpacity>
    </View>
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
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#003366",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 6,
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    width: "100%",
    backgroundColor: "#004080",
    padding: 15,
    borderRadius: 6,
    alignItems: "center",
    marginVertical: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signupContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  signupText: {
    color: "#000000ff",
    fontSize: 14,
  },
  signupLink: {
    color: "#3498db",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5,
  },
  orText: {
    marginVertical: 20,
    color: "#7f8c8d",
    fontSize: 14,
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
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  socialText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#2c3e50",
  },    
});
