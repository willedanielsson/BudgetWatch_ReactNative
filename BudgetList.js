import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  Image,
  ListView,
  UIExplorerBlock,
  UIExplorerPage,
  TouchableHighlight
} from 'react-native';

var ProgressBar = require('ProgressBarAndroid');


var BudgetList = React.createClass({
  getInitialState: function() {
    console.log("BudgetList")
    console.log(this.props);
    console.log(this.props.realm.objects('Budget')[1].name+ " " + this.props.realm.objects('Budget')[1].value);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(this.props.realm.objects('Budget')),
    };
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
                progress={rowData.value/rowData.maxValue}/>
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.progressText}> {rowData.value}/{rowData.maxValue}</Text>
          </View>
          
        </View>
      </View>
    );
  },
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