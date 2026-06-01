import { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import pgData from "../../data/pgData.json";

export default function PGScreen() {
  const [area, setArea] = useState("");
  const [budget, setBudget] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const findPGs = () => {
    if (!area || !budget) {
      Alert.alert("Missing Information", "Please enter area and budget.");
      return;
    }

    const areaText = area.toLowerCase().trim().replace(/\s/g, "");
    const budgetValue = parseInt(budget);

    const matches = pgData.filter((pg: any) => {
      const pgArea = pg.area.toLowerCase().replace(/\s/g, "");
      const pgRent = parseInt(pg.rent);

      return pgArea.includes(areaText) && pgRent <= budgetValue;
    });

    setResults(matches);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🏠 PG Recommendation</Text>

      <Text style={styles.subtitle}>
        Find budget-friendly PG options near your preferred Bangalore area.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Area (e.g. Whitefield)"
        value={area}
        onChangeText={setArea}
      />

      <TextInput
        style={styles.input}
        placeholder="Monthly PG Budget"
        keyboardType="numeric"
        value={budget}
        onChangeText={setBudget}
      />

      <TouchableOpacity style={styles.button} onPress={findPGs}>
        <Text style={styles.buttonText}>Find PGs</Text>
      </TouchableOpacity>

      {results.length > 0 ? (
        results.map((pg, index) => (
          <View style={styles.card} key={index}>
            <Text style={styles.cardTitle}>🏡 {pg.name}</Text>
            <Text style={styles.info}>📍 Area: {pg.area}</Text>
            <Text style={styles.info}>💰 Rent: ₹{pg.rent}/month</Text>
            <Text style={styles.info}>🍽️ Food: {pg.food}</Text>
            <Text style={styles.info}>👥 Type: {pg.type}</Text>
            <Text style={styles.info}>🚶 Distance: {pg.distanceFromOffice}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.emptyText}>
          Enter area and budget, then tap Find PGs.
        </Text>
      )}
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
    marginBottom: 8,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
    marginBottom: 25,
    lineHeight: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },

  button: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },

  card: {
    marginTop: 20,
    padding: 18,
    borderRadius: 12,
    backgroundColor: "#F1F5F9",
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  info: {
    fontSize: 15,
    marginBottom: 6,
  },

  emptyText: {
    marginTop: 20,
    textAlign: "center",
    color: "gray",
  },
});