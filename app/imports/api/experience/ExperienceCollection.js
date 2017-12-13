import SimpleSchema from 'simpl-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Tracker } from 'meteor/tracker';

/** @module Experience */

/**
 * Represents a specific experience, such as "Software Engineering".
 * @extends module:Base~BaseCollection
 */
class ExperienceCollection extends BaseCollection {

  /**
   * Creates the Experience collection.
   */
  constructor() {
    super('Experience', new SimpleSchema({
      experienceName: { type: String },
      experienceDescription: { type: String, optional: true },
    }, { tracker: Tracker }));
  }

  /**
   * Defines a new Experience.
   * @example
   * Experiences.define({ experienceName: 'Band',
   *                    experienceDescription: 'Meeting up to create a band and do live performance' });
   * @param { Object } experienceDescription Object with keys experienceName and experienceDescription.
   * Name must be previously undefined. Description is optional.
   * Creates a "slug" for this experienceName and stores it in the slug field.
   * @throws {Meteor.Error} If the experience definition includes a defined experienceName.
   * @returns The newly created docID.
   */
  define({ experienceName, experienceDescription }) {
    check(experienceName, String);
    check(experienceDescription, String);
    if (this.find({ experienceName }).count() > 0) {
      throw new Meteor.Error(`${experienceName} is previously defined in another Experience`);
    }
    return this._collection.insert({ experienceName, experienceDescription });
  }

  /**
   * Returns the Experience experienceName corresponding to the passed experience docID.
   * @param experienceID An experience docID.
   * @returns { String } A experience experienceName.
   * @throws { Meteor.Error} If the experience docID cannot be found.
   */
  findName(experienceID) {
    this.assertDefined(experienceID);
    return this.findDoc(experienceID).experienceName;
  }

  /**
   * Returns a list of Experience names corresponding to the passed list of Experience docIDs.
   * @param experienceIDs A list of Experience docIDs.
   * @returns { Array }
   * @throws { Meteor.Error} If any of the instanceIDs cannot be found.
   */
  findNames(experienceIDs) {
    return experienceIDs.map(experienceID => this.findName(experienceID));
  }

  /**
   * Throws an error if the passed experienceName is not a defined Experience experienceName.
   * @param experienceName The experienceName of an experience.
   */
  assertName(experienceName) {
    this.findDoc(experienceName);
  }

  /**
   * Throws an error if the passed list of names are not all Experience names.
   * @param names An array of (hopefully) Experience names.
   */
  assertNames(names) {
    _.each(names, experienceName => this.assertName(experienceName));
  }

  /**
   * Returns the docID associated with the passed Experience experienceName, or throws an error if it cannot be found.
   * @param { String } experienceName An experience experienceName.
   * @returns { String } The docID associated with the experienceName.
   * @throws { Meteor.Error } If experienceName is not associated with an Experience.
   */
  findID(experienceName) {
    return (this.findDoc(experienceName)._id);
  }

  /**
   * Returns the docIDs associated with the array of Experience names, or throws an error if any experienceName cannot
   * be found.
   * If nothing is passed, then an empty array is returned.
   * @param { String[] } names An array of experience names.
   * @returns { String[] } The docIDs associated with the names.
   * @throws { Meteor.Error } If any instance is not a Experience experienceName.
   */
  findIDs(names) {
    return (names) ? names.map((instance) => this.findID(instance)) : [];
  }

  /**
   * Returns an object representing the Experience docID in a format acceptable to define().
   * @param docID The docID of a Experience.
   * @returns { Object } An object representing the definition of docID.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const experienceName = doc.experienceName;
    const experienceDescription = doc.experienceDescription;
    return { experienceName, experienceDescription };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Experiences = new ExperienceCollection();
