import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  Dimensions,
  TouchableHighlight,
  Image
} from 'react-native';

import Camera from 'react-native-camera';


class CameraComponent extends React.Component{
  constructor(props) {
    super(props)
    console.log("COnstructor "+this.props.visible)
    this.state = {
      modalVisible: this.props.visible,
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
        </Camera>
        <TouchableHighlight 
          style={styles.actionButton}
          onPress={this.takePicture.bind(this)}>

          <View style={styles.buttonContainer}>
            <Image
              style={styles.cameraButton} 
              source={require('./images/camera-icon.png')} />
          </View> 
        </TouchableHighlight>

      </View>
    );
  }

  takePicture() {
    this.camera.capture()
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }

};

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,

  },
  buttonContainer: {
    height: 70,
    borderRadius: 50,
    width: 70,
    backgroundColor: '#eeeeee',
    alignItems:'stretch',
    justifyContent:'center'
  },
  cameraButton:{
    resizeMode:'contain',
    height: 30,
    width: 30,
    marginLeft: 20,
  },
  actionButton: {
    position: 'absolute',
    bottom: 0,
    padding: 10,
    right: 20,
    left: 20,
    alignItems: 'center',
  },
});

module.exports = CameraComponent;
/*
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
    <Image source={require('./images/camera-icon2.png')} />

*/