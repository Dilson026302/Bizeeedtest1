import { useState, useCallback } from "react";
import { WebhookError, ValidationError } from "../../../utils/errors";

export function useErrorHandler() {
  const [error, setError] = useState(null); // No type annotations in JavaScript

  const handleError = useCallback((err) => {
    let errorMessage = "An unexpected error occurred. Please try again.";

    if (err instanceof WebhookError) {
      errorMessage = err.message;
      if (err.statusCode === 429) {
        errorMessage = "Too many requests. Please wait a moment and try again.";
      }
    } else if (err instanceof ValidationError) {
      errorMessage = "Invalid response from server. Please try again.";
    }

    setError(errorMessage);
    console.error("Error:", err);
  }, []);

  return { error, setError, handleError };
}
