import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  BackAndroid,
} from 'react-native';

import Realm from 'realm'

var ToolbarAndroid = require('ToolbarAndroid');
var navigator;

var Main = require('./MainComponent.js');
var Budgets = require('./BudgetsComponent.js');
var Transactions = require('./TransactionsComponent.js');
var NavigationBarRouteMapper = require('./NavigationBarRouteMapper.js');

BackAndroid.addEventListener('hardwareBackPress', () => {
  if (navigator && navigator.getCurrentRoutes().length > 1) {
    navigator.pop();
    return true;
  }
    return false;
});

const BudgetSchema ={
  name: 'Budget',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
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
    datems: 'int',
    receipt: {type: 'string', optional: true},
  }
};

const AppDataSchema ={
  name: 'AppData',
  primaryKey: 'id',
  properties: {
    id: 'int',
    currentTrans: {type: 'int', default: 0},
    currentEditBudget: {type: 'int', default: 99},
    currentEditTrans: {type: 'int', default: 99},
    shouldForceUpdate: {type: 'bool', default: false}
  }
};

let realm = new Realm({schema: [BudgetSchema, TransactionSchema, AppDataSchema]});

var BudgetWatch_ReactNative = React.createClass({

  renderScene(route, navigator){
    if(route.name === 'Application1'){
      return React.createElement(route.component, {navigator});
    }
    if(route.name === 'Budgets'){
      // {...route.passProps}
      var data = realm.objects('Budget').sorted('name');
      return <Budgets navigator={navigator} realm={realm} data={data} />
    }
    if(route.name === 'Transactions'){
      var data = realm.objects('Transaction');
      var budgetName = route.passProps.budgetName;
      return <Transactions navigator={navigator} realm={realm} data={data} budgetName={budgetName}/>
    }
    if(route.name === 'Add budget'){
      // {...route.passProps}
      return React.createElement(route.component, {navigator, realm});
    }
    if(route.name === 'Add Expense'){
      var typeTrans = route.passProps;
      return React.createElement(route.component, {navigator, realm, typeTrans});
    }
    if(route.name === 'Add Revenue'){
      var typeTrans = route.passProps;
      return React.createElement(route.component, {navigator, realm, typeTrans});
    }
    if(route.name === 'Edit budget'){
      // {...route.passProps}
      var selectedBudget = route.passProps.editBudget;
      return React.createElement(route.component, {navigator, realm, selectedBudget});
    }
    if(route.name === 'Edit Expense'){
      var selectedTrans = route.passProps.editTrans;
      return React.createElement(route.component, {navigator, realm, selectedTrans});
    }
    if(route.name === 'Edit Revenue'){
      var selectedTrans = route.passProps.editTrans;
      return React.createElement(route.component, {navigator, realm, selectedTrans});
    }
    if(route.name === 'Receipt'){
      var path = route.passProps.path;
      return React.createElement(route.component, {navigator, path});
    }
    if(route.name === 'View Expense' || route.name === 'View Revenue'){
      var selectedTrans = route.passProps.editTrans;
      return React.createElement(route.component, {navigator, realm, selectedTrans});
    }
  },

  onDidFocus(route){
    if(route.name==='Budgets'){
      var data = realm.objects('Budget').sorted('name');
      return <Budgets navigator={navigator} realm={realm} data={data} />
    }
    if(route.name==="Transactions"){
       var data = realm.objects('Transaction');
       var budgetName = route.passProps.budgetName;
       return <Transactions navigator={navigator} realm={realm} data={data} budgetName={budgetName}/>
    }
  },

  render() {
    return (
      <Navigator
        ref={(nav) => { navigator = nav; }}
        style={{flex:1}}
        initialRoute={{ name: 'Application1', component: Main}}
        renderScene={this.renderScene}
        onDidFocus={this.onDidFocus}
        realm = {realm}
        navigationBar={
        <Navigator.NavigationBar
          style= {styles.navigationBar}
          routeMapper={NavigationBarRouteMapper(realm)}
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