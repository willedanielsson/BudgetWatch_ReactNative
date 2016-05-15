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

var BudgetList = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows([{name: "Clothing", value: 500, maxValue: 1500 }, {name: "Food", value: 1000, maxValue: 4000 }]),
    };
  },

  render: function() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
        />
    );
  },
  _renderRow: function(rowData: string, sectionID: number, rowID: number) {
    console.log(rowData);
    console.log(rowData.name);
    return (
      <View style={styles.itemContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>{rowData.name}</Text>
        </View>
        <View style={styles.lowerContainer}>
          <View style={styles.leftContainer}>

          </View>
          <View style={styles.rightContainer}>
            <Text> {rowData.value}/{rowData.maxValue}</Text>
          </View>
          
        </View>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  itemContainer: {
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    padding: 5
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
    flex:1
  }
});


module.exports = BudgetList;