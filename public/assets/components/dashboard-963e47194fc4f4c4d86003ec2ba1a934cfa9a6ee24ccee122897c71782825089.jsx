var Dashboard = React.createClass({
  getInitialState() {
    return {
      certifications: this.props.certifications,
      fee_categories: this.props.fee_categories,
      user: this.props.user,
      errors: {}
    }
  },
  componentDidMount() {
    $('.navbar-fixed-top').css('border-bottom', '2px solid')
    $('.dashboard .collapse .collapse__title').click(function(e) {
      $('.container').removeClass('active')
      var active = $(e.target).closest('.collapse').addClass('active')
      $('.container:not(.active)').find('.collapse__content').slideUp()
      $('.container').find('.collapse__title .fa').addClass('fa-plus').removeClass('fa-minus')
      if ($(active).find('.collapse__content').css('display') == 'block') {
        $(active).find('.collapse__content').slideUp()
        $(active).find('.collapse__title .fa').addClass('fa-plus').removeClass('fa-minus')
        $(active).removeClass('active')
      } else {
        $(active).find('.collapse__content').slideDown()
        $(active).find('.collapse__title .fa').removeClass('fa-plus').addClass('fa-minus')
      }
    })
  },
handleUserUpdate(user) {
    var that = this;
    $.ajax({
      method: 'PATCH',
      data: {
        user: user,
      },
      url: '/users' + '.json',
      success: function(res) {
        that.setState({
          errors: {}
        })
      },
      error: function(res) {
        that.setState({
          errors: res.responseJSON.errors
        });
      }
    });
  },
  render() {
    return (
      <div className="dashboard">
        <div id="certifications" className="container collapse open">
          <div className="collapse__title">
            <h1><div className='title'><span>Certifications</span><i className='fa fa-plus'></i></div></h1>
          </div>
          <div className="collapse__content">
            <h4 className="th"><span>Fiscal Year</span><span>Application Status</span><span>Last Updated</span></h4>
            <Certifications
              certifications={this.state.certifications}
              user={this.state.user} />
          </div>
        </div>

        <div id="fee-schedule" className="container collapse">
          <div className="collapse__title">
            <h1><div className='title'><span>My Fee Schedule</span><i className='fa fa-plus'></i></div></h1>
          </div>
          <div className="collapse__content">
            <FeeSchedule
              fee_categories={this.props.fee_categories}
              floor_categories={this.props.fee_categories}
              user={this.state.user}
              certification={this.state.certifications[0]}/>
          </div>
        </div>

        <div id="fee-tracker" className="container collapse">
          <div className="collapse__title">
            <h1><div className='title'><span>Fee Tracker</span><i className='fa fa-plus'></i></div></h1>
          </div>
          <div className="collapse__content">
            <FeeTracker
              fee_categories={this.props.fee_categories}
              floor_categories={this.props.fee_categories}
              user={this.state.user}
              certification={this.state.certifications[0]}/>
          </div>
        </div>

        <div id="account" className="container collapse">
          <div className="collapse__title">
            <h1><div className='title'><span>Account Info</span><i className='fa fa-plus'></i></div></h1>
          </div>
          <div className="collapse__content">
            <UserContact
              user={this.props.user}
              errors={this.state.errors}
              handleUserUpdate={this.handleUserUpdate} />
            <a className='btn btn-lg admin-settings' href='/users/edit'><i className='fa fa-gear'></i> Settings</a>
          </div>
        </div>

      </div>
    );
  }
});
