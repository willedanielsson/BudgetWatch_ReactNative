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
var AddBudget = require('./AddBudgetComponent.js');

var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    if(index > 0) {
      return (
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() => { if (index > 0) { navigator.pop() } }}>
          <Text style={ styles.leftNavButtonText }>Back</Text>
        </TouchableHighlight>)
    } 
    else { return null }
  },

  RightButton(route, navigator, index, navState) {
    if (route.name == "Budgets") 
      return (
        <TouchableHighlight onPress={ () => navigator.push({ 
          name: 'Add budget',
          component: AddBudget,
          passProps: {
            name: 'Test'
          }})}>
           <Text style={ styles.rightNavButtonText }>
              Add budget
           </Text>
         </TouchableHighlight>
      )
  },

  Title(route, navigator, index, navState) {
    return <Text style={ styles.title }>{route.name}</Text>
  }
};


var styles = StyleSheet.create({
  title: {
    fontSize: 22
  }
});

module.exports = NavigationBarRouteMapper;