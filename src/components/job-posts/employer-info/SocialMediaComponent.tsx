import * as React from 'react';
import { Employer } from '../../../types';
import { LOCAL_URL } from '../../../utils/utils';

interface MyProps {
  // TODO need to pass employer to get correct links
  employer: Employer;
}

function socialMediaComponent(props: MyProps) {

  let website: JSX.Element | null = null;
  let faceBook: JSX.Element | null = null;
  let twitter: JSX.Element | null = null;
  let linkedIn: JSX.Element | null = null;

  if (props.employer.website !== undefined) {
    website = (
      <li>
        <a href={`${props.employer.facebook}`} target="blank">
          <img src={`${LOCAL_URL}${require('../../../../images/icon-web.svg')}`}/>
        </a>
      </li>
    );
  }

  if (props.employer.facebook !== undefined) {
    faceBook = (
      <li>
        <a href={`${props.employer.facebook}`} target="blank">
          <img src={`${LOCAL_URL}${require('../../../../images/icon-facebook.svg')}`}/>
        </a>
      </li>
    );
  }

  if (props.employer.twitter !== undefined) {
    twitter = (
      <li>
        <a href={`${props.employer.twitter}`} target="blank">
          <img src={`${LOCAL_URL}${require('../../../../images/icon-twitter.svg')}`}/>
        </a>
      </li>
    );
  }

  if (props.employer.linkedIn !== undefined) {
    linkedIn = (
      <li>
        <a href={`${props.employer.linkedIn}`} target="blank">
          <img src={`${LOCAL_URL}${require('../../../../images/icon-linkedin.svg')}`}/>
        </a>
      </li>
    );
  }

  return (
    <div className="info-container panel-shadow">
      <ul className="social-lists">
        {website}
        {faceBook}
        {twitter}
        {linkedIn}
      </ul>
    </div>
  );
}

export default socialMediaComponent;
