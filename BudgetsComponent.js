import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  Image,
  TouchableHighlight
} from 'react-native';

var BudgetList = require('./BudgetList.js');
//import Realm from 'realm'
//let persons = realm.objects('Person');

var Budgets = React.createClass({
  getInitialState: function() {
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    var printFirstDate = this.formatDate(firstDay);
    var printLastDate = this.formatDate(lastDay);

    var startDateTime = firstDay.getTime();
    var endDateTime = lastDay.getTime();
    var propsdata = this.props.data;
    return {
      startDate: firstDay,
      endDate: lastDay,
      startDatePrint: printFirstDate,
      endDatePrint: printLastDate,
      startDateTime: startDateTime,
      endDateTime: endDateTime,
      data: propsdata,
    };
  },

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>
            {this.state.startDatePrint} ~ {this.state.endDatePrint}
          </Text>
        </View>
        <BudgetList data={this.props.data} realm={this.props.realm} navigator = {this.props.navigator} startTime= {this.state.startDateTime} endTime={this.state.endDateTime}/>
      </View>
    )
  },

  formatDate(d){
    date = new Date(d)
    var dd = date.getDate(); 
    var mm = date.getMonth()+1;
    var yyyy = date.getFullYear(); 
    if(dd<10){dd='0'+dd} 
    if(mm<10){mm='0'+mm};
    return d = dd+'/'+mm+'/'+yyyy
  }

});

var styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'stretch',
    marginTop: 56,
  },
  dateContainer: {
    alignItems: 'center',
    padding: 5
  },
  date: {
    fontSize:20,
  }
});


module.exports = Budgets;