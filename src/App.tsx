import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { onAuthStateChanged } from "firebase/auth";

import { colors } from "./utils/colors";
import { loadFonts } from "./utils/loadFonts";
import { AuthStackParamList, BottomTabParamList } from "./utils/types";

// Firebase
import { auth } from "./firebase";

// Screens
import { HomeScreen } from "./screens/HomeScreen";
import { PlantsScreen } from "./screens/PlantsScreen";
import { AuthScreen } from "./screens/AuthScreen";
import { SignInScreen } from "./screens/SignInScreen";
import { SignUpScreen } from "./screens/SignUpScreen";
import { ScanScreen } from "./screens/ScanScreen";
import { ForgotPasswordScreen } from "./screens/ForgotPasswordScreen";

// Icons
import { Ionicons } from "@expo/vector-icons";

const AuthStack = createStackNavigator<AuthStackParamList>();
const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

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

  const onAuthChange = (status: boolean) => {
    setLoggedIn(status);
  };

  // This way we dont pass an inline function to the component
  const SignUpScreenWrapper = (navigationProps) => (
    <SignUpScreen {...navigationProps} onAuthChange={onAuthChange} />
  );
  const SignInScreenWrapper = (navigationProps) => (
    <SignInScreen {...navigationProps} onAuthChange={onAuthChange} />
  );

  // if (!loggedIn) {
  //   return (
  //     <NavigationContainer>
  //       <StatusBar style="dark" />
  //       <AuthStack.Navigator initialRouteName="Auth">
  //         <AuthStack.Screen
  //           name="Auth"
  //           component={AuthScreen}
  //           options={{ headerShown: false }}
  //         />
  //         <AuthStack.Screen
  //           name="SignIn"
  //           component={SignInScreenWrapper}
  //           options={{ headerShown: false }}
  //         />
  //         <AuthStack.Screen
  //           name="ForgotPassword"
  //           component={ForgotPasswordScreen}
  //           options={{ headerShown: false }}
  //         />
  //         <AuthStack.Screen
  //           name="SignUp"
  //           component={SignUpScreenWrapper}
  //           options={{ headerShown: false }}
  //         />
  //       </AuthStack.Navigator>
  //     </NavigationContainer>
  //   );
  // } else {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <BottomTab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ size, color }) => {
            let iconName: any;

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
        <BottomTab.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <BottomTab.Screen
          name="Scan"
          component={ScanScreen}
          options={{ headerShown: false }}
        />
        <BottomTab.Screen
          name="Plants"
          component={PlantsScreen}
          options={{ headerShown: false }}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
  // }
};
