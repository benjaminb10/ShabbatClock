
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

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {modalVisible: false};
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {

    return (
      <View style={styles.container}>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View style={styles.container}>
          <View>
            <TouchableHighlight onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}>
              <Text style={{color: '#fff', textAlign: 'right'}}>
                <Icon name="ios-close" size={36} color="#fff" />
              </Text>
            </TouchableHighlight>

            <Text style={[styles.informations, {fontSize:22, marginTop:50}]}>
              Les horaires de Shabbat sont issues du site internet {'\n'}https://www.hebcal.com
              {'\n'}{'\n'}{'\n'}Une remarque ?
              {'\n'}shabbatclock@gmail.com
            </Text>
          </View>
         </View>
        </Modal>

        <View style={styles.timeContainer}>
          <Clock />
        </View>
        <View style={styles.schedulesContainer}>
          <Schedules />
        </View>



        <TouchableHighlight onPress={() => {
          this.setModalVisible(true)
        }}>
          <Text style={{textAlign: 'right'}}>
            <Icon name="ios-information" size={44} color="#fff" />
          </Text>
        </TouchableHighlight>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  timeContainer: {
    flex: 0.3,
  },
  schedulesContainer: {
    flex: 0.4,
  },
  informationsContainer: {
    flex: 0.15,
    justifyContent: 'center',
  },
  informations: {
    color: '#aaa',
    textAlign: 'center',
    fontSize: 18,
  },
});