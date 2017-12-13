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
      abilityName: { type: String },
      abilityDescription: { type: String, optional: true },
    }, { tracker: Tracker }));
  }

  /**
   * Defines a new Ability.
   * @example
   * Ability.define({ name: 'Composition',
   *                    abilityDescription: 'Methods for composing songs of ' });
   * @param { Object } abilityDescription Object with keys name and abilityDescription.
   * Name must be previously undefined. Description is optional.
   * Creates a "slug" for this name and stores it in the slug field.
   * @throws {Meteor.Error} If the interest definition includes a defined name.
   * @returns The newly created docID.
   */
  define({ abilityName, abilityDescription }) {
    check(abilityName, String);
    check(abilityDescription, String);
    if (this.find({ abilityName }).count() > 0) {
      throw new Meteor.Error(`${abilityName} is previously defined in another Ability`);
    }
    return this._collection.insert({ abilityName, abilityDescription });
  }

  /**
   * Returns the Interest abilityName corresponding to the passed ability docID.
   * @param interestID An ability docID.
   * @returns { String } An ability abilityName.
   * @throws { Meteor.Error} If the ability docID cannot be found.
   */
  findName(abilityID) {
    this.assertDefined(abilityID);
    return this.findDoc(abilityID).abilityName;
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
   * Throws an error if the passed abilityName is not a defined Ability abilityName.
   * @param abilityName The abilityName of an ability.
   */
  assertName(abilityName) {
    this.findDoc(abilityName);
  }

  /**
   * Throws an error if the passed list of names are not all Ability names.
   * @param names An array of (hopefully) Ability names.
   */
  assertNames(names) {
    _.each(names, abilityName => this.assertName(abilityName));
  }

  /**
   * Returns the docID associated with the passed Ability abilityName, or throws an error if it cannot be found.
   * @param { String } abilityName An ability abilityName.
   * @returns { String } The docID associated with the abilityName.
   * @throws { Meteor.Error } If abilityName is not associated with an Ability.
   */
  findID(abilityName) {
    return (this.findDoc(abilityName)._id);
  }

  /**
   * Returns the docIDs associated with the array of Ability names, or throws an error if any abilityName cannot be found.
   * If nothing is passed, then an empty array is returned.
   * @param { String[] } names An array of interest names.
   * @returns { String[] } The docIDs associated with the names.
   * @throws { Meteor.Error } If any instance is not an Ability abilityName.
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
    const abilityName = doc.abilityName;
    const abilityDescription = doc.abilityDescription;
    return { abilityName, abilityDescription };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Abilities = new AbilityCollection();
