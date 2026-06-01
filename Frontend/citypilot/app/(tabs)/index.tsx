import { ScrollView, View, Text, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.logo}>🏙️ CityPilot</Text>
        <Text style={styles.title}>Your AI Guide To Bangalore</Text>
        <Text style={styles.subtitle}>
          Find the best area to live, compare locations, estimate commute,
          discover PGs, and plan your relocation smarter.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>🤖 AI Assistant</Text>
        <Text style={styles.cardText}>
          Get top 3 area recommendations based on salary, budget, and office location.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>⚖️ Compare Areas</Text>
        <Text style={styles.cardText}>
          Compare rent, food cost, safety, and metro availability between two areas.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>💬 Chat Assistant</Text>
        <Text style={styles.cardText}>
          Ask relocation questions like “Can I survive in Bangalore with ₹35,000?”
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>🚗 Commute Calculator</Text>
        <Text style={styles.cardText}>
          Estimate distance, travel time, monthly travel cost, and best transport option.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>🏠 PG Finder</Text>
        <Text style={styles.cardText}>
          Find budget-friendly PG options near your preferred Bangalore area.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  hero: {
    marginBottom: 25,
    padding: 20,
    backgroundColor: "#DBEAFE",
    borderRadius: 18,
  },

  logo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2563EB",
    marginBottom: 8,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 15,
    color: "#374151",
    lineHeight: 22,
  },

  card: {
    padding: 18,
    borderRadius: 14,
    backgroundColor: "#F1F5F9",
    marginBottom: 15,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },

  cardText: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 20,
  },
});