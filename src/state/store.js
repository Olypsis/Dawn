import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';

// Combine Reducers into rootReducer
import whisperReducer from '../features/whisper/reducer';
import web3Reducer from '../features/web3/reducer';
import uploadReducer from '../features/upload/reducer';
import downloadReducer from '../features/download/reducer';
import eventsReducer from '../features/events/reducer';
import sidebarReducer from '../features/sidebar/reducer';



const rootReducer = combineReducers({
  whisper: whisperReducer,
  web3: web3Reducer,
  upload: uploadReducer,
  download: downloadReducer,
  events: eventsReducer,
  sidebar: sidebarReducer
});

const initialState = {};
const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(
    applyMiddleware(...middleware),
    //  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ),
);

export default store;
