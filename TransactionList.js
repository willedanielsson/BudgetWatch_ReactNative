import React, { Component } from 'react';
import {
  AppRegistry,
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

var TransactionList = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var transactions = this.props.data;

    var expenses;
    var revenues;
    if(this.props.budgetName!==undefined){
      expenses = transactions.filtered('transactionType = 0 AND budget= $0', this.props.budgetName);
      revenues = transactions.filtered('transactionType = 1 AND budget= $0', this.props.budgetName);
    }else{
      expenses = transactions.filtered('transactionType = 0');
      revenues = transactions.filtered('transactionType = 1');
    }
    
    if(this.props.type==='expenses'){
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
      //console.log("We are in expenses");
      if(this.shouldListUpdate(expenses.length, this.props.realm)){
        //console.log("Not same, update plz");
        this.setState({
          data: this.props.data,
          dataSource: this.state.dataSource.cloneWithRows(expenses.sorted('datems', true)),
        })
      }else{
        //console.log("They are same");
      }
    }else{
      //console.log("In revenues");
      if(this.shouldListUpdate(revenues.length, this.props.realm)){
        //console.log("Not same, update plz");
        this.setState({
          data: this.props.data,
          dataSource: this.state.dataSource.cloneWithRows(revenues.sorted('datems', true)),
        })
      }else{
        //console.log("They are the same");
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

  /*
      var shouldForceUpdate = this.props.realm.objects('AppData')[0].shouldForceUpdate;
    if(this.state.dataSource._cachedRowCount !== this.props.data.length || shouldForceUpdate){
    this.props.realm.write(() => {
      this.props.realm.create('AppData', {id: 0, shouldForceUpdate: false}, true);
    });
      return true;
    }else{
      return false;
    }

  */

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
            <View style={styles.leftContainer}>
              <Image style={styles.receiptIcon} source={require('./images/receipt.png')}/>
              <Text style={styles.budget}>{rowData.budget}</Text>
            </View>

            <View style={styles.rightContainer}>
              <Text style={styles.date}>{rowData.date}</Text>
            </View>
          </View>

        </View>
      </TouchableHighlight>

    );
  },

  openEditTransactionModal(inTrans){
    this.setState({modalVisible: true});
    this.setState({ selectedTransaction: inTrans });
  },

  editTransaction(){
    console.log("Transaction");
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
  },
});

var styles = StyleSheet.create({
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
  },
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


module.exports = TransactionList;