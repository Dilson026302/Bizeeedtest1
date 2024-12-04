import { API_CONFIG } from "../config/constants";
import { WebhookError } from "../utils/errors";

export async function sendWebhookMessage(payload) {
  console.log("Webhook URL:", API_CONFIG.WEBHOOK_URL);
  console.log("Payload being sent:", JSON.stringify(payload));

  if (!API_CONFIG.WEBHOOK_URL) {
    throw new WebhookError("Webhook URL is not configured");
  }

  try {
    const response = await fetch(API_CONFIG.WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text(); // Capture the response body on error
      console.error("Error response body:", errorText);
      throw new WebhookError(
        `Server responded with ${response.status}: ${response.statusText}`,
        response.status
      );
    }

    const contentType = response.headers.get("content-type");
    let data;

    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
      console.log("Parsed JSON response:", data);

      // Handle array response and extract the `body`
      if (Array.isArray(data) && data.length > 0) {
        const responseBody = data[0].body; // Extract `body` from the first object
        return { result: responseBody, status: data[0].status }; // Adjusted return format
      } else {
        throw new WebhookError("Unexpected JSON response format");
      }
    } else {
      const text = await response.text();
      console.log("Text response:", text);
      return {result: text, status: response.status };
    }
  } catch (error) {
    console.error("Error in sendWebhookMessage:", error);

    if (error instanceof WebhookError) {
      throw error;
    }
    if (error instanceof SyntaxError) {
      throw new WebhookError("Invalid JSON response from server");
    }
    throw new WebhookError(error.message || "Failed to send message");
  }
}
