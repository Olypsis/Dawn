import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
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
    const params = new URLSearchParams(this.props.location);
    const pKey = params.get('pKey');

    const query = {
      pKey,
    };

    console.log('QUERY', query);

    if (!isEmpty(pKey)) {
      // TODO
      await this.props.connectStatus(pKey);
      await this.props.createStatusListener();
    } else {
      await this.props.connectStatus();
      await this.props.createStatusListener();
    }
  }

  render = () => <Fragment />;
}

Whisper.propTypes = {
  connectStatus: PropTypes.func.isRequired,
  createStatusListener: PropTypes.func.isRequired,
};

export default Whisper;
