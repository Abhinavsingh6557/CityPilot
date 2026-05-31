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

export default function ChatScreen() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const generateAnswer = () => {
    const q = question.toLowerCase();

    if (!question.trim()) {
      setAnswer("Please ask a question about Bangalore relocation.");
      return;
    }

    if (q.includes("survive") || q.includes("salary")) {
      setAnswer(
        "Yes, you can survive in Bangalore if your rent is under ₹10,000 and food cost is around ₹3,000–₹4,000. Areas like BTM Layout, Electronic City, and Whitefield are better for budget planning."
      );
    } else if (q.includes("fresher") || q.includes("student")) {
      setAnswer(
        "For freshers and students, BTM Layout, Electronic City, Marathahalli, and HSR Layout are good options because they have PGs, food options, and good connectivity."
      );
    } else if (q.includes("whitefield")) {
      const area: any = bangaloreData.find((item: any) => item.area === "Whitefield");
      setAnswer(
        `Whitefield is good for IT professionals. Average rent is ₹${area.rent}, food cost is around ₹${area.food}/month, safety is ${area.safety}, and metro is ${area.metro}.`
      );
    } else if (q.includes("hsr")) {
      const area: any = bangaloreData.find((item: any) => item.area === "HSR Layout");
      setAnswer(
        `HSR Layout is a premium and safe area. Average rent is ₹${area.rent}, food cost is around ₹${area.food}/month, safety is ${area.safety}, and metro is ${area.metro}.`
      );
    } else {
      setAnswer(
        "CityPilot suggests checking rent, food cost, safety, metro availability, and savings before choosing an area. Try asking: 'Can I survive in Bangalore with 35000?' or 'Is Whitefield good for freshers?'"
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>💬 CityPilot Chat</Text>

      <Text style={styles.subtitle}>
        Ask relocation questions about Bangalore.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Ask: Can I survive in Bangalore with 35000?"
        value={question}
        onChangeText={setQuestion}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={generateAnswer}>
        <Text style={styles.buttonText}>Ask CityPilot</Text>
      </TouchableOpacity>

      {answer ? (
        <View style={styles.answerBox}>
          <Text style={styles.answerTitle}>🤖 CityPilot Answer</Text>
          <Text style={styles.answerText}>{answer}</Text>
        </View>
      ) : null}
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
    fontSize: 15,
    color: "gray",
    textAlign: "center",
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    minHeight: 100,
    textAlignVertical: "top",
    marginBottom: 15,
  },

  button: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 10,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },

  answerBox: {
    marginTop: 25,
    padding: 18,
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
  },

  answerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },

  answerText: {
    fontSize: 15,
    lineHeight: 22,
  },
});