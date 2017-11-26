import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Interests } from '/imports/api/interest/InterestCollection';
import { Goals } from '/imports/api/goal/GoalCollection';


const selectedInterestsKey = 'selectedInterests';

Template.Beats_Page.onCreated(function onCreated() {
  this.subscribe(Interests.getPublicationName());
  this.subscribe(Profiles.getPublicationName());
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(selectedInterestsKey, undefined);
  this.context = Profiles.getSchema().namedContext('Beats_Page');
});

Template.Beats_Page.helpers({
  profiles() {
    // Initialize selectedInterests to all of them if messageFlags is undefined.
    if (!Template.instance().messageFlags.get(selectedInterestsKey)) {
      Template.instance().messageFlags.set(selectedInterestsKey, _.map(Interests.findAll(), interest => interest.name));
    }
    // Find all profiles with the currently selected interests.
    const allProfiles = Profiles.findAll();
    const selectedInterests = Template.instance().messageFlags.get(selectedInterestsKey);
    return _.filter(allProfiles, profile => _.intersection(profile.interests, selectedInterests).length > 0);
  },

  interests() {
    /*  return _.map(Interests.findAll(),
        function makeInterestObject(interest) {
          return {
            label: interest.name,
            selected: _.contains(Template.instance().messageFlags.get(selectedInterestsKey), interest.name),
          };
        }); */
    const profile = Profiles.findDoc(FlowRouter.getParam('username'));
    const selectedInterests = profile.interests;
    return profile && _.map(Interests.findAll(),
        function makeInterestObject(interest) {
          return { label: interest.name, selected: _.contains(selectedInterests, interest.name) };
        });
  },
});

Template.Beats_Page.events({
  'submit .filter-data-form'(event, instance) {
    event.preventDefault();
    const selectedOptions = _.filter(event.target.Interests.selectedOptions, (option) => option.selected);
    instance.messageFlags.set(selectedInterestsKey, _.map(selectedOptions, (option) => option.value));
  },
});
