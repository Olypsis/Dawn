import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Redux
const Header = props => (
  <header className="App-header">
    <h1>Dawn</h1>
    <span className="public-key">
      Your Public Key: {props.whisper.statusDetails.publicKey}
    </span>
    <br />
    <span className="public-key">
      Your Username: {props.whisper.statusDetails.username}
    </span>
  </header>
);

const mapStateToProps = state => ({
  whisper: state.whisper,
});

export default connect(mapStateToProps)(Header);
