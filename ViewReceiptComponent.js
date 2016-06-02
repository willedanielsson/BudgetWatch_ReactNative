import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  Image,
} from 'react-native';


class ViewReceipt extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  render(){
    console.log(this.props.path);
    return (
      <View style={styles.container}>
        <Image
          style={styles.cameraButton} 
          source={{uri: this.props.path}} />
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
  cameraButton:{
    flex:1,
    alignItems: 'stretch',
  },
});


module.exports = ViewReceipt;