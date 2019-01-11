import React from 'react';
import PropTypes from 'prop-types';

// Features
import UploadCard from '../../features/upload';
import TableContainer from '../../features/download';
import Whisper from '../../features/whisper';
// Components
import Header from '../../components/header/Header';

// Metamask
import ConnectMetamaskContainer from '../../features/account/ConnectMetamaskContainer';

class Homepage extends React.Component {
  render() {
    return (
      <div className="main-container">
        <div className="flex-vertical">
          {/* Vertical Flex - for Header, Content */}
          <Header />
          <div className="flex-horizontal">
            {/* Horizontal Flex - for Transfer, Messages */}

            {/* Left Half of Page */}
            <div className="container transfer">
              <UploadCard />
              <ConnectMetamaskContainer />
            </div>

            {/* Right Half of Page */}
            <div className="container messages">
              <TableContainer />
              <Whisper />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;
