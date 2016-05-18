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
  TouchableHighlight
} from 'react-native';

var Button = require('react-native-button');

class AddTransaction extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      inputName: '',
      inputBudget: '',
      inputAccount: '',
      inputValue: 0,
      inputNote: '',
      inputDate: '',
    }
  }

  render(){
    console.log("AddTransaction");
    return (
      <View style={styles.container}>
      <ScrollView
        ref={(scrollView) => { _scrollView = scrollView; }}
        onScroll={() => { console.log('onScroll!'); }}
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
            <TextInput 
              ref="inputDate"
              style={styles.input}
              onChangeText={(inputDate) => this.setState({inputDate})}
              value={this.state.inputDate}/>
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
});


module.exports = AddTransaction;