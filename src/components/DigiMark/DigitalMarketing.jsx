import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  } from "react-native";
import { useNavigate } from "react-router-dom";
import ReactSlider from 'react-slider';
import "./styles.css"

const DigitalMarketing = () => {
  const navigate = useNavigate();
  const [budget, setBudget] = useState(1000); // Default budget

  const bestAds = Array(10).fill({
    title: "Ad Title",
    performance: "High Engagement",
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Digital Marketing</Text>

      {/* Section 1: Metrics */}
      <View style={styles.metricsSection}>
        <View style={styles.metricBox}>
          <Text style={styles.metricLabel}>Total Ad Spend</Text>
          <Text style={styles.metricValue}>$10,000</Text>
        </View>
        <View style={styles.metricBox}>
          <Text style={styles.metricLabel}>Total Returns</Text>
          <Text style={styles.metricValue}>$50,000</Text>
        </View>
        <View style={styles.metricBox}>
          <Text style={styles.metricLabel}>ROAS</Text>
          <Text style={styles.metricValue}>5.0</Text>
        </View>
      </View>

      {/* Section 2: Best Performing Ads */}
      <View style={styles.bestAdsSection}>
        <Text style={styles.sectionTitle}>Best Performing Ads</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {bestAds.map((ad, index) => (
            <View key={index} style={styles.adTile}>
              <Text style={styles.adTitle}>{ad.title}</Text>
              <Text style={styles.adPerformance}>{ad.performance}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Section 3: Budget Control */}
      <View style={styles.budgetControlSection}>
        <Text style={styles.sectionTitle}>Budget Control</Text>
        <Text style={styles.budgetValue}>Current Budget: ${budget}</Text>
        <ReactSlider
          className="horizontal-slider"
          thumbClassName="thumb"
          trackClassName="track"
          min={500}
          max={5000}
          step={100}
          value={budget}
          onChange={(value) => setBudget(value)}
          ariaLabel="Budget Slider"
        />
      </View>

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
    backgroundColor: "#ffffff",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  metricsSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  metricBox: {
    width: "30%",
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    alignItems: "center",
  },
  metricLabel: {
    fontSize: 14,
    color: "#555",
  },
  metricValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
  },
  bestAdsSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  adTile: {
    width: 120,
    height: 120,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    marginRight: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  adTitle: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  adPerformance: {
    fontSize: 12,
    color: "#777",
    textAlign: "center",
    marginTop: 5,
  },
  budgetControlSection: {
    marginBottom: 30,
  },
  budgetValue: {
    fontSize: 16,
    marginBottom: 10,
  },
  slider: {
    width: "100%",
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

export default DigitalMarketing;
