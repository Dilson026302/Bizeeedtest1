import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { useNavigate } from "react-router-dom";
import { Calendar } from "react-native-calendars"; // Import the Calendar component
import { MdEdit, MdArrowBack, MdCalendarToday } from "react-icons/md"; // Material Icons from react-icons
const SchedulePosts = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(""); // State to store the selected date

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Schedule and Manage Your Social Media Posts</Text>

      {/* Input for Post Content */}
      <TextInput placeholder="Enter Post Content" style={styles.input} />

      {/* Placeholder for Date Selection */}
      <Text style={styles.subHeader}>Select a Date for Scheduling</Text>

      {/* Calendar Component */}
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)} // Handle date selection
        markedDates={{
          [selectedDate]: { selected: true, marked: true, selectedColor: "#00adf5" },
        }}
        style={styles.calendar}
      />

      {/* Display Selected Date */}
      {selectedDate ? (
        <Text style={styles.selectedDateText}>Selected Date: {selectedDate}</Text>
      ) : null}

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
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  subHeader: {
    fontSize: 16,
    marginBottom: 20,
    color: "#666",
  },
  input: {
    width: "80%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
  },
  calendar: {
    marginBottom: 20,
    width: "100%",
  },
  selectedDateText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    marginTop: 20,
    width: "80%",
    borderRadius: 10,
    alignItems: "center",
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default SchedulePosts;
