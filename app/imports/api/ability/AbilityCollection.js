import SimpleSchema from 'simpl-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Tracker } from 'meteor/tracker';

/** @module Ability */

/**
 * Represents a specific ability, such as "Guitar" or "Composition".
 * @extends module:Base~BaseCollection
 */
class AbilityCollection extends BaseCollection {

  /**
   * Creates the Ability collection.
   */
  constructor() {
    super('Ability', new SimpleSchema({
      name: { type: String },
      description: { type: String, optional: true },
    }, { tracker: Tracker }));
  }

  /**
   * Defines a new Ability.
   * @example
   * Ability.define({ name: 'Composition',
   *                    description: 'Methods for composing songs of ' });
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
      throw new Meteor.Error(`${name} is previously defined in another Ability`);
    }
    return this._collection.insert({ name, description });
  }

  /**
   * Returns the Interest name corresponding to the passed ability docID.
   * @param interestID An ability docID.
   * @returns { String } An ability name.
   * @throws { Meteor.Error} If the ability docID cannot be found.
   */
  findName(abilityID) {
    this.assertDefined(abilityID);
    return this.findDoc(abilityID).name;
  }

  /**
   * Returns a list of Ability names corresponding to the passed list of Ability docIDs.
   * @param interestIDs A list of Ability docIDs.
   * @returns { Array }
   * @throws { Meteor.Error} If any of the instanceIDs cannot be found.
   */
  findNames(abilityIDs) {
    return abilityIDs.map(abilityID => this.findName(abilityID));
  }

  /**
   * Throws an error if the passed name is not a defined Ability name.
   * @param name The name of an ability.
   */
  assertName(name) {
    this.findDoc(name);
  }

  /**
   * Throws an error if the passed list of names are not all Ability names.
   * @param names An array of (hopefully) Ability names.
   */
  assertNames(names) {
    _.each(names, name => this.assertName(name));
  }

  /**
   * Returns the docID associated with the passed Ability name, or throws an error if it cannot be found.
   * @param { String } name An ability name.
   * @returns { String } The docID associated with the name.
   * @throws { Meteor.Error } If name is not associated with an Ability.
   */
  findID(name) {
    return (this.findDoc(name)._id);
  }

  /**
   * Returns the docIDs associated with the array of Ability names, or throws an error if any name cannot be found.
   * If nothing is passed, then an empty array is returned.
   * @param { String[] } names An array of interest names.
   * @returns { String[] } The docIDs associated with the names.
   * @throws { Meteor.Error } If any instance is not an Ability name.
   */
  findIDs(names) {
    return (names) ? names.map((instance) => this.findID(instance)) : [];
  }

  /**
   * Returns an object representing the Ability docID in a format acceptable to define().
   * @param docID The docID of an Ability.
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
export const Abilities = new AbilityCollection();
