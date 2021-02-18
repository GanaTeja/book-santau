import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import firebase from 'firebase'
import  db from "../config";
import { SnapshotViewIOS } from 'react-native';

export default class SettingScreen  extends React.Component {
    constructor(){
        super()
        this.state={
            firstName:'',
            lastName:'',
            address:'',
            contact:'',
            password:'',
            email:firebase.auth().currentUser.email,
            docId:''

        }
    }
    componentDidMount(){
        this.getUserDetails()
    }
    getUserDetails=()=>{
        db.collection("users")
        .where("email","==",this.state.email)
        .get()
        .then(Snapshot=>{Snapshot.forEach((doc)=>{var document=doc.data();
        this.setState({
            firstName:document.first_name,
            contact:document.contact,
            password:document.password,
            lastName:document.last_name,
            address:document.address,
            docId:document.id

        })
        })})

    }
    updateUserDetails=()=>{
        db.collection("users").doc(this.state.docId)
        .update({
            first_name:this.state.firstName,
            last_name:this.state.last_name,
            contact:this.state.contact,
            address:this.state.address,
            password:this.state.password
        })
        alert("profile updated sucessfully")
    }

  render() {
    return (
      <View>
        <TextInput value= {this.state.firstName} onChangeText={(text)=>{this.setState({
            firstName:text,
        })}}></TextInput>
        <TextInput  value= {this.state.lastName} onChangeText={(text)=>{this.setState({
            lastName:text,
        })}}></TextInput>
        <TextInput  value= {this.state.contact} onChangeText={(text)=>{this.setState({
            contact:text,
        })}}></TextInput>
        <TextInput value= {this.state.address} onChangeText={(text)=>{this.setState({
            address:text,
        })}}></TextInput>
        <TextInput value={this.state.password} onChangeText={(text)=>{this.setState({
            password:text,
        })}}></TextInput>
        <TouchableOpacity onPress = {()=>{this.updateUserDetails()}}><Text>
            saveChanges
            </Text></TouchableOpacity>
      </View>
    );
  }
}
