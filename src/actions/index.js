import axios from 'axios';
import { FETCH_USERS, FETCH_WIDGETS, GET_USER, GET_WIDGET } from './types';

// fetches all of the user data
export const fetchUsers = callback => async dispatch => {
	try {
		// set res to the return value of the call
		const res = await axios.get('http://spa.tglrw.com:4000/users');
		dispatch({ type: FETCH_USERS, payload: res.data });
		callback();
	} catch (e) {
		// I didnt set up my state for Errors but I would dispatch an error here
		// So that the component can see and use it
		console.log('Error:', e);
	}
};

// fetches all of the widgets
export const fetchWidgets = callback => async dispatch => {
	widgetFetchMethod(dispatch);
	callback();
};

// Get a specific user
// This was set up and not used because you can view in table
// I set it up to show that I could
export const getUser = id => async dispatch => {
	const res = await axios.get(`http://spa.tglrw.com:4000/users/${id}`);

	dispatch({ type: GET_USER, payload: res.data });
};

// get a specific widget
// This was set up and not used because you can view in table
// I set it up to show that I could
export const getWidget = id => async dispatch => {
	const res = await axios.get(`http://spa.tglrw.com:4000/widgets/${id}`);

	dispatch({ type: GET_WIDGET, payload: res.data });
};

// Adds a widget
export const addWidget = (values, callback) => async dispatch => {
	delete values.error;
	delete values.show;
	const res = await axios.post(`http://spa.tglrw.com:4000/widgets`, values);

	// fetch widgets after one was added
	widgetFetchMethod(dispatch);
	callback(res);
};

export const updateWidget = (values, callback) => async dispatch => {
	// cant pass the id with call so it's set to a new variable
	const { id } = values;

	// delete values not needed in object
	delete values.id;
	delete values.modalIsOpen;

	// call to update widget
	await axios.put(`http://spa.tglrw.com:4000/widgets/${id}`, values);

	// fetch widgets after one was updated
	widgetFetchMethod(dispatch);
	callback();
};

// created a fetch widget function to update the widgets
// when one is added, created or needed to be fetched
const widgetFetchMethod = async dispatch => {
	const res = await axios.get('http://spa.tglrw.com:4000/widgets');

	return dispatch({ type: FETCH_WIDGETS, payload: res.data });
};
