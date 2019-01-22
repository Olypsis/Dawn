import { TOGGLE_DRAWER, OPEN_DRAWER, CLOSE_DRAWER } from '../../state/types';

const initialState = {
  open: false,
  innerContentHeading: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_DRAWER:
      return {
        ...state,
        open: !state.open,
      };
    case OPEN_DRAWER:
      return {
        ...state,
        open: true,
      };
    case CLOSE_DRAWER:
      return {
        ...state,
        open: false,
      };

    default:
      return state;
  }
}
