import SimpleSchema from 'simpl-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Tracker } from 'meteor/tracker';

/** @module Style */

/**
 * Represents a specific style, such as "Punk" or "Jazz".
 * @extends module:Base~BaseCollection
 */
class StyleCollection extends BaseCollection {

  /**
   * Creates the Style collection.
   */
  constructor() {
    super('Style', new SimpleSchema({
      name: { type: String },
      description: { type: String, optional: true },
    }, { tracker: Tracker }));
  }

  /**
   * Defines a new Style.
   * @example
   * Style.define({ name: 'Jazz',
   *                    description: 'Style of music defined by swing/blues, polyrhythms, and improvisation' });
   * @param { Object } description Object with keys name and description.
   * Name must be previously undefined. Description is optional.
   * Creates a "slug" for this name and stores it in the slug field.
   * @throws {Meteor.Error} If the interest definition includes a defined name.
   * @returns The newly created docID.
   */
  define({ name, description }) {
    check(name, String);
    check(description, String);
    if (this.find({ name }).count() > 0) {
      throw new Meteor.Error(`${name} is previously defined in another Style`);
    }
    return this._collection.insert({ name, description });
  }

  /**
   * Returns the Interest name corresponding to the passed style docID.
   * @param interestID An style docID.
   * @returns { String } An style name.
   * @throws { Meteor.Error} If the style docID cannot be found.
   */
  findName(styleID) {
    this.assertDefined(styleID);
    return this.findDoc(styleID).name;
  }

  /**
   * Returns a list of Ability names corresponding to the passed list of Style docIDs.
   * @param interestIDs A list of Style docIDs.
   * @returns { Array }
   * @throws { Meteor.Error} If any of the instanceIDs cannot be found.
   */
  findNames(styleIDs) {
    return styleIDs.map(styleID => this.findName(styleID));
  }

  /**
   * Throws an error if the passed name is not a defined Style name.
   * @param name The name of an ability.
   */
  assertName(name) {
    this.findDoc(name);
  }

  /**
   * Throws an error if the passed list of names are not all Style names.
   * @param names An array of (hopefully) Style names.
   */
  assertNames(names) {
    _.each(names, name => this.assertName(name));
  }

  /**
   * Returns the docID associated with the passed Style name, or throws an error if it cannot be found.
   * @param { String } name An style name.
   * @returns { String } The docID associated with the name.
   * @throws { Meteor.Error } If name is not associated with an Style.
   */
  findID(name) {
    return (this.findDoc(name)._id);
  }

  /**
   * Returns the docIDs associated with the array of Style names, or throws an error if any name cannot be found.
   * If nothing is passed, then an empty array is returned.
   * @param { String[] } names An array of style names.
   * @returns { String[] } The docIDs associated with the names.
   * @throws { Meteor.Error } If any instance is not an Style name.
   */
  findIDs(names) {
    return (names) ? names.map((instance) => this.findID(instance)) : [];
  }

  /**
   * Returns an object representing the Style docID in a format acceptable to define().
   * @param docID The docID of an Style.
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
export const Styles = new StyleCollection();
