import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert 
} from "react-native";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";

export default function Verify() {
  const [code, setCode] = useState("");
  const router = useRouter();
  const { fullName, email, phone } = useLocalSearchParams();

  const handleSubmit = () => {
    if (code.length === 6) {
      router.replace({
        pathname: "/",
        params: { fullName, signupEmail: email, phone },
      });
    } else {
      Alert.alert("Error", "Please enter a 6-digit code.");
    }
  };

  const handleResend = () => {
    Alert.alert("Info", "Verification code resent.");
  };

  return (
    <>
      {/* Hide header + back arrow */}
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Verify Your Account</Text>
          <Text style={styles.subtitle}>
            A verification code has been sent to your phone number. 
            Please enter it below.
          </Text>

          {/* Code Input */}
          <TextInput
            style={styles.input}
            value={code}
            onChangeText={setCode}
            keyboardType="number-pad"
            maxLength={6}
            placeholder="••••••"
            placeholderTextColor="#aaa"
            textAlign="center"
          />

          {/* Resend */}
          <TouchableOpacity onPress={handleResend}>
            <Text style={styles.resendText}>
              Didn’t get any code?{" "}
              <Text style={styles.resendLink}>Resend Code</Text>
            </Text>
          </TouchableOpacity>

          {/* Submit */}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
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
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#003366",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    width: "70%",
    fontSize: 22,
    letterSpacing: 8,
    padding: 14,
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
    fontWeight: "600",
    textAlign: "center",
  },
  resendText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 20,
  },
  resendLink: {
    color: "#004080",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#004080",
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
});
