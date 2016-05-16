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

var BudgetList = require('./BudgetList.js');

class Budgets extends React.Component{
  addBudgetPress(){
        this.props.navigator.push({
      name: 'Transactions',
      component: Transactions,
      passProps: {
        name: name
      }
    })
  }
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>
            05/1/16 ~ 5/31/16
          </Text>
        </View>
        <BudgetList />
      </View>
    )
  }
};

var styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'stretch',
    marginTop: 56,
  },
  dateContainer: {
    alignItems: 'center',
    padding: 5
  },
  date: {
    fontSize:20,
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