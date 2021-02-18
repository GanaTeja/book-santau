import React from 'react';
import db from '../config'
import { View, Text, TouchableOpacity, TextInput ,FlatList} from 'react-native';

import { ListItem } from 'react-native-elements';

export default  class BookDonate  extends React.Component {
    constructor(){
        super()
        this.state={
            requestedBookList:[]
        }
    }
    requestedBookList=()=>{
        db.collection("requested_books")
        .onSnapshot((snapshot)=>{
            var snapshot1=snapshot.docs.map((document)=>document.data())
            this.setState({requestedBookList:snapshot1})
        })
    }
    componentDidMount(){this.requestedBookList()}
  render() {
    console.log(this.state.requestedBookList)
    return (
      this.state.requestedBookList.length===0?(<View>
        <Text>
          list of requested books
        </Text>
      </View>):(
        <View>
        <FlatList keyExtractor = {(item,index)=>{index.toString()}}
        data={this.state.requestedBookList}
        renderItem={({item,i})=>{
          return(
            <View>
              <Text>book_name:{item.book_name}</Text>
              <Text>Reason:{item.Reason}</Text>
              <TouchableOpacity style={{backgroundColor:"orange"}} onPress={()=>this.props.navigation.navigate("receiverDetails",{"details":item})}><Text>
                view
                </Text></TouchableOpacity>
              
            <ListItem key={i} title={item.book_name} subtitle={item.Reason} rightElement={
              <TouchableOpacity onPress={()=>this.props.navigation.navigate("receiverDetails",{"details":item})}><Text>
                view
                </Text></TouchableOpacity>
              }>
   
            </ListItem>
            </View>
          )
        }}
        ></FlatList>   
         </View>
      )
  
    );
  }
}