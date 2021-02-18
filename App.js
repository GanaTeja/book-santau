import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import WelcomeScreen from './screens/welcomeScreen';
import {TabNavigator} from './components/tabNavigator'
import {createSwitchNavigator,createAppContainer} from 'react-navigation'
import { AppDrawer } from './components/drawerComponent';
export default class App extends React.Component {
  render() {
    return (
     <AppContainer>

     </AppContainer>
    );
  }
}
const AppNavigator=createSwitchNavigator({
  welcome:WelcomeScreen,
drawerComponent:AppDrawer
})
const AppContainer = createAppContainer(AppNavigator)