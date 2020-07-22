
import React, {Component} from 'react';
// import { Provider } from 'react-redux'
// import { PersistGate } from 'redux-persist/integration/react'
// import { store, persistor } from './src/redux/store'

import Router from './src/router/router';

export default class App extends Component {
  render() {
    return (
      <Router/>
    );
  }
}