import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Interests } from '/imports/api/interest/InterestCollection';
import { Goals } from '/imports/api/goal/GoalCollection';
import { Abilities } from '/imports/api/ability/AbilityCollection';
import { Styles } from '/imports/api/style/StyleCollection';
import { Experiences } from '/imports/api/experience/ExperienceCollection';
import { Favorites } from '/imports/api/favorites/FavoritesCollection';

const selectedInterestsKey = 'selectedInterests';
const selectedGoalsKey = 'selectedGoals';
const selectedExperiencesKey = 'selectedExperiences';
const selectedAbilitiesKey = 'selectedAbilities';
const selectedStylesKey = 'selectedStyles';

Template.Beats_Page.onCreated(function onCreated() {
  this.subscribe(Interests.getPublicationName());
  this.subscribe(Profiles.getPublicationName());
  this.subscribe(Favorites.getPublicationName());
  this.subscribe(Goals.getPublicationName());
  this.subscribe(Experiences.getPublicationName());
  this.subscribe(Abilities.getPublicationName());
  this.subscribe(Styles.getPublicationName());
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(selectedInterestsKey, undefined);
  this.messageFlags.set(selectedGoalsKey, undefined);
  this.messageFlags.set(selectedExperiencesKey, undefined);
  this.messageFlags.set(selectedAbilitiesKey, undefined);
  this.messageFlags.set(selectedStylesKey, undefined);
  //  this.context = Profiles.getSchema().namedContext('Beats_Page');
  //  this.context = Favorites.getSchema().namedContext('Beats_Page');
});

Template.Beats_Page.helpers({
  profiles() {
    // Initialize selectedAbilities to all of them if messageFlags is undefined.
    /* if (!Template.instance().messageFlags.get(selectedAbilitiesKey)) {
      Template.instance().messageFlags.set(selectedAbilitiesKey, _.map(Abilities.findAll(), ability => ability.name));
    }
    // Find all profiles with the currently selected interests.
    const allProfiles = Profiles.findAll();
    const selectedAbilities = Template.instance().messageFlags.get(selectedAbilitiesKey);
    return _.filter(allProfiles, profile => _.intersection(profile.abilities, selectedAbilities).length > 0); */
    // Initialize selectedAbilities to all of them if messageFlags is undefined.
    if (!Template.instance().messageFlags.get(selectedAbilitiesKey) &&
        !Template.instance().messageFlags.get(selectedStylesKey) &&
        !Template.instance().messageFlags.get(selectedGoalsKey) &&
        !Template.instance().messageFlags.get(selectedExperiencesKey)) {
      Template.instance().messageFlags.set(selectedAbilitiesKey, _.map(Abilities.findAll(), ability => ability.name));
      Template.instance().messageFlags.set(selectedStylesKey, _.map(Styles.findAll(), style => style.name));
      Template.instance().messageFlags.set(selectedGoalsKey, _.map(Goals.findAll(), goal => goal.name));
      Template.instance().messageFlags.set(selectedExperiencesKey, _.map(Experiences.findAll(), exp => exp.name));
    }
    // Find all profiles with the currently selected interests.
    let allProf = Profiles.findAll();
    const selectedAbilities = Template.instance().messageFlags.get(selectedAbilitiesKey);
    const selectedGoals = Template.instance().messageFlags.get(selectedGoalsKey);
    const selectedStyles = Template.instance().messageFlags.get(selectedStylesKey);
    const selectedExperiences = Template.instance().messageFlags.get(selectedExperiencesKey);
    allProf = _.filter(allProf, profile => _.intersection(profile.abilities, selectedAbilities).length > 0);
    allProf = _.filter(allProf, profile => _.intersection(profile.goals, selectedGoals).length > 0);
    allProf = _.filter(allProf, profile => _.intersection(profile.styles, selectedStyles).length > 0);
    allProf = _.filter(allProf, profile => _.intersection(profile.experiences, selectedExperiences).length > 0);
    return allProf;
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
  abilities() {
    /*  return _.map(Goals.findAll(),
        function makeGoalObject(goal) {
          return {
            label: goal.name,
            selected: _.contains(Template.instance().messageFlags.get(selectedGoalsKey), goal.name),
          };
        }); */
    const profile = Profiles.findDoc(FlowRouter.getParam('username'));
    const selectedAbilities = profile.abilities;
    return profile && _.map(Abilities.findAll(),
        function makeAbilityObject(ability) {
          return { label: ability.name, selected: _.contains(selectedAbilities, ability.name) };
        });
    /* const favorite = Favorites.findDoc(FlowRouter.getParam('username'));
    const selectedAbilities = favorite.abilities;
    return favorite && _.map(Abilities.findAll(),
        function makeAbilityObject(ability) {
          return { label: ability.name, selected: _.contains(selectedAbilities, ability.name) };
        }); */
  },
  styles() {
    /*  return _.map(Goals.findAll(),
        function makeGoalObject(goal) {
          return {
            label: goal.name,
            selected: _.contains(Template.instance().messageFlags.get(selectedGoalsKey), goal.name),
          };
        }); */
    const profile = Profiles.findDoc(FlowRouter.getParam('username'));
    const selectedStyles = profile.styles;
    return profile && _.map(Styles.findAll(),
        function makeStyleObject(style) {
          return { label: style.name, selected: _.contains(selectedStyles, style.name) };
        });
  },
  favorites() {
    // Initialize selectedAbiltiies to all of them if messageFlags is undefined.
    if (!Template.instance().messageFlags.get(selectedAbilitiesKey) &&
        !Template.instance().messageFlags.get(selectedStylesKey) &&
        !Template.instance().messageFlags.get(selectedGoalsKey) &&
        !Template.instance().messageFlags.get(selectedExperiencesKey)) {
      Template.instance().messageFlags.set(selectedAbilitiesKey, _.map(Abilities.findAll(), ability => ability.name));
      Template.instance().messageFlags.set(selectedStylesKey, _.map(Styles.findAll(), style => style.name));
      Template.instance().messageFlags.set(selectedGoalsKey, _.map(Goals.findAll(), goal => goal.name));
      Template.instance().messageFlags.set(selectedExperiencesKey, _.map(Experiences.findAll(), exp => exp.name));
    }
    // Find all profiles with the currently selected interests.
    let allFav = Favorites.findAll();
    const selectedAbilities = Template.instance().messageFlags.get(selectedAbilitiesKey);
    const selectedGoals = Template.instance().messageFlags.get(selectedGoalsKey);
    const selectedStyles = Template.instance().messageFlags.get(selectedStylesKey);
    const selectedExperiences = Template.instance().messageFlags.get(selectedExperiencesKey);
    allFav = _.filter(allFav, favorites => _.intersection(favorites.abilities, selectedAbilities).length > 0);
    allFav = _.filter(allFav, favorites => _.intersection(favorites.goals, selectedGoals).length > 0);
    allFav = _.filter(allFav, favorites => _.intersection(favorites.styles, selectedStyles).length > 0);
    allFav = _.filter(allFav, favorites => _.intersection(favorites.experiences, selectedExperiences).length > 0);
    return allFav;
  },
});

/* I feel like I might need to change this if I want to have it register the filtering. */
Template.Beats_Page.events({
  'submit .filter-data-form'(event, instance) {
    event.preventDefault();
    const selectedOptions = _.filter(event.target.Abilities.selectedOptions, (option) => option.selected);
    instance.messageFlags.set(selectedAbilitiesKey, _.map(selectedOptions, (option) => option.value));
  },
});
