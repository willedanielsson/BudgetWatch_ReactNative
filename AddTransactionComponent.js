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
  Picker,
  ToastAndroid,
  Modal
} from 'react-native';

var Button = require('react-native-button');
var CameraComponent = require('./Camera.js');

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

    if(this.props.selectedTrans !== undefined){
      propName = this.props.selectedTrans.name.toString();
      propBudget = this.props.selectedTrans.budget;
      propAccount = this.props.selectedTrans.account;
      propValue = this.props.selectedTrans.value;
      propNote = this.props.selectedTrans.note;
      propDisplayDate = this.props.selectedTrans.date;
    }

    this.state = {
      inputName: propName,
      inputBudget: propBudget,
      inputAccount: propAccount,
      inputValue: propValue.toString(),
      inputNote: propNote,
      inputDate: propDate,
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
      console.log("ERROR");
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
              onChangeText={(inputName) => this.setState({inputName})}
              value={this.state.inputName}/>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.label}>Budget</Text>
            <Picker
              style={styles.picker}
              selectedValue={this.state.inputBudget}
              mode={'dropdown'}
              onValueChange={(budget) => this.setState({inputBudget: budget})}>
                {this.props.realm.objects('Budget').map((budget, i) => {
                  return (
                    <Picker.Item value={budget.name} label={budget.name} key={i} style={styles.pickerItem}/>
                  ) 
                })}
            </Picker>
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
              defaultValue={this.state.editValue}
              onChangeText={(inputValue) => this.setNumberToState(inputValue)}
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
                  onPress={this._captureReceipt.bind(this)}>
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
              onPress={this._cancelTransaction.bind(this)}>
              CANCEL
            </Button>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              styleDisabled={{color: 'red'}}
              onPress={this._saveTransaction.bind(this)}>
              SAVE
            </Button>
          </View>
        </View>
      </ScrollView>
      <Modal
        animationType={'none'}
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={() => {this._setModalVisible(false)}}>
          <CameraComponent />
        </Modal>
      </View>
    )
  }

  _setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  setNumberToState(inputString){
    var integer = parseFloat(inputString);
    this.setState({ inputValue: integer });
  }

  _captureReceipt(event){
    this._setModalVisible(true);
  }

  _saveTransaction(event){
    var realm = this.props.realm;
    var length = realm.objects('Transaction').length;

    var transName = this.state.inputName.trim();
    var transBudget = this.state.inputBudget;
    var transAccount = this.state.inputAccount.trim();
    var transValue = parseInt(this.state.inputValue);
    var transNote = this.state.inputNote.trim();
    var transDate = this.state.displayDate;
    var dateTime = this.state.inputDate.getTime();

    if(!this.isRequiredInputEmpty(transName, transValue, transDate)){
      // If we are in edit-mode, save
      if(this.props.selectedTrans !== undefined){
        var transId = this.props.selectedTrans.id;
        // Tell to forceUpdate later when poping to list
        realm.write(() => {
          realm.create('AppData', {id: 0, shouldForceUpdate: true}, true);
        });
        realm.write(() => {
          realm.create('Transaction', {
            id: parseInt(transId),
            transactionType: this.props.selectedTrans.transactionType,
            name: transName,
            budget: transBudget,
            account: transAccount,
            value: transValue,
            note: transNote,
            date: transDate,
            datems: dateTime
          }, true);
        });

      }else{
        var transactionTypeId = this.props.typeTrans.transactionType;
        realm.write(() => {
          let budget = realm.create('Transaction', {
            id: length,
            transactionType: transactionTypeId,
            name: transName,
            budget: transBudget,
            account: transAccount,
            value: transValue,
            note: transNote,
            date: transDate,
            datems: dateTime
          });
        });
      }
      
      this.props.navigator.pop();
      // required input missing
    } else{

      var message;
      if(transName===''){
        message="Name is empty";
      }else if(transValue===0){
        message="Value is empty";
      }else if(transDate===undefined){
        message="Date invalid";
      }

      ToastAndroid.show(message, ToastAndroid.LONG);
    }
  }

  _cancelTransaction(event){
      this.props.navigator.pop()
  }

  isRequiredInputEmpty(transName, transValue, transDate){
    if(transName!=='' && transValue!==0 && transDate!==''){
      return false;
    }else{
      return true;
    }
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


module.exports = AddTransaction;