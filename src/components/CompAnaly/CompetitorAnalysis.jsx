import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigate } from "react-router-dom";

const CompetitorAnalysis = () => {
  const navigate = useNavigate();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Coompetitor Aanlysis</Text>
      <Text style={styles.text}>
        In this page a user can add their competitors and can regullarly monitor the content and engagment in competitors social media and the website, the data will be stored from the date of implimentation
      </Text>

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

export default CompetitorAnalysis;
