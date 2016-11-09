import React, { Component } from 'react';

import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

var moment = require('moment');
import Geocoder from 'react-native-geocoder';
import DeviceInfo from 'react-native-device-info';

export default class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shabbatStartDate: moment(),
      shabbatEndDate: moment(),
      shabbatStartDateFromNow: "...", // in seconds
      shabbatEndDateFromNow: "...", // in seconds

      // Geolocation
      initialPosition:        null,
      lastPosition:           null,
      initialPositionString:  'unknown',
      lastPositionString:     'unknown',
      locality:               'unknown',
      country:                'unknown',

      timezone:                DeviceInfo.getTimezone(),
    };





    setInterval(() => {
      this.setState({
        shabbatStartDateFromNow: this.state.shabbatStartDate.fromNow(),
        shabbatEndDateFromNow: this.state.shabbatEndDate.fromNow(),
      });
    }, 1000);
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

        // Geoloc Paris
        // var place = {
        //   lat: 48.866667,
        //   lng: 2.333333
        // };

        // XMLHttpRequest
        var request = new XMLHttpRequest();
        request.onreadystatechange = (e) => {
          if (request.readyState !== 4) {
            return;
          }
          if (request.status === 200) {
            let jsonResponse = JSON.parse(request.responseText);
            let shabbatStartDate = moment(jsonResponse.items[0].date);
            let shabbatEndDate = moment(jsonResponse.items[2].date);

            this.setState({
              shabbatStartDate: shabbatStartDate,
              shabbatEndDate: shabbatEndDate,
            });
          } else {
            console.warn('error');
            alert('error');
          }
        };

        request.open('GET', 'http://www.hebcal.com/shabbat/?cfg=json&m=50&latitude=' + place.lat + '&longitude=' + place.lng + '&tzid=' + this.state.timezone);
        request.send();




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
      <View>
        <View>
          <Text style={styles.schedules}>
            <Text>
              Shabbat{' '}
              {this.state.shabbatStartDate.isBefore(moment()) ? "est entré" : "entre"} {this.state.shabbatStartDateFromNow+'\n'}
            </Text>
            <Text style={styles.informations}>
              {this.state.shabbatStartDate.format("ddd").toUpperCase()+' '+this.state.shabbatStartDate.date()+" à "+this.state.shabbatStartDate.format("H:mm")+'\n'}
            </Text>
          </Text>
          <Text style={styles.schedules}>
            <Text>
              et{' '}
              {this.state.shabbatEndDate.isBefore(moment()) ? "est sorti" : "sort"} {this.state.shabbatEndDateFromNow+'\n'}
            </Text>
            <Text style={styles.informations}>
              {this.state.shabbatEndDate.format("ddd").toUpperCase()+' '+this.state.shabbatEndDate.date()+" à "+this.state.shabbatEndDate.format("H:mm")+'\n'}
            </Text>
          </Text>


        </View>

        <View style={styles.informationsContainer}>
          <Text style={styles.geolocation}>
            {this.state.locality}, {this.state.country}{'\n'}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  schedules: {
    color: '#9B9B9B',
    fontSize: 22,
    textAlign: 'center',
  },
  informations: {
    color: '#fff',
    fontSize: 34,
  },
  geolocation: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  }
});
