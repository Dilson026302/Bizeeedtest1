import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ChatMessage = ({ message }) => (
  <View style={styles.messageContainer}>
    <Text style={styles.messageText}>{message.content}</Text>
  </View>
);

const styles = StyleSheet.create({
  messageContainer: {
    padding: 10,
    backgroundColor: "#e6f7ff",
    borderRadius: 8,
    marginBottom: 8,
  },
  messageText: {
    color: "#333",
  },
});

export default ChatMessage;
