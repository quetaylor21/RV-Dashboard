import { FETCH_WIDGETS, GET_WIDGET } from '../actions/types';
import _ from 'lodash';

export const widgetReducer = (state = {}, { type, payload }) => {
	switch (type) {
		case FETCH_WIDGETS:
			return _.mapKeys(payload, 'id');

		case GET_WIDGET:
			return { ...state, [payload.id]: payload };

		default:
			return state;
	}
};
