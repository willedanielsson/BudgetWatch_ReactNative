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
//import Realm from 'realm'
//let persons = realm.objects('Person');

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
    console.log("BudgetComponent")
      console.log(this.props);
      console.log(this.props.realm.objects('Budget')[0].id + " " + this.props.realm.objects('Budget')[0].name);
      return (
        <View style={styles.container}>
          <View style={styles.dateContainer}>
            <Text style={styles.date}>
              01/05/16 ~ 31/05/16
            </Text>
          </View>
          <BudgetList realm={this.props.realm}/>
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
  }
});


module.exports = Budgets;