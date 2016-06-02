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
  TouchableHighlight,
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
    if(route.name == 'Main'){
      return React.createElement(route.component, {navigator});
    }
    if(route.name == 'Budgets'){
      // {...route.passProps}
      var data = realm.objects('Budget').sorted('name');
      return <Budgets navigator={navigator} realm={realm} data={data} />
    }
    if(route.name == 'Transactions'){
      var data = realm.objects('Transaction');
      var budgetName = route.passProps.budgetName;
      //return React.createElement(route.component, {navigator, realm, budgetName});
      return <Transactions navigator={navigator} realm={realm} data={data} budgetName={budgetName}/>
    }
    if(route.name == 'Add budget'){
      // {...route.passProps}
      return React.createElement(route.component, {navigator, realm});
    }
    if(route.name == 'Add Expense'){
      var typeTrans = route.passProps;
      return React.createElement(route.component, {navigator, realm, typeTrans});
    }
    if(route.name == 'Add Revenue'){
      var typeTrans = route.passProps;
      return React.createElement(route.component, {navigator, realm, typeTrans});
    }
    if(route.name == 'Edit budget'){
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

  },

  onDidFocus(route){
    if(route.name==='Budgets'){
      var data = realm.objects('Budget').sorted('name');
      //return React.createElement(route.component, {navigator, realm, data});
      return <Budgets navigator={navigator} realm={realm} data={data} />
    }
    if(route.name==="Transactions"){
       var data = realm.objects('Transaction');
       var budgetName = route.passProps.budgetName;
       return <Transactions navigator={navigator} realm={realm} data={data} budgetName={budgetName}/>
    }

  },

  render() {
    this.createInitialItemsForDatabase();
    return (
      <Navigator
        ref={(nav) => { navigator = nav; }}
        style={{flex:1}}
        initialRoute={{ name: 'Main', component: Main}}
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
  },

  createInitialItemsForDatabase(){
    let appData = realm.objects('AppData');

    if(appData[0]===undefined){
      realm.write(() => {
        let data = realm.create('AppData', {
          id:0,
          currentTrans: 0
        });
      });
    }

    let transactions = realm.objects('Transaction');

    if(transactions[0]===undefined){
      realm.write(() => {
        let transaction = realm.create('Transaction', {
          id: 0,
          transactionType: 0,
          name: 'Shirt',
          budget: 'Clothing',
          account: 'Personal',
          value: 499.00,
          note: 'The blue shirt',
          date: 'May 18, 2016',
          datems: 1464904800000,
        });
      });
    }
    if(transactions[1]===undefined){
      realm.write(() => {
        let transaction = realm.create('Transaction', {
          id: 1,
          transactionType: 0,
          name: 'Pants',
          budget: 'Clothing',
          account: '',
          value: 799.00,
          note: '',
          date: 'May 20, 2016',
          datems: 1465941600000
        });
      });
    }
    if(transactions[2]===undefined){
      realm.write(() => {
        let transaction = realm.create('Transaction', {
          id: 2,
          transactionType: 0,
          name: 'Groceries',
          budget: 'Food',
          account: '',
          value: 287.62,
          note: '',
          date: 'May 10, 2016',
          datems: 1465423200000,
          receipt: 'content://media/external/images/media/2839',
        });
      });
    }
    if(transactions[3]===undefined){
      realm.write(() => {
        let transaction = realm.create('Transaction', {
          id: 3,
          transactionType: 1,
          name: 'Pant',
          budget: 'Food',
          account: '',
          value: 17.00,
          note: '',
          date: 'May 17, 2016',
          datems: 1465596000000
        });
      });
    }

    let budgets = realm.objects('Budget');

    if(budgets[0]===undefined){
      var trans = realm.objects('Transaction').filtered('budget = "Clothing"');
      realm.write(() => {
        let budget = realm.create('Budget', {
          id: 0,
          name: 'Clothing',
          maxValue: 1500
        });
      });
    }

    if(budgets[1]===undefined){
      var trans = realm.objects('Transaction').filtered('budget = "Food"');
      realm.write(() => {
        let budget = realm.create('Budget', {
          id: 1,
          name: 'Food',
          maxValue: 3500
        });
      });
    }
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
