
var Certifications = React.createClass({
  getInitialState() {
    return {
      certifications: this.props.certifications,
      certification: {
        fiscal_start: '',
        fiscal_end: '',
        status: 0
      },
      errors: {}
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
  handleAddCertification() {
    var that = this;
    $.ajax({
      method: 'POST',
      data: {
        certification: that.state.certification,
      },
      url: '/certifications.json',
      success: function(res) {
        var newCertificationList = that.state.certifications;
        newCertificationList.push(res);
        that.setState({
          certifications: newCertificationList,
          certification: {
            fiscal_start: '',
            fiscal_end: '',
            status: 0
          },
          errors: {}
        });
      },
      error: function(res) {
        that.setState({errors: res.responseJSON.errors})
      }
    });
  },

  handleDeleteCertification(certification) {
    var certificationList = this.state.certifications.filter(function(item) {
      return certification.id !== item.id;
    });
    this.setState({certifications: certificationList});
  },

  render() {
    var that = this;
    certifications = this.state.certifications.map( function(certification) {
      return (
        <Certification certification={certification} key={certification.id} onDeleteCertification={that.handleDeleteCertification} />
      );
    });
    return (
      <div>
        <div id="certifications">
          <table>
            <thead>
              <tr>
                <th>Fiscal Start</th>
                <th>Fiscal End</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {certifications}
              <tr>
                <td>
                  <input type="date" value={this.state.certification.name} onChange={this.handleFiscalStartChange} /><br />
                  <span style={{color: 'red'}}>{this.state.errors.name}</span>
                </td>
                <td>
                  <input value={this.state.certification.fiscal_end} type="date" onChange={this.handleFiscalEndChange} /><br />
                  <span style={{color: 'red'}}>{this.state.errors.fiscal_end}</span>
                </td>
                <td></td>
                <td><button onClick={this.handleAddCertification}>New</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
});