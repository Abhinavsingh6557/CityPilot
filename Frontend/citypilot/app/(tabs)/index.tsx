import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.hero}>
          <Text style={styles.logo}>🏙️ CityPilot</Text>
          <Text style={styles.title}>Your AI Guide To Bangalore</Text>
          <Text style={styles.subtitle}>
            Find the best area to live, compare locations, estimate commute,
            discover PGs, and plan your relocation smarter.
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>10</Text>
            <Text style={styles.statLabel}>Areas</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>4</Text>
            <Text style={styles.statLabel}>PGs</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Routes</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.card} onPress={() => router.push("/explore")}>
          <Text style={styles.cardTitle}>🤖 AI Assistant</Text>
          <Text style={styles.cardText}>
            Get top 3 area recommendations based on salary, budget, and office location.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => router.push("/compare")}>
          <Text style={styles.cardTitle}>⚖️ Compare Areas</Text>
          <Text style={styles.cardText}>
            Compare rent, food cost, safety, and metro availability between two areas.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => router.push("/chat")}>
          <Text style={styles.cardTitle}>💬 Chat Assistant</Text>
          <Text style={styles.cardText}>
            Ask relocation questions like "Can I survive in Bangalore with ₹35,000?"
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => router.push("/commute")}>
          <Text style={styles.cardTitle}>🚗 Commute Calculator</Text>
          <Text style={styles.cardText}>
            Estimate travel time, distance, monthly travel cost, and transport options.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => router.push("/pg")}>
          <Text style={styles.cardTitle}>🏠 PG Finder</Text>
          <Text style={styles.cardText}>
            Find budget-friendly PG options near your preferred Bangalore area.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => router.push("/saved")}>
          <Text style={styles.cardTitle}>📌 Saved Plan</Text>
          <Text style={styles.cardText}>
            View your final relocation plan and recommendations.
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },

  container: {
    paddingHorizontal: 20,
    paddingTop: 70,
    paddingBottom: 140,
    backgroundColor: "#fff",
  },

  hero: {
    marginBottom: 10,
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

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  statCard: {
    backgroundColor: "#F8FAFC",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 12,
    width: "31%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2563EB",
    marginBottom: 5,
  },

  statLabel: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "600",
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