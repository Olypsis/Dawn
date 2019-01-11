import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

class Whisper extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    await this.props.connectStatus();
    await this.props.createStatusListener();
  }

  render = () => <Fragment />;
}

Whisper.propTypes = {
  connectStatus: PropTypes.func.isRequired,
  createStatusListener: PropTypes.func.isRequired,
};

export default Whisper;
