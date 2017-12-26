import { expect } from 'chai';
import 'mocha';
import { default as currentJobPostReducer } from '../reducers/currentJobReducer';
import { Job } from '../types';

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

const mockJob: Job = {
  createdAt: '12/12/12',
  description: 'Mock Test Job',
  Employer: {
    facebook: 'facebook.com',
    id: '1234345',
    linkedIn: 'linked.com',
    location: {
      address: '602 mock street',
      city: 'New York',
      state: 'mock state',
      zip: '123456',
    },
    logoImg: null,
    name: 'mock employer',
    twitter: 'twitter.com',
    website: 'www.mock.com',
  },
  employerId: 'employer1234',
  id: '1234556',
  location: {
    address: '6092 job mock street',
    city: 'mock city job',
    state: 'mock state',
    zip: '1234556',
  },
  title: 'mock job title yo',
};

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

  it('should return with a job that matches our mockJob', () => {
    const data: object = {
      job: mockJob,
    };
    expect(jobReducer(emptyJobPost, { type: 'SINGLE_JOB_SUCCESS', payload: data }));
  });

});
