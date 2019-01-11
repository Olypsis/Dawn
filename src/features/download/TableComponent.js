import React from 'react';
import PropTypes from 'prop-types';

// Dependancy
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class Table extends React.Component {
  constructor(props) {
    super(props);
    this._handleDownloadClick = this._handleDownloadClick.bind(this);
  }

  // Click Handler for Download button for every payload received
  _handleDownloadClick = async msg => {
    const { hash, path, key, iv } = msg;
    await this.props.downloadAndDecryptFile(hash, path, key, iv);
  };

  render() {
    const { events } = this.props.events;

    const columns = [
      {
        Header: 'Received/Sent',
        accessor: 'type',
      },
      {
        Header: 'File Name',
        accessor: 'payload.path',
      },
      {
        Header: 'Download',
        accessor: 'payload',
        Cell: row => {
          console.log('ROW', row);
          return (
            <span>
              <button
                className="download-button"
                onClick={() => this._handleDownloadClick(row.value)}
              >
                Download
              </button>
            </span>
          );
        },
      },
      {
        Header: 'Message',
        accessor: 'payload.note',
      },
    ];

    return (
      <div className="message-table">
        <ReactTable
          data={events}
          columns={columns}
          defaultPageSize={20}
          resizable={false}
          noDataText={'No messages...'}
          showPagination={false}
          style={{
            height: '400px', // This will force the table body to overflow and scroll, since there is not enough room
          }}
        />
      </div>
    );
  }
}

Table.propTypes = {
  downloadAndDecryptFile: PropTypes.func.isRequired,
  events: PropTypes.object.isRequired,
};

export default Table;
