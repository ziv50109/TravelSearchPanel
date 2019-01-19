import React, { Component } from 'react';
import VacationProductPC from './pc';

class Preview extends Component {

  state = { }
  render () {
      return (
          <React.Fragment>
              <h2>PC版</h2>
              <VacationProductPC />
          </React.Fragment>
      );
  }
}

export default Preview;