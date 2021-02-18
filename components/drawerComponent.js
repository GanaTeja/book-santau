import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import {createDrawerNavigator} from 'react-navigation-drawer'
import {TabNavigator} from './tabNavigator'
import CustomSideBarMenu from './customSideBar'
import SettingScreen from '../screens/settingScreen';
import AllDonations from '../screens/alldonations';
import AllNotifications from '../screens/allnotifications';
export const AppDrawer = createDrawerNavigator(
    {Home:{
        screen:TabNavigator
    },
    myDonations:{
        screen:AllDonations

    },
    notifications:{screen:AllNotifications},
    settings:{
        screen:SettingScreen
        },},
    {
        contentComponent:CustomSideBarMenu
    },
    {initialRouteName:'Home'}
)