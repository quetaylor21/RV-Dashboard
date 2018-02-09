import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Widget extends Component {
	static defaultProps = {
		icon: 'users',
		color: 'red',
		type: 'Add a type'
	};
	// componentWillMount() {
	//   this.props.fetchData()
	// }
	render() {
		const { icon, type, color, count } = this.props;
		return (
			<div className="col-lg-6 col-md-6 col-xs-12">
				<Link to={type === 'Users' ? '/users' : '/widgets'}>
					<div className="widget">
						<div className="widget-header">
							<div className={`widget-icon ${color} pull-left`}>
								<i className={`fa fa-${icon}`} />
							</div>
							<div className="title">{count}</div>
							<div className="comment">{type}</div>
						</div>
					</div>
				</Link>
			</div>
		);
	}
}

export default Widget;
