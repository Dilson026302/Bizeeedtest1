import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from "react-native";
import SchedulePosts from "./components/Scdlpst/SchedulePosts";
import DashboardInsights from "./components/DashInsg/DashboardInsights";
import DigitalMarketing from "./components/DigiMark/DigitalMarketing";
import AIContentCreation from "./components/AICntntCrtn/AIContentCreation";
import AIAssistant from "./components/AIAssistnt/AIAssistant";
import LinkSocialMedia from "./components/LinkSM/SocialMediaDash";
import CompetitorAnalysis from "./components/CompAnaly/CompetitorAnalysis";
import InfluMana from "./components/InfluencerMangmt/InfluencerManagment";
import MyAccount from "./components/MyAcc/MyAccount";
import Settings from "./components/NavMenu/Settings";
import Help from "./components/NavMenu/Help";
import Brands from "./components/NavMenu/Brands";
import navigationMenuOptions from "./components/NavMenu/navigationOptions";
import Login from "./components/MyAcc/Login";
import { supabase } from "../supabase";
import styles from "./styles";
import SocialMediaDash from "./components/LinkSM/SocialMediaDash";


const Home = () => {
  const navigate = useNavigate();
  const buttons = [
    { id: "1", title: "Social Media ", route: "/social-media" },
    { id: "2", title: "Schedule Posts", route: "/schedule-posts" },
    { id: "3", title: "Dashboard Insights", route: "/dashboard_insights" },
    { id: "4", title: "Digital Marketing", route: "/digital_marketing" },
    { id: "5", title: "AI Content Creation", route: "/AI_Cntnt" },
    { id: "6", title: "AI Assistant", route: "/AI_Astnt" },
    { id: "7", title: "Competitor Analysis", route: "/competitor_analysis"},
    { id: "8", title: "Influencer Managment", route: "/Influencer_managment"},    
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to Bizeeed</Text>
      <FlatList
        data={buttons}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigate(item.route)}
            activeOpacity={0.8}
          >
            <Text style={styles.cardText}>{item.title}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.cardGrid}
      />
    </View>
  );
};

const NavigationMenu = ({ closeMenu }) => {
  const navigate = useNavigate();

  return (
    <View style={styles.menuContainer}>
      <Text style={styles.menuHeader}>Navigation</Text>
      {navigationMenuOptions.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={styles.menuItem}
          onPress={() => {
            navigate(option.route);
            closeMenu();
          }}
        >
          <Text style={styles.menuItemText}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const App = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.auth.getUser();
        if (error) throw error;

        if (data.user) {
          setUserEmail(data.user.email);
          setIsAuthenticated(true);
          navigate("/");
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error("Error fetching user:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setIsAuthenticated(false);
      setUserEmail(null);
      navigate("/login");
    } catch (err) {
      console.error("Error logging out:", err.message);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        visible={menuVisible}
        transparent={true}
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View>
                <NavigationMenu closeMenu={() => setMenuVisible(false)} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => setMenuVisible(true)}>
        <Text style={styles.menuIcon}>☰</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate('/')}> {/* Navigate to root ("/") */}
        <Text style={styles.headerText}>Bizeeed</Text>
      </TouchableOpacity>
      {userEmail && (
        <TouchableOpacity
          style={styles.userInitialContainer}
          onPress={() => navigate('/my-account')} // Navigate to /my-account on click
        >
          <Text style={styles.userInitialText}>
            {userEmail.charAt(0).toUpperCase()}
          </Text>
        </TouchableOpacity>
      )}
    </View>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/social-media" element={<SocialMediaDash />} />
        <Route path="/schedule-posts" element={<SchedulePosts />} />
        <Route path="/dashboard_insights" element={<DashboardInsights />} />
        <Route path="/digital_marketing" element={<DigitalMarketing />} />
        <Route path="/AI_Cntnt" element={<AIContentCreation />} />
        <Route path="/competitor_analysis" element={<CompetitorAnalysis />} />
        <Route path="/Influencer_managment" element={<InfluMana />} />
        <Route path="/AI_Astnt" element={<AIAssistant />} />
        <Route path="/my-account" element={<MyAccount />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/help" element={<Help />} />
        <Route path="/brands" element={<Brands />} />
      </Routes>
    </View>
  );
};

export default App;
