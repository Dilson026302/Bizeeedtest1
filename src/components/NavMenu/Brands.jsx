import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Button, FlatList, Image } from "react-native";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../supabase";
import styles from "../../stylespages";

const Brands = () => {
  const navigate = useNavigate();
  const [brandName, setBrandName] = useState("");
  const [brandDetails, setBrandDetails] = useState("");
  const [brandLogo, setBrandLogo] = useState("");
 
  const [isLoading, setIsLoading] = useState(false);
  const [brands, setBrands] = useState([]);

  // Fetch Saved Brands from Supabase
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) throw new Error("User not authenticated.");

        const { data, error } = await supabase
          .from("BrandAssets")
          .select("*")
          .eq("user_id", user.id);

        if (error) throw error;

        setBrands(data || []);
      } catch (error) {
        console.error("Error fetching brands:", error.message);
      }
    };

    fetchBrands();
  }, []);

  // Save Brand to Supabase
  const saveBrandToSupabase = async () => {
    if (!brandName || !brandLogo || !brandDetails) {
      alert("All fields are required.");
      return;
    }
    setIsLoading(true);
    try {
      const { data: user, error: userError } = await supabase.auth.getUser();
      if (userError || !user) throw new Error("User not authenticated.");

      const { error } = await supabase.from("BrandAssets").insert([
        {
          BrandName: brandName,
          BrandLogo: brandLogo,
          BrandDetails: brandDetails,
          user_id: user.id,
        },
      ]);

      if (error) throw error;

      alert("Brand details saved successfully!");
      setBrandName("");
      setBrandDetails("");
      setBrandLogo("");
      setBrands((prev) => [
        ...prev,
        { BrandName: brandName, BrandLogo: brandLogo, BrandDetails: brandDetails },
      ]);
    } catch (error) {
      console.error("Error saving brand details:", error.message);
      alert("Failed to save brand details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <Text style={styles.header}>Brands Assets</Text>
      <Text style={styles.text}>
        Add your brands and link the brand assets to the app. Provide brand assets like the brand logo, address, and contact information.
      </Text>

      {/* Add Brand Section */}
      <Text style={styles.modalTitle}>Add Brand</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Brand Name"
        value={brandName}
        onChangeText={setBrandName}
      />
      <TouchableOpacity style={styles.linkButton} onPress={() => navigate("/link-social-media")}>
        <Text style={styles.linkButtonText}>Link Social Media</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Paste Brand Logo URL"
        value={brandLogo}
        onChangeText={setBrandLogo}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter Brand Details"
        value={brandDetails}
        onChangeText={setBrandDetails}
        multiline
      />
      <Button title={isLoading ? "Saving..." : "Save"} onPress={saveBrandToSupabase} disabled={isLoading} />

      {/* Saved Brands Section */}
      <View style={styles.container}>
        <Text style={styles.subHeader}>Your Saved Brands</Text>
        {brands.length > 0 ? (
          <FlatList
            data={brands}
            keyExtractor={(item, index) => item.id?.toString() || index.toString()}
            renderItem={({ item }) => (
              <View style={styles.brandBox}>
                <Text style={styles.brandName}>{item.BrandName}</Text>
                <Image source={{ uri: item.BrandLogo }} style={styles.brandLogo} />
                <Text style={styles.brandDetails}>{item.BrandDetails}</Text>
              </View>
            )}
          />
        ) : (
          <Text style={styles.noBrandsText}>No brands saved yet.</Text>
        )}
      </View>

      {/* Navigation Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigate("/")}>
        <Text style={styles.backButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Brands;
