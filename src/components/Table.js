import React, { Component } from 'react';

class Table extends Component {
	render() {
		return (
			<div className="col-lg-6">
				<div className="widget">
					<div className="widget-header">
						Users
						<div className="pull-right">
							<input type="text" className="form-control input-sm" />
						</div>
					</div>
					<div className="table-responsive">
						<table className="table">
							<thead>
								<tr>
									<th className="text-center">ID</th>
									<th>Name</th>
									<th>Avatar</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className="text-center">1</td>
									<td>Joe Bloggs</td>
									<td>
										<img src="https://s.gravatar.com/avatar/e11550b1bf793d43639292b196374262?s=48" />
									</td>
								</tr>
								<tr>
									<td className="text-center">2</td>
									<td>Timothy Hernandez</td>
									<td>
										<img src="https://s.gravatar.com/avatar/e11550b1bf793d43639292b196374262?s=48" />
									</td>
								</tr>
								<tr>
									<td className="text-center">3</td>
									<td>Joe Bickham</td>
									<td>
										<img src="https://s.gravatar.com/avatar/e11550b1bf793d43639292b196374262?s=48" />
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
}

export default Table;
