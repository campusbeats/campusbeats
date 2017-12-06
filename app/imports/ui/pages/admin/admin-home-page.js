import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Interests } from '/imports/api/interest/InterestCollection';
import { Abilities } from '/imports/api/ability/AbilityCollection';
import { Styles } from '/imports/api/style/StyleCollection';
import { Goals } from '/imports/api/goal/GoalCollection';
import { Experiences } from '/imports/api/experience/ExperienceCollection';
import { Favorites } from '/imports/api/favorites/FavoritesCollection';
import { PeopleInterested } from '/imports/api/people-interested/PeopleInterestedCollection';
//  import { FlowRouter } from 'meteor/kadira:flow-router';

const selectedInterestsKey = 'selectedInterests';
const selectedAbilitiesKey = 'selectedAbilities';
const selectedStylesKey = 'selectedStyles';
const selectedGoalsKey = 'selectedGoals';
const selectedExperiencesKey = 'selectedExperiences';

Template.Admin_Page.onCreated(function onCreated() {
  this.subscribe(Interests.getPublicationName());
  this.subscribe(Profiles.getPublicationName());
  this.subscribe(Favorites.getPublicationName());
  this.subscribe(PeopleInterested.getPublicationName());
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
});

Template.Admin_Page.helpers({
  profiles() {
    // Initialize selectedAbilties to all of them if messageFlags is undefined.
    if (!Template.instance().messageFlags.get(selectedAbilitiesKey)) {
      Template.instance().messageFlags.set(selectedAbilitiesKey, _.map(Abilities.findAll(), ability => ability.name));
    }
    // Find all profiles with the currently selected interests.
    const allProfiles = Profiles.findAll();
    const selectedAbilities = Template.instance().messageFlags.get(selectedAbilitiesKey);
    return _.filter(allProfiles, profile => _.intersection(profile.ability, selectedAbilities).length > 0);
  },
  interests() {
    return _.map(Interests.findAll(),
        function makeInterestObject(interest) {
          return {
            label: interest.name,
            selected: _.contains(Template.instance().messageFlags.get(selectedInterestsKey), interest.name),
          };
        });
  },
  abilties() {
    return _.map(Abilities.findAll(),
        function makeAbilityObject(ability) {
          return {
            label: ability.name,
            selected: _.contains(Template.instance().messageFlags.get(selectedAbilitiesKey), ability.name),
          };
        });
  },
  styles() {
    return _.map(Goals.findAll(),
        function makeGoalObject(goal) {
          return {
            label: goal.name,
            selected: _.contains(Template.instance().messageFlags.get(selectedGoalsKey), goal.name),
          };
        });
  },
  goals() {
    return _.map(Styles.findAll(),
        function makeStyleObject(style) {
          return {
            label: style.name,
            selected: _.contains(Template.instance().messageFlags.get(selectedStylesKey), style.name),
          };
        });
  },
  experiences() {
    return _.map(Abilities.findAll(),
        function makeExperienceObject(experience) {
          return {
            label: experience.name,
            selected: _.contains(Template.instance().messageFlags.get(selectedExperiencesKey), experience.name),
          };
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
  peopleInterested() {
    // Initialize selectedInterests to all of them if messageFlags is undefined.
    /* if (!Template.instance().messageFlags.get(selectedInterestsKey)) {
      Template.instance().messageFlags.set(selectedInterestsKey, _.map(Interests.findAll(), interest => interest.name));
    }
    // Find all profiles with the currently selected interests.
    const allPeopleInterested = PeopleInterested.findAll();
    const selectedInterests = Template.instance().messageFlags.get(selectedInterestsKey);
    return _.filter(allPeopleInterested, peopleInterested => _.intersection(peopleInterested.interests,
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
    let allPpl = PeopleInterested.findAll();
    const selectedAbilities = Template.instance().messageFlags.get(selectedAbilitiesKey);
    const selectedGoals = Template.instance().messageFlags.get(selectedGoalsKey);
    const selectedStyles = Template.instance().messageFlags.get(selectedStylesKey);
    const selectedExperiences = Template.instance().messageFlags.get(selectedExperiencesKey);
    allPpl = _.filter(allPpl, peopleInterested => _.intersection(peopleInterested.abilities,
        selectedAbilities).length > 0);
    allPpl = _.filter(allPpl, peopleInterested => _.intersection(peopleInterested.goals,
        selectedGoals).length > 0);
    allPpl = _.filter(allPpl, peopleInterested => _.intersection(peopleInterested.styles,
        selectedStyles).length > 0);
    allPpl = _.filter(allPpl, peopleInterested => _.intersection(peopleInterested.experiences,
        selectedExperiences).length > 0);
    return allPpl;
  },
});

/* Template.Admin_Page.events({
  'submit .filter-data-form'(event, instance) {
    event.preventDefault();
    const selectedOptions = _.filter(event.target.Interests.selectedOptions, (option) => option.selected);
    instance.messageFlags.set(selectedInterestsKey, _.map(selectedOptions, (option) => option.value));
  },
  'click .red.button'(event) {
    event.preventDefault();
    FlowRouter.getParam('username');
    FlowRouter.route('/username/admin/ban/', {
      action: function(params, queryParams) {
        console.log("Yeah! We are on the post:", params.postId);
      }
    });
    //  FlowRouter.go('Admin_Home_Page');
  },
}); */
