import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Users from './Users';
import Widgets from './Widgets';

class App extends Component {
	componentDidMount() {
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
		return (
			<div>
				<BrowserRouter>
					<div>
						<Route exact path="/" component={Dashboard} />
						<Route exact path="/users" component={Users} />
						<Route exact path="/widgets" component={Widgets} />
					</div>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;
