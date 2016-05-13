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
  Image,
  TouchableHighlight
} from 'react-native';

// logo={require('./app_logo.png')}

var ToolbarAndroid = require('ToolbarAndroid');

var BudgetWatch_ReactNative = React.createClass({
  getInitialState: function() {
    return {
      colorProps: {
        titleColor: '#FFFFFF',
        subtitleColor: '#6a7180',
      },
    };
  },

  render: function() {
    return (
      <View style={styles.container}>

        <ToolbarAndroid 
          style={styles.toolbar} 
          title="AwesomeApp" 
          {...this.state.colorProps}
        />
        <View style={styles.listContainer}>
        <TouchableHighlight onPress={this._onPressButton(1)}>
          <View style={styles.item}>
            <Image
              style={styles.icon}
              source={require('./images/purse.png')}/>
            <View style={styles.textContainer}>

              <Text style={styles.header}>Budgets</Text>
              <Text>Create and manage budgets</Text>

            </View>
          </View>
        </TouchableHighlight>

          <View style={styles.item}>
            <Image
              style={styles.icon}
              source={require('./images/transaction.png')}/>
            <View style={styles.textContainer}>

              <Text style={styles.header}>Transactions</Text>
              <Text>Enter transactions and revenues</Text>

            </View>
          </View>
        
        </View>

      </View>
    );
  },

  _onPressButton: function(input){
    console.log("Hejdå");
  }
  
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  toolbar: {
    height: 56,
    backgroundColor: '#3F51B5'
  },
  listContainer: {
    padding: 16
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

AppRegistry.registerComponent('BudgetWatch_ReactNative', () => BudgetWatch_ReactNative);
