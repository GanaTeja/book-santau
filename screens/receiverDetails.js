import React from 'react';
import { View, Text, TouchableOpacity, TextInput, SnapshotViewIOS } from 'react-native';
import firebase from 'firebase';
import db from '../config'
import { SnapshotViewIOSComponent } from 'react-native';
import { Card } from 'react-native-elements'
import { CardAnimationContext } from 'react-navigation-stack';

export default class ReceiverDetails extends React.Component {

  constructor(props) {

    super(props)
    this.state = {
      userId: firebase.auth().currentUser.email,
      receiverId: this.props.navigation.getParam("details")['userId'],
      requestId: this.props.navigation.getParam("details")['requestId'],
      bookName: this.props.navigation.getParam("details")['book_name'],
      Reason: this.props.navigation.getParam("details")['Reason'],
      receiverName: '',
      receiverContact: '',
      receiverAdress: '',
      receiverRequestDocId: ''
    }
  }

  getReceiverDetails = () => {
    db.collection('users')
      .where("email", "==", this.state.receiverId)
      .get()
      .then(Snapshot => Snapshot.forEach(doc => {
        this.setState({
          receiverName: doc.data().firstName,
          receiverContact: doc.data().contact,
          receiverAdress: doc.data().Adress
        })
      }))
    db.collection('requested_books')
      .where("requestId", "==", this.state.requestId)
      .get()
      .then(Snapshot => Snapshot.forEach(doc => {
        this.setState({
          receiverRequestDocId: doc.id,

        })
      }))

  }
  getUserDetails = () => {
    db.collection('users')
      .where("email", "==", this.state.userId)
      .get()
      .then(Snapshot => Snapshot.forEach(doc => {
        this.setState({
          userName: doc.data().firstName + " " + doc.data().lastName
        })
      }))


  }
  updateBookStatus = () => {

    db.collection('all_donations')
      .add({
        bookName: this.state.bookName,
        requestId: this.state.requestId,
        requestedBy: this.state.receiverName,
        donorId: this.state.userId,
        requestStatus: "donor intrested"
      })


  }
  add_notifications = () => {
    db.collection('all_notifications')
      .add({
        targetedUserId: this.state.receiverId,
        donorId: this.this.state.userId,
        requestId: this.state.requestId,
        bookName: this.state.bookName,
        date: firebase.firestore.FieldValue.serverTimestamp,
        notoificationStatus: "unread",
        message: this.state.userName + "has shown intrest in donation of  the book"
      })

  }

  componentDidMount() { this.getReceiverDetails() }
  render() {
    return (
      <View>
        <Card title={"bookInformation"} titleStyle={{ fontSize: 20 }}>
          <Card>
            <Text>
              book name:{this.state.bookName}
            </Text>
          </Card>
          <Card>
            <Text>
              Reason:{this.state.Reason}
            </Text>
          </Card>
        </Card>
        <Card title={"receiverDetails"} titleStyle={{ fontSize: 20 }}>
          <Card>
            <Text>
              requesterName:{this.state.receiverName}
            </Text>
          </Card>
          <Card>
            <Text>
              Adress:{this.state.receiverAdress}
            </Text>
          </Card>
          <Card>
            <Text>
              contact:{this.state.receiverContact}
            </Text>
          </Card>
        </Card>
        {this.state.receiverId !== this.state.userId ? (
          <TouchableOpacity style={{backgroundColor:'skyblue',width:150,height:50} } 
          onPress={()=>{
            this.updateBookStatus(),
            this.add_notifications(),
            this.props.navigation.navigate('bookDonateList')
          }}
          >
            <Text>
              i want to donate
              </Text>
          </TouchableOpacity>
        ) : null}


      </View>
    );
  }
}
