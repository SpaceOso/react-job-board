import * as React from 'react';
import { NavLink } from 'react-router-dom';
import images from '../../../../images/images';

// styles
import './UserDashboardNavMenu.scss';

interface MyProps {
  match;
}

class UserDashboardNavMenu extends React.Component<MyProps> {
  render() {
    return (
      <div className="user-dashboard-nav">
        <NavLink className="user-dashboard-btn" to={`${this.props.match.url}/home`} activeClassName={'selected'}>
          <img src={`${require(('../../../../images/icon/iconHome.svg'))}`}/>Home
        </NavLink>
        <NavLink className="user-dashboard-btn" activeClassName={'selected'} to={`${this.props.match.url}/applicants`}>
          <img src={`${require('../../../../images/icon/iconApplicantStack.svg')}`}/>Applicants
        </NavLink>
        <NavLink className="user-dashboard-btn" activeClassName={'selected'} to={`${this.props.match.url}/createjob`}>
          <img src={`${require('../../../../images/icon/iconJobPosts.svg')}`}/>Post A Job
        </NavLink>
        <NavLink className="user-dashboard-btn" activeClassName={'selected'} to={`${this.props.match.url}/editpostings`}>
          <img src={`${require('../../../../images/icon/iconEditPosts.svg')}`}/>Edit Postings
        </NavLink>
        <NavLink className="user-dashboard-btn" activeClassName={'selected'} to={`${this.props.match.url}/profile`}>
          <img src={`${require('../../../../images/icon/iconProfilePage.svg')}`}/>Profile / Edit
        </NavLink>
      </div>
    );
  }
}

export default UserDashboardNavMenu;
