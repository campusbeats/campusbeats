import { Interests } from '/imports/api/interest/InterestCollection';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Goals } from '/imports/api/goal/GoalCollection';

Interests.publish();
Profiles.publish();
Goals.publish();

