var UserStatement = React.createClass({
  getInitialState() {
    var status = this.setStatus(this.props.user)
    var progress = this.setProgress(status)
    return {
      user: this.props.user,
      status: status,
      progress: progress,
      editMode: this.isNew(),
      errors: {}
    }
  },
  isNew() {
    if (this.props.user.statement && this.props.user.statement != "") {
      return true
    } else {
      return true
    }
  },
  setEditMode() {
    this.setState({editMode: true});
  },
  setStatus(user) {
    status = 0
    if (user.statement && user.statement.length > 300 ) {
      status += 1
    }
    return status
  },
  setProgress(status) {
    if (status == 0) {
      var progress = "empty"
    } else if (status == 2 ) {
      var progress = "complete"
    } else {
      var progress = "pending"
    }
    return progress
  },
  handleStatementChange(e) {
    var newUser = this.state.user
    newUser.statement = e.target.value
    this.setState({user: newUser});
  },
  toggleStatus: function () {
    var newUser = this.state.user
    this.handleUserUpdate();
  },
  handleUserUpdate() {
    var that = this;
    $.ajax({
      method: 'PUT',
      data: {
        user: that.state.user,
      },
      url: '/users' + '.json',
      success: function(res) {
        that.setState({
          errors: {}
        });
        that.props.onNext()
      },
      error: function(res) {
        that.setState({errors: res.responseJSON.errors});
      }
    });
  },
  handleUserDelete() {
    var that = this;
    $.ajax({
      method: 'DELETE',
      url: '/users/' + that.state.user.id + '.json',
      success: function(res) {
        that.props.onDeleteUser(that.state.user);
      }
    })
  },

  render() {
    var form = <div className="form">
      <div className="field-group">
        <textarea
          placeholder="statement"
          name="statement"
          className="form-control"
          value={this.state.user.statement}
          onChange={this.handleStatementChange} />
        <span style={{color: 'red'}}>{this.state.errors.statement}</span>
      </div>
    </div>
      var markup = (
        <div className="edit">
        <div className="actions col-sm-12 col-lg-2">
          <button className="btn btn-sm" onClick={this.handleUserUpdate}>Next</button>
          <button className="btn btn-sm" onClick={this.onBack}>Back</button>
        </div>
          <div className="rep col-sm-12 col-lg-8">
            {form}
          </div>
        </div>
      );

    return (
              <div>
      <div className="title">
        <h2><span>3. Statement of Intent</span></h2>
      </div>
      <div id="statement" className="statement view">
        <div className="header">
          <h4>A letter detailing your organization's interest in W.A.G.E. Certification.</h4>
        </div>
        {markup}
        </div>
    </div>
    )
  }
});