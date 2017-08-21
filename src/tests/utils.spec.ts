import {HelloRico} from '../utils/utils';
import {expect} from 'chai';
import 'mocha';

describe('Hello function', () => {
	it('should return Hello World', () => {
		const result = HelloRico();
		expect(result).to.equal('Hello Rico');
	});
});