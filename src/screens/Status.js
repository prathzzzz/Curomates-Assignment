import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import STATUSDATA from "../data/statusdata";
import { MaterialCommunityIcons } from "react-native-vector-icons";

const Status = () => {
  const [statusData, setStatusData] = useState(STATUSDATA);

  useEffect(() => {
    setStatusData(STATUSDATA);
  }, []);

  const combinedStatusData = [
    {
      title: "Recent updates",
      data: statusData.filter((item) => !item.viewed),
    },
    { title: "Viewed updates", data: statusData.filter((item) => item.viewed) },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.myStatusContainer}>
        <View style={styles.imageOuterContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../assets/images/dummy-1.jpg")}
              style={styles.image}
            />
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.myStatusHeading}>My Status</Text>
          <Text style={styles.myStatusSubtext}>Tap to add status update</Text>
        </View>
        <MaterialCommunityIcons
          name="dots-vertical"
          size={21}
          color="grey"
          style={{ marginLeft: "auto" }}
        />
      </View>
      <FlatList
        data={combinedStatusData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <>
            <Text style={styles.viewStatus}>{item.title}</Text>
            <FlatList
              data={item.data}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.viewedStatusContainer}>
                  <View style={styles.imageOuterContainer}>
                    <View style={styles.imageContainer}>
                      <Image source={item.photos} style={styles.image} />
                    </View>
                  </View>
                  <View>
                    <Text style={styles.myStatusHeading}>{item.name}</Text>
                    <Text style={styles.myStatusSubtext}>{item.time}</Text>
                  </View>
                </View>
              )}
            />
          </>
        )}
      />
      <TouchableOpacity style={styles.chatButton} onPress={() => "#"}>
        <MaterialCommunityIcons
          name="android-messages"
          size={24}
          color="white"
        ></MaterialCommunityIcons>
      </TouchableOpacity>
    </View>
  );
};

export default Status;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  myStatusContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  imageOuterContainer: {
    marginRight: 16,
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  myStatusHeading: {
    fontSize: 16,
    fontWeight: "600",
  },
  myStatusSubtext: {
    marginTop:7,
    fontSize: 14,
    color: "grey",
  },
  viewStatus: {
    fontSize: 14,
    fontWeight: "600",
    color: "grey",
    marginLeft: 16,
    marginTop: 5,
    marginBottom: 5,
  },
  viewedStatusContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  chatButton: {
    position: "absolute",
    bottom: 40,
    right: 20,
    backgroundColor: "#0e806a",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
