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
  ListView
} from 'react-native';

var TransactionList = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var transactions = this.props.realm.objects('Transaction');
    var expenses = transactions.filtered('transactionType = 1');
    var revenues = transactions.filtered('transactionType = 2');
    if(this.props.type==='expenses'){
      return {
        dataSource: ds.cloneWithRows(expenses),
      };
    }else{
      return {
        dataSource: ds.cloneWithRows(revenues),
      };
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
    return (
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

    );
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


module.exports = TransactionList;