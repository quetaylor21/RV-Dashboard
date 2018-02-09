import axios from 'axios';
import {
	FETCH_USERS,
	FETCH_WIDGETS,
	GET_USER,
	GET_WIDGET,
	ADD_WIDGET,
	UPDATE_WIDGET
} from './types';

export const fetchUsers = callback => async dispatch => {
	const res = await axios.get('http://spa.tglrw.com:4000/users');
	// console.log('the res is', res);

	dispatch({ type: FETCH_USERS, payload: res.data });
	callback();
};

export const fetchWidgets = callback => async dispatch => {
	const res = await axios.get('http://spa.tglrw.com:4000/widgets');
	console.log('res from fetchWidgets', res);

	dispatch({ type: FETCH_WIDGETS, payload: res.data });
	callback();
};

export const getUser = id => async dispatch => {
	const res = await axios.get(`http://spa.tglrw.com:4000/users/${id}`);

	dispatch({ type: GET_USER, payload: res.data });
};

export const getWidget = id => async dispatch => {
	const res = await axios.get(`http://spa.tglrw.com:4000/widgets/${id}`);

	dispatch({ type: GET_WIDGET, payload: res.data });
};

export const addWidget = (id, values) => async dispatch => {
	const res = await axios.post(`http://spa.tglrw.com:4000/widgets`, values);

	dispatch({ type: ADD_WIDGET, payload: res.data });
};

export const updateWidget = (id, values) => async dispatch => {
	await axios.get(`http://spa.tglrw.com:4000/widgets/${id}`, values);

	dispatch({ type: UPDATE_WIDGET, payload: '' });
};
