import React, { Component } from 'react';
import Sidebar from './common/Sidebar';
import Widget from './common/Widget';
import Header from './common/Header';
import ReactTable from './reactTable/React-table';

class Dashboard extends Component {
	state = { users: 0, widgets: 0 };
	getCount = (prop, value) => {
		this.setState({ [prop]: value.length });

		console.log('the new state = ', this.state);
	};
	render() {
		const title = 'Dashboard';
		let { users, widgets } = this.state;
		return (
			<div id="page-wrapper" className="open">
				<Sidebar title={title} icon="tachometer" />
				<div id="content-wrapper">
					<div className="page-content">
						<Header title={title} />
						<div className="row">
							<Widget type="Users" icon="users" color="green" count={users} />
							<Widget type="Widgets" icon="cogs" color="red" count={widgets} />
						</div>
						<div className="row">
							<ReactTable table="users" getCount={this.getCount} />
							<ReactTable table="widgets" getCount={this.getCount} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Dashboard;
