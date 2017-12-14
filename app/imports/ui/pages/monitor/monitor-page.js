import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Abilities } from '/imports/api/ability/AbilityCollection';
import { Styles } from '/imports/api/style/StyleCollection';
import { Goals } from '/imports/api/goal/GoalCollection';
import { Experiences } from '/imports/api/experience/ExperienceCollection';
import { Favorites } from '/imports/api/favorites/FavoritesCollection';
import { PeopleInterested } from '/imports/api/people-interested/PeopleInterestedCollection';
import { Report } from '/imports/api/report/ReportCollection';
import { FlowRouter } from 'meteor/kadira:flow-router';

const selectedAbilitiesKey = 'selectedAbilities';
const selectedStylesKey = 'selectedStyles';
const selectedGoalsKey = 'selectedGoals';
const selectedExperiencesKey = 'selectedExperiences';
const selectedProfileKey = 'selectedProfile';

Template.Monitor_Page.onCreated(function onCreated() {
  this.subscribe(Profiles.getPublicationName());
  this.subscribe(Favorites.getPublicationName());
  this.subscribe(PeopleInterested.getPublicationName());
  this.subscribe(Report.getPublicationName());
  this.subscribe(Abilities.getPublicationName());
  this.subscribe(Styles.getPublicationName());
  this.subscribe(Goals.getPublicationName());
  this.subscribe(Experiences.getPublicationName());
  this.messageFlags = new ReactiveDict();
  // this.messageFlags.set(selectedInterestsKey, undefined);
  this.messageFlags.set(selectedAbilitiesKey, undefined);
  this.messageFlags.set(selectedStylesKey, undefined);
  this.messageFlags.set(selectedGoalsKey, undefined);
  this.messageFlags.set(selectedExperiencesKey, undefined);
  this.messageFlags.set(selectedProfileKey, undefined);
});

