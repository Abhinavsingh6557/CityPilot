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

import commuteData from "../../data/commuteData.json";

export default function CommuteScreen() {
  const [office, setOffice] = useState("");
  const [stay, setStay] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculateCommute = () => {
    if (!office || !stay) {
      Alert.alert(
        "Missing Information",
        "Please enter office and stay location."
      );
      return;
    }

    const officeText = office.toLowerCase().trim().replace(/\s/g, "");
    const stayText = stay.toLowerCase().trim().replace(/\s/g, "");

    const match = commuteData.find((item: any) => {
      const dataOffice = item.office.toLowerCase().replace(/\s/g, "");
      const dataStay = item.stay.toLowerCase().replace(/\s/g, "");

      return dataOffice.includes(officeText) && dataStay.includes(stayText);
    });

    if (match) {
      setResult(match);
    } else {
      setResult({
        office,
        stay,
        distance: "Not available",
        time: "Not available",
        cost: "Not available",
        transport: "Data not available yet",
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🚗 Commute Calculator</Text>

      <Text style={styles.subtitle}>
        Check travel time, distance, cost, and transport option between your
        office and stay location.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Office Location (e.g. Whitefield)"
        value={office}
        onChangeText={setOffice}
      />

      <TextInput
        style={styles.input}
        placeholder="Stay Location (e.g. BTM Layout)"
        value={stay}
        onChangeText={setStay}
      />

      <TouchableOpacity style={styles.button} onPress={calculateCommute}>
        <Text style={styles.buttonText}>Calculate Commute</Text>
      </TouchableOpacity>

      {result && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            {result.stay} → {result.office}
          </Text>

          <Text style={styles.info}>📍 Distance: {result.distance}</Text>
          <Text style={styles.info}>⏱️ Travel Time: {result.time}</Text>
          <Text style={styles.info}>💸 Monthly Travel Cost: ₹{result.cost}</Text>
          <Text style={styles.info}>🚇 Best Transport: {result.transport}</Text>

          <View style={styles.tipBox}>
            <Text style={styles.tipTitle}>💡 CityPilot Tip</Text>
            <Text style={styles.tipText}>
              Try to choose a stay location where daily travel time is under 45
              minutes. It saves time, money, and energy.
            </Text>
          </View>
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
    marginTop: 25,
    padding: 18,
    borderRadius: 12,
    backgroundColor: "#F1F5F9",
  },

  cardTitle: {
    fontSize: 18,
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

  tipText: {
    fontSize: 14,
    lineHeight: 20,
  },
});