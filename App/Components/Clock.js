import React, { Component } from 'react';
import FormattedClock from './FormattedClock';

export default class Clock extends Component {
  constructor(props) {
    super(props);

    this.state = { date: new Date() };

    setInterval(() => {
      this.setState({ date: new Date() });
    }, 1000);
  }

  render() {
    return (
      <FormattedClock date={this.state.date} />
    );
  }
}
