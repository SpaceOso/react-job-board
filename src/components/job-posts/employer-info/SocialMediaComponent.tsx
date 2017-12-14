import * as React from 'react';
import { Employer } from '../../../types';
import { LOCAL_URL } from '../../../utils/utils';

interface MyProps {
  // TODO need to pass employer to get correct links
  employer?: Employer;
}

function socialMediaComponent(props: MyProps) {
  return (
    <div className="info-container panel-shadow">
      <ul className="social-lists">
        <li>
          <a href={`https://www.facebook.com/`} target="blank">
            <img src={`${LOCAL_URL}${require('../../../assets/images/icon-facebook.svg')}`}/>
          </a>
        </li>
        <li>
          <a href={`https://www.twitter.com/`} target="blank">
            <img src={`${LOCAL_URL}${require('../../../assets/images/icon-twitter.svg')}`}/>
          </a>
        </li>
        <li>
          <a href={`https://www.linkedin.com/`} target="blank">
            <img src={`${LOCAL_URL}${require('../../../assets/images/icon-linkedin.svg')}`}/>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default socialMediaComponent;
