import React from 'react';
import Sidebar from './common/Sidebar';
import Widget from './common/Widget';
import Header from './common/Header';
import ReactTable from './reactTable/ReactTables';

const Dashboard = ({ users, widgets }) => {
	const title = 'Dashboard';
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
						<ReactTable table="users" users={users} />
						<ReactTable table="widgets" widgets={widgets} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
