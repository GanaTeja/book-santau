import {createBottomTabNavigator} from 'react-navigation-tabs'
import BookDonate from '../screens/donateScreen'
import BookRequest from '../screens/requestScreen'
import { AppStackNavigator } from './appStackNavigator'

export const TabNavigator =  createBottomTabNavigator({
    donateScreen:{screen: AppStackNavigator},
    requestScreen:{screen:BookRequest}
})