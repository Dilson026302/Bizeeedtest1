import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigate } from "react-router-dom";
import styles from "../../stylespages";

const Help = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Help</Text>
      <Text style={styles.text}>This page will have FAQ and accademy for users who want to know about the app</Text>

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigate("/")}>
        <Text style={styles.backButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};


export default Help;
