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
      };
    }else{
      return {
        data: this.props.data,
        dataSource: ds.cloneWithRows(revenues.sorted('datems', true)),
      };
    }
  },

  componentWillUpdate (nextProps, nextState) {
    console.log("Component will update");
    console.log(this.state.dataSource._cachedRowCount);
    console.log(this.props.data.length);

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
      console.log("We are in expenses");
      if(this.state.dataSource._cachedRowCount!==expenses.length){
        console.log("Not same, update plz");
        this.setState({
          data: this.props.data,
          dataSource: this.state.dataSource.cloneWithRows(expenses.sorted('datems', true)),
        })
      }else{
        console.log("They are same");
      }
    }else{
      console.log("In revenues");
      if(this.state.dataSource._cachedRowCount!==revenues.length){
        console.log("Not same, update plz");
        this.setState({
          data: this.props.data,
          dataSource: this.state.dataSource.cloneWithRows(revenues.sorted('datems', true)),
        })
      }else{
        console.log("They are the same");
      }
    }


    /*
    if(this.state.dataSource._cachedRowCount === this.props.data.length){
      console.log("They are the same");
    }else {
      console.log("They are not the same");
      var expenses;
      var revenues;
      var transactions = this.props.data;

      expenses = transactions.filtered('transactionType = 0');
      revenues = transactions.filtered('transactionType = 1');

      if(this.props.type === 'expenses'){
        this.setState({
          data: this.props.data,
          dataSource: this.state.dataSource.cloneWithRows(expenses.sorted('datems', true)),
        })
      }else{
        console.log("revenues");
      }
    }*/
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