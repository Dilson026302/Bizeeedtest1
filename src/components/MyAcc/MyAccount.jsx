import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Login from "./Login";
import SignUp from "./SignUp";
import Profile from "./Profile"; // Import the Profile component
import { supabase } from "../../../supabase"; // Import the Supabase client
import styles from "../../stylespages";

const MyAccount = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching user:", error.message);
      } else {
        setUser(user);
      }
    };

    checkUser();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error.message);
    } else {
      setUser(null);
    }
  };

  if (user) {
    return <Profile onLogout={handleLogout} />;
  }

  return (
    <View style={styles.container}>
      {isLogin ? (
        <Login navigateToSignUp={() => setIsLogin(false)} />
      ) : (
        <SignUp navigateToLogin={() => setIsLogin(true)} />
      )}
    </View>
  );
};


export default MyAccount;
