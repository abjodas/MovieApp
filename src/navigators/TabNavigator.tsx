/* eslint-disable prettier/prettier */
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import TicketScreen from '../screens/TicketScreen';
import UserAccountScreen from '../screens/UserAccountScreen';

import { COLORS, FONTSIZE, SPACING } from '../Themes/theme';
import CustomIcon from '../components/CustomIcon';
import { View, StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarHideOnKeyboard: true,
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: COLORS.Black,
                    borderTopWidth: 0,
                    height: SPACING.space_10 * 10,
                }
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{
                tabBarShowLabel: false,
                tabBarIcon: ({ focused, color, size }) => {
                    return <View style={focused ? styles.activeTabBackground : styles.inactiveTabBackground}><CustomIcon name="video" size={FONTSIZE.size_30} color={COLORS.White} /></View>
                }
            }} />
            <Tab.Screen name="Search" component={SearchScreen} options={{
                tabBarShowLabel: false,
                tabBarIcon: ({ focused, color, size }) => {
                    return <View style={focused ? styles.activeTabBackground : styles.inactiveTabBackground}><CustomIcon name="search" size={FONTSIZE.size_30} color={COLORS.White} /></View>
                }
            }} />
            <Tab.Screen name="Tickets" component={TicketScreen} options={{
                tabBarShowLabel: false,
                tabBarIcon: ({ focused, color, size }) => {
                    return <View style={focused ? styles.activeTabBackground : styles.inactiveTabBackground}><CustomIcon name="ticket" size={FONTSIZE.size_30} color={COLORS.White} /></View>
                }
            }} />
            <Tab.Screen name="User" component={UserAccountScreen} options={{
                tabBarShowLabel: false,
                tabBarIcon: ({ focused, color, size }) => {
                    return <View style={focused ? styles.activeTabBackground : styles.inactiveTabBackground}><CustomIcon name="user" size={FONTSIZE.size_30} color={COLORS.White} /></View>
                }
            }} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    activeTabBackground: {
        backgroundColor: COLORS.Orange,
        padding: SPACING.space_18,
        borderRadius: SPACING.space_18 * 10
    },
    inactiveTabBackground: {
        backgroundColor: COLORS.Black,
        padding: SPACING.space_18,
        borderRadius: SPACING.space_18 * 10
    }
})

export default TabNavigator;