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
var Transactions = require('./TransactionsComponent.js');
var AddBudget = require('./AddBudgetComponent.js');

var MainListItem = React.createClass({
  setNativeProps(nativeProps) {
    this._root.setNativeProps(nativeProps);
  },
  render(){
    return (
        <View style={styles.item} ref={component => this._root = component} {...this.props}>
          <Image
            style={styles.icon}
            source={this.props.image}/>
          <View style={styles.textContainer}>

            <Text style={styles.header}>{this.props.name}</Text>
            <Text>{this.props.desc}</Text>

          </View>
        </View>
    )
  }
});

class Main extends React.Component{

  goToBudgets(name){
    this.props.navigator.push({
      name: 'Budgets',
      component: Budgets,
      passProps: {
        name: name
      }
    })
  }

  goToTransactions(name){
    this.props.navigator.push({
      name: 'Transactions',
      component: Transactions,
      passProps: {
        name: name
      }
    })
  } 
  render(){
    return(
      <View style={styles.container}>
        <View style={styles.listContainer}>
          <TouchableHighlight style={styles.button} onPress={ () => this.goToBudgets('yoyoyo')}>
            <MainListItem name={'Test'} desc={'Create and manage budgets'} image={require('./images/purse.png')}/>
          </TouchableHighlight>

          <TouchableHighlight style={styles.button} onPress={ () => this.goToTransactions('yoyoyo')}>
            <MainListItem name={'Transactions'} desc={'Enter transactions and revenues'} image={require('./images/transaction.png')}/>
          </TouchableHighlight>

        </View>
      </View>
    )
  }
};


var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    marginTop: 56,
  },
  listContainer: {

  },
  item: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
  },
  icon: {
   height: 40,
   width: 40,
  },
  textContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    flex: 1,
  },
  header: {
    fontSize: 20
  },

});


module.exports = Main;