import React, {Fragment} from 'react';
import PropTypes from 'prop-types';


class Whisper extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async componentDidMount() {
    await this.props.connectStatus();
    await this.props.createStatusListener();
  }

  render = () => (
    <Fragment />
  );
}

Whisper.propTypes = {
  connectStatus: PropTypes.object.isRequired,
  createStatusListener: PropTypes.object.isRequired,

};

export default Whisper;
