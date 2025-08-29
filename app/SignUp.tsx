import { AntDesign, FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Circle } from "react-native-svg";
import { Link } from 'expo-router';

export default function Index() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      {/* Bubble Background */}
     /* <Svg height="100%" width="100%" style={styles.bubbles}>
        <Circle cx="50" cy="80" r="40" fill="white" opacity="0.2" />
        <Circle cx="250" cy="120" r="60" fill="white" opacity="0.2" />
        <Circle cx="180" cy="400" r="90" fill="white" opacity="0.15" />
        <Circle cx="80" cy="600" r="50" fill="white" opacity="0.2" />
        <Circle cx="300" cy="700" r="70" fill="white" opacity="0.18" />
      </Svg>*/

      {/* App Title */}
      <Text style={styles.title}>LaundroLink</Text>

      {/* Input Fields */}
      <Text style={styles.label}>Email Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter email address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter phone number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Sign Up Button */}
      <Link href="/Verify" asChild>
        <TouchableOpacity style={styles.button}>
         <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </Link>


      {/* Login Redirect */}
      <Text style={styles.loginText}>
        Already have an account? <Text style={styles.loginLink}></Text>
        <Link href="/index" style={styles.loginLink}>Login</Link>
      </Text>

      {/* Google Sign Up */}
      <TouchableOpacity style={styles.googleButton}>
        <AntDesign
          name="google"
          size={20}
          color="#0400deff"
          style={{ marginRight: 8 }}
        />
        <Text style={styles.googleText}>Sign up with Google</Text>
      </TouchableOpacity>

      {/* Phone Sign Up */}
      <TouchableOpacity style={styles.phoneButton}>
        <FontAwesome
          name="phone"
          size={20}
          color="#000"
          style={{ marginRight: 8 }}
        />
        <Text style={styles.phoneText}>Sign up with Phone</Text>
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
  bubbles: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#003366",
    marginBottom: 30,
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 14,
    marginBottom: 5,
    color: "#000",
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
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    width: "100%",
    padding: 12,
    borderRadius: 6,
    justifyContent: "center",
    marginBottom: 15,
  },
  googleText: {
    fontSize: 16,
    color: "#000",
  },
  phoneButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    width: "100%",
    padding: 12,
    borderRadius: 6,
    justifyContent: "center",
  },
  phoneText: {
    fontSize: 16,
    color: "#000",
  },
});
