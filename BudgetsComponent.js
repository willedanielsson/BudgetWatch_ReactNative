import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  Image,
  TouchableHighlight,
  Modal
} from 'react-native';

var BudgetList = require('./BudgetList.js');
//import Realm from 'realm'
//let persons = realm.objects('Person');

class Budgets extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      modalVisible: false,
    }
  }
  render(){
    return (
      <View>
        <View style={styles.container}>
          <View style={styles.dateContainer}>
            <TouchableHighlight onPress={ () => this._setModalVisible(true)}>
              <Text style={styles.date}>
                01/05/16 ~ 31/05/16
              </Text>
            </TouchableHighlight>
          </View>
          <BudgetList realm={this.props.realm}/>
        </View>

        <Modal
          animationType={'none'}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {this._setModalVisible(false)}}
          >
          <View style={styles.modal}>
            <View>
              <Text>This modal is nice</Text>
              <TouchableHighlight onPress={ () => this._setModalVisible(false)}>
                <Text style={styles.date}>
                  CLOSE
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    )
  }

  setTimeForBudget(){
    console.log("SET BDUGET");
  }

   _setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

};

var styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'stretch',
    marginTop: 56,
  },
  dateContainer: {
    alignItems: 'center',
    padding: 5
  },
  date: {
    fontSize:20,
  },
  modal: {
    flex: 1,
    margin: 20,
    backgroundColor: '#eeeeee'
  },
});


module.exports = Budgets;