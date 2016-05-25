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
var AddTransaction = require('./AddTransactionComponent.js');

var NavigationBarRouteMapper = props => ({
  LeftButton(route, navigator, index, navState) {
    if(index > 0) {
      return (
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() => { if (index > 0) { navigator.pop() } }}>
          <View style={styles.backButtonContainer}>
            <Image
              style={styles.backIcon}
              source={require('./images/backButton.png')}/>
          </View>
        </TouchableHighlight>)
    } 
    else { return null }
  },

  RightButton(route, navigator, index, navState) {
    if (route.name == "Budgets"){ 
      return (
        <View style={styles.rightButtonContainer}>
          <TouchableHighlight onPress={ () => navigator.push({ 
            name: 'Add budget',
            component: AddBudget,
            passProps: {
              name: 'Test'
            }})}>
             <View style={styles.calendarContainer}>
              <Image style={styles.calendarIcon} source={require('./images/add.png')}/>
            </View>
           </TouchableHighlight>
         </View>
      )
    }
    if(route.name == "Transactions"){
      return (
        <View style={styles.rightButtonContainer}>
          <TouchableHighlight onPress={ () => this.addTransaction(navigator)}>
            <View style={styles.addTransactionButtonContainer}>
              <Image style={styles.transactionIcon} source={require('./images/add.png')}/>
            </View>
           </TouchableHighlight>

          <TouchableHighlight onPress={ () => navigator.push({ 
            name: 'Add budget',
            component: AddBudget,
            passProps: {
              name: 'Test'
            }})}>
             <View style={styles.addBudgetButtonContainer}>
              <Image
                style={styles.addBudgetIcon}
                source={require('./images/purse.png')}/>
            </View>
           </TouchableHighlight>

         </View>
      )
    }
  },
  addTransaction(navigator){
    var transType;
    var transID;
    if(navigator.props.realm.objects('AppData')[0].currentTrans===0){
      transType= "Add Expense";
      transId = 0;
    }else{
      transType= "Add Revenue";
      transId = 1;
    }
    console.log("ON PRESS");
    navigator.push({ 
      name: transType,
      component: AddTransaction,
      passProps: {
        transactionType: transId
      }
    })
  },

  Title(route, navigator, index, navState) {
    return(
      <View style={styles.titleContainer}>
      <Text style={ styles.title }>
        {route.name}
      </Text>
      </View>)
  }
});

//<Image style={styles.addBudgetIcon} source={require('./images/calendar.png')}/>


var styles = StyleSheet.create({
  titleContainer: {
    marginTop: 14,
  },
  title: {
    fontSize: 22,
    color: '#FFF',
  },
  backButtonContainer: {
    width: 55,
    height: 56
  },
  backIcon: {
    marginTop: 19,
    marginLeft: 12,
    resizeMode:'contain',
    height: 20
  },
  rightButtonContainer:{
    height: 56,
    flexDirection: 'row',
  },
  calendarContainer: {
    flex: 1,
    paddingRight: 12,
    paddingLeft: 8
  },
  calendarIcon: {
    marginTop: 12,
    marginLeft: 0,
    resizeMode:'contain',
    height: 32,
    width: 32,
  },
  addBudgetButtonContainer: {
    flex:1,
    height: 56,
    paddingRight: 8,
    paddingLeft: 11,
  },
  addBudgetIcon: {
    marginTop: 16,
    marginRight: 0,
    resizeMode:'contain',
    height: 25,
    width: 25,
  },
  addTransactionButtonContainer:{
    flex: 1,
    paddingRight: 12,
    paddingLeft: 8
  },
  transactionIcon:{
    marginTop: 16,
    marginRight: 0,
    resizeMode:'contain',
    height: 25,
    width: 25,
  },

});

module.exports = NavigationBarRouteMapper;