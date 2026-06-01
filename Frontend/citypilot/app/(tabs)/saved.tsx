import { ScrollView, View, Text, StyleSheet } from "react-native";

export default function SavedScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📌 Saved Relocation Plan</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>🏙️ Bangalore Plan</Text>

        <Text style={styles.info}>✅ Best Area: BTM Layout</Text>
        <Text style={styles.info}>🏠 Expected Rent: ₹8000–10000</Text>
        <Text style={styles.info}>🍽️ Food Cost: ₹3200/month</Text>
        <Text style={styles.info}>🚗 Commute: 45 mins</Text>
        <Text style={styles.info}>🏡 PG Option: BTM Student PG</Text>
        <Text style={styles.info}>💰 Estimated Savings: ₹28000/month</Text>

        <View style={styles.tipBox}>
          <Text style={styles.tipTitle}>💡 CityPilot Tip</Text>
          <Text>
            This plan is suitable for freshers, students, and working
            professionals moving to Bangalore on a budget.
          </Text>
        </View>
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

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 25,
    textAlign: "center",
  },

  card: {
    padding: 18,
    borderRadius: 12,
    backgroundColor: "#F1F5F9",
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },

  info: {
    fontSize: 15,
    marginBottom: 8,
  },

  tipBox: {
    marginTop: 15,
    padding: 12,
    backgroundColor: "#DBEAFE",
    borderRadius: 8,
  },

  tipTitle: {
    fontWeight: "bold",
    marginBottom: 6,
  },
});