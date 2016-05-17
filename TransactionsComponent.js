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

class Transactions extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      currentPage: 0
    }
  }

  render(){
    isFirstActive = function(index){
      if(index===0){
        return{
          borderBottomColor: '#FF4081',
          borderBottomWidth: 2
        }
      }
    }

    isSecondActive = function(index){
      if(index===1){
        return{
          borderBottomColor: '#FF4081',
          borderBottomWidth: 2
        }
      }
    }
    
    return (
      <View style={styles.container}>
        <View style={styles.pagerTab}>
          <View style={[styles.pageTabContainer,isFirstActive(this.state.currentPage)]}>
            <Text>EXPENSES</Text>
          </View>

          <View style={[styles.pageTabContainer,isSecondActive(this.state.currentPage)]}>
            <Text>REVENUES</Text>
          </View>

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
    this.setState({currentPage: e.nativeEvent.position});
  }
};

var styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'stretch',
    marginTop: 56
  },
  pagerTab:{
    flexDirection: 'row',
    height: 56,
    backgroundColor: 'blue'
  },
  pageTabContainer:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  firstTab:{

  },
  viewPager: {
    flex:1,
  }

});


module.exports = Transactions;