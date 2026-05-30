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

export default function CompareScreen() {
  const [area1, setArea1] = useState("");
  const [area2, setArea2] = useState("");
  const [result, setResult] = useState<any>(null);

  const findArea = (name: string) => {
    const searchText = name.toLowerCase().trim().replace(/\s/g, "");

    return bangaloreData.find((item: any) =>
      item.area.toLowerCase().replace(/\s/g, "").includes(searchText)
    );
  };

  const compareAreas = () => {
    if (!area1 || !area2) {
      Alert.alert("Missing Information", "Please enter both area names.");
      return;
    }

    const first = findArea(area1);
    const second = findArea(area2);

    if (!first || !second) {
      Alert.alert("Area Not Found", "Please enter valid Bangalore area names.");
      return;
    }

    const rent1 = parseInt(first.rent.split("-")[0]);
    const rent2 = parseInt(second.rent.split("-")[0]);

    const food1 = parseInt(first.food);
    const food2 = parseInt(second.food);

    const rentWinner = rent1 < rent2 ? first.area : rent2 < rent1 ? second.area : "Tie";
    const foodWinner = food1 < food2 ? first.area : food2 < food1 ? second.area : "Tie";

    const safetyRank: any = {
      Excellent: 4,
      "Very Good": 3,
      Good: 2,
      Medium: 1,
    };

    const metroRank: any = {
      Available: 3,
      Nearby: 2,
      No: 1,
    };

    const safetyWinner =
      safetyRank[first.safety] > safetyRank[second.safety]
        ? first.area
        : safetyRank[second.safety] > safetyRank[first.safety]
        ? second.area
        : "Tie";

    const metroWinner =
      metroRank[first.metro] > metroRank[second.metro]
        ? first.area
        : metroRank[second.metro] > metroRank[first.metro]
        ? second.area
        : "Tie";

    const firstPoints =
      (rentWinner === first.area ? 1 : 0) +
      (foodWinner === first.area ? 1 : 0) +
      (safetyWinner === first.area ? 1 : 0) +
      (metroWinner === first.area ? 1 : 0);

    const secondPoints =
      (rentWinner === second.area ? 1 : 0) +
      (foodWinner === second.area ? 1 : 0) +
      (safetyWinner === second.area ? 1 : 0) +
      (metroWinner === second.area ? 1 : 0);

    const overallWinner =
      firstPoints > secondPoints
        ? first.area
        : secondPoints > firstPoints
        ? second.area
        : "Both are good options";

    setResult({
      first,
      second,
      rentWinner,
      foodWinner,
      safetyWinner,
      metroWinner,
      overallWinner,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>⚖️ Compare Areas</Text>

      <TextInput
        style={styles.input}
        placeholder="First Area (e.g. BTM Layout)"
        value={area1}
        onChangeText={setArea1}
      />

      <TextInput
        style={styles.input}
        placeholder="Second Area (e.g. HSR Layout)"
        value={area2}
        onChangeText={setArea2}
      />

      <TouchableOpacity style={styles.button} onPress={compareAreas}>
        <Text style={styles.buttonText}>Compare Areas</Text>
      </TouchableOpacity>

      {result && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            {result.first.area} vs {result.second.area}
          </Text>

          <Text style={styles.info}>🏠 Rent Winner: {result.rentWinner}</Text>
          <Text style={styles.info}>🍽️ Food Winner: {result.foodWinner}</Text>
          <Text style={styles.info}>🛡️ Safety Winner: {result.safetyWinner}</Text>
          <Text style={styles.info}>🚇 Metro Winner: {result.metroWinner}</Text>

          <View style={styles.winnerBox}>
            <Text style={styles.winnerText}>
              🏆 Overall Better Area: {result.overallWinner}
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
    marginBottom: 15,
  },

  info: {
    marginBottom: 8,
    fontSize: 15,
  },

  winnerBox: {
    marginTop: 15,
    padding: 12,
    backgroundColor: "#DCFCE7",
    borderRadius: 8,
  },

  winnerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
  },
});