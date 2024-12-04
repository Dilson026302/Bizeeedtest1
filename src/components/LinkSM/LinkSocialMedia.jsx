import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import GoogleLink from "./GoogleLk/GoogleLink"
import InstagramLink from "./InstaLK/InstagramLink"; // Correct relative path for InstagramLink


const LinkSocialMedia = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Link Social Media</Text>
      <Text style={styles.subHeader}>
        Choose a platform to link your social media account:
      </Text>

      {/* Google Authentication */}
      <TouchableOpacity style={styles.iconButton} onPress={GoogleLink}>
        <View style={styles.iconContent}>
          <Image
            style={styles.iconImage}
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",
            }}
          />
          <Text style={styles.iconText}>Google</Text>
        </View>
      </TouchableOpacity>

      {/* Instagram Authentication */}
      <TouchableOpacity style={styles.iconButton} onPress={InstagramLink}>
        <View style={styles.iconContent}>
          <Image
            style={styles.iconImage}
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg",
            }}
          />
          <Text style={styles.iconText}>Instagram</Text>
        </View>
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
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#040707",
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 40,
    textAlign: "center",
  },
  iconButton: {
    width: 200,
    height: 50,
    backgroundColor: "#fbc116",
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3, // Android shadow
  },
  iconContent: {
    flexDirection: "row",
    alignItems: "center", // Center vertically
    justifyContent: "center", // Center horizontally
  },
  iconImage: {
    width: 24,
    height: 24,
    marginRight: 8, // Add space between icon and text
  },
  iconText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
    textAlignVertical: "center", // Align text vertically in case of misalignment
  },
});

export default LinkSocialMedia;
