import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Interests } from '/imports/api/interest/InterestCollection';
import { Goals } from '/imports/api/goal/GoalCollection';
import { Experiences } from '/imports/api/experience/ExperienceCollection';

const selectedInterestsKey = 'selectedInterests';
const selectedGoalsKey = 'selectedGoals';
const selectedExperiencesKey = 'selectedExperiences';

Template.Beats_Page.onCreated(function onCreated() {
  this.subscribe(Interests.getPublicationName());
  this.subscribe(Profiles.getPublicationName());
  this.subscribe(Goals.getPublicationName());
  this.subscribe(Experiences.getPublicationName());
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(selectedInterestsKey, undefined);
  this.messageFlags.set(selectedGoalsKey, undefined);
  this.messageFlags.set(selectedExperiencesKey, undefined);
  this.context = Profiles.getSchema().namedContext('Beats_Page');
});

Template.Beats_Page.helpers({
  profiles() {
    // Initialize selectedInterests to all of them if messageFlags is undefined.
    if (!Template.instance().messageFlags.get(selectedGoalsKey)) {
      Template.instance().messageFlags.set(selectedGoalsKey, _.map(Interests.findAll(), goal => goal.name));
    }
    // Find all profiles with the currently selected interests.
    const allProfiles = Profiles.findAll();
    const selectedGoals = Template.instance().messageFlags.get(selectedGoalsKey);
    return _.filter(allProfiles, profile => _.intersection(profile.goals, selectedGoals).length > 0);
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
  goals() {
    /*  return _.map(Goals.findAll(),
        function makeGoalObject(goal) {
          return {
            label: goal.name,
            selected: _.contains(Template.instance().messageFlags.get(selectedGoalsKey), goal.name),
          };
        }); */
    const profile = Profiles.findDoc(FlowRouter.getParam('username'));
    const selectedGoals = profile.goals;
    return profile && _.map(Goals.findAll(),
        function makeGoalObject(goal) {
          return { label: goal.name, selected: _.contains(selectedGoals, goal.name) };
        });
  },
  experiences() {
    /*  return _.map(Goals.findAll(),
        function makeGoalObject(goal) {
          return {
            label: goal.name,
            selected: _.contains(Template.instance().messageFlags.get(selectedGoalsKey), goal.name),
          };
        }); */
    const profile = Profiles.findDoc(FlowRouter.getParam('username'));
    const selectedExperiences = profile.experiences;
    return profile && _.map(Experiences.findAll(),
        function makeExperienceObject(experience) {
          return { label: experience.name, selected: _.contains(selectedExperiences, experience.name) };
        });
  },
});

/* I feel like I might need to change this if I want to have it register the filtering. */
Template.Beats_Page.events({
  'submit .filter-data-form'(event, instance) {
    event.preventDefault();
    const selectedOptions = _.filter(event.target.Goals.selectedOptions, (option) => option.selected);
    instance.messageFlags.set(selectedGoalsKey, _.map(selectedOptions, (option) => option.value));
  },
});
