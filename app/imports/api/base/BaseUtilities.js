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

export function removeAllEntities() {
  Profiles.removeAll();
  Interests.removeAll();
<<<<<<< HEAD
<<<<<<< HEAD
  Abilities.removeAll();
  Styles.removeAll();
  Favorites.removeAll();
  PeopleInterested.removeAll();
=======
  Goals.removeAll();
>>>>>>> e8cc57a55f8337fba7e01bb20eac4715595afcb6
=======
>>>>>>> parent of e8cc57a... was able to get goals on the slider in beats page! OMG
}
