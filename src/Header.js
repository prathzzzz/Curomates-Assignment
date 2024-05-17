import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Menu, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Fontisto, Feather } from "react-native-vector-icons";

const Header = ({ routeName }) => {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);
  const openSettings = () => {
    closeMenu();
    navigation.navigate("Settings");
  };

  // Only render the header if the routeName is not "Settings"
  if (routeName === "Settings") {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Whatsapp</Text>
        <View style={styles.iconContainer}>
          <Fontisto name="search" size={20} color="white" style={styles.icon} />
          <Menu
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={
              <TouchableOpacity onPress={openMenu} style={styles.menuButton}>
                <Feather name="more-vertical" size={24} color="white" />
              </TouchableOpacity>
            }
          >
            <Menu.Item onPress={openSettings} title="Settings" />
            {/* Add more menu items here */}
          </Menu>
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0e806a",
    paddingTop: 80,
    paddingBottom: 8,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16,
  },
  headerText: {
    fontSize: 20,
    color: "white",
    fontWeight: "500",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    padding: 10,
  },
  menuButton: {
    padding: 10,
  },
});