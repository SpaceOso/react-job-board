import * as React from 'react';
import { Link } from 'react-router-dom';

// actions
import { User } from '../../types/index';

interface MyProps {
  user: User;
  logOutUser: () => {};
}

class HeaderComponent extends React.Component<MyProps, any> {
  constructor(props) {
    super(props);

    this.logOut = this.logOut.bind(this);
    this.showLogOut = this.showLogOut.bind(this);
    this.displayDashboardLink = this.displayDashboardLink.bind(this);
  }

  logOut() {
    this.props.logOutUser();
  }

  showLogOut() {
    const logOut = (
      <Link to={'/'} onClick={this.logOut}>
        <div className="nav-item">
          Log Out
        </div>
      </Link>
    );

    return this.props.user.isAuth === undefined || this.props.user.isAuth === false ? '' : logOut;
  }

  /**
   * This will check if the user has an employer registered or not determine which route the nav menu should link to
   * @return {JSX.Element} - Link element to either /login - dashboard/home - dashboard/register
   */
  displayDashboardLink(): JSX.Element {

    if (this.props.user === null || this.props.user.isAuth === false || this.props.user.isAuth === undefined) {
      return (
        <div>
          <Link to={'/register'}>
            <div className="nav-item">
              Sign Up
            </div>
          </Link>
          <Link to={'/login'}>
            <div className="nav-item">
              Log In
            </div>
          </Link>
        </div>
      );
    }

    const dashboardLink = `/user/dashboard/${this.props.user.id}`;

    const dashLink = this.props.user.employerId !== null ? dashboardLink + '/home' : dashboardLink + '/register';

    return (
      <Link to={dashLink}>
        <div className="nav-item">
          Dashboard
        </div>
      </Link>
    );
  }

  render() {
    return (
      <div className="header-component">
        <Link to="/">
          <div id="header-logo">
            <h1>Job Board</h1>
          </div>
        </Link>

        {this.displayDashboardLink()}

        {this.props.user !== null ? this.showLogOut() : null}

      </div>
    );
  }
}

export default HeaderComponent;
