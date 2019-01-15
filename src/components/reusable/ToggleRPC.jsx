import { Component } from 'react';

export default class ToggleRPC extends Component {
	constructor(props) {
		super(props);
		this.state = {
			on: false,
		};
	}

	toggle = () => {
		console.log("TOGGLE!")
		this.setState({
			on: !this.state.on,
		});
	};

	render() {
		const { children } = this.props;
		return children({
			on: this.state.on,
			toggle: this.toggle,
		});
	}
}

/*
Used in this way:
          <Toggle>
            {({on, toggle}) => (
              <Fragment>
                {on && <p> Hello </p>}
                <button onClick={toggle}> Show/Hide </button>
              </Fragment>
            )}
          </Toggle>

*/