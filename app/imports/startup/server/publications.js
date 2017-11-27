import { Interests } from '/imports/api/interest/InterestCollection';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Goals } from '/imports/api/goal/GoalCollection';
import { Experiences } from '/imports/api/experience/ExperienceCollection';

Interests.publish();
Profiles.publish();
Goals.publish();
Experiences.publish();

