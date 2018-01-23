import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';
import * as app from '../../app';
import { default as currentJobPostReducer } from '../reducers/currentJobReducer';
import { Job } from '../types';
let should = chai.should();

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

chai.use(chaiHttp);

describe('CurrentJobPostReducer', () => {
  it('should get all the jobs', (done) => {
    console.log('inside the test');
    chai.request('http://localhost:4200')
      .get('/api/jobposts/')
      .end((err, res) => {
        console.log("we have a ressponse");
        res.should.have.status(200);
        res.should.be.a('array');
        done();
      });
  });

})
;
