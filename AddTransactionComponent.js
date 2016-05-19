import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Navigator,
  Image,
  TextInput,
  TouchableHighlight,
  DatePickerAndroid,
} from 'react-native';

var Button = require('react-native-button');

class AddTransaction extends React.Component{
  constructor(props) {
    super(props)
    var date = new Date();
    this.state = {
      inputName: '',
      inputBudget: '',
      inputAccount: '',
      inputValue: 0,
      inputNote: '',
      inputDate: date,
      displayDate: date.toString().substring(4,10) + "," + date.toString().substring(10,15),
    }
  }
    // Use `new Date()` for current date.
    // May 25 2020. Month 0 is January.
  async showPicker(options) {
    try {
      var newState = {};
      const {action, year, month, day} = await DatePickerAndroid.open(options);
      var date = new Date(year, month, day);
      this.setState({ inputDate: date });
      this.setRightTime();
      this.setState(newState);

    } catch ({code, message}) {
      console.warn(`Error in showicker`, message);
    }
  }

  setRightTime(){
    date = this.state.inputDate.toString();
    var newDate = date.substring(4,15);
    var completeDate = newDate.substring(0,6) + "," + newDate.substring(6);
    this.setState({ displayDate: completeDate });
  }

  render(){
    return (
      <View style={styles.container}>
      <ScrollView
        ref={(scrollView) => { _scrollView = scrollView; }}
        style={styles.scrollView}>
        <View style={styles.itemRow}>
          <Text style={styles.label}>Name</Text>
            <TextInput 
              ref="inputName"
              style={styles.input}
              onChangeText={(inputName) => this.setState({inputName})}
              value={this.state.inputName}/>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.label}>Budget</Text>
            <TextInput 
              ref="inputBudget"
              style={styles.input}
              onChangeText={(inputBudget) => this.setState({inputBudget})}
              value={this.state.inputBudget}/>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.label}>Account</Text>
            <TextInput 
              ref="inputAccount"
              style={styles.input}
              onChangeText={(inputAccount) => this.setState({inputAccount})}
              value={this.state.inputAccount}/>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.label}>Value</Text>
            <TextInput 
              ref="inputValue"
              style={styles.input} 
              keyboardType="numeric"
              onChangeText={(inputValue) => this.setState({inputValue})}
              value={this.state.inputValue}/>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.label}>Note</Text>
            <TextInput 
              ref="inputNote"
              style={styles.input}
              onChangeText={(inputNote) => this.setState({inputNote})}
              value={this.state.inputNote}/>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.label}>Date</Text>
            <TouchableHighlight style={styles.dateButton} onPress={ () => this.showPicker({date: this.state.inputDate})}>
              <Text style={styles.dateText}>{this.state.displayDate}</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.label}>Receipt</Text>
            <View style={styles.receiptButtonContainer}>
              <View style={styles.buttonContainer}>
                <Button
                  style={styles.button}
                  styleDisabled={{color: 'red'}}
                  onPress={this._captureReceipt}>
                  CAPTURE
                </Button>
              </View>
            </View>
        </View>
        <View style={styles.itemRow}>
           <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              styleDisabled={{color: 'red'}}
              onPress={this._handlePress}>
              CANCEL
            </Button>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              styleDisabled={{color: 'red'}}
              onPress={this._handlePress}>
              SAVE
            </Button>
          </View>
        </View>
      </ScrollView>
      </View>
    )
  }

  _viewReceipt(event){
    console.log("Press");
  }
};

var styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'stretch',
    marginTop: 56
  },
  scrollView: {
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
    flex:1,
    height: 45,
    borderColor: 'gray', 
    borderWidth: 1,
    fontSize: 18
  },
  receiptButtonContainer: {
    flex:1,
    height: 45,
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
  button:{
    fontSize: 14,
    color: 'black',
    fontWeight: 'normal',
  },
  dateButton:{
    flex: 1,
    borderBottomColor: '#6d6d6d',
    borderBottomWidth: 1,
  },
  dateText: {
    fontSize: 20,
    marginTop: 5,
  },
});


module.exports = AddTransaction;