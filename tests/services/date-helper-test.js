const expect = require('chai').expect;
const sinon = require('sinon');
const DateHelper = require('../../services/date-helper')

describe('DateHelper', function() {

  beforeEach(function() {})

  afterEach(() => {
    sinon.restore();
  })

  it('when the month is 1 digit, should padding month digits with 0', function() {
    sinon.useFakeTimers(new Date(2023,3,12));
    expect(DateHelper.getDateString()).to.equal('20230412');
  })

  it('when the day is 1 digit, should padding day digits with 0', function() {
    sinon.useFakeTimers(new Date(2023,11,5));
    expect(DateHelper.getDateString()).to.equal('20231205');
  })

})
