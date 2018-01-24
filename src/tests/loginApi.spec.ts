import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';
import * as app from '../../app';
import { default as currentJobPostReducer } from '../reducers/currentJobReducer';
import { Job, User } from '../types';
import { employerKeys } from './jobApi.spec';

let should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

const url = 'http://localhost:4200';

describe('/api/login/', () => {

  it('should POST user credentials and return logged in user', (done) => {
    const userDetails = {
      email: 'testuser@gmail.com',
      password: '123',
    };
    const userKeys = [ 'id', 'firstName', 'lastName', 'email', 'employerId' ];

    chai.request(url)
      .post('/login')
      .send(userDetails)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        expect(res.body).to.have.all.keys([ 'user', 'employer', 'token' ]);
        expect(res.body.employer).to.have.all.keys(employerKeys);
        expect(res.body.user).to.have.all.keys(userKeys);
        expect(res.body.token).to.be.a('string');
        // TODO need to test user that does not have an employer saved
        // console.log(res.body);
        done();
      });

  });

  it('should POST with wrong credentials and return an error message', (done) => {
    const wrongCredentials = {
      email: 'nouserfound@gmail.com',
      password: '12345',
    };

    chai.request(url)
      .post('/login')
      .send(wrongCredentials)
      .end((err, res) => {
        res.should.have.status(500);
        expect(res.body).to.have.key('message');
        done();
      });

  });
});
