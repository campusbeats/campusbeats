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
      name: { type: String },
      description: { type: String, optional: true },
    }, { tracker: Tracker }));
  }

  /**
   * Defines a new Experience.
   * @example
   * Experiences.define({ name: 'Band',
   *                    description: 'Meeting up to create a band and do live performance' });
   * @param { Object } description Object with keys name and description.
   * Name must be previously undefined. Description is optional.
   * Creates a "slug" for this name and stores it in the slug field.
   * @throws {Meteor.Error} If the experience definition includes a defined name.
   * @returns The newly created docID.
   */
  define({ name, description }) {
    check(name, String);
    check(description, String);
    if (this.find({ name }).count() > 0) {
      throw new Meteor.Error(`${name} is previously defined in another Experience`);
    }
    return this._collection.insert({ name, description });
  }

  /**
   * Returns the Experience name corresponding to the passed experience docID.
   * @param experienceID An experience docID.
   * @returns { String } A experience name.
   * @throws { Meteor.Error} If the experience docID cannot be found.
   */
  findName(experienceID) {
    this.assertDefined(experienceID);
    return this.findDoc(experienceID).name;
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
   * Throws an error if the passed name is not a defined Experience name.
   * @param name The name of an experience.
   */
  assertName(name) {
    this.findDoc(name);
  }

  /**
   * Throws an error if the passed list of names are not all Experience names.
   * @param names An array of (hopefully) Experience names.
   */
  assertNames(names) {
    _.each(names, name => this.assertName(name));
  }

  /**
   * Returns the docID associated with the passed Experience name, or throws an error if it cannot be found.
   * @param { String } name An experience name.
   * @returns { String } The docID associated with the name.
   * @throws { Meteor.Error } If name is not associated with an Experience.
   */
  findID(name) {
    return (this.findDoc(name)._id);
  }

  /**
   * Returns the docIDs associated with the array of Experience names, or throws an error if any name cannot
   * be found.
   * If nothing is passed, then an empty array is returned.
   * @param { String[] } names An array of experience names.
   * @returns { String[] } The docIDs associated with the names.
   * @throws { Meteor.Error } If any instance is not a Experience name.
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
    const name = doc.name;
    const description = doc.description;
    return { name, description };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Experiences = new ExperienceCollection();
