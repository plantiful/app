import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import PlantPodScreen from './src/screens/PlantsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';
import { loadFonts } from './src/utils/loadFonts';
import * as SplashScreen from 'expo-splash-screen';
import { colors } from './src/utils/colors';
import PlantsScreen from './src/screens/PlantsScreen';
import { View } from 'react-native';

const Tab = createBottomTabNavigator();

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  SplashScreen.preventAutoHideAsync().catch(() => {});

  if (!fontsLoaded) {
    loadFonts()
      .then(() => {
        setFontsLoaded(true);
        SplashScreen.hideAsync();
      })
      .catch(console.warn);
    return null;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Search') {
              iconName = focused ? 'search' : 'search-outline';
            } else if (route.name === 'Plants') {
              iconName = focused ? 'leaf' : 'leaf-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return (
              <View style={{ paddingTop: 6 }}>
                <Ionicons name={iconName} size={size} color={color} />
              </View>
            );
          },
          tabBarActiveTintColor: colors.textBlack,
          tabBarInactiveTintColor: colors.textLight,
          tabBarStyle: [{ display: 'flex' }],
          tabBarLabel: '',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Plants" component={PlantsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
