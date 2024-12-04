const InstagramLink = () => {
  // Example logic for Instagram login (replace this with actual implementation)
  alert("Redirecting to Instagram for authentication...");

  // Redirect to Instagram OAuth (replace this URL with the real one)
  const instagramOAuthUrl = "https://api.instagram.com/oauth/authorize";
  window.location.href = `${instagramOAuthUrl}?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=user_profile,user_media`;
};

export default InstagramLink;
