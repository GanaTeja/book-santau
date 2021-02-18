import React from 'react';
import { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import {DrawerItems} from 'react-navigation-drawer'
import firebase from 'firebase'
export default class CustomSideBarMenu extends Component{
    render(){
        return(
            <View><DrawerItems {...this.props}>
                
                </DrawerItems>
                <TouchableOpacity onPress={
                    ()=>{
                        this.props.navigation.navigate('welcome')
                        firebase.auth().signOut()
                    }
                }>
                    <Text>
                        logout
                    </Text>
                </TouchableOpacity>
                </View>
        )
    }
}
