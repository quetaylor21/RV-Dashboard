import React, { Component } from 'react';
import { requestData, getColumn, getSubComonent } from './Utils';
import { connect } from 'react-redux';
import Spinner from 'react-spinkit';

// Import React Table
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import { fetchUsers, fetchWidgets } from '../../actions';

class ReactTables extends Component {
	state = {
		data: [],
		pages: null,
		loading: true,
		expanded: [],
		ready: false
	};

	componentDidMount() {
		setTimeout(() => {
			if (this.props.table === 'users') {
				this.props.fetchUsers(() => {
					this.setState({ ready: true });

					if (this.props.getCount) {
						let data = this.props.users;
						if (typeof data === 'object') {
							data = Object.keys(data).map(key => {
								return { ...data[key] };
							});
						}
						this.props.getCount('users', data);
					}
				});
			}

			if (this.props.table === 'widgets') {
				this.props.fetchWidgets(() => {
					this.setState({ ready: true });

					if (this.props.getCount) {
						let widgetData = this.props.widgets;
						if (typeof widgetData === 'object') {
							widgetData = Object.keys(widgetData).map(key => {
								return { ...widgetData[key] };
							});
						}
						this.props.getCount('widgets', widgetData);
					}
				});
			}
		}, 2000);
	}

	fetchData = (state, instance) => {
		// Whenever the table model changes, or the user sorts or changes pages, this method gets called and passed the current table model.
		// You can set the `loading` prop of the table to true to use the built-in one or show you're own loading bar if you want.
		this.setState({ loading: false, expanded: [] });
		// Request the data however you want.  Here, we'll use our mocked service we created earlier

		let rawData =
			this.props.table === 'users' ? this.props.users : this.props.widgets;
		if (typeof rawData === 'object') {
			rawData = Object.keys(rawData).map(key => {
				return { ...rawData[key] };
			});
		}
		requestData(
			rawData,
			state.pageSize,
			state.page,
			state.sorted,
			state.filtered
		).then(res => {
			// Now just get the rows of data to your React Table (and update anything else like total pages or loading)
			this.setState({
				data: res.rows,
				pages: res.pages,
				loading: false
			});
		});
	};

	renderColumn = () => {
		return getColumn(this.props.table);
	};
	renderSubComponent = row => {
		return getSubComonent(row, this.props.table);
	};
	render() {
		const { data, pages, loading, ready } = this.state;
		const { page } = this.props;
		const divLength = page ? 'col-lg-12' : 'col-lg-6';
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
			<div className={divLength}>
				<ReactTable
					columns={this.renderColumn()}
					manual // Forces table not to paginate or sort automatically
					data={data}
					pages={pages} // Display the total number of pages
					loading={loading} // Display the loading overlay when we need it
					onFetchData={this.fetchData} // Request new data when things change
					filterable
					defaultPageSize={5}
					expanded={{ ...this.state.expanded }}
					SubComponent={row => this.renderSubComponent(row)}
					getTdProps={(state, row, column, instance) => {
						return {
							onClick: (e, handleOriginal) => {
								let index = row.index;
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
			</div>
		);
	}
}

const mapStateToProps = state => {
	const { users, widgets } = state;
	return { users, widgets };
};

export default connect(mapStateToProps, { fetchUsers, fetchWidgets })(
	ReactTables
);
