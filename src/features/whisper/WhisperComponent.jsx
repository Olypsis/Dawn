import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import isEmpty from '../../util/is-empty';

class Whisper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pKey: '',
    };
  }

  async componentDidMount() {
    const params = new URLSearchParams(this.props.location.search);
    const pKey = params.get('pkey');
    console.log(pKey);

    await this.props.connectStatus(pKey);
    await this.props.createStatusListener();
    await this.props.statusUseMailservers();
  }

  render = () => <Fragment />;
}

Whisper.propTypes = {
  connectStatus: PropTypes.func.isRequired,
  createStatusListener: PropTypes.func.isRequired,
};

export default withRouter(Whisper);
