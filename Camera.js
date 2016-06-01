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

//import Realm from 'realm'
//let persons = realm.objects('Person');

class Camera extends Component {
  constructor(props) {
    super(props)

    this.state = {
      test: "Hello"
    }
  }

  render(){
    return (
      <View style={styles.container}>
      <Text>Hello</Text>
      </View>
    )
  }

};

var styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'stretch',
    marginTop: 56,
  },
});


module.exports = Camera;