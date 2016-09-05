var CertificationShow = React.createClass({
  getInitialState() {
    return {
      certification: this.props.certification,
      artist_payments: this.hasPayments(),
      submitMode: this.setSubmitMode(),
      errors: {},
    }
  },
  hasPayments() {
    if (this.props.artist_payments) {
      var artist_payments = this.props.artist_payments
    } else {
      var artist_payments = []
    }
    return artist_payments
  },
  setSubmitMode() {
    if (this.props.certification.status > 0) {
      return true
    } else {
      return false
    }
  },
  handleFiscalStartChange(e) {
    var newCertification = this.state.certification
    newCertification.fiscal_start = e.target.value
    this.setState({certification: newCertification});
  },

  handleFiscalEndChange(e) {
    var newCertification = this.state.certification
    newCertification.fiscal_end = e.target.value
    this.setState({certification: newCertification});
  },

  handleStatusChange(e) {
    var newCertification = this.state.certification
    newCertification.status = e.target.value
    this.setState({certification: newCertification});
  },

  toggleStatus: function () {
    var newCertification = this.state.certification
    newCertification.status = !this.state.certification.status
    this.handleCertificationUpdate();
  },

  handleCertificationUpdate() {
    var that = this;
    $.ajax({
      method: 'PUT',
      data: {
        certification: that.state.certification,
      },
      url: '/certifications/' + that.state.certification.id + '.json',
      success: function(res) {
        that.setState({
          errors: {},
          certification: res,
          editMode: false
        });
      },
      error: function(res) {
        that.setState({errors: res.responseJSON.errors});
      }
    });
  },

  handleCertificationDelete() {
    var that = this;
    $.ajax({
      method: 'DELETE',
      url: '/certifications/' + that.state.certification.id + '.json',
      success: function(res) {
        that.props.onDeleteCertification(that.state.certification);
      }
    })
  },

  render() {
    if (moment(this.state.certification.fiscal_start).format('Y') == moment(this.state.certification.fiscal_start).format('Y') ) {
      var formatted_date = moment(this.state.certification.fiscal_start).format('MMMM') + " - " + moment(this.state.certification.fiscal_end).format('MMMM YYYY');
    } else {
      var formatted_date = moment(this.state.certification.fiscal_start).format('MMMM YYYY') + " - " + moment(this.state.certification.fiscal_end).format('MMMM YYYY');
    };

    if (this.state.certification.status == 0 ) {
      var formatted_status = <span className="in-progress">In Progress</span>
    } else if (this.state.certification.status == 1 ) {
      var formatted_status = <span className="submit">Ready To Submit</span>
    }

    if ( this.state.submitMode ) {
      var submit = ( <div>
          <button onClick={this.handleCertificationUpdate} className="btn">Submit</button>
        </div>
      );
    };

    var row = (
        <div key={this.state.certification.id}>
          <div className="title">
            <h4>{formatted_date}</h4>
            <h5 className="status">{formatted_status}</h5>
            {submit}
          </div>
          <div className="body">
          <div className="certification form">the form</div>
          <ArtistPayments artist_payments={this.state.artist_payments} certification={this.state.certification} fee_categories={this.props.fee_categories}/>
          </div>
        </div>
      );
    return row;
  }
});