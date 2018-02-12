import React, { Component } from 'react';
import Sidebar from './common/Sidebar';
import Header from './common/Header';
import CreateWidget from './CreateWidget';
import ReactTable from './reactTable/ReactTables';

class Widgets extends Component {
	state = { tablesReady: false };

	tablesReady = () => {
		this.setState({ tablesReady: true });
	};
	renderCreateButton = () => {
		if (this.state.tablesReady) return <CreateWidget />;
	};
	render() {
		const title = 'Widgets';
		let { widgets } = this.props;
		return (
			<div id="page-wrapper" className="open">
				<Sidebar title={title} icon="cubes" />
				<div id="content-wrapper">
					<div className="page-content">
						<Header title={title} />
						<div className="row">
							<ReactTable
								table="widgets"
								page="full"
								widgets={widgets}
								tablesReady={this.tablesReady}
							/>
							{this.renderCreateButton()}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Widgets;
