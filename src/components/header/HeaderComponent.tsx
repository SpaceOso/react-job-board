import * as React from 'react';
import { Link } from 'react-router-dom';

// actions
import { User } from '../../types';
import SideMenu from '../side-menu/SideMenu';
import ModalComponent from '../modal/ModalComponent';
import Slide from '../animations/Slide';

interface MyProps {
  user: User;
  logOutUser: () => {};
}

interface MyState {
  auth: boolean;
  loggedIn: boolean;
  mobile: boolean;
  menuOpen: boolean;
}

class HeaderComponent extends React.Component<MyProps, MyState> {
  state: MyState = {
    auth: false,
    loggedIn: false,
    mobile: false,
    menuOpen: false,
  };

  constructor(props) {
    super(props);

    this.logOut = this.logOut.bind(this);
    this.displayMobileMenuButton = this.displayMobileMenuButton.bind(this);
    this.displayDashboardLink = this.displayDashboardLink.bind(this);
    this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
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

    if (this.state.menuOpen !== nextState.menuOpen) {
      nextState.menuOpen ? document.body.classList.add('noScroll') : document.body.classList.remove('noScroll');
      return true;
    }

    return false;
  }

  toggleMobileMenu() {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  displayMobileMenuButton(): JSX.Element {
    console.log('testing mobile');
    return (
      <div className="mobile-nav-menu-btn" onClick={this.toggleMobileMenu}>
        <i className="fas fa-bars fa-2x" style={{ color: 'red' }}/>
      </div>
    );
  }

  logOut(): void {
    this.props.logOutUser();
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
    const thisEl = document.getElementById('header');
    console.log('header rendering:');
    return (
      <div className="header-component" id={'header'}>
        <Link to="/">
          <div id="header-logo">
            <h1>Job Board</h1>
          </div>
        </Link>
        {this.state.mobile ? this.displayMobileMenuButton() : this.displayDashboardLink()}

        <Slide key={'mobile-nav-menu'} in={this.state.menuOpen} unmountOnExit={true} mountOnEnter={true}>
          <ModalComponent el={thisEl} key={'mobile-nav-menu'}>
            <SideMenu links={this.displayDashboardLink()} handleClick={this.toggleMobileMenu}/>
          </ModalComponent>
        </Slide>
      </div>
    );
  }
}

export default HeaderComponent;
