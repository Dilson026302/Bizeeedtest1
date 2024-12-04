import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigate } from "react-router-dom";

const AIContentCreation = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <View style={styles.container}>
      <Text style={styles.header}>AI Content Creation</Text>
      <Text style={styles.text}>This is the AI Content creation pagr you can create Image, Graphics, Video as per your plan</Text>

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigate("/")}>
        <Text style={styles.backButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: "#333",
    marginBottom: 30, // Add some spacing before the back button
  },
  backButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default AIContentCreation;
