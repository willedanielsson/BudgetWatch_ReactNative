import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  Image,
  TextInput,
  TouchableHighlight
} from 'react-native';

var Button = require('react-native-button');

class AddBudget extends React.Component{
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.itemRow}>
          <Text style={styles.label}>Type</Text>
            <TextInput style={styles.input} placeholder="Grocery"/>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.label}>Value</Text>
            <TextInput style={styles.input} placeholder="100" keyboardType="numeric"/>
        </View>
        <View style={styles.itemRow}>
           <View style={styles.buttonContainer}>
            <Button
              style={styles.buttonCancel}
              styleDisabled={{color: 'red'}}
              onPress={this._handlePress}>
              CANCEL
            </Button>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              style={styles.buttonSave}
              styleDisabled={{color: 'red'}}
              onPress={this._handlePress}>
              SAVE
            </Button>
          </View>
        </View>
      </View>
    )
  }
};

var styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'stretch',
    marginTop: 56
  },
  itemRow:{
    flexDirection: 'row',
    padding: 10,
  },
  label: {
    flex:1,
    fontSize: 16,
    marginTop: 12,
    marginLeft: 20,
    marginRight: 4,
    fontWeight: 'bold',
  },
  input: {
    flex:5,
    height: 45,
    borderColor: 'gray', 
    borderWidth: 1,
    fontSize: 18
  },
  buttonContainer:{
    flex: 1,
    backgroundColor: 'red',
    borderRadius: 4,
    backgroundColor: '#d6d7d7',
    marginTop: 6,
    marginLeft: 3,
    marginRight: 3,
    padding: 10,
    alignItems:'center',
    justifyContent:'center',
    elevation: 2
  },
  buttonCancel: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'normal',
  },
  buttonSave: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'normal',
  }
});


module.exports = AddBudget;