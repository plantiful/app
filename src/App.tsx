import React, { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from './firebaseConfig';
import { loadFonts } from './utils/loadFonts';

// Screens
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import ProfileScreen from './screens/ProfileScreen';
import PlantsScreen from './screens/PlantsScreen';
import CameraScreen from './screens/CameraScreen';
import AuthScreen from './screens/AuthScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

// SVG icons
import Home from './../assets/images/TabNavigator/Home.svg';
import HomeOutline from './../assets/images/TabNavigator/HomeOutline.svg';
import Search from './../assets/images/TabNavigator/Search.svg';
import SearchOutline from './../assets/images/TabNavigator/SearchOutline.svg';
import Pot from './../assets/images/TabNavigator/Pot.svg';
import PotOutline from './../assets/images/TabNavigator/PotOutline.svg';
import Profile from './../assets/images/TabNavigator/Profile.svg';
import ProfileOutline from './../assets/images/TabNavigator/ProfileOutline.svg';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export const App = () => {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
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
                    <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Register"
                        component={RegisterScreen}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, size }) => {
                        let IconComponent;

                        if (route.name === 'Home') {
                            IconComponent = focused ? HomeOutline : Home;
                        } else if (route.name === 'Search') {
                            IconComponent = focused ? SearchOutline : Search;
                        } else if (route.name === 'Plants') {
                            IconComponent = focused ? PotOutline : Pot;
                        } else if (route.name === 'Profile') {
                            IconComponent = focused ? ProfileOutline : Profile;
                        }

                        if (IconComponent) {
                            return <IconComponent width={size} height={size} />;
                        }

                        return null;
                    },
                    tabBarLabelStyle: { display: 'none' },
                })}
            >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Search" component={SearchScreen} />
                <Tab.Screen name="Plants" component={PlantsScreen} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
                <Tab.Screen name="Camera" component={CameraScreen} options={{ tabBarLabel: () => null }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};
