import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  Image,
  TextInput,
  TouchableHighlight,
  ToastAndroid,
} from 'react-native';

var Button = require('react-native-button');

class AddBudget extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      inputtype: '',
      inputvalue: 0,
    }
  }

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.itemRow}>
          <Text style={styles.label}>Type</Text>
            <TextInput 
              ref="inputtype"
              autoFocus={true}
              style={styles.input} 
              placeholder="Grocery"
              onChangeText={(inputtype) => this.setState({inputtype})}
              value={this.state.inputtype}/>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.label}>Value</Text>
            <TextInput 
              ref="inputvalue"
              style={styles.input} 
              placeholder="100" 
              keyboardType="numeric"
              onChangeText={(inputvalue) => this.setState({inputvalue})}
              value={this.state.inputvalue}/>
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
              onPress={this._handlePress.bind(this)}>
              SAVE
            </Button>
          </View>
        </View>
      </View>
    )
  }

  _handlePress(event){
    var realm = this.props.realm;
    var length = realm.objects('Budget').length;
    var budgetType = this.state.inputtype.trim();
    var budgetValue = parseInt(this.state.inputvalue);

    if(budgetType!=='' && budgetValue!==0){
      realm.write(() => {
        let budget = realm.create('Budget', {
          id: length,
          name: budgetType,
          maxValue: budgetValue,
        });
      });
      this.props.navigator.pop();

    }else{
      var message;
      if(budgetType===''){
        message="Budget type is empty";
      }else if(budgetValue===0){
        message="Budget value is empty";
      }
      ToastAndroid.show(message, ToastAndroid.LONG);
    }
  }
};

var styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'stretch',
    marginTop: 56,
  },
  
  itemRow:{
    flexDirection: 'row',
    padding: 10,
  },

  label: {
    fontSize: 16,
    marginTop: 12,
    marginLeft: 20,
    marginRight: 20,
    fontWeight: 'bold',
  },

  input: {
    flex: 1,
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
    alignItems:'stretch',
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