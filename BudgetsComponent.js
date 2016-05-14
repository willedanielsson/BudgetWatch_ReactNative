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

class Budgets extends React.Component{
  render(){
    console.log("RENDER BUDGETS");
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>
          Hi from {this.props.name}
        </Text>
        <TouchableHighlight style={styles.button} onPress={ () => this.props.navigator.pop()}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableHighlight>  
      </View>
    )
  }
};

var styles = StyleSheet.create({
  container: {
    flex:1
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


module.exports = Budgets;