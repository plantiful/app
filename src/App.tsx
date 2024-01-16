import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { onAuthStateChanged } from "firebase/auth";

import { loadFonts } from "./utils/loadFonts";
import {
  AuthStackParamList,
  HomeStackParamList,
  BottomTabParamList,
  ForgotPasswordScreenProps,
  SignInScreenProps,
  SignUpScreenProps,
} from "./utils/types";

// Firebase
import { auth } from "./firebase";

// Screens
import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/SettingsScreen";
import PlantsScreen from "./screens/PlantsScreen";
import AuthScreen from "./screens/AuthScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import ScanScreen from "./screens/ScanScreen";

// Icons
import { Ionicons } from "@expo/vector-icons";

const AuthStack = createStackNavigator<AuthStackParamList>();
const HomeStack = createStackNavigator<HomeStackParamList>();

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
  const SignUpScreenWrapper = (
    navigationProps: React.JSX.IntrinsicAttributes & SignUpScreenProps
  ) => <SignUpScreen {...navigationProps} onAuthChange={onAuthChange} />;

  const SignInScreenWrapper = (
    navigationProps: React.JSX.IntrinsicAttributes & SignInScreenProps
  ) => <SignInScreen {...navigationProps} onAuthChange={onAuthChange} />;

  const ForgotPasswordScreenWrapper = (
    navigationProps: React.JSX.IntrinsicAttributes & ForgotPasswordScreenProps
  ) => <ForgotPasswordScreen {...navigationProps} />;

  // if (!loggedIn) {
  //   return (
  //     <NavigationContainer>
  //       <StatusBar style="dark" />
  //       <AuthStack.Navigator initialRouteName="Auth">
  //         <AuthStack.Screen
  //           name="Auth"
  //           options={{ headerShown: false }}
  //           component={AuthScreen}
  //         />
  //         <AuthStack.Screen
  //           name="SignIn"
  //           options={{ title: "SignIn", headerShown: false }}
  //           component={SignInScreenWrapper}
  //         />
  //         <AuthStack.Screen
  //           name="ForgotPassword"
  //           options={{ title: "ForgotPassword", headerShown: false }}
  //           component={ForgotPasswordScreenWrapper}
  //         />
  //         <AuthStack.Screen
  //           name="SignUp"
  //           options={{ title: "SignUp", headerShown: false }}
  //           component={SignUpScreenWrapper}
  //         />
  //       </AuthStack.Navigator>
  //     </NavigationContainer>
  //   );
  // } else {

  const HomeStackNavigator = () => {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={HomeScreen}
        />
        <HomeStack.Screen
          name="Settings"
          options={{ headerShown: false }}
          component={SettingsScreen}
        />
      </HomeStack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <BottomTab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => {
            let iconName: any;

            if (route.name === "Home") {
              iconName = "home-outline";
            } else if (route.name === "Scan") {
              iconName = "scan";
            } else if (route.name === "Plants") {
              iconName = "leaf-outline";
            }

            return <Ionicons name={iconName} size={30} color={color} />;
          },
          tabBarLabelStyle: { display: "none" }, // Do not display text under the icons
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "#6A6A6A",
        })}
      >
        <BottomTab.Screen
          name="Home"
          options={{ headerShown: false }}
          component={HomeStackNavigator}
        />
        <BottomTab.Screen
          name="Scan"
          options={{ headerShown: false }}
          component={ScanScreen}
        />
        <BottomTab.Screen
          name="Plants"
          options={{ headerShown: false }}
          component={PlantsScreen}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
  // }
};
