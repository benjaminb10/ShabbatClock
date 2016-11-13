
import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  Modal,
  Image,
  TouchableHighlight,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Clock from './Clock';
import Schedules from './Schedules';
import AboutModal from './AboutModal';
import OpenModalButton from './OpenModalButton';





export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {modalVisible: false};
    this.toggleModal = this.toggleModal.bind(this)
  }

  toggleModal() {
    let visible = !this.state.modalVisible
    this.setState({modalVisible: visible});
  }

  render() {

    return (
      <View style={styles.app}>
        <AboutModal modalVisible={this.state.modalVisible} toggleModal={this.toggleModal} />

        <View style={styles.timeContainer}>
          <Clock />
        </View>
        <View style={styles.schedulesContainer}>
          <Schedules />
        </View>

        <OpenModalButton toggleModal={this.toggleModal} />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  modal: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  timeContainer: {
    flex: 0.3,
    marginBottom: 50,
  },
  schedulesContainer: {
    flex: 0.7,
  },
});
