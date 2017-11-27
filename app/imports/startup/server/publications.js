import { Interests } from '/imports/api/interest/InterestCollection';
import { Profiles } from '/imports/api/profile/ProfileCollection';
<<<<<<< HEAD
import { Abilities } from '/imports/api/ability/AbilityCollection';
import { Styles } from '/imports/api/style/StyleCollection';
import { Favorites } from '/imports/api/favorites/FavoritesCollection';
import { PeopleInterested } from '/imports/api/people-interested/PeopleInterestedCollection';

Interests.publish();
Profiles.publish();
Abilities.publish();
Styles.publish();
Favorites.publish();
PeopleInterested.publish();
=======
import { Goals } from '/imports/api/goal/GoalCollection';
import { Experiences } from '/imports/api/experience/ExperienceCollection';

Interests.publish();
Profiles.publish();
Goals.publish();
Experiences.publish();

>>>>>>> issue-20e
