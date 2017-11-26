import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Interests } from '/imports/api/interest/InterestCollection';
<<<<<<< HEAD
import { Abilities } from '/imports/api/ability/AbilityCollection';
import { Styles } from '/imports/api/style/StyleCollection';
=======
import { Favorites } from '/imports/api/favorites/FavoritesCollection';
import { PeopleInterested } from '/imports/api/people-interested/PeopleInterestedCollection';
>>>>>>> refs/remotes/origin/master

export function removeAllEntities() {
  Profiles.removeAll();
  Interests.removeAll();
<<<<<<< HEAD
  Abilities.removeAll();
  Styles.removeAll();
=======
  Favorites.removeAll();
  PeopleInterested.removeAll();
>>>>>>> refs/remotes/origin/master
}
