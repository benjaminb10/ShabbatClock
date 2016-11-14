import React, { Component } from 'react';

import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

import Geocoder from 'react-native-geocoder';
import DeviceInfo from 'react-native-device-info';
import I18n from 'react-native-i18n'

var moment = require('moment');

function arraySearch(arr, val) {
  for (var i=0; i<arr.length; i++)
    if (arr[i]["category"] === val)
      return i;
  return -1;
}

export default class Schedules extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shabbatStartDate: moment(),
      shabbatEndDate: moment(),
      shabbatStartDateFromNow: " ", // in seconds
      shabbatEndDateFromNow: " ", // in seconds
      hasShabbatStartDate: false,
      hasShabbatEndDate: false,

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
            let indexOfShabbatStart = arraySearch(jsonResponse.items, "candles");
            let indexOfShabbatEnd = arraySearch(jsonResponse.items, "havdalah");

            // console.log(JSON.stringify(jsonResponse.items, null, 4))

            if (indexOfShabbatStart >= 0) {
              this.setState({
                hasShabbatStartDate: true,
                shabbatStartDate: moment(jsonResponse.items[indexOfShabbatStart].date),
              })
            }

            if (indexOfShabbatEnd >= 0) {
              this.setState({
                hasShabbatEndDate: true,
                shabbatEndDate: moment(jsonResponse.items[indexOfShabbatEnd].date),
              })
            }

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
      <View style={styles.container}>

        { this.state.hasShabbatEndDate ? (
          <View style={styles.schedulesContainer}>
            <Text style={styles.schedules}>
              <Text>
                <Text>
                  {"Shabbat "
                  +(this.state.shabbatStartDate.isBefore(moment()) ? I18n.t('started') : I18n.t('starts'))
                  +'\n'}
                </Text>
                <Text style={styles.schedulesInformations}>
                  {this.state.shabbatStartDate.format("ddd").toUpperCase()+' '+this.state.shabbatStartDate.date()+" à "+this.state.shabbatStartDate.format("H:mm")+'\n'}
                </Text>
                <Text>
                  {this.state.shabbatStartDateFromNow}
                </Text>
              </Text>
            </Text>
          </View>
          ) : null
        }

        { this.state.hasShabbatEndDate ? (
          <View style={styles.schedulesContainer}>
            <Text style={styles.schedules}>
              <Text>
                <Text>
                  {"Shabbat "
                  +(this.state.shabbatEndDate.isBefore(moment()) ? I18n.t('ended') : I18n.t('ends'))
                  +'\n'}
                </Text>
                <Text style={styles.schedulesInformations}>
                  {this.state.shabbatEndDate.format("ddd").toUpperCase()+' '+this.state.shabbatEndDate.date()+" à "+this.state.shabbatEndDate.format("H:mm")+'\n'}
                </Text>
                <Text>
                  {this.state.shabbatEndDateFromNow}
                </Text>
              </Text>
            </Text>
          </View>
          ) : null
        }

        <View style={styles.geolocationContainer}>
          <Text style={styles.geolocation}>
            {this.state.locality}, {this.state.country}
          </Text>
        </View>
      </View>
    );
  }
}

// Enable fallbacks if you want `en-US` and `en-GB` to fallback to `en`
I18n.fallbacks = true

I18n.translations = {
  en: {
    started: 'started',
    starts: 'will start',
    ended: 'ended',
    ends: 'will end',
  },
  fr: {
    started: 'est entré',
    starts: 'entre',
    ended: 'est sorti',
    ends: 'sort',
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  schedulesContainer: {
    flex: 0.4,
  },
  geolocationContainer: {
    height: 20,
  },
  schedules: {
    color: '#9B9B9B',
    fontSize: 22,
    textAlign: 'center',
  },
  schedulesInformations: {
    color: '#fff',
    fontSize: 34,
  },
  geolocation: {
    color: '#9B9B9B',
    fontSize: 18,
    textAlign: 'center',
    justifyContent: 'flex-end'
  }
});
