/* eslint prefer-arrow-callback: "off", no-unused-expressions: "off" */
/* eslint-env mocha */

//  import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Interests } from '/imports/api/interest/InterestCollection';
import { Frownies } from '/imports/api/frownies/FrowniesCollection';
import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import { removeAllEntities } from '/imports/api/base/BaseUtilities';

if (Meteor.isServer) {
  describe('FrownieCollection', function testSuite() {
    const interestName = 'Software Engineering';
    const interestDescription = 'Tools for software development';
    const firstName = 'Philip';
    const lastName = 'Johnson';
    const username = 'johnson';
    const bio = 'I have been a professor of computer science at UH since 1990.';
    const picture = 'http://philipmjohnson.org/headshot.jpg';
    const title = 'Professor Computer Science';
    const defineObject = { firstName, lastName, username, bio, picture, title };

    before(function setup() {
      removeAllEntities();
      // Define a sample interest.
      Interests.define({ name: interestName, description: interestDescription });
    });

    after(function teardown() {
      removeAllEntities();
    });

    it('#define, #isDefined, #removeIt, #dumpOne, #restoreOne', function test() {
      let docID = Frownies.define(defineObject);
      expect(Frownies.isDefined(docID)).to.be.true;
      // Check that fields are available
      const doc = Frownies.findDoc(docID);
      expect(doc.firstName).to.equal(firstName);
      expect(doc.lastName).to.equal(lastName);
      expect(doc.username).to.equal(username);
      expect(doc.bio).to.equal(bio);
      expect(doc.interests[0]).to.equal(interestName);
      expect(doc.picture).to.equal(picture);
      expect(doc.title).to.equal(title);
      // Check that multiple definitions with the same email address fail
      expect(function foo() { Frownies.define(defineObject); }).to.throw(Error);
      // Check that we can dump and restore a Frownies.
      const dumpObject = Frownies.dumpOne(docID);
      Frownies.removeIt(docID);
      expect(Frownies.isDefined(docID)).to.be.false;
      docID = Frownies.restoreOne(dumpObject);
      expect(Frownies.isDefined(docID)).to.be.true;
      Frownies.removeIt(docID);
    });

    it('#define (illegal interest)', function test() {
      const illegalInterests = ['foo'];
      const defineObject2 = { firstName, lastName, username, bio, picture, title };
      expect(function foo() { Frownies.define(defineObject2); }).to.throw(Error);
    });

    it('#define (duplicate interests)', function test() {
      const duplicateInterests = [interestName, interestName];
      const defineObject3 = { firstName, lastName, username, bio, picture, title  };
      expect(function foo() { Frownies.define(defineObject3); }).to.throw(Error);
    });
  });
}

