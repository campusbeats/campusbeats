import SimpleSchema from 'simpl-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Tracker } from 'meteor/tracker';

/** @module Interest2 */

/**
 * Represents a specific interest2, such as "Software Engineering".
 * @extends module:Base~BaseCollection
 */
class InterestCollection2 extends BaseCollection {

  /**
   * Creates the Interest2 collection.
   */
  constructor() {
    super('Interest2', new SimpleSchema({
      name: { type: String },
      description: { type: String, optional: true },
    }, { tracker: Tracker }));
  }

  /**
   * Defines a new Interest2.
   * @example
   * Interests2.define({ name: 'Software Engineering',
   *                    description: 'Methods for group development of large, high quality software systems' });
   * @param { Object } description Object with keys name and description.
   * Name must be previously undefined. Description is optional.
   * Creates a "slug" for this name and stores it in the slug field.
   * @throws {Meteor.Error} If the interest2 definition includes a defined name.
   * @returns The newly created docID.
   */
  define({ name, description }) {
    check(name, String);
    check(description, String);
    if (this.find({ name }).count() > 0) {
      throw new Meteor.Error(`${name} is previously defined in another Interest2`);
    }
    return this._collection.insert({ name, description });
  }

  /**
   * Returns the Interest2 name corresponding to the passed interest2 docID.
   * @param interest2ID An interest2 docID.
   * @returns { String } An interest2 name.
   * @throws { Meteor.Error} If the interest2 docID cannot be found.
   */
  findName(interest2ID) {
    this.assertDefined(interest2ID);
    return this.findDoc(interest2ID).name;
  }

  /**
   * Returns a list of Interest2 names corresponding to the passed list of Interest2 docIDs.
   * @param interest2IDs A list of Interest2 docIDs.
   * @returns { Array }
   * @throws { Meteor.Error} If any of the instanceIDs cannot be found.
   */
  findNames(interest2IDs) {
    return interest2IDs.map(interest2ID => this.findName(interest2ID));
  }

  /**
   * Throws an error if the passed name is not a defined Interest2 name.
   * @param name The name of an interest2.
   */
  assertName(name) {
    this.findDoc(name);
  }

  /**
   * Throws an error if the passed list of names are not all Interest2 names.
   * @param names An array of (hopefully) Interest2 names.
   */
  assertNames(names) {
    _.each(names, name => this.assertName(name));
  }

  /**
   * Returns the docID associated with the passed Interest2 name, or throws an error if it cannot be found.
   * @param { String } name An interest2 name.
   * @returns { String } The docID associated with the name.
   * @throws { Meteor.Error } If name is not associated with an Interest2.
   */
  findID(name) {
    return (this.findDoc(name)._id);
  }

  /**
   * Returns the docIDs associated with the array of Interest2 names, or throws an error if any name cannot be found.
   * If nothing is passed, then an empty array is returned.
   * @param { String[] } names An array of interest2 names.
   * @returns { String[] } The docIDs associated with the names.
   * @throws { Meteor.Error } If any instance is not an Interest2 name.
   */
  findIDs(names) {
    return (names) ? names.map((instance) => this.findID(instance)) : [];
  }

  /**
   * Returns an object representing the Interest2 docID in a format acceptable to define().
   * @param docID The docID of an Interest2.
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
export const Interests2 = new InterestCollection2();
