import React, { ElementType, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { loadFonts } from './src/utils/loadFonts';
import { colors } from './src/utils/colors';
import PlantsScreen from './src/screens/PlantsScreen';

// SVG icons
import Home from './assets/bottom-bar/home.svg';
import HomeOutline from './assets/bottom-bar/home-outline.svg';
import Search from './assets/bottom-bar/search.svg';
import SearchOutline from './assets/bottom-bar/search-outline.svg';
import Pot from './assets/bottom-bar/pot.svg';
import PotOutline from './assets/bottom-bar/pot-outline.svg';
import Profile from './assets/bottom-bar/profile.svg';
import ProfileOutline from './assets/bottom-bar/profile-outline.svg';

const Tab = createBottomTabNavigator();

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (!fontsLoaded) {
    loadFonts()
      .then(() => {
        setFontsLoaded(true);
      })
      .catch(console.warn);
    return null;
  }

  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
};

export default App;
