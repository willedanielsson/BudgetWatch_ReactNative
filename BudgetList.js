import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
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
    if (this.shouldListUpdate()) {
      this.setState({
        data: this.props.data,
        dataSource: this.state.dataSource.cloneWithRows(this.props.data)
      })
    }
  },

  shouldListUpdate(){
    var shouldForceUpdate = this.props.realm.objects('AppData')[0].shouldForceUpdate;
    if(this.state.dataSource._cachedRowCount !== this.props.data.length || shouldForceUpdate){
    this.props.realm.write(() => {
      this.props.realm.create('AppData', {id: 0, shouldForceUpdate: false}, true);
    });
      return true;
    }else{
      return false;
    }
  },

  render: function() {
    if(this.state.dataSource._cachedRowCount===0){
      return(
        <View style={styles.emptyListContainer}>
          <Text style={styles.noDataText}>
          You dont have any budgets at the moment. Click the + (plus) button up top to get started.
          </Text>
          <Text style={styles.noDataText2}>
            Budget Watch lets you create budgets, then track spending during the month.
          </Text>
        </View>
      )
    }else{
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
                  onPress={this.editBudget}
                  underlayColor="#d6d6d6">
                  <Text style={modalStyle.text}>Edit</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
        </View>
      );
    }
  },

  _setModalVisible(visible) {
    this.setState({modalVisible: visible});
  },

  _renderRow: function(rowData: string, sectionID: number, rowID: number) {
    // Needed for when adding a trans but removing directly afterwards
    if(rowData === undefined){
      return(
        <View></View>
      );
    }else{
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
          underlayColor="#d6d6d6">
        <View style={styles.itemContainer}>
          <View>
            <Text style={styles.header}>{rowData.name}</Text>
          </View>
          <View style={styles.lowerContainer}>
            <View style={styles.leftContainer}>
                <ProgressBar 
                  styleAttr="Horizontal" 
                  indeterminate={false} 
                  backgroundStyle={{borderRadius: 5}}
                  color="grey" 
                  progress={totalValue/rowData.maxValue}/>
            </View>
            <View style={styles.rightContainer}>
              <Text> 
                {Math.round(totalValue * 100) / 100}/{Math.round(rowData.maxValue * 100) / 100}
              </Text>
            </View>
          </View>
        </View>
        </TouchableHighlight>
      );
    }
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
  emptyListContainer:{
    flex: 1,
    padding: 35,
    alignItems:'stretch',
    justifyContent:'center'
  },
  noDataText: {
    fontSize: 16,
    color: 'black',
    paddingBottom: 10,
  },
  noDataText2: {
    fontSize: 16,
    color: 'black',
  },
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

module.exports = BudgetList;