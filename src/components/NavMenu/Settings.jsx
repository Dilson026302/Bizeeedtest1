import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigate } from "react-router-dom";
import styles from "../../stylespages";

const Brands = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <Text style={styles.text}>This page displays the setting of the app .</Text>

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigate("/")}>
        <Text style={styles.backButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};


export default Brands;
