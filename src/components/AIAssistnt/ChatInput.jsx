import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from "react-native";

const ChatInput = ({ onSendMessage, onAttachFile, isLoading }) => {
  const [message, setMessage] = useState("");

  // Handle message sending
  const handleSend = () => {
    if (message.trim() === "") return; // Avoid sending empty messages
    onSendMessage(message); // Call the parent function
    setMessage(""); // Clear input field
  };

  return (
    <View style={styles.container}>
      {/* Attachment Button */}
      <TouchableOpacity style={styles.attachButton} onPress={onAttachFile}>
        <Text style={styles.attachText}>+</Text>
      </TouchableOpacity>

      {/* Input Field */}
      <TextInput
        style={styles.input}
        placeholder="Type your message..."
        value={message}
        onChangeText={setMessage}
        editable={!isLoading} // Disable input when loading
      />

      {/* Send Button */}
      <TouchableOpacity
        style={[styles.sendButton, message.trim() === "" && styles.disabledButton]}
        onPress={handleSend}
        disabled={message.trim() === "" || isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.sendText}>Send</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  attachButton: {
    width: 40,
    height: 40,
    backgroundColor: "#4CAF50",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  attachText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9",
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: "#4CAF50",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  sendText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#aaa",
  },
});

export default ChatInput;
