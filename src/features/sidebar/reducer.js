import { TOGGLE_DRAWER } from '../../state/types';

const initialState = {
  open: false,
  innerContentHeading: "Messages",
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_DRAWER:
      return {
        ...state,
        open: !state.open,
      };
   
    default:
      return state;
  }
}
