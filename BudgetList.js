import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  Image,
  ListView,
  TouchableHighlight
} from 'react-native';

var ProgressBar = require('ProgressBarAndroid');
var Transactions = require('./TransactionsComponent.js');


var BudgetList = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var data = this.props.data;
    return {
      data: this.props.data,
      dataSource: ds.cloneWithRows(this.props.data),
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
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
        style={styles.list}
        />
    );
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
      <TouchableHighlight onPress={ () => this.goToTransactions(rowData.name)}>
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


module.exports = BudgetList;