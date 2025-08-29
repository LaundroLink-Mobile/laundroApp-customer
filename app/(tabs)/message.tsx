import { Text, View, StyleSheet } from "react-native";

export default function MessageScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Messages Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e7e3e3ff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: '#000000ff'
    },
});
