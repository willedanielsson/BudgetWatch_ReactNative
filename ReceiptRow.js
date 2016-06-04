import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';

var Button = require('react-native-button');
var ReceiptViewer = require('./ViewReceiptComponent.js');

class ReceiptRow extends React.Component{
  constructor(props) {
    super(props)
    this.state = {}
  }

  render(){
    if(this.props.inputReceipt !== null){ 
      return (
        <View style={styles.itemRow}>
          <Text style={styles.label}>Receipt</Text>
            <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              onPress={this._viewReceipt.bind(this)}>
              VIEW
            </Button>
          </View>
        </View>
      )
    }else{
      return(<View></View>)
    }
  }
  _viewReceipt(){
    this.props.navigator.push({
      name: 'Receipt',
      component: ReceiptViewer,
      passProps: {
        path: this.props.inputReceipt
      }
    })
  }
};

var styles = StyleSheet.create({
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

module.exports = ReceiptRow;        