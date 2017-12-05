import {
  FETCHING_THIS_EMPLOYER_JOBS,
  GET_THIS_EMPLOYER_JOBS_SUCCESS,
  REGISTER_EMPLOYER_SUCCESS,
} from '../actions/employerDashboardActions';

import {
  LOG_OUT_EMPLOYER,
  SET_EMPLOYER,
} from '../actions/authActions';

import { EDITING_JOB_POST_SUCCESS, EMPLOYER_FETCHING, EMPLOYER_IDLE } from '../actions/index';
import { Employer } from '../types/index';

const defaultState: Employer = {
  id: '',
  name: '',
  location: {
    address: '',
    city: '',
    state: '',
    zip: '0',
  },
  logoImg: '',
  website: '',
  twitter: '',
  facebook: '',
  linkedin: '',
  jobs: null,
  isFetching: false,
};

// this deals with with the employer property of the state
function employerReducer(state = defaultState, action): any {

  switch (action.type) {
    case FETCHING_THIS_EMPLOYER_JOBS:
      return state;
    case GET_THIS_EMPLOYER_JOBS_SUCCESS:
      return {
        ...state,
        jobs: [...action.payload.data],
      };
    case EDITING_JOB_POST_SUCCESS:
      let newArr;
      if (state.jobs !== null) {
        console.log('state.jobs was not null');
        newArr = state.jobs.slice();
        newArr.push(action.payload);
      } else {
        console.log('state.jobs WAS null');
        newArr = [];
        newArr.push(action.payload);
      }

      console.log('newArr:', newArr);

      return {
        ...state,
        jobs: [...newArr],
        isFetching: false,
      };
    case EMPLOYER_FETCHING:
      return {
        ...state,
        isFetching: true,
      };
    case EMPLOYER_IDLE:
      return {
        ...state,
        isFetching: false,
      };
    case REGISTER_EMPLOYER_SUCCESS:
      // will set employer after we register in the compRegisterComponent
      return state;
    case LOG_OUT_EMPLOYER:
      return {
        ...defaultState,
      };
    case SET_EMPLOYER:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return {
        ...state,
      };
  }
}

export default employerReducer;
