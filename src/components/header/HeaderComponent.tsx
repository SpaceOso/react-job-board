import * as React from 'react';
import { Link } from 'react-router-dom';

// actions
import { User } from '../../types';

interface MyProps {
  user: User;
  logOutUser: () => {};
}

interface MyState {
  auth: boolean;
  loggedIn: boolean;
  mobile: boolean;
}

class HeaderComponent extends React.Component<MyProps, MyState> {
  state: MyState = {
    auth: false,
    loggedIn: false,
    mobile: false,
  };

  constructor(props) {
    super(props);

    this.logOut = this.logOut.bind(this);
    this.showLogOut = this.showLogOut.bind(this);
    this.displayMobileMenu = this.displayMobileMenu.bind(this);
    this.displayDashboardLink = this.displayDashboardLink.bind(this);
  }

  componentDidMount() {
    this.setState({
      mobile: window.innerWidth <= 540,
      loggedIn: this.props.user === null,
      auth: this.props.user.isAuth,
    });
    console.log(this.state);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('nextProps:', nextState);
    if (this.props.user.isAuth !== nextProps.user.isAuth) {
      return true;
    }

    if (this.state.mobile !== nextState.mobile) {
      return true;
    }

    return false;
  }

  displayMobileMenu(): JSX.Element {
    console.log('testing mobile');
    return (
      <div className="mobile-nav-menu-btn">
        <i className="fas fa-bars fa-2x" style={{ color: 'red' }}/>
      </div>
    );
  }

  logOut(): void {
    this.props.logOutUser();
  }

  showLogOut(): null | JSX.Element {
    const logOut = (
      <Link to={'/'} onClick={this.logOut}>
        <div className="nav-item">
          Log Out
        </div>
      </Link>
    );

    return this.props.user.isAuth === undefined || this.props.user.isAuth === false ? null : logOut;
  }

  /**
   * This will check if the user has an employer registered or not determine which route the nav menu should link to
   * @return {JSX.Element} - Link element to either /login - dashboard/home - dashboard/register
   */
  displayDashboardLink(): JSX.Element[] {
    const navButtons: JSX.Element[] = [];

    if (this.props.user === null || this.props.user.isAuth === false || this.props.user.isAuth === undefined) {
      navButtons.push(
        <Link to={'/login'} className="nav-item" key={'login-btn'}>
          Log In
        </Link>,
      );
    } else {
      const dashboardLink = `/user/dashboard/${this.props.user.id}`;

      const dashLink = this.props.user.employerId !== null ? dashboardLink + '/home' : dashboardLink + '/register';

      navButtons.push(
        <Link to={dashLink} className="nav-item" id={'dashboard-btn'} key={'dash-btn'}>
          Dashboard
        </Link>,
      );
      navButtons.push(
        <Link to={'/'} onClick={this.logOut} className="nav-item" key={'logout-btn'}>
          Log Out
        </Link>,
      );
    }

    return navButtons;
  }

  render() {
    console.log('header rendering:');
    return (
      <div className="header-component">
        <Link to="/">
          <div id="header-logo">
            <h1>Job Board</h1>
          </div>
        </Link>
        {this.state.mobile ? this.displayMobileMenu() : this.displayDashboardLink()}
      </div>
    );
  }
}

export default HeaderComponent;
