import React, { useEffect, useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { onAuthStateChanged } from "firebase/auth";

import { loadFonts } from "./utils/loadFonts";

// Firebase
import { auth } from "./firebase";

// Screens
import { HomeScreen } from "./screens/HomeScreen";
import { PlantsScreen } from "./screens/PlantsScreen";
import { AuthScreen } from "./screens/AuthScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { RegisterScreen } from "./screens/RegisterScreen";
import { ScanScreen } from "./screens/ScanScreen";

// Icons
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const onAuthChange = (status: boolean) => {
    setLoggedIn(status);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });

    return unsubscribe();
  }, []);

  if (!fontsLoaded) {
    loadFonts()
      .then(() => {
        setFontsLoaded(true);
      })
      .catch(console.error);
    return null;
  }

  // This way we dont pass an inline function to the component
  const RegisterScreenWrapper = () => (
    <RegisterScreen onAuthChange={onAuthChange} />
  );
  const LoginScreenWrapper = () => <LoginScreen onAuthChange={onAuthChange} />;

  if (!loggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Auth"
            component={AuthScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreenWrapper}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreenWrapper}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ size, color }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = "home-outline";
              } else if (route.name === "Scan") {
                iconName = "scan";
              } else if (route.name === "Plants") {
                iconName = "leaf-outline";
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarLabelStyle: { display: "none" }, // Do not display text under the icons
            tabBarActiveTintColor: "black",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Scan"
            component={ScanScreen}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Plants"
            component={PlantsScreen}
            options={{ headerShown: false }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
};
