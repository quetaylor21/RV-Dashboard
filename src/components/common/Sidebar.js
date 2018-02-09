import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Sidebar extends Component {
	render() {
		const { title, icon } = this.props;
		const date = new Date().getFullYear();
		return (
			<div id="sidebar-wrapper">
				<ul className="sidebar">
					<li className="sidebar-main">
						<Link to="/">
							{title} <span className={`menu-icon fa fa-${icon}`} />
						</Link>
					</li>
					<li className="sidebar-title">
						<span>NAVIGATION</span>
					</li>
					<li className="sidebar-list">
						<Link to="/">
							Dashboard <span className="menu-icon fa fa-tachometer" />
						</Link>
					</li>
					<li className="sidebar-list">
						<Link to="/users">
							Users <span className="menu-icon fa fa-users" />
						</Link>
					</li>
					<li className="sidebar-list">
						<Link to="/widgets">
							Widgets <span className="menu-icon fa fa-cubes" />
						</Link>
					</li>
				</ul>
				<div className="sidebar-footer col-xs-12">
					<Link to="/">&copy; {date} Red Ventures</Link>
				</div>
			</div>
		);
	}
}

export default Sidebar;
