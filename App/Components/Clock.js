import React, { Component } from 'react';

import FormattedClock from './FormattedClock';

var moment = require('moment');

export default class Clock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      now: moment(),
    };

    setInterval(() => {
      this.setState({
        now: moment(),
      });
    }, 1000);
  }

  render() {
    return (
      <FormattedClock datetime={this.state.now} />
    );
  }
}
