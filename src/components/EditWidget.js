import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import _ from 'lodash';

import { updateWidget } from '../actions';
Modal.setAppElement('#root');

class EditWidget extends Component {
	state = {
		modalIsOpen: false
	};
	handleSubmit = e => {
		e.preventDefault();
		let original = this.props.data;
		let updated = this.state;
		original.modalIsOpen = updated.modalIsOpen;

		if (_.isEqual(original, updated)) {
			console.log('nothing was changed');
		} else {
			this.props.updateWidget(updated, () => {
				// this.setState({ modalIsOpen: false });
				console.log('callback is done');
			});
		}
	};
	componentDidMount() {
		if (this.props.data) {
			const { name, color, price, inventory, melts, id } = this.props.data;
			this.setState({ name, color, price, inventory, melts, id });
			this.setState({ modalIsOpen: true });
		}
	}

	onCheck = () => {
		this.setState({
			melts: this.state.melts ? false : true
		});
	};

	afterOpenModal = () => {};

	closeModal = () => {
		this.setState({ modalIsOpen: false });
		this.props.onCancel();
	};
	render() {
		return (
			<Modal
				isOpen={this.state.modalIsOpen}
				onAfterOpen={this.afterOpenModal}
				onRequestClose={this.closeModal}
				style={customStyles}
			>
				<div className="row" style={{ display: '' }}>
					<div className="col-lg-12">
						<div className="widget">
							<div className="widget-header">Edit Widget</div>
							<div className="widget-body">
								<form className="form-horizontal" onSubmit={this.handleSubmit}>
									<legend>Edit Widget</legend>
									<div className="row">
										<div className="col-lg-6">
											<div className="input-group input-group-sm">
												<span className="input-group-addon">@</span>
												<input
													type="text"
													className="form-control"
													value={this.state.name}
													aria-describedby="sizing-addon2"
													onChange={e =>
														this.setState({ name: e.target.value })
													}
												/>
											</div>
										</div>
										<div className="col-lg-6">
											<div className="input-group input-group-sm">
												<span className="input-group-addon">$</span>
												<input
													type="text"
													className="form-control"
													value={this.state.price}
													onChange={e =>
														this.setState({ price: e.target.value })
													}
													aria-describedby="sizing-addon2"
												/>
											</div>
										</div>
									</div>

									<div className="row">
										<div className="col-lg-6">
											<div className="input-group input-group-sm">
												<span className="input-group-addon">#</span>
												<input
													type="text"
													className="form-control"
													value={this.state.inventory}
													onChange={e =>
														this.setState({ inventory: e.target.value })
													}
													aria-describedby="sizing-addon2"
												/>
											</div>
										</div>
										<div className="col-lg-3">
											<div className="input-group input-group-sm">
												<span className="input-group-addon">color</span>
												<input
													type="text"
													className="form-control"
													value={this.state.color}
													onChange={e =>
														this.setState({ color: e.target.value })
													}
													aria-describedby="sizing-addon2"
												/>
											</div>
										</div>
										<div className="col-lg-3">
											<div className="form-check">
												<div className="input-group input-group-sm">
													<span className="input-group-addon">
														<input
															type="checkbox"
															aria-label="..."
															checked={this.state.melts}
															onChange={this.onCheck}
														/>
													</span>
													<input
														type="text"
														className="form-control"
														aria-label="..."
														placeholder="Does it melt?"
														disabled
													/>
												</div>
											</div>
										</div>
									</div>
									<hr />
									<div className="row">
										<div className="col-lg-12 text-center">
											<button
												type="button"
												className="btn btn-md btn-danger"
												onClick={this.closeModal}
												style={{ paddingRight: '15px' }}
											>
												Cancel
											</button>
											<button type="submit" className="btn btn-md btn-primary">
												Submit Edit
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</Modal>
		);
	}
}
const customStyles = {
	content: {
		top: '40%',
		left: '55%',
		right: '-15%',
		bottom: 'auto',
		marginleft: '50%',
		transform: 'translate(-50%, -50%)'
	}
};

export default connect(null, { updateWidget })(EditWidget);
