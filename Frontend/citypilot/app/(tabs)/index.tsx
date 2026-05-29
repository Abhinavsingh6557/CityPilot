import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🏙️ CityPilot</Text>

      <Text style={styles.title}>Your AI Guide To Every New City</Text>

      <Text style={styles.subtitle}>
        Find the best place to stay, estimate expenses, and settle into a new
        city with confidence.
      </Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2563EB",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "gray",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});