import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Interests } from '/imports/api/interest/InterestCollection';
import { Abilities } from '/imports/api/ability/AbilityCollection';
import { Styles } from '/imports/api/style/StyleCollection';
import { Goals } from '/imports/api/goal/GoalCollection';
import { Experiences } from '/imports/api/experience/ExperienceCollection';
import { Favorites } from '/imports/api/favorites/FavoritesCollection';
import { PeopleInterested } from '/imports/api/people-interested/PeopleInterestedCollection';
import { Report } from '/imports/api/report/ReportCollection';

export function removeAllEntities() {
  Profiles.removeAll();
  Interests.removeAll();
  Abilities.removeAll();
  Styles.removeAll();
  Goals.removeAll();
  Experiences.removeAll();
  Favorites.removeAll();
  PeopleInterested.removeAll();
  Report.removeAll();
}
