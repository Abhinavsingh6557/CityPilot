import { useState } from "react";
import { ScrollView, View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import bangaloreData from "../../data/bangaloreAreas.json";

export default function AIAssistantScreen() {
  const [city, setCity] = useState("");
  const [office, setOffice] = useState("");
  const [salary, setSalary] = useState("");
  const [budget, setBudget] = useState("");
  const [result, setResult] = useState<any>(null);

  const generatePlan = () => {
  const searchText = office.toLowerCase().trim().replace(/\s/g, "");

  const match = bangaloreData.find((item) =>
    item.area.toLowerCase().replace(/\s/g, "").includes(searchText)
  );

  if (match) {
    const rentValue = parseInt(match.rent.split("-")[0]);
    const foodValue = parseInt(match.food);
    const salaryValue = parseInt(salary);

    const savings = salaryValue - rentValue - foodValue;

    setResult({
      ...match,
      savings: savings,
    });
  } else {
    setResult({
      area: "Not Found",
      rent: "-",
      food: "-",
      safety: "-",
      metro: "-",
      savings: "-",
    });
  }
};

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🤖 CityPilot AI Assistant</Text>

      <TextInput style={styles.input} placeholder="Enter City (e.g. Bangalore)" value={city} onChangeText={setCity} />

      <TextInput style={styles.input} placeholder="Office Location" value={office} onChangeText={setOffice} />

      <TextInput style={styles.input} placeholder="Monthly Salary" keyboardType="numeric" value={salary} onChangeText={setSalary} />

      <TextInput style={styles.input} placeholder="Rent Budget" keyboardType="numeric" value={budget} onChangeText={setBudget} />

      <TouchableOpacity style={styles.button} onPress={generatePlan}>
        <Text style={styles.buttonText}>Generate Plan</Text>
      </TouchableOpacity>

      {result && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Recommended Area: {result.area}</Text>
          <Text>Rent: ₹{result.rent}</Text>
          <Text>Food Cost: ₹{result.food}/month</Text>
          <Text>Safety: {result.safety}</Text>
          <Text>Metro: {result.metro}</Text>
          <Text>💰 Savings: ₹{result.savings}/month</Text>
        </View>
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
    marginTop: 25,
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