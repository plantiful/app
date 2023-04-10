import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from './firebaseConfig';
import { loadFonts } from './src/utils/loadFonts';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import PlantsScreen from './src/screens/PlantsScreen';

import AuthScreen from './src/screens/AuthScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';

// SVG icons
import Home from './assets/images/TabNavigator/Home.svg';
import HomeOutline from './assets/images/TabNavigator/HomeOutline.svg';
import Search from './assets/images/TabNavigator/Search.svg';
import SearchOutline from './assets/images/TabNavigator/SearchOutline.svg';
import Pot from './assets/images/TabNavigator/Pot.svg';
import PotOutline from './assets/images/TabNavigator/PotOutline.svg';
import Profile from './assets/images/TabNavigator/Profile.svg';
import ProfileOutline from './assets/images/TabNavigator/ProfileOutline.svg';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, size }) => {
        let Icon: any;

        if (route.name === 'Home') {
          Icon = focused ? HomeOutline : Home;
        } else if (route.name === 'Search') {
          Icon = focused ? SearchOutline : Search;
        } else if (route.name === 'Plants') {
          Icon = focused ? PotOutline : Pot;
        } else if (route.name === 'Profile') {
          Icon = focused ? ProfileOutline : Profile;
        }

        return <Icon width={size} height={size} />;
      },
      tabBarLabelStyle: { display: 'none' },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Search" component={SearchScreen} />
    <Tab.Screen name="Plants" component={PlantsScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const App = () => {
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

    return () => {
      unsubscribe();
    };
  }, []);


  if (!fontsLoaded) {
    loadFonts()
      .then(() => {
        setFontsLoaded(true);
      })
      .catch(console.warn);
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
          <Stack.Screen name="Login" options={{ headerShown: false }}>
            {props => <LoginScreen {...props} onAuthChange={onAuthChange} />}
          </Stack.Screen>
          <Stack.Screen name="Register" options={{ headerShown: false }}>
            {props => <RegisterScreen {...props} onAuthChange={onAuthChange} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};

export default App;
