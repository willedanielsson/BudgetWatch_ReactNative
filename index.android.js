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

  const PersonSchema = {
    name: 'Person',
    properties: {
      name:  'string',
      last: 'string',
    }
  };

  let realm = new Realm({schema: [PersonSchema]});

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
      return React.createElement(route.component, {navigator});
    }
    if(route.name == 'Add budget'){
      // {...route.passProps}
      return React.createElement(route.component, {navigator});
    }

  },

  render() {
  let persons = realm.objects('Person');
  console.log(persons[0].name);

  if(persons[0]=='undefined'){
  realm.write(() => {
    let person = realm.create('Person', {
      name: 'William',
      last: 'Danielsson',
    });
    //console.log('Person is ' + person.name + ' ' + person.last);
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
