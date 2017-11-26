import { Interests } from '/imports/api/interest/InterestCollection';
import { Profiles } from '/imports/api/profile/ProfileCollection';
<<<<<<< HEAD
import { Abilities } from '/imports/api/ability/AbilityCollection';
import { Styles } from '/imports/api/style/StyleCollection';

Interests.publish();
Profiles.publish();
Abilities.publish();
Styles.publish();
=======
import { Favorites } from '/imports/api/favorites/FavoritesCollection';
import { PeopleInterested } from '/imports/api/people-interested/PeopleInterestedCollection';

Interests.publish();
Profiles.publish();
Favorites.publish();
PeopleInterested.publish();
>>>>>>> refs/remotes/origin/master
