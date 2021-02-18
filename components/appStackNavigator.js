import {createStackNavigator} from 'react-navigation-stack'
import BookDonate from '../screens/donateScreen'
import ReceiverDetails from '../screens/receiverDetails'
export const AppStackNavigator=createStackNavigator({
    bookDonateList:{
        screen:BookDonate,
    },
    receiverDetails:{
        screen:ReceiverDetails
    }

},{
    initialRouteName:'bookDonateList'
})