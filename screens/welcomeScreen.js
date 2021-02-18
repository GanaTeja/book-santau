import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { ScrollView ,StyleSheet} from 'react-native';
import { Modal } from 'react-native';
import firebase from 'firebase';
import db from '../config'
import { View, Text, TouchableOpacity, TextInput } from 'react-native';

export default class WelcomeScreen extends React.Component {
    constructor() {
        super()
        this.state = {
            email: 'a@b.com',
            password: '123456',
            firstName: '',
            lastName: '',
            contact: '',
            address: '',
            confirmPassword: '',
            isModalVisible: false
        }

    }
    userSignup=(email,password)=>{
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(()=>{alert("user added succesfully");
        db.collection('users').add({
            first_name : this.state.firstName,
            last_name: this.state.lastName,
            email:this.state.email,
            password:this.state.password,
            contact:this.state.contact,
            address:this.state.address,

                })})   
        .catch(function(error){alert(error.message)})
    }
    userLogin=(email,password)=>{
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then(()=>{this.props.navigation.navigate('donateScreen')})
        .catch(function(error){alert(error.message)})
    }
    showModal = () => {
        return(
            <Modal animationType="fade" transparent={true} visible={this.state.isModalVisible}>
                <ScrollView><KeyboardAvoidingView>
                    <Text>registration</Text>
                    <TextInput placeholder="first name" maxLength={10}
                        onChangeText={(text) => { this.setState({ firstName: text }) }}
                    ></TextInput>
                    <TextInput placeholder="last name" maxLength={10}
                        onChangeText={(text) => { this.setState({ lastName: text }) }}
                    ></TextInput>
                    <TextInput placeholder="email" keyboardType={'email-address'}
                        onChangeText={(text) => { this.setState({ email: text }) }}
                    ></TextInput>
                    <TextInput placeholder="password" secureTextEntry={true}
                        onChangeText={(text) => { this.setState({ password: text }) }}
                    ></TextInput>
                    <TextInput placeholder="confirm password" secureTextEntry={true}
                        onChangeText={(text) => { this.setState({ confirmPassword: text }) }}
                    ></TextInput>
                    <TextInput placeholder="contact" keyboardType={'numeric'}
                        onChangeText={(text) => { this.setState({ contact: text }) }}
                    ></TextInput>
                    <TextInput placeholder=" address" multiline={true}
                        onChangeText={(text) => { this.setState({ address: text }) }}
                    ></TextInput>

                    <TouchableOpacity styles={StyleSheet} onPress={() => { this.setState({ isModalVisible: false });
                this.userSignup(this.state.email,this.state.password) }}>
                        <Text>register</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => { this.setState({ isModalVisible: false }) }}>
                        <Text>cancel</Text></TouchableOpacity>



                </KeyboardAvoidingView></ScrollView>
            </Modal>
        )
    }
    componentDidMount(){}
    render() {
        return (
            <View style={{alignItems:'center',justifyContent:'center'}}>
            {this.showModal()}
                <TextInput placeholder="enter your email id."
                    onChangeText={(text) => { this.setState({ email: text }) }}>

                </TextInput>
                <TextInput placeholder="enter your password."

                    onChangeText={(text) => { this.setState({ password: text }) }}>


                </TextInput>
                <TouchableOpacity onPress={()=>{this.userLogin(this.state.email,this.state.password)}}>
                    <Text>
                        login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { this.setState({ isModalVisible: true });  }}>
                    <Text >signup</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
     flex:1,
     backgroundColor:'#F8BE85',
     alignItems: 'center',
     justifyContent: 'center'
   },
   profileContainer:{
     flex:1,
     justifyContent:'center',
     alignItems:'center',
   },
   title :{
     fontSize:65,
     fontWeight:'300',
     paddingBottom:30,
     color : '#ff3d00'
   },
   loginBox:{
     width: 300,
     height: 40,
     borderBottomWidth: 1.5,
     borderColor : '#ff8a65',
     fontSize: 20,
     margin:10,
     paddingLeft:10
   },
   KeyboardAvoidingView:{
     flex:1,
     justifyContent:'center',
     alignItems:'center'
   },
   modalTitle :{
     justifyContent:'center',
     alignSelf:'center',
     fontSize:30,
     color:'#ff5722',
     margin:50
   },
   modalContainer:{
     flex:1,
     borderRadius:20,
     justifyContent:'center',
     alignItems:'center',
     backgroundColor:"#ffff",
     marginRight:30,
     marginLeft : 30,
     marginTop:80,
     marginBottom:80,
   },
   formTextInput:{
     width:"75%",
     height:35,
     alignSelf:'center',
     borderColor:'#ffab91',
     borderRadius:10,
     borderWidth:1,
     marginTop:20,
     padding:10
   },
   registerButton:{
     width:200,
     height:40,
     alignItems:'center',
     justifyContent:'center',
     borderWidth:1,
     borderRadius:10,
     marginTop:30
   },
   registerButtonText:{
     color:'#ff5722',
     fontSize:15,
     fontWeight:'bold'
   },
   cancelButton:{
     width:200,
     height:30,
     justifyContent:'center',
     alignItems:'center',
     marginTop:5,
   },
  
   button:{
     width:300,
     height:50,
     justifyContent:'center',
     alignItems:'center',
     borderRadius:25,
     backgroundColor:"#ff9800",
     shadowColor: "#000",
     shadowOffset: {
        width: 0,
        height: 8,
     },
     shadowOpacity: 0.30,
     shadowRadius: 10.32,
     elevation: 16,
     padding: 10
   },
   buttonText:{
     color:'#ffff',
     fontWeight:'200',
     fontSize:20
   }
  })