import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import {
  MaterialCommunityIcons,
  Entypo,
  Feather,
} from "react-native-vector-icons";
import { firestore } from '../../firebase.config';

const ChatScreen = ({ route }) => {
  const { chatItem } = route.params;
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const fetchChatMessages = async () => {
      try {
        const chatRef = firestore.collection("chats");
        const querySnapshot = await chatRef.get();
        const fetchedMessages = querySnapshot.docs.map((doc) => doc.data());
        setChatMessages(fetchedMessages);
      } catch (error) {
        console.error("Error fetching chat messages:", error);
      }
    };

    fetchChatMessages();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
        <Image source={chatItem.photos} style={styles.profileImage} />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{chatItem.name}</Text>
          <Text style={styles.statusOnline}>online</Text>
        </View>
        <MaterialCommunityIcons
          name="video"
          size={24}
          style={{ marginLeft: "auto", marginRight: 14 }}
          color="white"
        />
        <MaterialCommunityIcons
          name="phone"
          size={24}
          style={{ marginRight: 14 }}
          color="white"
        />
        <Feather name="more-vertical" size={24} color="white" />
      </View>
      <ScrollView
        style={styles.chatContainer}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {chatMessages.length > 0 && chatMessages[0].sender === "other" && (
          <Text style={styles.encryptedText}>
            Messages to this chat and calls are now secured with end-to-end
            encryption. No one outside of this chat can read or listen. Tap to
            learn more.
          </Text>
        )}
        {chatMessages.map((message, index) => (
          <View
            key={index}
            style={[
              styles.messageContainer,
              message.sender === "self"
                ? styles.selfMessage
                : styles.otherMessage,
            ]}
          >
            <Text
              style={[
                styles.messageText,
                message.sender === "self"
                  ? styles.selfMessageText
                  : styles.otherMessageText,
              ]}
            >
              {message.receiver}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <View style={styles.inputField}>
          <Entypo name="emoji-happy" size={24} color="#0e806a" />
          <Text style={styles.placeholder}>Type a message</Text>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="attachment"
              size={24}
              color="#0e806a"
              style={styles.icon}
            />
            <MaterialCommunityIcons
              name="camera"
              size={24}
              color="#0e806a"
              style={[styles.icon, styles.cameraIcon]}
            />
          </View>
        </View>
        <View style={styles.microphoneContainer}>
          <Feather name="mic" size={24} color="white" style={styles.icon} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusOnline: {
    color: "white", // Green color
    marginLeft: 16,
    fontSize: 12,
  },

  statusOffline: {
    color: "white", // Red color
    marginLeft: 16,
    fontSize: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0e806a",
    paddingVertical: 10, // Adjust vertical padding
    paddingHorizontal: 16,
    marginTop: 50,
  },
  statusContainer: {
    flexDirection: "column", // Change flexDirection to column
    alignItems: "flex-start", // Align items to start
    marginLeft: 10, // Add margin to separate name and status
  },

  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 16,
  },
  name: {
    flex: 1,
    color: "white",
    fontWeight: "bold",
    marginLeft: 16,
    fontSize: 17,
  },
  chatContainer: {
    flex: 1,
    padding: 16,
  },
  messageContainer: {
    maxWidth: "70%",
    marginVertical: 8,
    borderRadius: 8,
    padding: 8,
  },
  selfMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6",
  },
  otherMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderColor: "#eee",
    borderWidth: 1,
  },
  messageText: {
    fontSize: 16,
  },
  selfMessageText: {
    color: "#000",
  },
  otherMessageText: {
    color: "#000",
  },
  encryptedText: {
    backgroundColor: "#fdfdc5", // WhatsApp's yellowish background color
    padding: 12,
    marginLeft: 35,
    marginVertical: 8,
    textAlign: "center0",
    maxWidth: "80%", // Decrease the maximum width
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    padding: 10,
    paddingHorizontal: 16,
    marginBottom: 30,
  },
  inputField: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 10,
    alignItems: "center",
    position: "relative", // Set position to relative
  },

  iconContainer: {
    position: "absolute", // Set position to absolute
    right: 10, // Adjust right position as needed
    flexDirection: "row",
  },

  cameraIcon: {
    marginRight: 10, // Adjust margin between icons as needed
  },

  placeholder: {
    color: "#bbb",
    marginLeft: 20,
  },
  icon: {
    marginHorizontal: 5,
  },
  microphoneContainer: {
    width: 40, // Adjust width and height as needed
    height: 40,
    borderRadius: 24, // Half of width and height to make it a circle
    backgroundColor: "#075E54", // Green color
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10, // Adjust spacing from input field as needed
  },
});

export default ChatScreen;
