
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
import I18n from 'react-native-i18n'
import OpenModalButton from './OpenModalButton';

export default class AboutModal extends Component {
    render() {
      return (
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.props.modalVisible}
          >
         <View style={styles.modal}>
          <View>
            <TouchableHighlight onPress={() => { this.props.toggleModal() }}>
              <Text style={{color: '#fff', textAlign: 'right'}}>
                <Icon name="ios-close" size={36} color="#fff" />
              </Text>
            </TouchableHighlight>

            <Text style={[styles.informations, {fontSize:22, marginTop:50}]}>
              {I18n.t('schedulesSource')+'\n'}https://www.hebcal.com
              {'\n'}{'\n'}{'\n'+I18n.t('anyComment')}
              {'\n'}shabbatclock@gmail.com
            </Text>
          </View>
         </View>
        </Modal>
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
