import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Navigator,
  Image,
  TextInput,
  TouchableHighlight,
  DatePickerAndroid,
  Picker,
  ToastAndroid,
  Modal
} from 'react-native';

import Camera from 'react-native-camera';

var Button = require('react-native-button');
var ReceiptRow = require('./ReceiptRow.js');

class AddTransaction extends React.Component{
  constructor(props) {
    super(props)
    var date = new Date();

    var propName = '';
    var propBudget = '';
    var propAccount = '';
    var propValue = 0;
    var propNote = '';
    var propDate = date;
    var propDisplayDate = date.toString().substring(4,10) + "," + date.toString().substring(10,15);
    var propReceipt= '';

    if(this.props.selectedTrans !== undefined){
      propName = this.props.selectedTrans.name.toString();
      propBudget = this.props.selectedTrans.budget;
      propAccount = this.props.selectedTrans.account;
      propValue = this.props.selectedTrans.value;
      propNote = this.props.selectedTrans.note;
      propDisplayDate = this.props.selectedTrans.date;
      propReceipt = this.props.selectedTrans.receipt;
    }

    this.state = {
      inputName: propName,
      inputBudget: propBudget,
      inputAccount: propAccount,
      inputValue: propValue.toString(),
      inputNote: propNote,
      inputDate: propDate,
      inputReceipt: propReceipt,
      displayDate: propDisplayDate,
      modalVisible: false,
    }
  }
    // Use `new Date()` for current date.
    // May 25 2020. Month 0 is January.
  async showPicker(options) {
    try {
      var newState = {};
      const {action, year, month, day} = await DatePickerAndroid.open(options);

      // If the user did not close the DataPicker
      if (action !== DatePickerAndroid.dismissedAction) {
        var date = new Date(year, month, day);
        this.setState({ inputDate: date });
        this.setRightTime();
        this.setState(newState);
      }

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

  formatDate(d){
    date = new Date(d)
    var dd = date.getDate(); 
    var mm = date.getMonth()+1;
    var yyyy = date.getFullYear(); 
    if(dd<10){dd='0'+dd} 
    if(mm<10){mm='0'+mm};
    return d = dd+'/'+mm+'/'+yyyy
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
              editable={false}
              value={this.state.inputName}/>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.label}>Budget</Text>
            <Picker
              style={styles.picker}
              selectedValue={this.state.inputBudget}
              mode={'dropdown'}
              enabled={false}
              onValueChange={(budget) => this.setState({inputBudget: budget})}>
                {this.props.realm.objects('Budget').map((budget, i) => {
                  return (
                    <Picker.Item 
                    value={budget.name} 
                    label={budget.name} 
                    key={i} 
                    style={styles.pickerItem}/>
                  ) 
                })}
            </Picker>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.label}>Account</Text>
            <TextInput 
              ref="inputAccount"
              style={styles.input}
              editable={false}
              value={this.state.inputAccount}/>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.label}>Value</Text>
            <TextInput 
              ref="inputValue"
              style={styles.input} 
              keyboardType="numeric"
              editable={false}
              value={this.state.inputValue}/>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.label}>Note</Text>
            <TextInput 
              ref="inputNote"
              style={styles.input}
              editable={false}
              value={this.state.inputNote}/>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.label}>Date</Text>
            <View style={styles.dateButton}>
              <Text style={styles.dateText}>{this.state.displayDate}</Text>
          </View>
        </View>
        <ReceiptRow navigator={this.props.navigator} inputReceipt={this.state.inputReceipt}/>
      </ScrollView>
      </View>
    )
  }
};

var styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'stretch',
    marginTop: 56,
    padding: 5
  },
  scrollView: {
  },
  itemRow:{
    flexDirection: 'row',
    padding: 5,
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
  picker:{
    flex:1,
    height: 45,
    color: 'gray'
  },
  pickerItem:{
    fontSize: 10,
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

var cameraStyles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,

  },
  buttonContainer: {
    height: 70,
    borderRadius: 50,
    width: 70,
    backgroundColor: '#eeeeee',
    alignItems:'stretch',
    justifyContent:'center'
  },
  cameraButton:{
    resizeMode:'contain',
    height: 30,
    width: 30,
    marginLeft: 20,
  },
  actionButton: {
    position: 'absolute',
    bottom: 0,
    padding: 10,
    right: 20,
    left: 20,
    alignItems: 'center',
  },
});

module.exports = AddTransaction;