// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View } from "react-native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { createStackNavigator } from "@react-navigation/stack";
// import  Icon  from "react-native-vector-icons/Icon";

// import CalendarScreen from "./components/src/screens/CalendarScreen";
// import AccessSettings from "./components/src/screens/AccessSettings";
// import Encyclopedia from "./components/src/screens/Encyclopedia";
// import ProfileScreen from "./components/src/screens/ProfileScreen";
// import { NavigationContainer } from "@react-navigation/native";

// const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ color, size }) => {
//             let iconName;
//             if (route.name === "Home") {
//               iconName = "home-outline";
//             } else if (route.name === "Calendar") {
//               iconName = "calendar";
//             } else if (route.name === "Profile") {
//               iconName = "account-outline";
//             } else if (route.name === "Encyclopedia") {
//               iconName = "book-outline";
//             } else if (route.name === "Settings") {
//               iconName = "cog-outline";
//             }
//             return <Icon name={iconName} color={color} size={size} />;
//           },
//         })}
//       >
//         <Tab.Screen name="Profile" component={ProfileScreen} />
//         <Tab.Screen name="Calendar" component={CalendarScreen} />
//         <Tab.Screen name="Encyclopedia" component={Encyclopedia} />
//         <Tab.Screen name="Settings" component={AccessSettings} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons"; 

import CalendarScreen from "./components/src/screens/CalendarScreen";
import AccessSettings from "./components/src/screens/AccessSettings";
import Encyclopedia from "./components/src/screens/Encyclopedia";
import ProfileScreen from "./components/src/screens/ProfileScreen";
import { NavigationContainer } from "@react-navigation/native";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = "home-outline"; 
            } else if (route.name === "Calendar") {
              iconName = "calendar";
            } else if (route.name === "Profile") {
              iconName = "person-outline";
            } else if (route.name === "Encyclopedia") {
              iconName = "book-outline";
            } else if (route.name === "Settings") {
              iconName = "settings-outline";
            }
            return <Icon name={iconName} color={color} size={size} />;
          },
        })}
      >
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Calendar" component={CalendarScreen} />
        <Tab.Screen name="Encyclopedia" component={Encyclopedia} />
        <Tab.Screen name="Settings" component={AccessSettings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
