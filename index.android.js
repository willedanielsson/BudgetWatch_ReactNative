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

// logo={require('./app_logo.png')}

var ToolbarAndroid = require('ToolbarAndroid');

var Main = require('./MainComponent.js');

var BudgetWatch_ReactNative = React.createClass({
  renderScene(route, navigator){
    console.log(route);

    if(route.name == 'Main'){
      return React.createElement(route.component, {navigator});
    }
    if(route.name == 'Budgets'){
      // {...route.passProps}
      return React.createElement(route.component, {navigator});
    }
  },

  render() {
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
    if (route.onPress) return (
      <TouchableHighlight
         onPress={ () => route.onPress() }>
         <Text style={ styles.rightNavButtonText }>
              { route.rightText || 'Right Button' }
         </Text>
       </TouchableHighlight>)
  },
  Title(route, navigator, index, navState) {
    return <Text style={ styles.title }>{route.name}</Text>
  }
};

var styles = StyleSheet.create({
  navigationBar: {
    height: 56,
    backgroundColor: '#3F51B5'
  },
  container: {
    flex:1
  },
  heading: {
    fontSize:22,
    marginBottom:10
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

AppRegistry.registerComponent('BudgetWatch_ReactNative', () => BudgetWatch_ReactNative);
