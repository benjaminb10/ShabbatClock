/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Clock from './App/Components/Clock';

var moment = require('moment');

function getDayName(dateString) {
  return ['DIM.', 'LUN.', 'MAR.', 'MER.', 'JEU.', 'VEN.', 'SAM.'][new Date(dateString).getDay()];
}


export default class ShabbatClock extends Component {
  constructor(props) {
    super(props);

    //moment.locale('fr');


    // this.state = {
    //   shabbatStartDate: new Date(),
    //   shabbatEndDate: new Date(),
    // };

    this.state = {
      // shabbatStartDate: new Date(),
      // shabbatEndDate: new Date(),
      shabbatStartDate: moment(),
      shabbatEndDate: moment(),

      shabbatStartDateFormatted: null,
      shabbatEndDateFormatted: null,
    };



  }



  componentWillMount()  {


      // XMLHttpRequest
      var request = new XMLHttpRequest();
      request.onreadystatechange = (e) => {
        if (request.readyState !== 4) {
          return;
        }

        if (request.status === 200) {

          // alert(request.responseText);
          var jsonResponse = JSON.parse(request.responseText);

          // alert(jsonResponse.items[0].date);

          let shabbatStartDate = moment(jsonResponse.items[0].date);
          let shabbatEndDate = moment(jsonResponse.items[2].date);

          this.setState({
            shabbatStartDate: moment(jsonResponse.items[0].date),
            shabbatEndDate: moment(jsonResponse.items[2].date),

            shabbatStartDateFormatted: shabbatStartDate.format("dddd, MMMM Do YYYY, h:mm:ss a"),
            shabbatEndDateFormatted: shabbatEndDate.format("dddd, MMMM Do YYYY, h:mm:ss a"),
          });
        } else {
          console.warn('error');
          alert('error');
        }
      };

      request.open('GET', 'http://www.hebcal.com/shabbat/?cfg=json&m=50&latitude=48.864716&longitude=2.349014&tzid=Europe/Paris');
      request.send();

  }


  render() {

    //
    // let dateFormatted = moment(this.state.shabbatStartDate);
    // alert(dateFormatted.format("dddd, MMMM Do YYYY, h:mm:ss a"));
    //
    // let date = this.state.shabbatStartDate;
    // let hours = date.getHours();
    // let minutes = date.getMinutes();
    // let time = (hours<10 ? '0'+hours : hours)+":"+(minutes<10 ? '0'+minutes : minutes);

    return (
      <View style={styles.container}>
        <View style={styles.timeContainer}>
          <Clock />
        </View>
        <View style={styles.schedulesContainer}>
          <Text style={styles.schedules}>
            <Text>
              Shabbat entrera:{'\n'}
            </Text>
            <Text style={styles.white}>
              {this.state.shabbatStartDateFormatted}{'\n'}
            </Text>
          </Text>
          <Text style={styles.schedules}>
            <Text>
              Shabbat sortira:{'\n'}
            </Text>
            <Text style={styles.white}>
              {this.state.shabbatEndDateFormatted}{'\n'}
            </Text>
          </Text>
        </View>
        <View style={styles.informationsContainer}>
          <Text style={styles.informations}>
            Horaires de Paris, France
          </Text>
        </View>
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
  date: {
    color: '#FF001F',
    textAlign: 'center',
    fontSize: 18,
  },
  schedulesContainer: {
    flex: 0.6,
  },
  schedules: {
    color: '#9B9B9B',
    fontSize: 28,
    textAlign: 'center',
  },
  white: {
    color: '#fff',
  },
  right: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: 'green',
  },
  informationsContainer: {
    flex: 0.1,
    justifyContent: 'center',
  },
  informations: {
    color: '#4A4A4A',
    textAlign: 'center',
    fontSize: 18,
  },
});

AppRegistry.registerComponent('ShabbatClock', () => ShabbatClock);
