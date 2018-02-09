import React from 'react';
import _ from 'lodash';

export const requestData = (data, pageSize, page, sorted, filtered) => {
	return new Promise((resolve, reject) => {
		// You can retrieve your data however you want, in this case, we will just use some local data.
		let filteredData = data;
		const excluded = ['id', 'price', 'inventory'];

		// You can use the filters in your request, but you are responsible for applying them.
		if (filtered.length) {
			filteredData = filtered.reduce((filteredSoFar, nextFilter) => {
				return filteredSoFar.filter(row => {
					if (!excluded.includes(nextFilter.id)) {
						return (row[nextFilter.id].toUpperCase() + '').includes(
							nextFilter.value.toUpperCase()
						);
					} else {
						return (row[nextFilter.id] + '').includes(nextFilter.value);
					}
				});
			}, filteredData);
		}
		// You can also use the sorting in your request, but again, you are responsible for applying it.
		// console.log('sorted', sorted);
		const sortedData = _.orderBy(
			filteredData,
			sorted.map(sort => {
				return row => {
					if (row[sort.id] === null || row[sort.id] === undefined) {
						return -Infinity;
					}
					return typeof row[sort.id] === 'string'
						? row[sort.id].toLowerCase()
						: row[sort.id];
				};
			}),
			sorted.map(d => {
				d.desc ? 'desc' : 'asc';
			})
		);

		// You must return an object containing the rows of the current page, and optionally the total pages number.
		const res = {
			rows: sortedData.slice(pageSize * page, pageSize * page + pageSize),
			pages: Math.ceil(filteredData.length / pageSize)
		};

		resolve(res);
	});
};

export const getColumn = table => {
	if (table === 'users') {
		return [
			{
				Header: 'ID',
				accessor: 'id',
				Cell: row => (
					<div style={{ textAlign: 'center', marginTop: '20px' }}>
						{row.value}
					</div>
				)
			},
			{
				Header: 'Name',
				accessor: 'name',
				Cell: row => (
					<div style={{ textAlign: 'center', marginTop: '20px' }}>
						{row.value}
					</div>
				)
			},
			{
				Header: 'Avatar',
				accessor: 'gravatar',
				Cell: row => (
					<div style={{ textAlign: 'center' }}>
						<img src={`${row.value}`} alt="Avatar" />
					</div>
				),
				sortable: false,
				filterable: false
			}
		];
	}

	if (table === 'widgets') {
		return [
			{
				Header: 'ID',
				accessor: 'id',
				Cell: row => (
					<div style={{ textAlign: 'center', marginTop: '10px' }}>
						{row.value}
					</div>
				)
			},
			{
				Header: 'Name',
				accessor: 'name',
				Cell: row => (
					<div style={{ textAlign: 'center', marginTop: '10px' }}>
						{row.value}
					</div>
				)
			},
			{
				Header: 'Color',
				accessor: 'color',
				Cell: row => (
					<div style={{ textAlign: 'center', marginTop: '10px' }}>
						{row.value}
					</div>
				)
			},
			{
				Header: 'Price',
				accessor: 'price',
				Cell: row => (
					<div style={{ textAlign: 'center', marginTop: '10px' }}>
						{row.value}
					</div>
				)
			}
		];
	}
};

export const getSubComonent = (row, table) => {
	const { name, id, color, price, melts, inventory } = row.original;
	const doesItMelt = melts ? 'it melts' : "it doesn't melt";
	const style = {
		padding: '20px',
		textAlign: 'center',
		backgroundColor: '#31436B',
		color: 'white',
		fontSize: '12px'
	};
	if (table === 'users')
		return <div style={style}>{`${name} has an id of ${id}`}</div>;

	if (table === 'widgets')
		return (
			<div
				style={style}
			>{`The ${name} is ${color}. It only costs $${price}, there are ${inventory} left and ${doesItMelt}`}</div>
		);
};
