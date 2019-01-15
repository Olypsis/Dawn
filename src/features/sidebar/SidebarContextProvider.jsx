import React from 'react';
import { SidebarContext } from './SidebarContext';

class SidebarContextProvider extends React.Component {
	render() {
		return (
			<SidebarContext.Provider
				value={{
					events: this.props.events,
					whisper: this.props.whisper,
					downloadAndDecryptFile: this.props.downloadAndDecryptFile
				}}
			>
				{this.props.children}
			</SidebarContext.Provider>
		);
	}
}

export default SidebarContextProvider;
