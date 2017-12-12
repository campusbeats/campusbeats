import { Interests } from '/imports/api/interest/InterestCollection';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Abilities } from '/imports/api/ability/AbilityCollection';
import { Styles } from '/imports/api/style/StyleCollection';
import { Goals } from '/imports/api/goal/GoalCollection';
import { Experiences } from '/imports/api/experience/ExperienceCollection';
import { EventData } from '/imports/api/eventdata/eventdata.js';
import { Meteor } from 'meteor/meteor';
import { Favorites } from '/imports/api/favorites/FavoritesCollection';
import { PeopleInterested } from '/imports/api/people-interested/PeopleInterestedCollection';
import { Report } from '/imports/api/report/ReportCollection';


Interests.publish();
Profiles.publish();
Abilities.publish();
Styles.publish();
Goals.publish();
Experiences.publish();
Favorites.publish();
PeopleInterested.publish();

Meteor.publish('EventData', function publishStudentData() {
  return EventData.find();
});

Report.publish();

