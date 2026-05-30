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

      {results.map((item, index) => (
        <View style={styles.card} key={index}>
          <Text style={styles.cardTitle}>
            {index + 1}. {item.area}
          </Text>

          <Text>Rent: ₹{item.rent}</Text>
          <Text>Food Cost: ₹{item.food}/month</Text>
          <Text>Safety: {item.safety}</Text>
          <Text>Metro: {item.metro}</Text>
          <Text>Score: {item.score}/100</Text>
          <Text>💰 Savings: ₹{item.savings}/month</Text>
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
});