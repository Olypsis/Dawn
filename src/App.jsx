// React
import React, { Component } from 'react';

// Redux
import { Provider } from 'react-redux';
import store from './state/store';

// NotiStack
import { SnackbarProvider } from 'notistack';


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
      <Provider store={store} >
      <SnackbarProvider maxSnack={1}>
        <div className="App">
          <Routes />
        </div>
      </SnackbarProvider>
      </Provider>
    );
  }
}

export default App;
