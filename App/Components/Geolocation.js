import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Geocoder from 'react-native-geocoder';


export default class Geolocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialPosition:        null,
      lastPosition:           null,
      initialPositionString:  'unknown',
      lastPositionString:     'unknown',
      locality:               'unknown',
      country:                'unknown',
    };
  }


  watchID: ?number = null;

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        // alert(position.coords.latitude);

        // Position Geocoding
        var place = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        Geocoder.geocodePosition(place).then(res => {
            // res is an Array of geocoding object (see below)
            // alert(res[0].position.lat + ", " + res[0].position.lng)
            // alert(res[0].locality + ", " + res[0].country)

            this.setState({
              locality: res[0].locality,
              country: res[0].country,
            });
        })
        .catch(err => alert(err))


        this.setState({
          initialPosition: position,
          initialPositionString: initialPosition,
        });
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);
      // alert(lastPosition);


      this.setState({
        lastPosition: position,
        lastPositionString: lastPosition,
      });
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }


  render() {
    return (
      <View style={styles.schedulesContainer}>
        <Text style={styles.schedulesWhite}>
          {this.state.locality}, {this.state.country}{'\n'}
        </Text>
        <Text style={styles.schedules}>
          Latitude: {this.state.lastPosition != null ? this.state.lastPosition.coords.latitude : 'Loading...'}
        </Text>
        <Text style={styles.schedules}>
          Longitude: {this.state.lastPosition != null ? this.state.lastPosition.coords.longitude : 'Loading...'}
        </Text>
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
    flex: 1,
  },
  schedules: {
    color: '#999',
    fontSize: 16,
    textAlign: 'center',
  },
  schedulesWhite: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
  white: {
    color: '#777',
  },
  countdown: {
    color: '#fff',
    fontSize: 40,
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
    color: '#aaa',
    textAlign: 'center',
    fontSize: 18,
  },
});
