import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Interests } from '/imports/api/interest/InterestCollection';
import { Favorites } from '/imports/api/favorites/FavoritesCollection';
import { PeopleInterested } from '/imports/api/people-interested/PeopleInterestedCollection';

export function removeAllEntities() {
  Profiles.removeAll();
  Interests.removeAll();
  Favorites.removeAll();
  PeopleInterested.removeAll();
}
