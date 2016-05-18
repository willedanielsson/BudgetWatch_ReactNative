import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  Image,
  TouchableHighlight,
  ViewPagerAndroid
} from 'react-native';

import { Tab, TabLayout } from 'react-native-android-tablayout';

class Transactions extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      currentPage: 0
    }
  }

  render(){
    return (
      <View style={styles.container}>
        <View>
          <TabLayout
          selectedTab={this.state.currentPage}
          selectedTabIndicatorColor='#FF4081'
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
          initialPage={0}
          onPageSelected={this._onPageSelected.bind(this)}>

          <View style={styles.pageStyle}>
            <Text>First page</Text>
          </View>
          <View style={styles.pageStyle}>
            <Text>Second page</Text>
          </View>
        </ViewPagerAndroid>
      </View>
    )
  }

  _onPageSelected(e){
    console.log("The idnex is: "+e.nativeEvent.position)
    this.setState({currentPage: e.nativeEvent.position});
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
  }
});


module.exports = Transactions;