import { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import bangaloreData from "../../data/bangaloreAreas.json";

export default function AIAssistantScreen() {
  const [city, setCity] = useState("");
  const [office, setOffice] = useState("");
  const [salary, setSalary] = useState("");
  const [budget, setBudget] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [summary, setSummary] = useState("");

  const generatePlan = () => {
    const budgetValue = parseInt(budget);
    const salaryValue = parseInt(salary);

    const filteredAreas = bangaloreData
      .filter((item: any) => {
        const minRent = parseInt(item.rent.split("-")[0]);
        return minRent <= budgetValue;
      })
      .sort((a: any, b: any) => b.score - a.score)
      .slice(0, 3)
      .map((item: any) => {
        const minRent = parseInt(item.rent.split("-")[0]);
        const foodValue = parseInt(item.food);
        const savings = salaryValue - minRent - foodValue;

        return {
          ...item,
          savings,
        };
      });

    setResults(filteredAreas);

    if (filteredAreas.length > 0) {
      setSummary(
        `Based on your salary of ₹${salaryValue} and budget of ₹${budgetValue}, ${filteredAreas[0].area} is the best option because it has a high score, affordable rent, and good savings potential.`
      );
    } else {
      setSummary(
        "No areas found under your budget. Try increasing your rent budget."
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🤖 CityPilot AI Assistant</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter City (e.g. Bangalore)"
        value={city}
        onChangeText={setCity}
      />

      <TextInput
        style={styles.input}
        placeholder="Office Location"
        value={office}
        onChangeText={setOffice}
      />

      <TextInput
        style={styles.input}
        placeholder="Monthly Salary"
        keyboardType="numeric"
        value={salary}
        onChangeText={setSalary}
      />

      <TextInput
        style={styles.input}
        placeholder="Rent Budget"
        keyboardType="numeric"
        value={budget}
        onChangeText={setBudget}
      />

      <TouchableOpacity style={styles.button} onPress={generatePlan}>
        <Text style={styles.buttonText}>Generate Top 3 Areas</Text>
      </TouchableOpacity>

      {summary ? (
        <View style={styles.summaryBox}>
          <Text style={styles.summaryTitle}>🎯 Recommendation Summary</Text>
          <Text>{summary}</Text>
        </View>
      ) : null}

      {results.map((item, index) => (
        <View style={styles.card} key={index}>
          <Text style={styles.cardTitle}>
            🏆 #{index + 1} {item.area}
          </Text>

          <Text style={styles.score}>⭐ Score: {item.score}/100</Text>

          <Text style={styles.savings}>
            💰 Savings: ₹{item.savings}/month
          </Text>

          <View style={styles.infoRow}>
            <Text>🏠 Rent: ₹{item.rent}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text>🍽️ Food Cost: ₹{item.food}/month</Text>
          </View>

          <View style={styles.infoRow}>
            <Text>🛡️ Safety: {item.safety}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text>🚇 Metro: {item.metro}</Text>
          </View>

          <View style={styles.reasonBox}>
            <Text>✅ Affordable Rent</Text>
            <Text>✅ Good Connectivity</Text>
            <Text>✅ Suitable for Professionals</Text>
          </View>
        </View>
      ))}
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

  summaryBox: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#DBEAFE",
    borderRadius: 12,
  },

  summaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },

  card: {
    marginTop: 20,
    padding: 18,
    borderRadius: 12,
    backgroundColor: "#F1F5F9",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  score: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2563EB",
    marginBottom: 8,
  },

  savings: {
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
    marginBottom: 12,
  },

  infoRow: {
    marginBottom: 6,
  },

  reasonBox: {
    marginTop: 12,
    padding: 10,
    backgroundColor: "#E0F2FE",
    borderRadius: 8,
  },
});