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

var Budgets = require('./BudgetsComponent.js');

class Main extends React.Component{
  _navigate(name){
    this.props.navigator.push({
      name: 'Budgets',
      component: Budgets,
      passProps: {
        name: name
      }
    })
  }

  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.heading}>
          Hello from Main
        </Text>
        <TouchableHighlight style={styles.button} onPress={ () => this._navigate('yoyoyo')}>
          <Text style={styles.buttonText}>Go</Text>
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


module.exports = Main;