import React from 'react';

// Features
import UploadCard from '../../features/upload';
import Whisper from '../../features/whisper';

import SidebarParent from '../../components/sidebar/SidebarParent';
// import Toggle from '../../components/reusable/ToggleRPC';


class Homepage extends React.Component {
  render() {
    return (
      <div className="main-container">
        <div className="flex-vertical">
          {/* Vertical Flex - for Header, Content */}
          <SidebarParent /> 
          <div className="flex-horizontal">
            {/* Horizontal Flex - for Transfer, Messages */}
            {/* Left Half of Page */}
            <div className="container transfer">
              <UploadCard />
            </div>

            {/* Right Half of Page */}
            <div className="container messages">
              <Whisper />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;
