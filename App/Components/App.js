
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
import I18n from 'react-native-i18n'

// Set it here for the all app
var moment = require('moment');
import 'moment/locale/fr'
moment.locale(I18n.currentLocale());

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

// Enable fallbacks if you want `en-US` and `en-GB` to fallback to `en`
I18n.fallbacks = true

I18n.translations = {
  en: {
    started: 'started',
    starts: 'will start',
    ended: 'ended',
    ends: 'will end',
    schedulesSource: 'Shabbat hours are given by the website ',
    anyComment: 'Any comment?',
  },
  fr: {
    started: 'est entré',
    starts: 'entre',
    ended: 'est sorti',
    ends: 'sort',
    schedulesSource: 'Les horaires de Shabbat sont issues du site internet ',
    anyComment: 'Une remarque ?',
  }
}
