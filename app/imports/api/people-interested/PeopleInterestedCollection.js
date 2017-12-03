import SimpleSchema from 'simpl-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { Interests } from '/imports/api/interest/InterestCollection';
import { Abilities } from '/imports/api/ability/AbilityCollection';
import { Styles } from '/imports/api/style/StyleCollection';
import { Goals } from '/imports/api/goal/GoalCollection';
import { Experiences } from '/imports/api/experience/ExperienceCollection';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Tracker } from 'meteor/tracker';

/** @module PeopleInterested */

/**
 * Favorites provide profile portfolio data of favorites for a user.
 * @extends module:Base~BaseCollection
 */
class PeopleInterestedCollection extends BaseCollection {

  /**
   * Creates the Favorites collection.
   */
  constructor() {
    super('PeopleInterested', new SimpleSchema({
      username: { type: String },
      // Remainder are optional
      firstName: { type: String, optional: true },
      lastName: { type: String, optional: true },
      bio: { type: String, optional: true },
      interests: { type: Array, optional: true },
      'interests.$': { type: String },
      abilities: { type: Array, optional: true },
      'abilities.$': { type: String },
      styles: { type: Array, optional: true },
      'styles.$': { type: String },
      goals: { type: Array, optional: true },
      'goals.$': { type: String },
      experiences: { type: Array, optional: true },
      'experiences.$': { type: String },
      title: { type: String, optional: true },
      picture: { type: SimpleSchema.RegEx.Url, optional: true },
    }, { tracker: Tracker }));
  }

  /**
   * Defines a new PeopleInterested.
   * @example
   * Favorites.define({ firstName: 'Philip',
   *                   lastName: 'Johnson',
   *                   username: 'johnson',
   *                   bio: 'I have been a professor of computer science at UH since 1990.',
   *                   interests: ['Application Development', 'Software Engineering', 'Databases'],
   *                   title: 'Professor of Information and Computer Sciences',
   *                   picture: 'http://philipmjohnson.org/headshot.jpg',
   * @param { Object } description Object with required key username.
   * Remaining keys are optional.
   * Username must be unique for all users. It should be the UH email account.
   * Interests is an array of defined interest names.
   * @throws { Meteor.Error } If a user with the supplied username already exists, or
   * if one or more interests are not defined, or if github, facebook, and instagram are not URLs.
   * @returns The newly created docID.
   */
  define({
           firstName = '', lastName = '', username, bio = '', interests = [], abilities = [], styles = [],
           goals = [], experiences = [], picture = '', title = '',
         }) {
    // make sure required fields are OK.
    const checkPattern = {
      firstName: String,
      lastName: String,
      username: String,
      bio: String,
      picture: String,
      title: String,
    };
    check({ firstName, lastName, username, bio, picture, title }, checkPattern);

    if (this.find({ username }).count() > 0) {
      throw new Meteor.Error(`${username} is previously defined in another Profile`);
    }

    // Throw an error if any of the passed Interest names are not defined.
    Interests.assertNames(interests);
    Abilities.assertNames(abilities);
    Styles.assertNames(styles);
    Goals.assertNames(goals);
    Experiences.assertNames(experiences);

    // Throw an error if there are duplicates in the passed interest names.
    if (interests.length !== _.uniq(interests).length) {
      throw new Meteor.Error(`${interests} contains duplicates`);
    }
    if (abilities.length !== _.uniq(abilities).length) {
      throw new Meteor.Error(`${abilities} contains duplicates`);
    }
    if (styles.length !== _.uniq(styles).length) {
      throw new Meteor.Error(`${styles} contains duplicates`);
    }
    if (goals.length !== _.uniq(goals).length) {
      throw new Meteor.Error(`${goals} contains duplicates`);
    }
    if (experiences.length !== _.uniq(experiences).length) {
      throw new Meteor.Error(`${experiences} contains duplicates`);
    }

    return this._collection.insert({
      firstName, lastName, username, bio, interests, abilities, styles, goals, experiences, picture, title,
    });
  }

  /**
   * Returns an object representing the Profile docID in a format acceptable to define().
   * @param docID The docID of a Profile.
   * @returns { Object } An object representing the definition of docID.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const firstName = doc.firstName;
    const lastName = doc.lastName;
    const username = doc.username;
    const bio = doc.bio;
    const interests = doc.interests;
    const abilities = doc.abilities;
    const styles = doc.styles;
    const goals = doc.goals;
    const experiences = doc.experiences;
    const picture = doc.picture;
    const title = doc.title;
    return { firstName, lastName, username, bio, interests, abilities, styles, goals, experiences, picture, title };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const PeopleInterested = new PeopleInterestedCollection();
