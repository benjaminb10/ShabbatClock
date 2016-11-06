import React, { Component } from 'react';

import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

var moment = require('moment');

function getDayName(dateString) {
  return ['DIM.', 'LUN.', 'MAR.', 'MER.', 'JEU.', 'VEN.', 'SAM.'][new Date(dateString).getDay()];
}

movies = {}

function getMoviesFromApiAsync() {






  //var url = 'https://facebook.github.io/react-native/movies.json';
  // var url = 'http://www.hebcal.com/shabbat/?cfg=json&m=50&latitude=48.864716&longitude=2.349014&tzid=Europe/Paris';

// Fetch
//   var url = 'http://www.hebcal.com/shabbat/';
//
//   var params = {
//       cfg: 'json',
//       m: 50,
//       latitude: 48.86471,
//       longitude: 2.349014,
//       tzid: 'Europe/Paris'
//   };
//
//   var request = {
//       method: 'GET',
//       params: params,
//   };
//
//   return fetch(url, request)
//     .then((response) => response.json())
//     .then(function(response) {
//       alert(response.blob());
//     })
//     .catch((error) => {
//       alert(error);
//     });
}



export default class FormattedClock extends Component {


  // movies = {}

  constructor(props) {
    super(props);

    this.state = {
      now: moment(),
      shabbatStartDate: moment()
    };
  }



  render() {
    return (
      <View>
        <Text style={styles.date}>
          {this.state.now.format("dddd, MMM Do")}
        </Text>
        <Text style={styles.time}>
          {this.state.now.format("H:mm")}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  date: {
    color: '#FF001F',
    textAlign: 'center',
    fontSize: 28,
    marginTop: 50,
  },
  time: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 78,
  },
});
