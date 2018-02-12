import React, { Component } from 'react';

export default (ComponentUsed, passedProps) => {
	class addPropsToRoute extends Component {
		render() {
			// adds props and passed props to the component
			let props = Object.assign({}, this.props, passedProps);

			// retuns component with props
			return <ComponentUsed {...props} />;
		}
	}
	return addPropsToRoute;
};
