import { FETCH_USERS, GET_USER } from '../actions/types';
import _ from 'lodash';

export const userReducer = (state = {}, { type, payload }) => {
	// console.log('the payload is', payload);
	switch (type) {
		case FETCH_USERS:
			return _.mapKeys(payload, 'id');

		case GET_USER:
			return { ...state, [payload.id]: payload };

		default:
			return state;
	}
};
