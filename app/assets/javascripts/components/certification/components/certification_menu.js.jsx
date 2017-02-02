var CertificationMenu = React.createClass({
  getInitialState() {
    return {
      navPosition: this.props.navPosition || 0,
      root: this.props.path
    }
  },
  navigateMenu(e) {
    e.preventDefault()
    var item = $(e.target).closest('.certification-menu__item').data('id')
    this.props.navigateMenu(item)
    this.setState({navPosition: item})
  },
  isActiveItem(i) {
    if ((this.props.navPosition && this.props.navPosition == i) || (this.props.navPosition == 0 && i == 0)) {
      return true
    }
  },
  hasCheck(item) {
    if (item != 'guidelines' && item != 'fee-schedule') {
      return <i className="fa fa-check" />
    } else {
      return false
    }
  },
  getItemProgress(item) {
    var progress = this.props.getProgress
    if (this.hasCheck(item)) {
      if (item == 'contact') {
        return progress.hasContact
      } else if (item == 'fiscal-details') {
        return progress.hasFiscalDetails
      } else if (item == 'fee-tracker') {
        return progress.hasPayments
      } else if (item == 'supplemental-materials') {
        return progress.hasMaterials
      } else if (item == 'review') {
        return progress.canSubmit
      }
    }
  },
  printMenuItems() {
    var that = this
    var menu = this.props.menu.map(function(item, i) {
    var formattedItem = item.replace('-', ' ')
      return (
          <a className="certification-menu__item"
            href={that.props.path + '/#' + item}
            name={item}
            data-id={i}
            key={i}
            data-active={that.isActiveItem(i)}
            data-progress={that.getItemProgress(item)}
            onClick={that.navigateMenu}>
            {that.hasCheck(item)}
            {formattedItem}
          </a>
        );
      })
    return menu
  },
  title() {
    var title
    if (this.props.new_user) {
      title = "Get Certified"
    } else {
      title = "FY " + moment(this.props.certification.fiscal_end).format('Y')
    }
     return title
  },
  render() {
    return (
      <div className="certification-menu">
        <div className='certification-menu__title'>{this.title()}</div>
        {this.printMenuItems()}
        <div className="is-saved"><i className="fa fa-check"></i><span>Saved</span></div>
      </div>
    );
  }
});