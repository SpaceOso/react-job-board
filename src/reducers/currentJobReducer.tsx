import {
  DONE_FETCHING,
  FETCHING_SINGLE_JOB,
  RESET_CURRENT_JOB,
  SINGLE_JOB_SUCCESS,
} from '../actions/jobActions';
import { CurrentJobPost } from '../types/index';

const thisState: CurrentJobPost = {
  id: '',
  title: '',
  description: '',
  employerId: '',
  isFetching: false,
  createdAt: '',
  location: {
    address: '',
    city: '',
    state: '',
    zip: '',
  },
  Employer: {
    id: '',
    name: '',
    location: {
      address: '',
      city: '',
      state: '',
      zip: '',
    },
    linkedIn: null,
    facebook: null,
    logoImg: null,
    twitter: null,
    website: null,
  },
};

function currentJobPostReducer(state = thisState, action) {
  switch (action.type) {
    case RESET_CURRENT_JOB:
      return {
        ...thisState,
      };
    case DONE_FETCHING: {
      return {
        ...state,
        isFetching: false,
      };
    }
    case FETCHING_SINGLE_JOB:
      return {
        ...state,
        isFetching: true,
      };
    case SINGLE_JOB_SUCCESS:
      return {
        ...state,
        ...action.payload.data.job,
        isFetching: false,
      };
    default:
      return state;
  }
}

export default currentJobPostReducer;
