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
  const [result, setResult] = useState<any>(null);

  const generatePlan = () => {
    const match = bangaloreData.find(
      (item) =>
        item.area.toLowerCase() === office.toLowerCase().trim()
    );

    if (match) {
      setResult(match);
    } else {
      setResult({
        area: "Not Found",
        rent: "-",
        food: "-",
        safety: "-",
        metro: "-",
      });
    }
  };

  const clearForm = () => {
    setCity("");
    setOffice("");
    setSalary("");
    setBudget("");
    setResult(null);
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

      <Text style={styles.label}>Quick Select Area</Text>

      <View style={styles.optionContainer}>
        {[
          "Whitefield",
          "HSR Layout",
          "BTM Layout",
          "Koramangala",
          "Electronic City",
        ].map((area) => (
          <TouchableOpacity
            key={area}
            style={styles.optionButton}
            onPress={() => setOffice(area)}
          >
            <Text style={styles.optionText}>{area}</Text>
          </TouchableOpacity>
        ))}
      </View>

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

      <TouchableOpacity
        style={styles.button}
        onPress={generatePlan}
      >
        <Text style={styles.buttonText}>Generate Plan</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.clearButton}
        onPress={clearForm}
      >
        <Text style={styles.clearButtonText}>
          Clear / New Search
        </Text>
      </TouchableOpacity>

      {result && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            📍 Recommended Area: {result.area}
          </Text>

          <Text>🏠 Rent: ₹{result.rent}</Text>
          <Text>🍽 Food Cost: ₹{result.food}/month</Text>
          <Text>🛡 Safety: {result.safety}</Text>
          <Text>🚇 Metro: {result.metro}</Text>
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
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },

  optionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
  },

  optionButton: {
    backgroundColor: "#E0ECFF",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },

  optionText: {
    color: "#2563EB",
    fontWeight: "600",
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
    fontSize: 18,
  },

  clearButton: {
    backgroundColor: "#E5E7EB",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },

  clearButtonText: {
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