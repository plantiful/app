import React, { useEffect, useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "./firebase";
import { loadFonts } from "./utils/loadFonts";

import { HomeScreen } from "./screens/HomeScreen";
import { SearchScreen } from "./screens/SearchScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { PlantsScreen } from "./screens/PlantsScreen";
import { AuthScreen } from "./screens/AuthScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { RegisterScreen } from "./screens/RegisterScreen";

import HomeIcon from "./../assets/images/TabNavigator/Home.svg";
import HomeOutlinedIcon from "./../assets/images/TabNavigator/HomeOutline.svg";
import SearchIcon from "./../assets/images/TabNavigator/Search.svg";
import SearchOutlinedIcon from "./../assets/images/TabNavigator/SearchOutline.svg";
import PotIcon from "./../assets/images/TabNavigator/Pot.svg";
import PotOutlinedIcon from "./../assets/images/TabNavigator/PotOutline.svg";
import ProfileIcon from "./../assets/images/TabNavigator/Profile.svg";
import ProfileOutlinedIcon from "./../assets/images/TabNavigator/ProfileOutline.svg";

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
            component={(
              props: JSX.IntrinsicAttributes & { onAuthChange: any }
            ) => <LoginScreen {...props} onAuthChange={onAuthChange} />}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={(
              props: JSX.IntrinsicAttributes & { onAuthChange: any }
            ) => <RegisterScreen {...props} onAuthChange={onAuthChange} />}
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
            tabBarIcon: ({ focused, size }) => {
              let IconComponent;

              if (route.name === "Home") {
                IconComponent = focused ? HomeOutlinedIcon : HomeIcon;
              } else if (route.name === "Search") {
                IconComponent = focused ? SearchOutlinedIcon : SearchIcon;
              } else if (route.name === "Plants") {
                IconComponent = focused ? PotOutlinedIcon : PotIcon;
              } else if (route.name === "Profile") {
                IconComponent = focused ? ProfileOutlinedIcon : ProfileIcon;
              }

              if (IconComponent) {
                return <IconComponent width={size} height={size} />;
              }

              return null;
            },
            // Do not display text under the icons
            tabBarLabelStyle: { display: "none" },
          })}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Search"
            component={SearchScreen}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Plants"
            component={PlantsScreen}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ headerShown: false }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
};
