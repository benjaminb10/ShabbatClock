import React, { Component } from 'react';

import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

function getDayName(dateString) {
  return ['DIM.', 'LUN.', 'MAR.', 'MER.', 'JEU.', 'VEN.', 'SAM.'][new Date(dateString).getDay()];
}

movies = {}

function getMoviesFromApiAsync() {

  //var url = 'https://facebook.github.io/react-native/movies.json';
  // var url = 'http://www.hebcal.com/shabbat/?cfg=json&m=50&latitude=48.864716&longitude=2.349014&tzid=Europe/Paris';

  var params = {
      cfg: 'json',
      m: 50,
      latitude: 48.86471,
      longitude: 2.349014,
      tzid: 'Europe/Paris'
  };



  var url = 'http://www.hebcal.com/shabbat/';


  var request = {
      method: 'GET',
      params: params,
  };


  return fetch(url, request)
    .then(function(response) {
      movies = responseJson;
      alert(movies);
    })
    .catch((error) => {
      alert(error);
    });
}



export default class FormattedClock extends Component {


  // movies = {}

  constructor(props) {
    super(props);
  }



  componentWillMount()  {
    movies = getMoviesFromApiAsync();

  }


  render() {
    let date = this.props.date;
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let time = (hours<10 ? '0'+hours : hours)+":"+(minutes<10 ? '0'+minutes : minutes);

    return (
      <View>
        <Text style={styles.date}>
          {getDayName(date)+" "+date.getDate()}
        </Text>
        <Text style={styles.time}>
          {time}
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
