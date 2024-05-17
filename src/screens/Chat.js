import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import DATA from '../data/chatdata';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { useNavigation } from '@react-navigation/native';

const Chat = () => {
  const [chatData, setChatData] = useState(DATA);
  const navigation = useNavigation();

  useEffect(() => {
    setChatData(DATA);
  }, []);

  const handleChatItemPress = (chatItem) => {
    if (navigation && navigation.navigate) {
      navigation.navigate('ChatScreen', { chatItem });
    } else {
      console.warn('Navigation is not available or ChatScreen is not configured');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={chatData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleChatItemPress(item)}>
            <View style={styles.chatContainer}>
              <Image source={item.photos} style={styles.image} />
              <View style={styles.chatContent}>
                <View style={styles.chatHeader}>
                  <Text style={styles.chatName}>{item.name}</Text>
                  <Text style={styles.chatTime}>{item.time}</Text>
                </View>
                <View style={styles.messages}>
                  <Text style={styles.chatMessage} numberOfLines={1}>
                    {item.lastMessage}
                  </Text>
                  {item.totalUnread > 0 && (
                    <View style={styles.unreadContainer}>
                      <Text style={styles.totalUnread}>{item.totalUnread}</Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.chatButton} onPress={() => ('#')}>
        <MaterialCommunityIcons name="android-messages" size={24} color="white"></MaterialCommunityIcons>
      </TouchableOpacity>
    </View>
  );
};

export default Chat;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
  },
  chatContainer: {
    flexDirection: "row",
    marginRight: 16,
    marginLeft: 16,
  },
  image: {
    width: 50,
    height: 50,
    backgroundColor: "#128C7",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  chatContent: {
    flex: 5,
    borderBottomWidth: 0,
    marginLeft: 16,
    paddingBottom: 16,
    marginBottom: 13,
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
    marginTop: 4,
  },
  chatName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  chatTime: {
    fontSize: 12,
    color: "#25D366",
  },
  messages : {
    flexDirection:'row',
    justifyContent : 'center',
  },
  chatMessage : {
    fontSize : 14,
    color:'#A0A09E',
    width : '90%',
    fontWeight:'800'
  },
  unreadContainer : {
    height : 25,
    width : 25,
    borderRadius : 50,
    backgroundColor : '#25D366',
    alignItems:'center',
    justifyContent:'center'
  },
  totalUnread : {
    fontSize : 10,
    color: "#fff",
    fontWeight:'600'
  },
  chatButton : {
    position : 'absolute',
    bottom:40,
    right:20,
    backgroundColor:'#0e806a',
    width:60,
    height:60,
    borderRadius:30,
    alignItems:'center',
    justifyContent:'center'
  }
});
