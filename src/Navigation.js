import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import Chat from "./screens/Chat";
import Calls from "./screens/Calls";
import Status from "./screens/Status";
import Camera from "./screens/Camera";
import Settings from "./screens/Settings";
import ChatScreen from './screens/ChatScreen'
import Header from "./Header"; // Import the Header component

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const MainTabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Chat"
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarIndicatorStyle: { backgroundColor: "white" },
        tabBarLabelStyle: { fontWeight: "bold" },
        tabBarStyle: { backgroundColor: "#0e806a" },
      }}
    >
      <Tab.Screen
        name="Camera"
        component={Camera}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="camera" size={24} color={color} />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="Status" component={Status} />
      <Tab.Screen name="Calls" component={Calls} />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={MainTabNavigation}
        options={{
          headerShown: true,
          header: (props) => <Header {...props} />,
        }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} options={{headerShown:false}} />
    </Stack.Navigator>
  );
};

export default Navigation;
