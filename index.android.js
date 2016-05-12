/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

// logo={require('./app_logo.png')}

var ToolbarAndroid = require('ToolbarAndroid');

var BudgetWatch_ReactNative = React.createClass({
  getInitialState: function() {
    return {
      actionText: 'Example app with toolbar component',
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

        <Text style={styles.welcome}>
          Welcome to React Native Wiliam!
        </Text>

      </View>
    );
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

AppRegistry.registerComponent('BudgetWatch_ReactNative', () => BudgetWatch_ReactNative);
