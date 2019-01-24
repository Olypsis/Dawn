import { TOGGLE_DRAWER, OPEN_DRAWER, CLOSE_DRAWER } from '../../state/types';

/*
******************
Thunks
******************
 */

// Toggle Drawer
export const toggleDrawer = () =>  dispatch => {
  dispatch(toggleDrawerAction());
};

// Open Drawer
export const openDrawer = () =>  dispatch => {
  dispatch(openDrawerAction());
};

// Close Drawer
export const closeDrawer = () =>  dispatch => {
  dispatch(closeDrawerAction());
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


const openDrawerAction = () => ({
  type: OPEN_DRAWER,
});


const closeDrawerAction = () => ({
  type: CLOSE_DRAWER,
});
