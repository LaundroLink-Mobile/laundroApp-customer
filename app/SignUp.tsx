import React, { useState } from "react";
import { 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View 
} from "react-native";
import { Link, useRouter } from "expo-router";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignUp = () => {
    if (!fullName || !email || !phone || !password) {
      alert("Please fill in all fields.");
      return;
    }

    // After sign up → go to Verify
    router.push({
      pathname: "/Verify",
      params: { fullName, email, phone },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LaundroLink</Text>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Login Redirect */}
     <View style={{ flexDirection: "row", marginTop: 10 }}>
  <Text style={styles.loginText}>Already have an account? </Text>
  <TouchableOpacity onPress={() => router.push("/")}>
    <Text style={styles.loginLink}>Login</Text>
  </TouchableOpacity>
</View>


      {/* Divider */}
      <Text style={styles.orText}>────────  or  ────────</Text>

      {/* Google Sign Up (unchanged) */}
      <TouchableOpacity style={styles.socialButton}>
        <AntDesign
          name="google"
          size={20}
          color="#DB4437"
          style={{ marginRight: 8 }}
        />
        <Text style={styles.socialText}>Sign up with Google</Text>
      </TouchableOpacity>

      {/* Phone Sign Up (unchanged) */}
      <TouchableOpacity style={styles.socialButton}>
        <FontAwesome
          name="phone"
          size={20}
          color="#000000ff"
          style={{ marginRight: 8 }}
        />
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
  loginText: {
    color: "#000",
    marginBottom: 20,
  },
  loginLink: {
    color: "#004080",
    fontWeight: "bold",
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
