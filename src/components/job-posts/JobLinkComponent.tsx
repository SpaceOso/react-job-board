import * as React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  to: string;
  onClick: (jobId) => void;
  jobTitle: string | null;
  jobID: string | null;
}

class JobLinkComponent extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick(this.props.jobID);
  }

  render() {
    return (
      <Link
        to={this.props.to}
        onClick={this.handleClick}
      >
        <li>{this.props.jobTitle}</li>
      </Link>
    );
  }
}

export default JobLinkComponent;
