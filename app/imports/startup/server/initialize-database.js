import { Meteor } from 'meteor/meteor';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Interests } from '/imports/api/interest/InterestCollection';
<<<<<<< HEAD
<<<<<<< HEAD
import { Abilities } from '/imports/api/ability/AbilityCollection';
import { Styles } from '/imports/api/style/StyleCollection';
import { Favorites } from '/imports/api/favorites/FavoritesCollection';
import { PeopleInterested } from '/imports/api/people-interested/PeopleInterestedCollection';
=======
import { Goals } from '/imports/api/goal/GoalCollection';
>>>>>>> e8cc57a55f8337fba7e01bb20eac4715595afcb6
=======
>>>>>>> parent of e8cc57a... was able to get goals on the slider in beats page! OMG
import { _ } from 'meteor/underscore';

/* global Assets */

/* eslint-disable no-console */

/**
 * Returns the definition array associated with collectionName in the restoreJSON structure.
 * @param restoreJSON The restore file contents.
 * @param collection The collection of interest.
 */
function getDefinitions(restoreJSON, collection) {
  return _.find(restoreJSON.collections, obj => obj.name === collection).contents;
}

/**
 * Given a collection and the restoreJSON structure, looks up the definitions and invokes define() on them.
 * @param collection The collection to be restored.
 * @param restoreJSON The structure containing all of the definitions.
 */
function restoreCollection(collection, restoreJSON) {
  const definitions = getDefinitions(restoreJSON, collection._collectionName);
  console.log(`Defining ${definitions.length} ${collection._collectionName} documents.`);
  _.each(definitions, definition => collection.define(definition));
}

Meteor.startup(() => {
  /** Only initialize database if it's empty. */
<<<<<<< HEAD
<<<<<<< HEAD
  const collectionList = [Abilities, Interests, Styles, Profiles, Favorites, PeopleInterested];
=======
  const collectionList = [Interests, Goals, Profiles];
>>>>>>> e8cc57a55f8337fba7e01bb20eac4715595afcb6
=======
  const collectionList = [Interests, Profiles];
>>>>>>> parent of e8cc57a... was able to get goals on the slider in beats page! OMG
  const totalDocuments = _.reduce(collectionList, function reducer(memo, collection) {
    return memo + collection.count();
  }, 0);
  if (totalDocuments === 0) {
    const fileName = Meteor.settings.public.initialDatabaseFileName;
    console.log(`Restoring database from file ${fileName}.`);
    const restoreJSON = JSON.parse(Assets.getText(fileName));
    _.each(collectionList, collection => {
      restoreCollection(collection, restoreJSON);
    });
  }
});
