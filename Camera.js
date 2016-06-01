import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  Modal,
} from 'react-native';


class Camera extends React.Component{
  constructor(props) {
    super(props)
    console.log("COnstructor "+this.props.visible)
    this.state = {
      modalVisible: this.props.visible,
    }
  }

  render() {
    return (
      <View style={cameraStyle.container}>
          <Text>Hello from comp</Text>
      </View>
    );
  }

  _setModalVisible(visible) {
    console.log("Close")
    this.setState({modalVisible: visible});
  }

};

var cameraStyle = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'stretch',
    backgroundColor: 'blue',
  },
});

module.exports = Camera;