import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { supabase } from "../../../supabase"; // Ensure your Supabase client is correctly set up

const Profile = ({ onLogout }) => {
  const [userDetails, setUserDetails] = useState({ email: "", name: "" });
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching user details:", error.message);
      } else if (user) {
        setUserDetails({ email: user.email, name: user.user_metadata?.name || "" });
      }
    };

    fetchUserDetails();
  }, []);

  const handleUpdate = async () => {
    if (!userDetails.name) {
      Alert.alert("Error", "Name cannot be empty.");
      return;
    }

    setIsUpdating(true);

    try {
      const { error } = await supabase.auth.updateUser({
        data: { name: userDetails.name },
      });

      if (error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Success", "Profile updated successfully!");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleChangePassword = async () => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(userDetails.email);

      if (error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert(
          "Password Reset",
          "A password reset link has been sent to your email."
        );
      }
    } catch (err) {
      console.error("Error resetting password:", err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Account</Text>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={userDetails.name}
          onChangeText={(text) => setUserDetails({ ...userDetails, name: text })}
          placeholder="Enter your name"
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={userDetails.email}
          editable={false}
        />
      </View>

      <TouchableOpacity
        style={[styles.button, isUpdating && styles.disabledButton]}
        onPress={handleUpdate}
        disabled={isUpdating}
      >
        <Text style={styles.buttonText}>
          {isUpdating ? "Updating..." : "Update Profile"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={handleChangePassword}
      >
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#040707",
    marginBottom: 20,
    textAlign: "center",
  },
  fieldContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#040707",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  button: {
    backgroundColor: "#22a84a",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#94d3a2", // Lighter green for disabled state
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: "#f44336",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Profile;
