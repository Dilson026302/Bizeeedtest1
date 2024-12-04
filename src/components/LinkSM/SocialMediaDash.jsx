import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useNavigate } from "react-router-dom";

const SocialMediaDash = () => {
  const navigate = useNavigate();

  // Mock Data (Replace with API data)
  const socialMediaData = [
    { platform: "Instagram", followers: 5000, engagement: 7.5 },
    { platform: "Facebook", followers: 3000, engagement: 6.2 },
    { platform: "TikTok", followers: 8000, engagement: 12.1 },
    { platform: "Snapchat", followers: 2000, engagement: 8.0 },
    { platform: "YouTube", followers: 10000, engagement: 15.3 },
  ];

  // Combined metrics
  const combinedFollowers = socialMediaData.reduce((total, p) => total + p.followers, 0);
  const combinedEngagement = (
    socialMediaData.reduce((total, p) => total + p.engagement, 0) / socialMediaData.length
  ).toFixed(1);

  return (
    <ScrollView style={styles.container}>
      {/* Combined Insights */}
      <View style={styles.combinedInsights}>
        <Text style={styles.header}>Social Media Insights</Text>
        <Text style={styles.combinedText}>
          Combined Followers: <Text style={styles.highlight}>{combinedFollowers}</Text>
        </Text>
        <Text style={styles.combinedText}>
          Combined Engagement: <Text style={styles.highlight}>{combinedEngagement}%</Text>
        </Text>
      </View>

      {/* Individual Insights */}
      <View style={styles.individualInsights}>
        {socialMediaData.map((platform, index) => (
          <View key={index} style={styles.platformCard}>
            <Text style={styles.platformName}>{platform.platform}</Text>
            <Text style={styles.platformMetric}>
              Followers: <Text style={styles.highlight}>{platform.followers}</Text>
            </Text>
            <Text style={styles.platformMetric}>
              Engagement: <Text style={styles.highlight}>{platform.engagement}%</Text>
            </Text>
          </View>
        ))}
      </View>

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigate("/")}>
        <Text style={styles.backButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Inline styles
const styles = {
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  combinedInsights: {
    marginBottom: 30,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
  },
  combinedText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  highlight: {
    color: "#007bff",
    fontWeight: "bold",
  },
  individualInsights: {
    marginBottom: 20,
  },
  platformCard: {
    marginBottom: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#f1f1f1",
  },
  platformName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  platformMetric: {
    fontSize: 16,
  },
  backButton: {
    marginTop: 20,
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
  },
};

export default SocialMediaDash;
