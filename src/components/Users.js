import React, { Component } from 'react';
import Sidebar from './common/Sidebar';
import Header from './common/Header';
import ReactTable from './reactTable/React-table';

class Dashboard extends Component {
	render() {
		const title = 'Users';
		return (
			<div id="page-wrapper" className="open">
				<Sidebar title={title} icon="users" />
				<div id="content-wrapper">
					<div className="page-content">
						<Header title={title} />
						<div className="row">
							<ReactTable table="users" page="full" />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Dashboard;
