import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { onAuthStateChanged } from "firebase/auth";
import { PlantProvider } from "./screens/PlantContext";

import { loadFonts } from "./utils/loadFonts";
import {
  AuthStackParamList,
  SignInScreenProps,
  ForgotPasswordScreenProps,
  SignUpScreenProps,
  HomeStackParamList,
  BottomTabParamList,
  SettingsScreenProps,
  ProfileScreenProps,
  NotificationSettingsScreenProps,
  LanguageSettingsScreenProps,
  ChangeNameScreenProps,
  ChangeEmailScreenProps,
  ChangePasswordScreenProps,
  PlantsScreenParamList,
} from "./utils/types";

// Firebase
import { auth } from "./firebase";

// Screens
import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/SettingsScreen";
import LanuageSetttingsScreen from "./screens/LanuageSetttingsScreen";
import NotificationSettingsScreen from "./screens/NotificationSettingsScreen";
import PlantsScreen from "./screens/PlantsScreen";
import PlantDetailScreen from "./screens/PlantDetailScreen";
import AuthScreen from "./screens/AuthScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import ScanScreen from "./screens/ScanScreen";
import ChangePasswordScreen from "./screens/ChangePasswordScreen";
import ChangeEmailScreen from "./screens/ChangeEmailScreen";
import ChangeNameScreen from "./screens/ChangeNameScreen";

// Icons
import { Ionicons } from "@expo/vector-icons";
import ProfileScreen from "./screens/ProfileScreen";

import { LanguageProvider } from "./utils/LanguageContext";

const AuthStack = createStackNavigator<AuthStackParamList>();
const HomeStack = createStackNavigator<HomeStackParamList>();
const PlantStack = createStackNavigator<PlantsScreenParamList>();

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

  const ProfileScreenWrapper = (
    navigationProps: React.JSX.IntrinsicAttributes & ProfileScreenProps
  ) => <ProfileScreen {...navigationProps} />;

  const SettingsScreenWrapper = (
    navigationProps: React.JSX.IntrinsicAttributes & SettingsScreenProps
  ) => <SettingsScreen {...navigationProps} onAuthChange={onAuthChange} />;

  const ChangeNameScreenWrapper = (
    navigationProps: React.JSX.IntrinsicAttributes & ChangeNameScreenProps
  ) => <ChangeNameScreen {...navigationProps} />;

  const ChangeEmailScreenWrapper = (
    navigationProps: React.JSX.IntrinsicAttributes & ChangeEmailScreenProps
  ) => <ChangeEmailScreen {...navigationProps} />;

  const ChangePasswordScreenWrapper = (
    navigationProps: React.JSX.IntrinsicAttributes & ChangePasswordScreenProps
  ) => (
    <ChangePasswordScreen {...navigationProps} onAuthChange={onAuthChange} />
  );

  const NotificationSettingsScreenWrapper = (
    navigationProps: React.JSX.IntrinsicAttributes &
      NotificationSettingsScreenProps
  ) => <NotificationSettingsScreen {...navigationProps} />;

  const LanguageSettingsScreenWrapper = (
    navigationProps: React.JSX.IntrinsicAttributes & LanguageSettingsScreenProps
  ) => <LanuageSetttingsScreen {...navigationProps} />;

  if (!loggedIn) {
    return (
      <NavigationContainer>
        <StatusBar style="dark" />
        <AuthStack.Navigator initialRouteName="Auth">
          <AuthStack.Screen
            name="Auth"
            options={{ headerShown: false }}
            component={AuthScreen}
          />
          <AuthStack.Screen
            name="SignIn"
            options={{ title: "SignIn", headerShown: false }}
            component={SignInScreenWrapper}
          />
          <AuthStack.Screen
            name="ForgotPassword"
            options={{ title: "ForgotPassword", headerShown: false }}
            component={ForgotPasswordScreenWrapper}
          />
          <AuthStack.Screen
            name="SignUp"
            options={{ title: "SignUp", headerShown: false }}
            component={SignUpScreenWrapper}
          />
        </AuthStack.Navigator>
      </NavigationContainer>
    );
  } else {
    const PlantStackNavigator = () => {
      return (
        <PlantStack.Navigator>
          <PlantStack.Screen
            name="PlantsScreen"
            options={{ headerShown: false }}
            component={PlantsScreen}
          />
          <PlantStack.Screen
            name="PlantDetailScreen"
            options={{ headerShown: false }}
            component={PlantDetailScreen}
          />
        </PlantStack.Navigator>
      );
    };

    const HomeStackNavigator = () => {
      return (
        <HomeStack.Navigator>
          <HomeStack.Screen
            name="Home"
            options={{ headerShown: false }}
            component={HomeScreen}
          />
          <HomeStack.Screen
            name="Profile"
            options={{ headerShown: false }}
            component={ProfileScreenWrapper}
          />
          <HomeStack.Screen
            name="Settings"
            options={{ headerShown: false }}
            component={SettingsScreenWrapper}
          />
          <HomeStack.Screen
            name="ChangeName"
            options={{ headerShown: false }}
            component={ChangeNameScreenWrapper}
          />
          <HomeStack.Screen
            name="ChangeEmail"
            options={{ headerShown: false }}
            component={ChangeEmailScreenWrapper}
          />
          <HomeStack.Screen
            name="ChangePassword"
            options={{ headerShown: false }}
            component={ChangePasswordScreenWrapper}
          />
          <HomeStack.Screen
            name="NotificationSettings"
            options={{ headerShown: false }}
            component={NotificationSettingsScreenWrapper}
          />
          <HomeStack.Screen
            name="LanguageSettings"
            options={{ headerShown: false }}
            component={LanguageSettingsScreenWrapper}
          />
        </HomeStack.Navigator>
      );
    };

    return (
      <LanguageProvider>
        <PlantProvider>
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
                component={PlantStackNavigator}
              />
            </BottomTab.Navigator>
          </NavigationContainer>
        </PlantProvider>
      </LanguageProvider>
    );
  }
};
