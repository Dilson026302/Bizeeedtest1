import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { supabase } from "../../../supabase";

const ChatMessage = ({ message }) => {
  const isUser = message.sender === "user";

  return (
    <View
      style={[
        styles.messageBubble,
        isUser ? styles.userBubble : styles.botBubble,
      ]}
    >
      <Text style={[styles.messageText, isUser ? styles.userText : styles.botText]}>
        {message.content}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  messageBubble: {
    padding: 12,
    marginVertical: 6,
    borderRadius: 16,
    maxWidth: "75%",
  },
  userBubble: {
    backgroundColor: "#4CAF50", // Vibrant green for user
    alignSelf: "flex-end",
    borderBottomRightRadius: 0, // Unique shape for user messages
  },
  botBubble: {
    backgroundColor: "#F1F1F1", // Light gray for bot
    alignSelf: "flex-start",
    borderBottomLeftRadius: 0, // Unique shape for bot messages
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  userText: {
    color: "#FFFFFF", // White text for user messages
  },
  botText: {
    color: "#333333", // Dark gray text for bot messages
  },
});

export default ChatMessage;
