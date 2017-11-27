import { Interests2 } from '/imports/api/interest2/InterestCollection2';
import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import { removeAllEntities } from '/imports/api/base/BaseUtilities';

/* eslint prefer-arrow-callback: "off", no-unused-expressions: "off" */
/* eslint-env mocha */

if (Meteor.isServer) {
  describe('InterestCollection2', function testSuite() {
    const name = 'Software Engineering';
    const description = 'Tools and techniques for team-based development of high quality software systems';
    const defineObject = { name, description };

    before(function setup() {
      removeAllEntities();
    });

    after(function teardown() {
      removeAllEntities();
    });

    it('#define, #isDefined, #removeIt, #dumpOne, #restoreOne', function test() {
      let docID = Interests2.define(defineObject);
      expect(Interests2.isDefined(docID)).to.be.true;
      // Check that fields are available
      const doc = Interests2.findDoc(docID);
      expect(doc.name).to.equal(name);
      expect(doc.description).to.equal(description);
      // Check that multiple definitions with the same name fail
      expect(function foo() { Interests2.define(defineObject); }).to.throw(Error);
      // Check that we can dump and restore a Interest2.
      const dumpObject = Interests2.dumpOne(docID);
      Interests2.removeIt(docID);
      expect(Interests2.isDefined(docID)).to.be.false;
      docID = Interests2.restoreOne(dumpObject);
      expect(Interests2.isDefined(docID)).to.be.true;
      Interests2.removeIt(docID);
    });

    it('#findID, #findIDs', function test() {
      const docID = Interests2.define(defineObject);
      expect(Interests2.isDefined(docID)).to.be.true;
      const docID2 = Interests2.findID(name);
      expect(docID).to.equal(docID2);
      Interests2.findIDs([name, name]);
      Interests2.removeIt(docID);
    });
  });
}

