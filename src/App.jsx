// React
import React, { Component } from 'react';

// Redux
import { Provider } from 'react-redux';
import store from './state/store';

// Routes
import Routes from './routes';

// Web3
import getWeb3 from './features/web3/getWeb3';

// CSS
import './App.css';

class App extends Component {
  async componentDidMount() {
    getWeb3();
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Routes />
        </div>
      </Provider>
    );
  }
}

export default App;
