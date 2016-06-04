import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  TextInput,
  ToastAndroid,
} from 'react-native';

var Button = require('react-native-button');

class AddBudget extends React.Component{
  constructor(props) {
    super(props)

    var inName='';
    var inValue='';
    if(this.props.selectedBudget!==undefined){
      inName = this.props.selectedBudget.name;
      inValue = this.props.selectedBudget.maxValue.toString(); 
    }

    this.state = {
      inputtype: '',
      editText: inName, 
      editValue: inValue,
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
              placeholder={this.givePlaceholder()}
              editable={this.isTextEditable()}
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
              onChangeText={(editValue) => this.setState({editValue})}
              value={this.state.editValue}/>
        </View>
        <View style={styles.itemRow}>
           <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              styleDisabled={{color: 'red'}}
              onPress={this.cancelView.bind(this)}>
              CANCEL
            </Button>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              styleDisabled={{color: 'red'}}
              onPress={this.saveBudget.bind(this)}>
              SAVE
            </Button>
          </View>
        </View>
      </View>
    )
  }

  isTextEditable(){
    if(this.state.editText===''){
      return true;
    }else{
      return false;
    }
  }

  givePlaceholder(){
    if(this.state.editText===''){
      return "Grocery";
    }else{
      return this.state.editText;
    }
  }

  cancelView(){
    this.props.navigator.pop();
  }

  saveBudget(event){
    var realm = this.props.realm;
    var length = realm.objects('Budget').length;
    var budgetType = this.state.inputtype.trim();
    var budgetValue = parseInt(this.state.editValue);

    // If we are editing budget
    if(this.props.selectedBudget!==undefined){
      if(budgetValue!==0){
        var bId = this.props.selectedBudget.id;
        realm.write(() => {
          realm.create('AppData', {id: 0, shouldForceUpdate: true}, true);
        });
        realm.write(() => {
          realm.create('Budget', {
            id: parseInt(bId), 
            name: this.state.editText,
            maxValue: budgetValue}, true);
        });

        this.props.navigator.pop();
        // No value given
      }else{
        ToastAndroid.show("Budget value is empty", ToastAndroid.LONG);
      }
    // If we are adding a new budget
    }else{
      if(budgetType!=='' && budgetValue!==0){
        realm.write(() => {
          let budget = realm.create('Budget', {
            id: parseInt(length),
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

  button: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'normal',
  }
});

module.exports = AddBudget;