import { useGoogleLogin } from "@react-oauth/google";

const GoogleLink = () => {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      alert(`Success! Access Token: ${tokenResponse.access_token}`);
      console.log("Access Token:", tokenResponse.access_token);
    },
    onError: () => {
      alert("Error: Google Login failed");
    },
  });

  // Trigger Google login
  login();
};

export default GoogleLink;
