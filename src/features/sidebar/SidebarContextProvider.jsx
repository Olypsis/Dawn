import React from 'react';
import { SidebarContext } from './SidebarContext';

class SidebarContextProvider extends React.Component {
	render() {
		return (
			<SidebarContext.Provider
				value={{
					events: this.props.events,
					whisper: this.props.whisper,
					sidebar: this.props.sidebar,
					download: this.props.download,
					notifications: this.props.notifications,
					toggleDrawer: this.props.toggleDrawer,
					openDrawer: this.props.openDrawer,
					closeDrawer: this.props.closeDrawer,
					downloadAndDecryptFile: this.props.downloadAndDecryptFile,
					statusUseMailservers: this.props.statusUseMailservers
				}}
			>
				{this.props.children}
			</SidebarContext.Provider>
		);
	}
}

export default SidebarContextProvider;
