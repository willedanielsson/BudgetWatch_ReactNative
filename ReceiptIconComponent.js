import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';


class ReceiptIcon extends React.Component{
  constructor(props) {
    super(props)
    this.state = {}
  }

  render(){
    if(this.props.receipt === null){
      return (
        <View style={styles.leftContainer}>
          <Text>{this.props.budget}</Text>
        </View>
      )
    }else{
      return (
        <View style={styles.leftContainer}>
          <Image 
            style={styles.receiptIcon} 
            source={require('./images/receipt.png')}/>
          <Text>{this.props.budget}</Text>
        </View>
      )
    }
  }
};

var styles = StyleSheet.create({
  leftContainer:{
    flex:1,
    flexDirection: 'row',
  },
  receiptIcon:{
    resizeMode:'contain',
    height: 18,
    width: 18,
    margin: 2,
  }
});

module.exports = ReceiptIcon;