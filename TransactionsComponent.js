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

class Transactions extends React.Component{

  constructor(props) {
    super(props)

    this.state = {
      currentPage: 0
    }
    var realm=this.props.realm;
    realm.write(() => {
      realm.create('AppData', {id: 0,currentTrans: 0}, true);
    });
  }

  render(){
    return (
      <View style={styles.container}>
        <View>
          <TabLayout
          selectedTab={this.state.currentPage}
          selectedTabIndicatorColor='#FF4081'
          onTabSelected={this._onTabClicked.bind(this)}
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
          onPageSelected={this._onPageSelected.bind(this)}
          ref={viewPager => { this.viewPager = viewPager; }}>

          <View style={styles.pageStyle}>
            <TransactionList type={'expenses'} realm={this.props.realm}/>
          </View>
          <View style={styles.pageStyle}>
             <TransactionList type={'revenues'} realm={this.props.realm}/>
          </View>
        </ViewPagerAndroid>
      </View>
    )
  }

  _onPageSelected(e){
    this.setState({currentPage: e.nativeEvent.position});
    var realm= this.props.realm;
    realm.write(() => {
      realm.create('AppData', {id: 0,currentTrans: e.nativeEvent.position}, true);
    });
    console.log("Should be: " + e.nativeEvent.position);

  }
  _onTabClicked(e){
    this.setState({currentPage: e.nativeEvent.position});
    this.viewPager.setPage(e.nativeEvent.position);
     var realm=this.props.realm;
    realm.write(() => {
      realm.create('AppData', {id: 0,currentTrans: e.nativeEvent.position}, true);
    });
  }
};

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