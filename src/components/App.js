import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from 'react-spinkit';
import addPropsToRoute from './addPropsToRoute';
import Dashboard from './Dashboard';
import Users from './Users';
import Widgets from './Widgets';

import { fetchUsers, fetchWidgets } from '../actions';

class App extends Component {
	state = { ready: false };
	componentWillMount() {
		this.props.fetchUsers(() => {
			this.props.fetchWidgets(() => {
				this.setState({ ready: true });
			});
		});
	}
	componentDidMount() {
		// This is for the app loading screen
		const ele = document.getElementById('ipl-progress-indicator');
		if (ele) {
			setTimeout(() => {
				ele.classList.add('available');
				setTimeout(() => {
					ele.outerHTML = '';
				}, 2000);
			}, 1000);
		}
	}

	render() {
		const { users, widgets } = this.props;

		if (!this.state.ready) {
			return <Spinner name="pacman" color="red" />;
		}
		return (
			<div>
				<BrowserRouter>
					<div>
						<Route
							exact
							path="/"
							component={addPropsToRoute(Dashboard, { users, widgets })}
						/>
						<Route
							exact
							path="/users"
							component={addPropsToRoute(Users, { users })}
						/>
						<Route
							exact
							path="/widgets"
							component={addPropsToRoute(Widgets, { widgets })}
						/>
					</div>
				</BrowserRouter>
			</div>
		);
	}
}
const mapStateToProps = state => {
	const { users, widgets } = state;
	return { users, widgets };
};


export default connect(mapStateToProps, { fetchUsers, fetchWidgets })(App);
