var STATES = [
  'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI',
  'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS',
  'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR',
  'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
]

var UserContact = React.createClass({
  getInitialState() {
    return {
      user: this.props.user,
      errors: {}
    }
  },
  handleRepNameChange(e) {
    var newUser = this.state.user
    newUser.rep_name = e.target.value
    this.setState({user: newUser});
  },
  handleRepTitleChange(e) {
    var newUser = this.state.user
    newUser.rep_title = e.target.value
    this.setState({user: newUser});
  },
  handleEmailChange(e) {
    var newUser = this.state.user
    newUser.email = e.target.value
    this.setState({user: newUser});
  },
  handlePhoneChange(e) {
    var newUser = this.state.user
    newUser.phone = e.target.value
    this.setState({user: newUser});
  },
  handleWebsiteChange(e) {
    var newUser = this.state.user
    newUser.website = e.target.value
    this.setState({user: newUser});
  },
  handleAd1Change(e) {
    var newUser = this.state.user
    newUser.address_st1 = e.target.value
    this.setState({user: newUser});
  },
  handleAd2Change(e) {
    var newUser = this.state.user
    newUser.address_st2 = e.target.value
    this.setState({user: newUser});
  },
  handleAdCityChange(e) {
    var newUser = this.state.user
    newUser.address_city = e.target.value
    this.setState({user: newUser});
  },
  handleAdStateChange(e) {
    var newUser = this.state.user
    newUser.address_state = e.target.value
    this.setState({user: newUser});
  },
  handleAdZipChange(e) {
    var newUser = this.state.user
    newUser.address_zip = e.target.value
    this.setState({user: newUser});
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
  contactForm() {
    var contactForm =
    <div className="form">
      <div className="field-group">
        <h4 className="col-xs-3">Your Name</h4>
        <div className="col-xs-9">
          <input
            type="text"
            placeholder="First Last"
            name="rep_name"
            className="form-control"
            value={this.state.user.rep_name}
            onChange={this.handleRepNameChange} />
          <span style={{color: 'red'}}>{this.state.errors.rep_name}</span>
        </div>
      </div>
      <div className="field-group">
        <h4 className="col-xs-3">Your Title</h4>
        <div className="col-xs-9">
          <input
            type="text"
            placeholder="Development Director"
            name="rep_title"
            className="form-control"
            value={this.state.user.rep_title}
            onChange={this.handleRepTitleChange} />
          <span style={{color: 'red'}}>{this.state.errors.rep_name}</span>
        </div>
      </div>
      <div className="field-group">
      <h4 className="col-xs-3">Email</h4>
      <div className="col-xs-9">
          <input
            type="email"
            placeholder="email"
            name="email"
            className="form-control"
            value={this.state.user.email}
            onChange={this.handleEmailChange} />
          <span style={{color: 'red'}}>{this.state.errors.email}</span>
        </div>
      </div>
      <div className="field-group">
        <h4 className="col-xs-3">Phone</h4>
        <div className="col-xs-9">
          <input
            type="phone"
            placeholder="phone"
            name="phone"
            className="form-control"
            value={this.state.user.phone}
            onChange={this.handlePhoneChange} />
          <span style={{color: 'red'}}>{this.state.errors.phone}</span>
        </div>
      </div>
      <div className="field-group">
        <h4 className="col-xs-3">Website</h4>
        <div className="col-xs-9">
          <input
            type="url"
            placeholder="http://example.org"
            name="website"
            className="form-control"
            value={this.state.user.website}
            onChange={this.handleWebsiteChange} />
          <span style={{color: 'red'}}>{this.state.errors.website}</span>
        </div>
      </div>
    </div>;
    return contactForm
  },
  addressForm() {
    var options = STATES.map(function(value, i) {
      return <option key={i} value={value}>{value}</option>
    });
    var addressForm = <div key="contact">
      <div className="form">
        <h4 className="col-xs-12">Mailing Address</h4>
        <div className="field-group">
          <div className="col-sm-8">
            <input
              type="text"
              placeholder="Street Address"
              name="address_st1"
              className="form-control"
              value={this.state.user.address_st1}
              onChange={this.handleAd1Change} />
            <span style={{color: 'red'}}>{this.state.errors.address_st1}</span>
          </div>
          <div className="col-sm-4">
            <input
              type="text"
              name="address_st2"
              placeholder="APT/Floor"
              className="form-control"
              value={this.state.user.address_st2}
              onChange={this.handleAd2Change} />
            <span style={{color: 'red'}}>{this.state.errors.address_st2}</span>
          </div>
        </div>
        <div className="field-group">
          <div className="col-sm-6">
            <input
              type="text"
              name="address_city"
              placeholder="City"
              className="form-control"
              value={this.state.user.address_city}
              onChange={this.handleCityChange} />
            <span style={{color: 'red'}}>{this.state.errors.address_city}</span>
          </div>
          <div className="col-sm-2">
            <select
              className="form-control"
              name="address_state"
              value={this.state.user.address_state}
              onChange={this.handleAdStateChange} >
              {options}
            </select>
          </div>
          <div className="col-sm-4">
            <input
              type="text"
              name="address_zip"
              placeholder="Zip"
              className="form-control"
              value={this.state.user.address_zip}
              onChange={this.handleAdZipChange} />
            <span style={{color: 'red'}}>{this.state.errors.address_zip}</span>
          </div>
        </div>
      </div>
    </div>;
    return addressForm;
  },
  render() {
    var displayStreet = <span>{this.state.user.address_st2 ? ", " + this.state.user.address_st2 : ""}</span>;
    return (
      <div className="contact  col-xs-12 col-sm-9 col-md-7">
        <h2><span>1. Contact Information</span></h2>
        {this.contactForm()}
        {this.addressForm()}
        <div className="actions rep">
          <button className="btn btn-lg" onClick={this.handleUserUpdate}>Save</button>
        </div>
      </div>
    );
  }
});

    //

    //
    // var markup = <div id="contact" className="edit">
    //       <div className="rep">
    //         <div className="header">
    //           <h4>Account Administrator</h4>
    //         </div>
    //         {contact_form}
    //       </div>
    //       <div className="address">
    //         <div className="header">
    //           <h4>Mailing Address</h4>
    //         </div>
    //
    //       </div>

    //     </div>;