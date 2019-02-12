import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';

export const RefreshTooltip = ({ children }) => (
  <Tooltip title="Refresh">{children}</Tooltip>
);

export const UploadToolTip = ({ children }) => (
  <Tooltip title="Upload a File">{children}</Tooltip>
);


// <Tooltip title="Add" aria-label="Add">
//   <Fab color="primary" className={classes.fab}>
//     <AddIcon />
//   </Fab>
// </Tooltip>
