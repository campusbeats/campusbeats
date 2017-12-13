import SimpleSchema from 'simpl-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Tracker } from 'meteor/tracker';

/** @module Goal */

/**
 * Represents a specific goal, such as "Software Engineering".
 * @extends module:Base~BaseCollection
 */
class GoalCollection extends BaseCollection {

  /**
   * Creates the Goal collection.
   */
  constructor() {
    super('Goal', new SimpleSchema({
      goalName: { type: String },
      goalDescription: { type: String, optional: true },
    }, { tracker: Tracker }));
  }

  /**
   * Defines a new Goal.
   * @example
   * Goals.define({ goalName: 'Band',
   *                    goalDescription: 'Meeting up to create a band and do live performance' });
   * @param { Object } goalDescription Object with keys goalName and goalDescription.
   * Name must be previously undefined. Description is optional.
   * Creates a "slug" for this goalName and stores it in the slug field.
   * @throws {Meteor.Error} If the goal definition includes a defined goalName.
   * @returns The newly created docID.
   */
  define({ goalName, goalDescription }) {
    check(goalName, String);
    check(goalDescription, String);
    if (this.find({ goalName }).count() > 0) {
      throw new Meteor.Error(`${goalName} is previously defined in another Goal`);
    }
    return this._collection.insert({ goalName, goalDescription });
  }

  /**
   * Returns the Goal goalName corresponding to the passed goal docID.
   * @param goalID An goal docID.
   * @returns { String } A goal goalName.
   * @throws { Meteor.Error} If the goal docID cannot be found.
   */
  findName(goalID) {
    this.assertDefined(goalID);
    return this.findDoc(goalID).goalName;
  }

  /**
   * Returns a list of Goal names corresponding to the passed list of Goal docIDs.
   * @param goalIDs A list of Goal docIDs.
   * @returns { Array }
   * @throws { Meteor.Error} If any of the instanceIDs cannot be found.
   */
  findNames(goalIDs) {
    return goalIDs.map(goalID => this.findName(goalID));
  }

  /**
   * Throws an error if the passed goalName is not a defined Goal goalName.
   * @param goalName The goalName of an goal.
   */
  assertName(goalName) {
    this.findDoc(goalName);
  }

  /**
   * Throws an error if the passed list of names are not all Goal names.
   * @param names An array of (hopefully) Goal names.
   */
  assertNames(names) {
    _.each(names, goalName => this.assertName(goalName));
  }

  /**
   * Returns the docID associated with the passed Goal goalName, or throws an error if it cannot be found.
   * @param { String } goalName An goal goalName.
   * @returns { String } The docID associated with the goalName.
   * @throws { Meteor.Error } If goalName is not associated with an Goal.
   */
  findID(goalName) {
    return (this.findDoc(goalName)._id);
  }

  /**
   * Returns the docIDs associated with the array of Goal names, or throws an error if any goalName cannot be found.
   * If nothing is passed, then an empty array is returned.
   * @param { String[] } names An array of goal names.
   * @returns { String[] } The docIDs associated with the names.
   * @throws { Meteor.Error } If any instance is not a Goal goalName.
   */
  findIDs(names) {
    return (names) ? names.map((instance) => this.findID(instance)) : [];
  }

  /**
   * Returns an object representing the Goal docID in a format acceptable to define().
   * @param docID The docID of a Goal.
   * @returns { Object } An object representing the definition of docID.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const goalName = doc.goalName;
    const goalDescription = doc.goalDescription;
    return { goalName, goalDescription };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Goals = new GoalCollection();
