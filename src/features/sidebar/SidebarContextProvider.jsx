import React from 'react';
import { SidebarContext } from './SidebarContext';

class SidebarContextProvider extends React.Component {
	render() {
		const { events, whisper } = this.props;
		return (
			<SidebarContext.Provider
				value={{
					events: this.props.events,
					whisper: this.props.whisper,
				}}
			>
				{this.props.children}
			</SidebarContext.Provider>
		);
	}
}

export default SidebarContextProvider;
