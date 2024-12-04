import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigate } from "react-router-dom";
import { useChat } from "../AIAssistnt/hooks/useChat";
import ChatInput from "../AIAssistnt/ChatInput";
import AttachmentPreview from "../AIAssistnt/AttachmentPreview";
import ChatMessageBubble from "./ChatInputMessage.jsx"; // Import ChatMessage.js
import ChatMessageBox from "./assistantReplay"; // Rename ChatMessage.jsx to ChatMessageBox.jsx and import


// ChatMessage Component
const ChatMessage = ({ message }) => {
  const isUser = message.sender === "user";

  return (
    <View
      style={[
        styles.messageContainer,
        isUser ? styles.userMessage : styles.botMessage,
      ]}
    >
      <Text style={[styles.messageText, isUser ? styles.userText : styles.botText]}>
        {message.content}
      </Text>
    </View>
  );
};

const AIAssistant = () => {
  const navigate = useNavigate();
  const {
    messages,
    attachments,
    sendMessage,
    addAttachment,
    removeAttachment,
    isLoading,
    error,
  } = useChat();

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerText}>AI Assistant Chat</Text>
      </View>

      {/* Main Chat Section */}
      <View style={styles.chatSection}>
        {/* Error Message */}
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {/* Scrollable Messages Section */}
        <ScrollView style={styles.messages} contentContainerStyle={styles.messagesContent}>
          {messages.length > 0 ? (
            messages.map((message) => 
              message.sender === "user" ? (
              <ChatMessageBubble key={message.id} message={message}/>
              ) : (
                <ChatMessageBox key={message.id} message={message} />
              )
            )             
          ) : (
            <Text style={styles.placeholderText}>
              No messages yet. Start chatting to see the magic!
            </Text>
          )}
        </ScrollView>

        {/* Attachments Section */}
        {attachments.length > 0 && (
          <View style={styles.attachments}>
            {attachments.map((attachment) => (
              <AttachmentPreview
                key={attachment.id}
                attachment={attachment}
                onRemove={removeAttachment}
              />
            ))}
          </View>
        )}
      </View>

      {/* Bottom Fixed Section */}
      <View style={styles.bottomSection}>
        {/* Chat Input */}
        <ChatInput
          onSendMessage={sendMessage}
          onAttachFile={addAttachment}
          isLoading={isLoading}
        />

        {/* Back to Home Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigate("/")}>
          <Text style={styles.backButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>

      {/* Loading Overlay */}
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text style={styles.loadingText}>Thinking...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  header: {
    backgroundColor: "#fbc116",
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  headerText: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 0.8,
  },
  chatSection: {
    flex: 1, // Makes this section take up all available space
    paddingHorizontal: 16,
    backgroundColor: "#1E1E1E", // Chat background
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  errorContainer: {
    backgroundColor: "#FF5252",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: "center",
  },
  errorText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "500",
  },
  messages: {
    flex: 1, // Ensures only this section scrolls
    padding: 8,
  },
  messagesContent: {
    paddingVertical: 8,
    paddingBottom: 20, // Space for the input field
  },
  placeholderText: {
    textAlign: "center",
    fontSize: 16,
    color: "#999",
    marginTop: 20,
  },
  messageContainer: {
    padding: 12,
    marginVertical: 6,
    borderRadius: 16,
    maxWidth: "75%",
  },
  userMessage: {
    backgroundColor: "#4CAF50",
    alignSelf: "flex-end",
    borderBottomRightRadius: 0,
  },
  botMessage: {
    backgroundColor: "#ECECEC",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 0,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  userText: {
    color: "#FFFFFF",
  },
  botText: {
    color: "#333333",
  },
  attachments: {
    paddingVertical: 10,
    backgroundColor: "#252525",
    borderRadius: 10,
    padding: 10,
    marginTop: 8,
  },
  bottomSection: {
    backgroundColor: "#1E1E1E",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  backButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  backButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  loadingText: {
    marginTop: 10,
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default AIAssistant;
