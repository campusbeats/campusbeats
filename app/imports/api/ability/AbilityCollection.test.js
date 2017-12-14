import { Abilities } from '/imports/api/ability/AbilityCollection';
import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import { removeAllEntities } from '/imports/api/base/BaseUtilities';

/* eslint prefer-arrow-callback: "off", no-unused-expressions: "off" */
/* eslint-env mocha */

if (Meteor.isServer) {
  describe('AbilityCollection', function testSuite() {
    const name = 'Guitar';
    const description = 'Can play guitar';
    const defineObject = { name, description };

    before(function setup() {
      removeAllEntities();
    });

    after(function teardown() {
      removeAllEntities();
    });

    it('#define, #isDefined, #removeIt, #dumpOne, #restoreOne', function test() {
      let docID = Abilities.define(defineObject);
      expect(Abilities.isDefined(docID)).to.be.true;
      // Check that fields are available
      const doc = Abilities.findDoc(docID);
      expect(doc.name).to.equal(name);
      expect(doc.description).to.equal(description);
      // Check that multiple definitions with the same name fail
      expect(function foo() { Abilities.define(defineObject); }).to.throw(Error);
      // Check that we can dump and restore a Ability.
      const dumpObject = Abilities.dumpOne(docID);
      Abilities.removeIt(docID);
      expect(Abilities.isDefined(docID)).to.be.false;
      docID = Abilities.restoreOne(dumpObject);
      expect(Abilities.isDefined(docID)).to.be.true;
      Abilities.removeIt(docID);
    });

    it('#findID, #findIDs', function test() {
      const docID = Abilities.define(defineObject);
      expect(Abilities.isDefined(docID)).to.be.true;
      const docID2 = Abilities.findID(name);
      expect(docID).to.equal(docID2);
      Abilities.findIDs([name, name]);
      Abilities.removeIt(docID);
    });
  });
}