import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Interests } from '/imports/api/interest/InterestCollection';
import { Goals } from '/imports/api/goal/GoalCollection';

export function removeAllEntities() {
  Profiles.removeAll();
  Interests.removeAll();
  Goals.removeAll();
}
