import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Identicon Account feature
import Identicon from "../../features/account/Identicon"

// Redux
const Header = ({ whisper }) => (
  <header className="App-header">
    <h1>Dawn</h1>
    <span className="public-key">
      Your Public Key: {whisper.statusDetails.publicKey}
    </span>
    <br />
    <span className="public-key">
      <Identicon publicKey={whisper.statusDetails.publicKey} /> Your Username: {whisper.statusDetails.username}
    </span>
  </header>
);

const mapStateToProps = state => ({
  whisper: state.whisper,
});

Header.propTypes = {
  whisper: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(Header);
