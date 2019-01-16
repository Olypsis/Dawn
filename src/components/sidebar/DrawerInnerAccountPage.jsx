import React, { Component } from 'react';

export default class DrawerInnerAccountPage extends Component {
	componentDidMount(){
		console.log("DrawerInnerAccountPage: componentDidMount")
	}
	render() {
		console.log("DrawerInnerAccountPage: render")
		console.log("")
		return (
			<h1>DrawerInnerAccountPage</h1>
		);
	}
}
