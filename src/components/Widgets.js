import React, { Component } from 'react';
import Sidebar from './common/Sidebar';
import Header from './common/Header';
import CreateWidget from './CreateWidget';
import ReactTable from './reactTable/React-table';

class Widgets extends Component {
	render() {
		const title = 'Widgets';
		return (
			<div id="page-wrapper" className="open">
				<Sidebar title={title} icon="cubes" />
				<div id="content-wrapper">
					<div className="page-content">
						<Header title={title} />
						<div className="row">
							<ReactTable table="widgets" page="full" />
							<CreateWidget />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Widgets;
