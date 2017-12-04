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
      phone: { type: String, optional: true },
      email: { type: String, optional: true },
      bio: { type: String, optional: true },
      abilities: { type: Array, optional: true },
      'abilities.$': { type: String },
      styles: { type: Array, optional: true },
      'styles.$': { type: String },
      experiences: { type: Array, optional: true },
      'experiences.$': { type: String },
      goals: { type: Array, optional: true },
      'goals.$': { type: String },
      picture: { type: SimpleSchema.RegEx.Url, optional: true },
      soundcloud: { type: SimpleSchema.RegEx.Url, optional: true },
      youtube: { type: SimpleSchema.RegEx.Url, optional: true },
      spotify: { type: SimpleSchema.RegEx.Url, optional: true },
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
  define({ firstName = '', lastName = '', username, bio = '', phone = '', email = '', abilities = [],
           styles = [], experiences = [], goals = [], picture = '', soundcloud = '', youtube = '', spotify = '' }) {
    // make sure required fields are OK.
    const checkPattern = { firstName: String, lastName: String, username: String, bio: String, phone: String,
      email: String, picture: String };
    check({ firstName, lastName, username, bio, phone, email, picture }, checkPattern);

    if (this.find({ username }).count() > 0) {
      throw new Meteor.Error(`${username} is previously defined in another Profile`);
    }

    // Throw an error if any of the passed names are not defined.
    Abilities.assertNames(abilities);
    Styles.assertNames(styles);
    Experiences.assertNames(experiences);
    Goals.assertNames(goals);
    // Throw an error if there are duplicates in the passed names.
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
    return this._collection.insert({ firstName, lastName, username, bio, phone, email, abilities, styles,
      experiences, goals, picture, soundcloud, youtube, spotify });
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
    const phone = doc.phone;
    const email = doc.email;
    const abilities = doc.abilities;
    const styles = doc.styles;
    const experiences = doc.experiences;
    const goals = doc.goals;
    const picture = doc.picture;
    const soundcloud = doc.soundcloud;
    const youtube = doc.youtube;
    const spotify = doc.spotify;
    return { firstName, lastName, username, bio, phone, email, abilities, styles, picture,
      experiences, goals, soundcloud, youtube, spotify };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const PeopleInterested = new PeopleInterestedCollection();
