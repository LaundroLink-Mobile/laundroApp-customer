import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert 
} from "react-native";
import { Link } from 'expo-router';
import { useRouter } from "expo-router";

const VerificationScreen: React.FC = () => {
  const [code, setCode] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    if (code.length === 6) {
      router.push("/");
    } else {
      Alert.alert("Error", "Please enter a 6-digit code.");
    }
  };

  const handleResend = () => {
    Alert.alert("Info", "Verification code resent.");
    // TODO: Trigger API to resend verification code
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>LaundroLink</Text>
      <Text style={styles.instructions}>
        A verification code has been sent to the number you provided. 
        Enter the code below to continue.
      </Text>

      <TextInput
        style={styles.input}
        value={code}
        onChangeText={setCode}
        keyboardType="number-pad"
        maxLength={6}
        placeholder="------"
        textAlign="center"
      />

      <TouchableOpacity onPress={handleResend}>
        <Text style={styles.resendText}>
          Didn’t get any code? <Text style={styles.resendLink}>Resend code</Text>
        </Text>
      </TouchableOpacity>

    
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
 
    </View>
  );
};

export default VerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#89CFF0",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1E3A8A",
    marginBottom: 20,
  },
  instructions: {
    textAlign: "center",
    fontSize: 14,
    color: "#333",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 8,
    width: "70%",
    fontSize: 20,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  resendText: {
    fontSize: 14,
    marginBottom: 20,
    color: "#333",
  },
  resendLink: {
    color: "#1E40AF",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#1E40AF",
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});