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

var BudgetWatch_ReactNative = React.createClass({
  renderScene(route, navigator){
    if(route.name == 'Main'){
      return (
        <Main navigator={navigator} {...route.passProps}/>
        )
    }
    if(route.name == 'Home'){
      return <Home navigator={navigator} {...route.passProps} />
    }
  },

  render() {
    return (
      <Navigator
        style={{flex:1}}
        initialRoute={{ name: 'Main'}}
        renderScene={this.renderScene} />
    )
  }
});

var Toolbar = React.createClass({
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
      <ToolbarAndroid 
        style={styles.toolbar} 
        title="AwesomeApp" 
        {...this.state.colorProps}
      />
    )
  }

});

var Main = React.createClass({
  _navigate(name){
    this.props.navigator.push({
      name: 'Home',
      passProps: {
        name: name
      }
    })
  },
  render(){
    return(
      <View style={styles.container}>
      <Toolbar />
        <Text style={styles.heading}>
          Hello from Main
        </Text>
        <TouchableHighlight style={styles.button} onPress={ () => this._navigate('yoyoyo')}>
          <Text style={styles.buttonText}>Go</Text>
        </TouchableHighlight>  
      </View>
    )
  }
});


var Home = React.createClass({
  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>
          Hi from {this.props.name}
        </Text>
        <TouchableHighlight style={styles.button} onPress={ () => this.props.navigator.pop()}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableHighlight>  
      </View>
    )
  }
})

var styles = StyleSheet.create({
  toolbar: {
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
