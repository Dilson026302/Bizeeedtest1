import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const AttachmentPreview = ({ attachment, onRemove }) => {
  return (
    <View style={styles.attachmentContainer}>
      {/* Display image preview if the attachment is an image */}
      {attachment.type === "image" && (
        <Image source={{ uri: attachment.uri }} style={styles.attachmentImage} />
      )}

      {/* Display file name for non-image attachments */}
      {attachment.type !== "image" && (
        <Text style={styles.attachmentText}>{attachment.name}</Text>
      )}

      {/* Remove button */}
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => onRemove(attachment.id)}
      >
        <Text style={styles.removeButtonText}>X</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  attachmentContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  attachmentImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  attachmentText: {
    flex: 1,
    color: "#333",
    fontSize: 14,
  },
  removeButton: {
    backgroundColor: "#ff4d4d",
    padding: 5,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  removeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
});

export default AttachmentPreview;
