
import React, { Component } from 'react';
import { Text, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class OpenModalButton extends Component {
  render() {
    return (
      <TouchableHighlight onPress={() => { this.props.toggleModal() }}>
        <Text style={{textAlign: 'right'}}>
          <Icon name="ios-information" size={44} color="#fff" />
        </Text>
      </TouchableHighlight>
    );
  }
}
