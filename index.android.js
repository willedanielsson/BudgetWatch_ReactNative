/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
/*

        <Text style={styles.welcome}>
          Welcome to React Native Wiliam!
        </Text>
*/
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

import Realm from 'realm'

var ToolbarAndroid = require('ToolbarAndroid');

var Main = require('./MainComponent.js');
var NavigationBarRouteMapper = require('./NavigationBarRouteMapper.js');

const BudgetSchema ={
  name: 'Budget',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
    value: {type: 'int', default: 0},
    maxValue: 'int',
  }
};

const TransactionSchema ={
  name: 'Transaction',
  primaryKey: 'id',
  properties: {
    id: 'int',
    transactionType: 'int',
    name: 'string',
    budget: 'string',
    account: {type: 'string', optional: true},
    value: {type: 'float', default: 0},
    note: {type: 'string', optional: true},
    date: 'string',
    receipt: {type: 'data', optional: true},
  }
};

let realm = new Realm({schema: [BudgetSchema, TransactionSchema]});

var BudgetWatch_ReactNative = React.createClass({

  renderScene(route, navigator){
    if(route.name == 'Main'){
      return React.createElement(route.component, {navigator});
    }
    if(route.name == 'Budgets'){
      // {...route.passProps}
      return React.createElement(route.component, {navigator, realm});
    }
    if(route.name == 'Transactions'){
      // {...route.passProps}
      return React.createElement(route.component, {navigator, realm});
    }
    if(route.name == 'Add budget'){
      // {...route.passProps}
      return React.createElement(route.component, {navigator, realm});
    }
    if(route.name == 'Add transaction'){
      // {...route.passProps}
      return React.createElement(route.component, {navigator, realm});
    }

  },

  render() {
  let budgets = realm.objects('Budget');

  if(budgets[0]===undefined){
    console.log("Create budget");
    realm.write(() => {
      let budget = realm.create('Budget', {
        id: 0,
        name: 'Clothing',
        maxValue: 1500
      });
    });
  }

  if(budgets[1]===undefined){
    console.log("Create budget2");
    realm.write(() => {
      let budget = realm.create('Budget', {
        id: 1,
        name: 'Food',
        maxValue: 3500
      });
    });
  }

  let transactions = realm.objects('Transaction');

  if(transactions[0]===undefined){
    console.log("Create first transaction");
    realm.write(() => {
      let transaction = realm.create('Transaction', {
        id: 0,
        transactionType: 1,
        name: 'Shirt',
        budget: 'Clothing',
        account: 'Personal',
        value: 499.00,
        note: 'The blue shirt',
        date: 'May 18, 2016'
      });
    });
  }


    return (
      <Navigator
        style={{flex:1}}
        initialRoute={{ name: 'Main', component: Main}}
        renderScene={this.renderScene} 
        navigationBar={
        <Navigator.NavigationBar
          style= {styles.navigationBar}
          routeMapper={NavigationBarRouteMapper}
        />
      }/>
    )
  }
});

var styles = StyleSheet.create({
  navigationBar: {
    height: 56,
    backgroundColor: '#3F51B5',
    elevation: 3
  }

});

AppRegistry.registerComponent('BudgetWatch_ReactNative', () => BudgetWatch_ReactNative);
