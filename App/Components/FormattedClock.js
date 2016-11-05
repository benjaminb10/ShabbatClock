import React, { Component } from 'react';

import {
  Text,
} from 'react-native';

function getDayName(dateString) {
  return ['DIM.', 'LUN.', 'MAR.', 'MER.', 'JEU.', 'VEN.', 'SAM.'][new Date(dateString).getDay()];
}

export default class FormattedClock extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let date = this.props.date;
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let time = (hours<10 ? '0'+hours : hours)+":"+(minutes<10 ? '0'+minutes : minutes)+":"+(seconds<10 ? '0'+seconds : seconds);

    return (
      <Text>
        {getDayName(date)+"\n"+time}
      </Text>
    );
  }
}
