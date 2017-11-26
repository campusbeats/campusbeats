import { Template } from 'meteor/templating';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Favorites } from '/imports/api/favorites/FavoritesCollection';

Template.Directory_Page.onCreated(function onCreated() {
  this.subscribe(Profiles.getPublicationName());
  this.subscribe(Favorites.getPublicationName());
});

Template.Directory_Page.helpers({

  /**
   * Returns a cursor to profiles, sorted by last name.
   */
  profiles() {
    return Profiles.find({}, { sort: { lastName: 1 } });
  },
  favorites() {
    return Favorites.find({}, { sort: { lastName: 1 } });
  },
});
