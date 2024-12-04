import { useState, useCallback, useEffect } from "react";
import { supabase } from "../../../../supabase";
import { useErrorHandler } from "../../AIAssistnt/hooks/useErrorHandler";
import { sendWebhookMessage } from "../../../services/webhookService";

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { error, setError, handleError } = useErrorHandler();

  useEffect(() => {
    const fetchMessages = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch current user
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;

        // Fetch messages for the logged-in user
        const { data, error } = await supabase
          .from("aiassistantmessage")
          .select("*")
          .eq("user_id", user.id) // Filter messages by user_id
          .order("created_at", { ascending: true });

        if (error) {
          console.error("Error fetching messages from Supabase:", error);
          throw error;
        }

        setMessages(data || []);
      } catch (err) {
        handleError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, [handleError, setError]);

  const sendMessage = useCallback(
    async (content) => {
      if (!content) return;

      setIsLoading(true);
      setError(null);

      try {
        // Get current user
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;

        const userMessage = {
          content,
          sender: "user",
          user_id: user.id, // Associate message with the user
          created_at: new Date().toISOString(),
        };

        // Save message to Supabase
        const { error: userErrorSave } = await supabase
          .from("aiassistantmessage")
          .insert([userMessage]);

        if (userErrorSave) throw userErrorSave;

        setMessages((prev) => [...prev, userMessage]);

        // Send webhook payload
        const payload = {
          message: content,
          user_id: user.id, // Include user ID in the payload
        };
        const response = await sendWebhookMessage(payload);

        if (!response || !response.result) {
          throw new Error("Invalid response from webhook");
        }

        const botMessage = {
          content: response.result,
          sender: "bot",
          user_id: user.id, // Associate bot response with the user
          created_at: new Date().toISOString(),
        };

        // Save bot response to Supabase
        const { error: botError } = await supabase
          .from("aiassistantmessage")
          .insert([botMessage]);

        if (botError) throw botError;

        setMessages((prev) => [...prev, botMessage]);
      } catch (err) {
        handleError(err);
      } finally {
        setIsLoading(false);
      }
    },
    [handleError]
  );

  return {
    messages,
    attachments,
    sendMessage,
    addAttachment: (file) =>
      setAttachments((prev) => [...prev, { id: Date.now().toString(), file }]),
    removeAttachment: (id) =>
      setAttachments((prev) => prev.filter((attachment) => attachment.id !== id)),
    isLoading,
    error,
  };
}
