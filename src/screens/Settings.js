import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Animated,
} from "react-native";
import { IconButton, Avatar } from "react-native-paper";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import * as ImagePicker from "expo-image-picker";
import settingsdata from "../../src/data/settingsdata";
import { storage } from "../../firebase.config";
import { getDownloadURL, uploadBytes, ref, listAll } from "firebase/storage";

const Settings = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [fadeAnim] = useState(new Animated.Value(0));

  const renderSettingItem = ({ item }) => (
    <View style={styles.settingItemContainer}>
      <View style={styles.settingsRow}>
        <MaterialCommunityIcons name={item.icon} size={24} color="#666" />
        <Text style={styles.settingsText}>{item.title}</Text>
      </View>
      {item.subtitle && (
        <Text style={styles.settingsSubtext}>{item.subtitle}</Text>
      )}
    </View>
  );

  const requestMediaLibraryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    setHasPermission(status === "granted");
  };

  const pickImage = async () => {
    if (!hasPermission) {
      await requestMediaLibraryPermission();
    }

    if (hasPermission) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        uploadImageToFirebase(result.assets[0].uri);
      }
    }
  };

  const uploadImageToFirebase = async (uri) => {
    setIsLoading(true);
    try {
      const response = await fetch(uri);
      const blob = await response.blob();

      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Check if the blob is valid
      if (!blob || !blob.size) {
        throw new Error("Invalid blob");
      }

      const storageRef = ref(storage, `Images/${Date.now()}.jpg`);
      await uploadBytes(storageRef, blob);
      const downloadUrl = await getDownloadURL(storageRef);
      console.log("Image uploaded to Firebase Storage:", downloadUrl);
    } catch (error) {
      console.error("Error uploading image to Firebase Storage:", error);
      // Handle the error case, e.g., show an error message to the user
    } finally {
      setIsLoading(false);
    }
  };
  const fetchProfilePicture = async () => {
    const storageRef = ref(storage, "Images/");
    const listResult = await listAll(storageRef);

    if (listResult.items.length > 0) {
      setIsLoading(true); // Show loading indicator
      const imageRef = listResult.items[listResult.items.length - 1];
      const url = await getDownloadURL(imageRef);
      setImage(url);
    } else {
      setImage(null);
    }
    setTimeout(() => {
      setIsLoading(false);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, 500);
  };

  useEffect(() => {
    fetchProfilePicture();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          color="white"
          size={24}
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        />
        <Text style={styles.headerTitle}>Settings</Text>
      </View>
      <View style={styles.profileSection}>
        <TouchableOpacity onPress={pickImage}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#0e806a" />
          ) : (
            <Animated.View style={{ opacity: fadeAnim }}>
              {image ? (
                <Avatar.Image source={{ uri: image }} size={60} />
              ) : (
                <Avatar.Icon
                  size={60}
                  icon="account-circle"
                  color="#ccc"
                  style={{ backgroundColor: "#f5f5f5" }}
                />
              )}
            </Animated.View>
          )}
        </TouchableOpacity>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Programmer</Text>
          <Text style={styles.profileStatus}>
            Hey there, I am using WhatsApp.
          </Text>
        </View>
      </View>
      <FlatList
        data={settingsdata}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderSettingItem}
        style={styles.settingsList}
      />
      <Text style={styles.footerText}>from Facebook</Text>
    </View>
  );
};

export default Settings;
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0e806a",
    padding: 10,
    marginTop: 50,
  },
  headerTitle: {
    fontSize: 20,
    color: "white",
    marginLeft: 10,
    fontWeight: "bold",
  },
  backButton: {
    marginRight: 10,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileInfo: {
    marginLeft: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  profileStatus: {
    fontSize: 16,
    color: "#666",
  },
  settingItemContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  settingsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingsText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 16,
  },
  settingsSubtext: {
    fontSize: 14,
    color: "#666",
    marginLeft: 40,
    marginTop: 4,
  },
  settingsList: {
    marginTop: 16,
  },
  footerText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  footerText2: {
    marginBottom: 150,
    fontSize: 17,
    color: "black",
    textAlign: "center",
    fontStyle: "normal",
    fontWeight: "600",
  },
});
