import { TOGGLE_DRAWER } from '../../state/types';

/*
******************
Thunks
******************
 */

// Tries downloading and Decrypting the file given payload
export const toggleDrawer = () =>  dispatch => {
  dispatch(toggleDrawerAction());
};

/*
******************
Helper Functions
******************
 */

/*
******************
Action Creators
******************
 */

const toggleDrawerAction = () => ({
  type: TOGGLE_DRAWER,
});
