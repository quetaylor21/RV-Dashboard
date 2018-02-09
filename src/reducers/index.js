import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { widgetReducer } from './widgetReducer';

export default combineReducers({
	users: userReducer,
	widgets: widgetReducer
});
