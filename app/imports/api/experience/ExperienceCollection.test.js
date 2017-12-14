import { Experiences } from '/imports/api/experience/ExperienceCollection';
import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import { removeAllEntities } from '/imports/api/base/BaseUtilities';

/* eslint prefer-arrow-callback: "off", no-unused-expressions: "off" */
/* eslint-env mocha */

if (Meteor.isServer) {
  describe('ExperienceCollection', function testSuite() {
    const name = '1-6 months';
    const description = 'Just starting out';
    const defineObject = { name, description };

    before(function setup() {
      removeAllEntities();
    });

    after(function teardown() {
      removeAllEntities();
    });

    it('#define, #isDefined, #removeIt, #dumpOne, #restoreOne', function test() {
      let docID = Experiences.define(defineObject);
      expect(Experiences.isDefined(docID)).to.be.true;
      // Check that fields are available
      const doc = Experiences.findDoc(docID);
      expect(doc.name).to.equal(name);
      expect(doc.description).to.equal(description);
      // Check that multiple definitions with the same name fail
      expect(function foo() { Experiences.define(defineObject); }).to.throw(Error);
      // Check that we can dump and restore a Experience.
      const dumpObject = Experiences.dumpOne(docID);
      Experiences.removeIt(docID);
      expect(Experiences.isDefined(docID)).to.be.false;
      docID = Experiences.restoreOne(dumpObject);
      expect(Experiences.isDefined(docID)).to.be.true;
      Experiences.removeIt(docID);
    });

    it('#findID, #findIDs', function test() {
      const docID = Experiences.define(defineObject);
      expect(Experiences.isDefined(docID)).to.be.true;
      const docID2 = Experiences.findID(name);
      expect(docID).to.equal(docID2);
      Experiences.findIDs([name, name]);
      Experiences.removeIt(docID);
    });
  });
}

