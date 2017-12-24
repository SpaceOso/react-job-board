import { expect } from 'chai';
import 'mocha';
import { default as currentJobPostReducer } from '../reducers/currentJobReducer';

const emptyJobPost = {
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
const jobReducer = currentJobPostReducer;

describe('CurrentJobPostReducer', () => {
  it('should return an empty CurrentJobPost', () => {
    expect(jobReducer(undefined, {})).eql(emptyJobPost);
  });

  it('should return with isFetching true', () => {
    expect(jobReducer(emptyJobPost, { type: 'FETCHING_SINGLE_JOB' })).eql({ ...emptyJobPost, isFetching: true });
  });

  it('should return with isFetching false', () => {
    expect(jobReducer(emptyJobPost, { type: 'DONE_FETCHING' })).eql({ ...emptyJobPost, isFetching: false });
  });


});
