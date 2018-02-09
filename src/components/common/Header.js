import React from 'react';

const Header = ({ title }) => {
	return (
		<div className="row header col-xs-12">
			<div className="user pull-right">
				<div className="item dropdown" />
			</div>
			<div className="meta">
				<div className="page">{title}</div>
				<div className="breadcrumb-links">Home / {title}</div>
			</div>
		</div>
	);
};

export default Header;
