import React, { Component } from 'react';

class CreateWidget extends Component {
	state = { show: false };
	handleSubmit(e) {
		e.preventDefault();
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
						<div className="widget-header">Create/Edit Template</div>
						<div className="widget-body">
							<form
								className="form-horizontal"
								onSubmit={(e) => this.handleSubmit}
							>
								<legend>Create Widget</legend>
								<div className="row">
									<div className="col-lg-6">
										<div className="input-group input-group-sm">
											<span className="input-group-addon">@</span>
											<input
												type="text"
												className="form-control"
												placeholder="Widget Name"
												aria-describedby="sizing-addon2"
												onChange={e => console.log(e.target.value)}
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
												aria-describedby="sizing-addon2"
											/>
										</div>
									</div>
									<div className="col-lg-3">
										<div className="form-check">
											<div className="input-group input-group-sm">
												<span className="input-group-addon">
													<input type="checkbox" aria-label="..." />
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
											className="btn btn-md btn-danger"
											onClick={() => this.setState({ show: false })}
											style={{ paddingRight: '15px' }}
										>
											Cancel
										</button>
										<button
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

export default CreateWidget;
