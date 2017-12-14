/* eslint prefer-arrow-callback: "off", no-unused-expressions: "off" */
/* eslint-env mocha */

//  import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Abilities } from '/imports/api/ability/AbilityCollection';
import { Styles } from '/imports/api/style/StyleCollection';
import { Experiences } from '/imports/api/experience/ExperienceCollection';
import { Goals } from '/imports/api/goal/GoalCollection';
import { Report } from '/imports/api/report/ReportCollection';
import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import { removeAllEntities } from '/imports/api/base/BaseUtilities';

if (Meteor.isServer) {
  describe('ReportsCollection', function testSuite() {
    const abilityName = 'Guitar';
    const abilityDescription = 'Can play guitar';
    const experienceName = 'Guitar';
    const experienceDescription = 'Can play guitar';
    const goalName = 'Guitar';
    const goalDescription = 'Can play guitar';
    const styleName = 'Guitar';
    const styleDescription = 'Can play guitar';
    const firstName = 'John';
    const lastName = 'Smith';
    const username = 'jsmith';
    const bio = 'I am a student at UH Manoa and I like tacos';
    const picture = 'http://philipmjohnson.org/headshot.jpg';
    const phone = '555-1234';
    const email = 'jsmith@gmail.com';
    const abilities = [abilityName];
    const experiences = [experienceName];
    const goals = [goalName];
    const styles = [styleName];
    const youtube = 'http://github.com/philipjohnson';
    const spotify = 'http://github.com/philipjohnson';
    const soundcloud = 'http://github.com/philipjohnson';
    const defineObject = { firstName, lastName, username, bio, picture, phone, email, abilities, experiences,
      goals, styles, youtube, spotify, soundcloud };

    before(function setup() {
      removeAllEntities();
      // Define sample data.
      Abilities.define({ name: abilityName, description: abilityDescription });
      Experiences.define({ name: experienceName, description: experienceDescription });
      Goals.define({ name: goalName, description: goalDescription });
      Styles.define({ name: styleName, description: styleDescription });
    });

    after(function teardown() {
      removeAllEntities();
    });

    it('#define, #isDefined, #removeIt, #dumpOne, #restoreOne', function test() {
      let docID = Report.define(defineObject);
      expect(Report.isDefined(docID)).to.be.true;
      // Check that fields are available
      const doc = Report.findDoc(docID);
      expect(doc.firstName).to.equal(firstName);
      expect(doc.lastName).to.equal(lastName);
      expect(doc.username).to.equal(username);
      expect(doc.bio).to.equal(bio);
      expect(doc.picture).to.equal(picture);
      expect(doc.phone).to.equal(phone);
      expect(doc.email).to.equal(email);
      expect(doc.abilties[0]).to.equal(abilityName);
      expect(doc.experiences[0]).to.equal(experienceName);
      expect(doc.goals[0]).to.equal(goalName);
      expect(doc.styles[0]).to.equal(styleName);
      expect(doc.youtube).to.equal(youtube);
      expect(doc.spotify).to.equal(spotify);
      expect(doc.soundcloud).to.equal(soundcloud);

      // Check that multiple definitions with the same email address fail
      expect(function foo() { Report.define(defineObject); }).to.throw(Error);
      // Check that we can dump and restore a Report.
      const dumpObject = Report.dumpOne(docID);
      Report.removeIt(docID);
      expect(Report.isDefined(docID)).to.be.false;
      docID = Report.restoreOne(dumpObject);
      expect(Report.isDefined(docID)).to.be.true;
      Report.removeIt(docID);
    });

    it('#define (illegal ability)', function test() {
      const illegalAbilities = ['foo'];
      const legalExperiences = ['1-6 months'];
      const legalGoals = ['Band'];
      const legalStyles = ['Rock'];
      const defineObject2 = { firstName, lastName, username, bio, picture, phone, email, abilities: illegalAbilities,
        experiences: legalExperiences, goals: legalGoals, styles: legalStyles, youtube, spotify, soundcloud };
      expect(function foo() { Report.define(defineObject2); }).to.throw(Error);
    });

    it('#define (illegal experience)', function test() {
      const legalAbilities = ['Guitar'];
      const illegalExperiences = ['foo'];
      const legalGoals = ['Band'];
      const legalStyles = ['Rock'];
      const defineObject2 = { firstName, lastName, username, bio, picture, phone, email, abilities: legalAbilities,
        experiences: illegalExperiences, goals: legalGoals, styles: legalStyles, youtube, spotify, soundcloud };
      expect(function foo() { Report.define(defineObject2); }).to.throw(Error);
    });

    it('#define (illegal goal)', function test() {
      const legalAbilities = ['Guitar'];
      const legalExperiences = ['1-6 months'];
      const illegalGoals = ['foo'];
      const legalStyles = ['Rock'];
      const defineObject2 = { firstName, lastName, username, bio, picture, phone, email, abilities: legalAbilities,
        experiences: legalExperiences, goals: illegalGoals, styles: legalStyles, youtube, spotify, soundcloud };
      expect(function foo() { Report.define(defineObject2); }).to.throw(Error);
    });

    it('#define (illegal style)', function test() {
      const legalAbilities = ['Guitar'];
      const legalExperiences = ['1-6 months'];
      const legalGoals = ['Band'];
      const illegalStyles = ['foo'];
      const defineObject2 = { firstName, lastName, username, bio, picture, phone, email, abilities: legalAbilities,
        experiences: legalExperiences, goals: legalGoals, styles: illegalStyles, youtube, spotify, soundcloud };
      expect(function foo() { Report.define(defineObject2); }).to.throw(Error);
    });

    it('#define (duplicate abilities)', function test() {
      const duplicateAbilities = [abilityName, abilityName];
      const normalExperiences = ['1-6 months', '7-12 months'];
      const normalGoals = ['Learn', 'Band'];
      const normalStyles = ['Rock', 'Jazz'];
      const defineObject3 = { firstName, lastName, username, bio, picture, phone, email, abilities: duplicateAbilities,
        experiences: normalExperiences, goals: normalGoals, styles: normalStyles, youtube, spotify, soundcloud };
      expect(function foo() { Report.define(defineObject3); }).to.throw(Error);
    });

    it('#define (duplicate experiences)', function test() {
      const normalAbilities = ['Guitar', 'Bass'];
      const duplicateExperiences = [experienceName, experienceName];
      const normalGoals = ['Learn', 'Band'];
      const normalStyles = ['Rock', 'Jazz'];
      const defineObject3 = { firstName, lastName, username, bio, picture, phone, email, abilities: normalAbilities,
        experiences: duplicateExperiences, goals: normalGoals, styles: normalStyles, youtube, spotify, soundcloud };
      expect(function foo() { Report.define(defineObject3); }).to.throw(Error);
    });

    it('#define (duplicate goals)', function test() {
      const normalAbilities = ['Guitar', 'Bass'];
      const normalExperiences = ['1-6 months', '7-12 months'];
      const duplicateGoals = [goalName, goalName];
      const normalStyles = ['Rock', 'Jazz'];
      const defineObject3 = { firstName, lastName, username, bio, picture, phone, email, abilities: normalAbilities,
        experiences: normalExperiences, goals: duplicateGoals, styles: normalStyles, youtube, spotify, soundcloud };
      expect(function foo() { Report.define(defineObject3); }).to.throw(Error);
    });

    it('#define (duplicate abilities)', function test() {
      const normalAbilities = ['Guitar', 'Bass'];
      const normalExperiences = ['1-6 months', '7-12 months'];
      const normalGoals = ['Learn', 'Band'];
      const duplicateStyles = [styleName, styleName];
      const defineObject3 = { firstName, lastName, username, bio, picture, phone, email, abilities: normalAbilities,
        experiences: normalExperiences, goals: normalGoals, styles: duplicateStyles, youtube, spotify, soundcloud };
      expect(function foo() { Report.define(defineObject3); }).to.throw(Error);
    });
  });
}