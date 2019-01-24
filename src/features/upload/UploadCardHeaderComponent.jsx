import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

// // DropZone Config
// Max File Upload Size: 100
const fileMaxSize = 100 * 1000000;

// Dropzone Styles
const style = {
  width: '100%',
  height: 100,
  borderWidth: 2,
  borderColor: '#eceff4',
  borderStyle: 'dashed',
  borderRadius: 5,
};
const activeStyle = {
  borderStyle: 'solid',
  borderColor: '#D8DEE9',
  backgroundColor: '#8AC0CF',
};

class UploadCardHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileError: '',
    };
  }

  handleOnDrop = async (accepted, rejected, links) => {
    // Handle file rejection
    if (rejected.length !== 0) {
      const fileError = 'File Rejected: ' + rejected[0].name;
      console.log(new Error(fileError));
      return this.setState({ fileError });
    }

    // Handle file acceptance
    const file = accepted[0];

    try {
      await this.readFile(file);
      this.setState({ fileError: '' });
    } catch (err) {
      console.log(err);
    }
  };

  readFile = async file =>
    new Promise((resolve, reject) => {
      try {
        // Create FileReader and read file
        const reader = new FileReader();
        console.log('readFile: about to read file...');
        reader.readAsArrayBuffer(file);
        reader.onloadend = async () => {
          // Convert file from blob to buffer
          const fileBuffer = Buffer.from(reader.result);
          console.log('readFile: file read!');

          // Log Upload File Success
          await this.props.onFileUploaded(
            file.name,
            file.type,
            file.preview,
            fileBuffer,
          );

          await this.props.encryptAndAddFile(fileBuffer, file.name);

          resolve(true);
        };
      } catch (err) {
        reject('readFile:', new Error(err));
      }
    });

  render() {
    // Get latest addedFile from props
    let renderUploadContent;

    

    return (
      <div className={'app-card-header'}>
        <Dropzone
          onDrop={this.handleOnDrop}
          maxSize={fileMaxSize}
          multiple={false}
          style={style}
          activeStyle={activeStyle}
        >
          <div className="centered">
            {/* TODO: Errors
            <p className="errors">
              {this.state.errors.file
                ? this.state.errors.file
                : null}
            </p>
          */}
            <div className="upload-card-header">{renderUploadContent}</div>
          </div>
        </Dropzone>
      </div>
    );
  }
}

UploadCardHeader.propTypes = {
  encryptAndAddFile: PropTypes.func.isRequired,
  onFileUploaded: PropTypes.func.isRequired,
  upload: PropTypes.object.isRequired,
};

export default UploadCardHeader;
