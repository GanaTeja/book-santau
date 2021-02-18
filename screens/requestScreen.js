import React from 'react'
import db from '../config'
import firebase from 'firebase'
import { View, Text, TouchableOpacity, TextInput } from 'react-native';

export default class  BookRequest extends React.Component {
    addRequest=(bookName,Reason)=>{
        db.collection("requested_books")
        .add({
            userId:this.state.userId,
            book_name:bookName,
            Reason:Reason,
            requestId:Math.random().toString(36).substring(7)
        })
    }

    constructor(){
        super()
        this.state={
            bookName:'',
            Reason:'',
            userId:firebase.auth().currentUser.email
        }
    }
  render() {
    return (
      <View>
       <TextInput placeholder="enter book name" onChangeText={(text)=>{this.setState({bookName:text})}}>
           
       </TextInput>
       <TextInput placeholder="reason to request" onChangeText={(text)=>{this.setState({Reason:text})}}>
           
           </TextInput>
       <TouchableOpacity onPress={()=>{this.addRequest(this.state.bookName,this.state.Reason)}}>
           <Text>request</Text>
       </TouchableOpacity>
      </View>
    );
  }
}