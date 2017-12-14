import { Styles } from '/imports/api/style/StyleCollection';
import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import { removeAllEntities } from '/imports/api/base/BaseUtilities';

/* eslint prefer-arrow-callback: "off", no-unused-expressions: "off" */
/* eslint-env mocha */

if (Meteor.isServer) {
  describe('StyleCollection', function testSuite() {
    const name = 'Rock';
    const description = 'Heavy, riff-based style';
    const defineObject = { name, description };

    before(function setup() {
      removeAllEntities();
    });

    after(function teardown() {
      removeAllEntities();
    });

    it('#define, #isDefined, #removeIt, #dumpOne, #restoreOne', function test() {
      let docID = Styles.define(defineObject);
      expect(Styles.isDefined(docID)).to.be.true;
      // Check that fields are available
      const doc = Styles.findDoc(docID);
      expect(doc.name).to.equal(name);
      expect(doc.description).to.equal(description);
      // Check that multiple definitions with the same name fail
      expect(function foo() { Styles.define(defineObject); }).to.throw(Error);
      // Check that we can dump and restore a Style.
      const dumpObject = Styles.dumpOne(docID);
      Styles.removeIt(docID);
      expect(Styles.isDefined(docID)).to.be.false;
      docID = Styles.restoreOne(dumpObject);
      expect(Styles.isDefined(docID)).to.be.true;
      Styles.removeIt(docID);
    });

    it('#findID, #findIDs', function test() {
      const docID = Styles.define(defineObject);
      expect(Styles.isDefined(docID)).to.be.true;
      const docID2 = Styles.findID(name);
      expect(docID).to.equal(docID2);
      Styles.findIDs([name, name]);
      Styles.removeIt(docID);
    });
  });
}

