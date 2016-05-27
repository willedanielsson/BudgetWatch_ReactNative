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

import { Tab, TabLayout } from 'react-native-android-tablayout';
var TransactionList = require('./TransactionList.js');

var Transactions = React.createClass({
  getInitialState: function() {
    var realm=this.props.realm;
    realm.write(() => {
      realm.create('AppData', {id: 0,currentTrans: 0}, true);
    });

    var propsdata = this.props.data;
    return {
      currentPage: 0,
      data: propsdata,
    };
  },

  render(){
    return (
      <View style={styles.container}>
        <View>
          <TabLayout
          selectedTab={this.state.currentPage}
          selectedTabIndicatorColor='#FF4081'
          onTabSelected={this._onTabClicked}
          style={styles.tabLayout}>
            <Tab 
              name="EXPENSES"
              textColor='white'
              style={styles.tab}/>
            <Tab 
              name="REVENUES"
              textColor='white'
              style={styles.tab}/>
          </TabLayout>
        </View>
        <ViewPagerAndroid
          style={styles.viewPager}
          initialPage={this.state.currentPage}
          onPageSelected={this._onPageSelected}
          ref={viewPager => { this.viewPager = viewPager; }}>

          <View style={styles.pageStyle}>
            <TransactionList data={this.props.data} type={'expenses'} realm={this.props.realm} budgetName = {this.props.budgetName}/>
          </View>
          <View style={styles.pageStyle}>
             <TransactionList data={this.props.data} type={'revenues'} realm={this.props.realm} budgetName = {this.props.budgetName}/>
          </View>
        </ViewPagerAndroid>
      </View>
    )
  },

  _onPageSelected(e){
    this.setState({currentPage: e.nativeEvent.position});
    var realm= this.props.realm;
    realm.write(() => {
      realm.create('AppData', {id: 0,currentTrans: e.nativeEvent.position}, true);
    });
    console.log("Should be: " + e.nativeEvent.position);

  },
  _onTabClicked(e){
    this.setState({currentPage: e.nativeEvent.position});
    this.viewPager.setPage(e.nativeEvent.position);
     var realm=this.props.realm;
    realm.write(() => {
      realm.create('AppData', {id: 0,currentTrans: e.nativeEvent.position}, true);
    });
  }
});

var styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'stretch',
    marginTop: 56
  },
  tabLayout:{
    backgroundColor: '#3F51B5'
  },
  tab:{
  },
  viewPager: {
    flex:1,
  },
  pageStyle: {
    padding: 16
  },
});

module.exports = Transactions;