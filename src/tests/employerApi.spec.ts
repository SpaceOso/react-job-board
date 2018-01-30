import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';
import * as app from '../../app';
import { employerKeys } from './jobApi.spec';

const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

const url = 'http://localhost:4200';

describe('/employer/', () => {

  it('should POST a NEW JOB', (done) => {
    const jobDetails = {
      title: 'chai job',
      location:{
        city: 'palmdale',
        stae: 'CA',
        zip: '93550',
      },
      description: 'a chai test job',
      employer: '76d743f0-05a2-11e8-8a62-509a4c1c45f2',
    };
    const userKeys = ['id', 'firstName', 'lastName', 'email', 'employerId'];

    chai.request(app)
      .post('/createJob')
      .send(jobDetails)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        console.log(res.body);
        // expect(res.body).to.have.all.keys(['user', 'employer', 'token']);
        // expect(res.body.employer).to.have.all.keys(employerKeys);
        // expect(res.body.user).to.have.all.keys(userKeys);
        // expect(res.body.token).to.be.a('string');
        done();
      });

  });
});
