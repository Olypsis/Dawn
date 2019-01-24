import React from 'react';
import PropTypes from 'prop-types';

// Custom Metamask Button
import MetamaskButton from "../../components/buttons/MetamaskButton"

class ConnectMetamask extends React.Component {
  constructor(props) {
    super(props);
    this.onClickSignButton = this.onClickSignButton.bind(this);
  }

  async onClickSignButton(e) {
    e.preventDefault();
    console.log('You clicked the Sign Button! LOL!');
    try {
      await this.props.signMetamaskLogin();
      await this.props.createStatusListener();
      await this.props.statusUseMailservers();
    } catch (err) {
      console.log('onClickSignButton: err:', err)
      alert('onClickSignButton: error: ', err.message);
    }
  }

  render() {
    return (
      <div className="flex-vertical">
        <MetamaskButton onClick={this.onClickSignButton} />
      </div>
    );
  }
}

ConnectMetamask.propTypes = {
  signMetamaskLogin: PropTypes.func.isRequired,
  createStatusListener: PropTypes.func.isRequired,
  statusUseMailservers: PropTypes.func.isRequired,
};
export default ConnectMetamask;
