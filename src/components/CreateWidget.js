import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addWidget } from '../actions';

class CreateWidget extends Component {
	state = {
		show: false,
		name: '',
		color: '',
		price: '',
		inventory: '',
		melts: false,
		error: ''
	};
	handleSubmit = e => {
		e.preventDefault();

		const { name, color, price, inventory } = this.state;

		if (this.validateInputs(name, color, price, inventory)) {
			this.props.addWidget(this.state, result => {
				console.log(result);
			});
		} else {
			this.setState({
				error:
					'Name and Color have to be strings, price and inventory have to be numbers '
			});
		}
	};

	// simple validation
	validateInputs = (name, color, price, inventory) => {
		let name1 = name.split('').length > 1 && isNaN(name);
		let color1 = color.split('').length >= 3 && isNaN(color);
		let price1 = price.split('').length >= 1 && !isNaN(price);
		let inventory1 = inventory.split('').length >= 1 && !isNaN(inventory);
		if (name1 && color1 && price1 && inventory1) {
			return true;
		}

		return false;
	};
	onCheck = () => {
		this.setState({
			melts: this.state.melts ? false : true,
			error: ''
		});
	};
	render() {
		if (!this.state.show) {
			return (
				<div className="container">
					<div className="row">
						<div className="col-md-11 text-center">
							<button
								className="btn btn-primary"
								onClick={() => this.setState({ show: true })}
							>
								Add Widget
							</button>
						</div>
					</div>
				</div>
			);
		}
		return (
			<div className="row" style={{ display: '' }}>
				<div className="col-lg-12">
					<div className="widget">
						<div className="widget-header">Create Widget</div>
						<div className="widget-body">
							<form className="form-horizontal" onSubmit={this.handleSubmit}>
								<legend>Create Widget</legend>
								<div className="row">
									<div className="col-lg-6">
										<div className="input-group input-group-sm">
											<span className="input-group-addon">@</span>
											<input
												type="text"
												className="form-control"
												placeholder="Widget Name"
												value={this.state.name}
												aria-describedby="sizing-addon2"
												onChange={e =>
													this.setState({ name: e.target.value, error: '' })
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
												placeholder="Price"
												value={this.state.price}
												onChange={e =>
													this.setState({ price: e.target.value, error: '' })
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
												placeholder="Inventory Amount"
												value={this.state.inventory}
												onChange={e =>
													this.setState({
														inventory: e.target.value,
														error: ''
													})
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
												placeholder="Color"
												value={this.state.color}
												onChange={e =>
													this.setState({ color: e.target.value, error: '' })
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
									<div
										style={{
											color: 'red',
											fontSize: '18px',
											textAlign: 'center'
										}}
									>
										{this.state.error}
									</div>
								</div>
								<hr />
								<div className="row">
									<div className="col-lg-12 text-center">
										<button
											type="button"
											className="btn btn-md btn-danger"
											onClick={() => this.setState({ show: false })}
											style={{ paddingRight: '15px' }}
										>
											Cancel
										</button>
										<button
											type="submit"
											className="btn btn-md btn-primary"
											onClick={() => this.setState({ show: true })}
										>
											Submit
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(null, { addWidget })(CreateWidget);
