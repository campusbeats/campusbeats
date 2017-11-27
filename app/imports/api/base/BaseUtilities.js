import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Interests } from '/imports/api/interest/InterestCollection';
import { Goals } from '/imports/api/goal/GoalCollection';
import { Interests2 } from '/imports/api/interest2/InterestCollection2';


export function removeAllEntities() {
  Profiles.removeAll();
  Interests.removeAll();
  Goals.removeAll();
  Interests2.removeAll();
}
