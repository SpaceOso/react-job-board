import {
  DONE_FETCHING,
  FETCHING_JOBS,
  FETCHING_SINGLE_JOB,
  FIND_JOB_BY_ID,
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

function currentJobPostReducer(state: CurrentJobPost, action): CurrentJobPost {
  switch (action.type) {

    case FIND_JOB_BY_ID:
      return {
        ...state,
        // employer: {...action.payload.data.employer},
        // currentJob: {...action.payload.data.job}
      };
    case RESET_CURRENT_JOB:
      return {
        ...state,
        // currentJob: undefined,
        // employer: undefined
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
      console.log('inside reducuer:', action.payload);
      return {
        ...state,
        ...action.payload.data.job,
        isFetching: false,
      };
    default:
      return {
        ...state,
      };
  }
}

export default currentJobPostReducer;