Template.Monitor_Page.helpers({
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
    /* if (!Template.instance().messageFlags.get(selectedAbilitiesKey) &&
        !Template.instance().messageFlags.get(selectedStylesKey) &&
        !Template.instance().messageFlags.get(selectedGoalsKey) &&
        !Template.instance().messageFlags.get(selectedExperiencesKey)) {
      Template.instance().messageFlags.set(selectedAbilitiesKey, _.map(Abilities.findAll(), ability => ability.name));
      Template.instance().messageFlags.set(selectedStylesKey, _.map(Styles.findAll(), style => style.name));
      Template.instance().messageFlags.set(selectedGoalsKey, _.map(Goals.findAll(), goal => goal.name));
      Template.instance().messageFlags.set(selectedExperiencesKey, _.map(Experiences.findAll(), exp => exp.name));
    }
    // Find all profiles with the currently selected interests.
    let allProfiles = Profiles.findAll();
    const selectedAbilities = Template.instance().messageFlags.get(selectedAbilitiesKey);
    const selectedGoals = Template.instance().messageFlags.get(selectedGoalsKey);
    const selectedStyles = Template.instance().messageFlags.get(selectedStylesKey);
    const selectedExperiences = Template.instance().messageFlags.get(selectedExperiencesKey);
    allProfiles = _.filter(allProfiles, profile => _.intersection(profile.abilities, selectedAbilities).length > 0);
    allProfiles = _.filter(allProfiles, profile => _.intersection(profile.goals, selectedGoals).length > 0);
    allProfiles = _.filter(allProfiles, profile => _.intersection(profile.styles, selectedStyles).length > 0);
    allProfiles = _.filter(allProfiles, profile => _.intersection(profile.experiences, selectedExperiences).length > 0);
    return allProfiles; */
    const profile = Profiles.findDoc(FlowRouter.getParam('username'));
    /* return profile && _.map(Profiles.findAll(),
        function makeProfileObject(profile2) {
          return { label: profile2.name, selected: _.contains(profile, profile2.name) };
        }); */
    return profile.name && Profiles.find().map(
        function (obj) {
          return { label: obj.name, value: obj.value };
        });
  },

  // interests() {
  /*  return _.map(Interests.findAll(),
    function makeInterestObject(interest) {
      return {
        label: interest.name,
        selected: _.contains(Template.instance().messageFlags.get(selectedInterestsKey), interest.name),
      };
    }); */
  /* const profile = Profiles.findDoc(FlowRouter.getParam('username'));
  const selectedInterests = profile.interests;
  return profile && _.map(Interests.findAll(),
      function makeInterestObject(interest) {
        return { label: interest.name, selected: _.contains(selectedInterests, interest.name) };
      });
}, */
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
  reports() {
    // Initialize selectedInterests to all of them if messageFlags is undefined.
    /* if (!Template.instance().messageFlags.get(selectedInterestsKey)) {
      Template.instance().messageFlags.set(selectedInterestsKey, _.map(Interests.findAll(), interest => interest.name));
    }
    // Find all profiles with the currently selected interests.
    const allPeopleInterested = PeopleInterested.findAll();
    const selectedInterests = Template.instance().messageFlags.get(selectedInterestsKey);
    return _.filter(allPeopleInterested, report => _.intersection(report.interests,
        selectedInterests).length > 0); */
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
    let allReport = Report.findAll();
    const selectedAbilities = Template.instance().messageFlags.get(selectedAbilitiesKey);
    const selectedGoals = Template.instance().messageFlags.get(selectedGoalsKey);
    const selectedStyles = Template.instance().messageFlags.get(selectedStylesKey);
    const selectedExperiences = Template.instance().messageFlags.get(selectedExperiencesKey);
    allReport = _.filter(allReport, report => _.intersection(report.abilities, selectedAbilities).length > 0);
    allReport = _.filter(allReport, report => _.intersection(report.goals, selectedGoals).length > 0);
    allReport = _.filter(allReport, report => _.intersection(report.styles, selectedStyles).length > 0);
    allReport = _.filter(allReport, report => _.intersection(report.experiences, selectedExperiences).length > 0);
    return allReport;
  },
  reportProfiles() {
    const profile = Profiles.findDoc(FlowRouter.getParam('username'));
    const selectedProfiles = profile.name;
    return profile && _.map(Profiles.findAll(),
        function makeProfileObject(prof) {
          return { label: prof.name, selected: _.contains(selectedProfiles, prof.name) };
        });
  },
});

Template.Monitor_Page.events({
  'submit .monitor-data-form'(event, instance) {
    event.preventDefault();
    /* const selectedAbilityOptions = _.filter(event.target.Abilities.selectedOptions, (option) => option.selected);
    const selectedStyleOptions = _.filter(event.target.Styles.selectedOptions, (option) => option.selected);
    const selectedGoalOptions = _.filter(event.target.Goals.selectedOptions, (option) => option.selected);
    const selectedExperienceOptions = _.filter(event.target.Experiences.selectedOptions, (option) => option.selected);
    instance.messageFlags.set(selectedAbilitiesKey, _.map(selectedAbilityOptions, (option) => option.value));
    instance.messageFlags.set(selectedStylesKey, _.map(selectedStyleOptions, (option) => option.value));
    instance.messageFlags.set(selectedGoalsKey, _.map(selectedGoalOptions, (option) => option.value));
    instance.messageFlags.set(selectedExperiencesKey, _.map(selectedExperienceOptions, (option) => option.value)); */
    const selectedProfileOptions = _.filter(event.target.Profile.selectedOptions, (option) => option.selected);
    instance.messageFlags.set(selectedProfileKey, _.map(selectedProfileOptions, (option) => option.value));
  },
  'click .ban'(event) {
    event.preventDefault();
    const docID = Report.findDoc(FlowRouter.getParam('_id'));

    // Remove profile
    Report.ban(docID);
  },
});
