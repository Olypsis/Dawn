import React, { Fragment } from 'react';
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
    const pKey = params.get('pKey');
    console.log(pKey);

    const query = {
      pKey,
    };

    await this.props.connectStatus(pKey);
    await this.props.createStatusListener(pKey);
  }

  render = () => <Fragment />;
}

Whisper.propTypes = {
  connectStatus: PropTypes.func.isRequired,
  createStatusListener: PropTypes.func.isRequired,
};

export default withRouter(Whisper);
