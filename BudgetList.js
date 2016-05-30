import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  Image,
  ListView,
  TouchableHighlight,
  Modal,
} from 'react-native';

var ProgressBar = require('ProgressBarAndroid');
var Transactions = require('./TransactionsComponent.js');
var AddBudget = require('./AddBudgetComponent.js');


var BudgetList = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var data = this.props.data;
    return {
      data: this.props.data,
      dataSource: ds.cloneWithRows(this.props.data),
      modalVisible: false,
      selectedBudget: {},
    };
  },

  componentWillUpdate (nextProps, nextState) {
    if (this.state.dataSource._cachedRowCount !== this.props.data.length) {
      this.setState({
        data: this.props.data,
        dataSource: this.state.dataSource.cloneWithRows(this.props.data)
      })
    }
  },

  render: function() {
    return (
      <View>
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
        style={styles.list}
        />
        <Modal
          animationType={'none'}
          transparent={false}
          visible={this.state.modalVisible}>
          <View style={modalStyle.modal}>
            <View style={modalStyle.container}>
              <TouchableHighlight 
                onPress={this.editBudget.bind(this)}>
                <Text style={modalStyle.text}>Edit</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    );
  },

  _setModalVisible(visible) {
    this.setState({modalVisible: visible});
  },

  _renderRow: function(rowData: string, sectionID: number, rowID: number) {
    var totalValue = 0;
    var transactions = this.props.realm.objects('Transaction').filtered("budget = $0 AND datems >= $1 AND datems <= $2", rowData.name, this.props.startTime, this.props.endTime);
    for (var i = 0; i < transactions.length; i++) {
      if(transactions[i].transactionType===0){
        totalValue += transactions[i].value;
      }else{
        totalValue -= transactions[i].value;
      }
    }
    return (
      <TouchableHighlight 
        onPress={ () => this.goToTransactions(rowData.name)}
        onLongPress={() => {this.openEditBudgetModal(rowData)}}
      >
      <View style={styles.itemContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>{rowData.name}</Text>
        </View>
        <View style={styles.lowerContainer}>
          <View style={styles.leftContainer}>
              <ProgressBar 
                styleAttr="Horizontal" 
                indeterminate={false} 
                backgroundStyle={{backgroundColor: 'blue', borderRadius: 5}}
                color="grey" 
                progress={totalValue/rowData.maxValue}/>
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.progressText}> {Math.round(totalValue * 100) / 100}/{Math.round(rowData.maxValue * 100) / 100}</Text>
          </View>
          
        </View>
      </View>
      </TouchableHighlight>
    );
  },

  goToTransactions(budgetName){
    this.props.navigator.push({
      name: 'Transactions',
      component: Transactions,
      passProps: {
        budgetName: budgetName
      }
    })
  },

  openEditBudgetModal(inBudget){
    this._setModalVisible(true);
    this.setState({ selectedBudget: inBudget });
  },

  editBudget(){
    this._setModalVisible(false);
    console.log(this.state.selectedBudget.id);

    var realm=this.props.realm;
    realm.write(() => {
      realm.create('AppData', {id: 0, currentEditBudget: this.state.selectedBudget.id}, true);
    });

    this.props.navigator.push({
      name: 'Edit budget',
      component: AddBudget,
      passProps: {
        editBudget: this.state.selectedBudget
      }
    })
  } 
});

var styles = StyleSheet.create({
  list: {
    padding: 16
  },
  itemContainer: {
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10
  },
  headerContainer: {
    
  },
  header: {
    fontSize: 20
  },
  lowerContainer: {
    flexDirection: 'row',
  },
  leftContainer: {
    flex:1
  },
  rightContainer: {
    flex:1,
    alignItems: 'flex-end'
  },
  progressText: {
  }
});

var modalStyle = StyleSheet.create({
  modal:{
    flex:1,
    alignItems:'stretch',
    justifyContent:'center',
    marginRight: 30,
    marginLeft: 30,
  },
  container: {
    backgroundColor: '#eeeeee',
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 2,
  },
  text:{
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    color: 'black',
  },
});


module.exports = BudgetList;