import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  Image,
  TouchableHighlight
} from 'react-native';

class Transactions extends React.Component{
  render(){
    console.log("Render Transactions")
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>
          Hi Transaction
        </Text>
      </View>
    )
  }
};

var styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'stretch',
    marginTop: 56,
    padding: 16
  },
  heading: {
    fontSize:22,
    marginBottom:10
  },
  button: {
    height: 60,
    justifyContent: 'center',
    backgroundColor: 'red',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 20
  }

});


module.exports = Transactions;