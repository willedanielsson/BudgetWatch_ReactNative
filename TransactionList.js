import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  Image,
  TouchableHighlight,
  ViewPagerAndroid,
  ListView,
  Modal
} from 'react-native';

var AddTransaction = require('./AddTransactionComponent.js');
var ReceiptIcon = require('./ReceiptIconComponent.js');
var ViewTransaction = require('./ViewTransactionComponent.js');

var TransactionList = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var transactions = this.props.data;

    var expenses;
    var revenues;
    if(this.props.budgetName !== undefined){
      expenses = transactions.filtered('transactionType = 0 AND budget= $0', this.props.budgetName);
      revenues = transactions.filtered('transactionType = 1 AND budget= $0', this.props.budgetName);
    }else{
      expenses = transactions.filtered('transactionType = 0');
      revenues = transactions.filtered('transactionType = 1');
    }
    
    if(this.props.type === 'expenses'){
      return {
        data: this.props.data,
        dataSource: ds.cloneWithRows(expenses.sorted('datems', true)),
        modalVisible: false,
        selectedTransaction: {},
      };
    }else{
      return {
        data: this.props.data,
        dataSource: ds.cloneWithRows(revenues.sorted('datems', true)),
        modalVisible: false,
        selectedTransaction: {},
      };
    }
  },

  componentWillUpdate (nextProps, nextState) {
    var expenses;
    var revenues;
    var transactions = this.props.data;

    if(this.props.budgetName!==undefined){
      expenses = transactions.filtered('transactionType = 0 AND budget= $0', this.props.budgetName);
      revenues = transactions.filtered('transactionType = 1 AND budget= $0', this.props.budgetName);
    }else{
      expenses = transactions.filtered('transactionType = 0');
      revenues = transactions.filtered('transactionType = 1');
    }

    if(this.props.type==='expenses'){
      if(this.shouldListUpdate(expenses.length, this.props.realm)){
        // Not same, update list
        this.setState({
          data: this.props.data,
          dataSource: this.state.dataSource.cloneWithRows(expenses.sorted('datems', true)),
        })
      }
    }else{
      // revenues
      if(this.shouldListUpdate(revenues.length, this.props.realm)){
        // Not same, update list
        this.setState({
          data: this.props.data,
          dataSource: this.state.dataSource.cloneWithRows(revenues.sorted('datems', true)),
        })
      }
    }
  },

  shouldListUpdate(typeLength, realm){
    var shouldUpdate = this.props.realm.objects('AppData')[0].shouldForceUpdate;
    if(this.state.dataSource._cachedRowCount !== typeLength || shouldUpdate){
      realm.write(() => {
        realm.create('AppData', {id: 0, shouldForceUpdate: false}, true);
      });
      return true;
    }else{
      return false;
    }
  },

  render: function() {
    if(this.state.dataSource._cachedRowCount===0){
      var transType = this.props.type;
      var displayTrans = transType.substring(0, transType.length-1);
      return(
        <View style={styles.emptyListContainer}>
          <Text style={styles.noDataText}>You don't have any {displayTrans} transactions for budget "{this.props.budgetName}"</Text>
        </View>
      )
    }
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
          visible={this.state.modalVisible}
          onRequestClose={() => {this._setModalVisible(false)}}>
          <View style={modalStyle.modal}>
            <View style={modalStyle.container}>
              <TouchableHighlight
                underlayColor="#d6d6d6"
                onPress={this.editTransaction}>
                  <Text style={modalStyle.text}>Edit</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    );
  },
  _renderRow: function(rowData: string, sectionID: number, rowID: number) {
    return (
      <TouchableHighlight
        underlayColor="#d6d6d6"
        onPress={() => {this.viewTransaction(rowData)}}
        onLongPress={() => {this.openEditTransactionModal(rowData)}}>
        <View style={styles.itemContainer}>
          <View style={styles.upperContainer}>

            <View style={styles.leftContainer}>
              <Text style={styles.name}>{rowData.name}</Text>
            </View>
            <View style={styles.rightContainer}>
              <Text style={styles.price}>{Math.round(rowData.value * 100) / 100}</Text>
            </View>

          </View>
          <View style={styles.lowerContainer}>
            <ReceiptIcon budget={rowData.budget} receipt={rowData.receipt}/>
            <View style={styles.rightContainer}>
              <Text style={styles.date}>{rowData.date}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  },

  viewTransaction(inTransaction){
    var viewName;
    if(this.state.selectedTransaction.transactionType === 0){
      viewName = "View Expense";
    }else{
      viewName = "View Revenue";
    }
    this.props.navigator.push({
      name: viewName,
      component: ViewTransaction,
      passProps: {
        editTrans: inTransaction
      }
    })
  },

  openEditTransactionModal(inTrans){
    this.setState({modalVisible: true});
    this.setState({ selectedTransaction: inTrans });
  },

  editTransaction(){
    this._setModalVisible(false);
    var realm=this.props.realm;

    realm.write(() => {
      realm.create('AppData', {id: 0, currentEditTrans: this.state.selectedTransaction.id}, true);
    });

    var viewName;
    if(this.state.selectedTransaction.transactionType===0){
      viewName = "Edit Expense";
    }else{
      viewName = "Edit Revenue";
    }

    this.props.navigator.push({
      name: viewName,
      component: AddTransaction,
      passProps: {
        editTrans: this.state.selectedTransaction
      }
    })
  },

  _setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
});

var styles = StyleSheet.create({
  emptyListContainer:{
    flex: 1,
    padding: 21,
    alignItems:'stretch',
    justifyContent:'center'
  },
  noDataText: {
    fontSize: 16,
    color: 'black',
  },
  itemContainer:{
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    padding: 5,
  },
  upperContainer: {
    flexDirection: 'row',
  },
  lowerContainer: {
    flexDirection: 'row',
    padding: 5
  },
  leftContainer:{
    flex:1,
    flexDirection: 'row',
  },
  rightContainer:{
    flex:1,
    alignItems: 'flex-end',
  },
  name:{
    fontSize: 20
  },
  price:{
    fontSize: 18
  },
  receiptIcon:{
    resizeMode:'contain',
    height: 18,
    width: 18,
    margin: 2,
  }
});

var modalStyle = StyleSheet.create({
  modal:{
    flex:1,
    alignItems:'stretch',
    justifyContent:'center',
    marginRight: 25,
    marginLeft: 25,
  },
  container: {
    backgroundColor: '#eeeeee',
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 2,
  },
  text:{
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 25,
    color: 'black',
    fontSize: 16,
  }
});

module.exports = TransactionList;