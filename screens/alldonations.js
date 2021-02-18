import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';

export default class AllDonations   extends React.Component {
    constructor(){
        super()
        this.state={
               donorId:firebase.auth().currentUser.email,
               donorName:'',
               allDonations:[] 
        }
    }
    componentDidMount(){
        this.getAllDonations()
    }
    getAllDonations=()=>{
        db.collection('all_Donations').where("donor_id","==",this.state.donorId)
        .onSnapshot(snapshot=>{
            var all_donations=[]
            snapshot.docs.map(doc=>{
                var donation=doc.data()
                donation["doc_id"] =doc.id
               allDonations.push(donation)
            })
            this.setState({
                allDonations:all_donations
            })
            
        })   }
  render() {
    return (
      <View>
       
      </View>
    );
  }
}
