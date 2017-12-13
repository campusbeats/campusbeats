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
      styleName: { type: String },
      styleDescription: { type: String, optional: true },
    }, { tracker: Tracker }));
  }

  /**
   * Defines a new Style.
   * @example
   * Style.define({ styleName: 'Jazz',
   *                    styleDescription: 'Style of music defined by swing/blues, polyrhythms, and improvisation' });
   * @param { Object } styleDescription Object with keys styleName and styleDescription.
   * Name must be previously undefined. Description is optional.
   * Creates a "slug" for this styleName and stores it in the slug field.
   * @throws {Meteor.Error} If the interest definition includes a defined styleName.
   * @returns The newly created docID.
   */
  define({ styleName, styleDescription }) {
    check(styleName, String);
    check(styleDescription, String);
    if (this.find({ styleName }).count() > 0) {
      throw new Meteor.Error(`${styleName} is previously defined in another Style`);
    }
    return this._collection.insert({ styleName, styleDescription });
  }

  /**
   * Returns the Interest styleName corresponding to the passed style docID.
   * @param interestID An style docID.
   * @returns { String } An style styleName.
   * @throws { Meteor.Error} If the style docID cannot be found.
   */
  findName(styleID) {
    this.assertDefined(styleID);
    return this.findDoc(styleID).styleName;
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
   * Throws an error if the passed styleName is not a defined Style styleName.
   * @param styleName The styleName of an ability.
   */
  assertName(styleName) {
    this.findDoc(styleName);
  }

  /**
   * Throws an error if the passed list of names are not all Style names.
   * @param names An array of (hopefully) Style names.
   */
  assertNames(names) {
    _.each(names, styleName => this.assertName(styleName));
  }

  /**
   * Returns the docID associated with the passed Style styleName, or throws an error if it cannot be found.
   * @param { String } styleName An style styleName.
   * @returns { String } The docID associated with the styleName.
   * @throws { Meteor.Error } If styleName is not associated with an Style.
   */
  findID(styleName) {
    return (this.findDoc(styleName)._id);
  }

  /**
   * Returns the docIDs associated with the array of Style names, or throws an error if any styleName cannot be found.
   * If nothing is passed, then an empty array is returned.
   * @param { String[] } names An array of style names.
   * @returns { String[] } The docIDs associated with the names.
   * @throws { Meteor.Error } If any instance is not an Style styleName.
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
    const styleName = doc.styleName;
    const styleDescription = doc.styleDescription;
    return { styleName, styleDescription };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Styles = new StyleCollection();
