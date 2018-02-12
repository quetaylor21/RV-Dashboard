import React, { Component } from 'react';
import { requestData, getColumn, getSubComponent } from './Utils';
import Spinner from 'react-spinkit';

// Import React Table
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import EditWidget from '../EditWidget';

class ReactTables extends Component {
	state = {
		data: [],
		pages: null,
		loading: true,
		expanded: [],
		ready: false,
		showEdit: false,
		editData: {}
	};

	componentDidMount() {
		// console.log('the props in Dashboard', this.props);
		// setTimeout(() => {
		this.setState({ ready: true });
		if (this.props.tablesReady) {
			this.props.tablesReady();
		}
		// }, 2000);
	}

	// fetches the data after a filter is applied
	fetchData = (state, instance) => {
		// Whenever the table model changes, or the user sorts or changes pages, this method gets called and passed the current table model.
		this.setState({ loading: false, expanded: [] });

		// Determine if the table is for widgets or users
		let rawData =
			this.props.table === 'users' ? this.props.users : this.props.widgets;
		if (!rawData) return;
		if (typeof rawData === 'object') {
			rawData = Object.keys(rawData).map(key => {
				return { ...rawData[key] };
			});
		}

		// function used to sort and filter table data
		requestData(
			rawData,
			state.pageSize,
			state.page,
			state.sorted,
			state.filtered
		).then(res => {
			// update state with new data
			this.setState({
				data: res.rows,
				pages: res.pages,
				loading: false
			});
		});
	};

	// passes data for the widget that will be edited
	editWidget = data => {
		this.setState({ editData: { ...data }, showEdit: true });
	};

	// cancel editing data
	onCancel = () => {
		this.setState({ editData: {}, showEdit: false });
	};

	// shows modal after the edit button is pushed
	renderEdit = () => {
		if (this.state.showEdit) {
			return <EditWidget data={this.state.editData} onCancel={this.onCancel} />;
		}
	};

	renderColumn = () => {
		return getColumn(this.props.table);
	};
	renderSubComponent = row => {
		return getSubComponent(row, this.props.table, this.editWidget);
	};
	render() {
		// ES6 to pull variables off object
		const { data, pages, loading, ready } = this.state;
		const { page } = this.props;

		// determine if its the dashboard or actual component
		const divLength = page ? 'col-lg-12' : 'col-lg-6';

		// I was setting timeouts to show a pacman loading Spinner
		// They aren't running now
		if (!ready) {
			return (
				<div
					className={divLength}
					style={{
						textAlign: 'center',
						margin: '25% 50%'
					}}
				>
					<Spinner name="pacman" color="#31436B" />
				</div>
			);
		}

		return (
			<div className={divLength} style={{ paddingTop: '10px' }}>
				<ReactTable
					columns={this.renderColumn()}
					manual // Forces table not to paginate or sort automatically
					data={data} // data from state
					pages={pages} // Display the total number of pages
					loading={loading} // Display the loading overlay when we need it
					onFetchData={this.fetchData} // Request new data when things change
					filterable // makes table filterable
					defaultPageSize={5} // set default page size
					expanded={{ ...this.state.expanded }} // keeps track of which rows are expanded
					SubComponent={row => this.renderSubComponent(row)}
					getTdProps={(state, row, column, instance) => {
						return {
							// on click method for rows
							onClick: (e, handleOriginal) => {
								let { index } = row;
								let isExpanded = this.state.expanded[index] ? false : true;
								this.setState({
									expanded: { ...this.state.expanded, [index]: isExpanded }
								});
								if (handleOriginal) {
									handleOriginal();
								}
							}
						};
					}}
					className="-striped -highlight"
					style={{
						height: '400px' // This will force the table body to overflow and scroll, since there is not enough room
					}}
				/>
				{this.renderEdit()}
			</div>
		);
	}
}

export default ReactTables;
