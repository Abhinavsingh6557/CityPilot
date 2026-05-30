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

import bangaloreData from "../../data/bangaloreAreas.json";

export default function AIAssistantScreen() {
  const [city, setCity] = useState("");
  const [office, setOffice] = useState("");
  const [salary, setSalary] = useState("");
  const [budget, setBudget] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [summary, setSummary] = useState("");

  const generatePlan = () => {
    if (!city || !office || !salary || !budget) {
      Alert.alert("Missing Information", "Please fill all fields.");
      return;
    }

    const budgetValue = parseInt(budget);
    const salaryValue = parseInt(salary);
    const officeText = office.toLowerCase().trim().replace(/\s/g, "");

    const officeMatch = bangaloreData.find((item: any) =>
      item.area.toLowerCase().replace(/\s/g, "").includes(officeText)
    );

    let recommendedAreas: any[] = [];

    if (officeMatch) {
      recommendedAreas = bangaloreData.filter((item: any) => {
        const isSameArea = item.area === officeMatch.area;
        const nearby = item.nearby;
        const isNearby = Array.isArray(nearby) && nearby.includes(item.area);
        return isSameArea || isNearby;
      });
    } else {
      recommendedAreas = bangaloreData;
    }

    const filteredAreas = recommendedAreas
      .filter((item: any) => {
        const minRent = parseInt(item.rent.split("-")[0]);
        return minRent <= budgetValue;
      })
      .map((item: any) => {
        const minRent = parseInt(item.rent.split("-")[0]);
        const foodValue = parseInt(item.food);
        const savings = salaryValue - minRent - foodValue;

        const rentScore = minRent <= budgetValue ? 40 : 0;

        let savingsScore = 5;
        if (savings > 20000) savingsScore = 25;
        else if (savings > 10000) savingsScore = 15;

        let safetyScore = 0;
        if (item.safety === "Excellent") safetyScore = 20;
        else if (item.safety === "Very Good") safetyScore = 15;
        else if (item.safety === "Good") safetyScore = 10;

        let metroScore = 0;
        if (item.metro === "Available") metroScore = 10;
        else if (item.metro === "Nearby") metroScore = 7;

        const score = rentScore + savingsScore + safetyScore + metroScore;

        return {
          ...item,
          score,
          savings,
          rentScore,
          savingsScore,
          safetyScore,
          metroScore,
        };
      })
      .sort((a: any, b: any) => b.score - a.score)
      .slice(0, 3);

    setResults(filteredAreas);

    if (filteredAreas.length > 0) {
      setSummary(
        `Based on your office location ${office}, salary of ₹${salaryValue}, and budget of ₹${budgetValue}, ${filteredAreas[0].area} is the best option because it gives better affordability, safety, and savings potential.`
      );
    } else {
      setSummary(
        "No suitable areas found under your budget. Try increasing your rent budget."
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
          <Text style={styles.summaryText}>{summary}</Text>
        </View>
      ) : null}

      {results.map((item, index) => (
        <View style={styles.card} key={index}>
          <Text style={styles.cardTitle}>
            🏆 #{index + 1} {item.area}
          </Text>

          <Text style={styles.score}>
            ⭐ Relocation Score: {item.score}/95
          </Text>

          <View style={styles.scoreBox}>
            <Text>🏠 Affordability: {item.rentScore}/40</Text>
            <Text>💰 Savings: {item.savingsScore}/25</Text>
            <Text>🛡️ Safety: {item.safetyScore}/20</Text>
            <Text>🚇 Metro: {item.metroScore}/10</Text>
          </View>

          <Text style={styles.savings}>
            💰 Savings: ₹{item.savings}/month
          </Text>

          <Text style={styles.info}>🏠 Rent: ₹{item.rent}</Text>
          <Text style={styles.info}>🍽️ Food Cost: ₹{item.food}/month</Text>
          <Text style={styles.info}>🛡️ Safety: {item.safety}</Text>
          <Text style={styles.info}>🚇 Metro: {item.metro}</Text>

          <View style={styles.budgetBox}>
            <Text style={styles.budgetTitle}>📊 Monthly Budget Breakdown</Text>
            <Text>💵 Salary: ₹{salary}</Text>
            <Text>🏠 Rent: ₹{item.rent}</Text>
            <Text>🍽️ Food: ₹{item.food}</Text>
            <Text>💰 Estimated Savings: ₹{item.savings}</Text>
          </View>

          <View style={styles.reasonBox}>
            <Text>✅ Affordable rent</Text>
            <Text>✅ Good savings potential</Text>
            <Text>✅ Suitable for students and professionals</Text>
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

  summaryText: {
    fontSize: 15,
    lineHeight: 22,
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

  scoreBox: {
    marginBottom: 12,
    padding: 10,
    backgroundColor: "#F0F9FF",
    borderRadius: 8,
  },

  savings: {
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
    marginBottom: 12,
  },

  info: {
    marginBottom: 6,
  },

  budgetBox: {
    marginTop: 12,
    padding: 12,
    backgroundColor: "#DCFCE7",
    borderRadius: 8,
  },

  budgetTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 6,
  },

  reasonBox: {
    marginTop: 12,
    padding: 10,
    backgroundColor: "#E0F2FE",
    borderRadius: 8,
  },
});