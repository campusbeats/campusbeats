import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Interests } from '/imports/api/interest/InterestCollection';
import { Abilities } from '/imports/api/ability/AbilityCollection';
import { Favorites } from '/imports/api/favorites/FavoritesCollection';
import { PeopleInterested } from '/imports/api/people-interested/PeopleInterestedCollection';

const selectedInterestsKey = 'selectedInterests';
const selectedAbilitiesKey = 'selectedAbilities';

Template.Home_Page.onCreated(function onCreated() {
  this.subscribe(Interests.getPublicationName());
  this.subscribe(Profiles.getPublicationName());
  this.subscribe(Favorites.getPublicationName());
  this.subscribe(PeopleInterested.getPublicationName());
  this.subscribe(Abilities.getPublicationName());
  this.messageFlags = new ReactiveDict();
  // this.messageFlags.set(selectedInterestsKey, undefined);
  this.messageFlags.set(selectedAbilitiesKey, undefined);
});

Template.Home_Page.helpers({
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
  favorites() {
    // Initialize selectedAbiltiies to all of them if messageFlags is undefined.
    if (!Template.instance().messageFlags.get(selectedAbilitiesKey)) {
      Template.instance().messageFlags.set(selectedAbilitiesKey, _.map(Abilities.findAll(), ability => ability.name));
    }
    // Find all profiles with the currently selected interests.
    const allFavorites = Favorites.findAll();
    const selectedAbilities = Template.instance().messageFlags.get(selectedAbilitiesKey);
    return _.filter(allFavorites, favorites => _.intersection(favorites.abilities, selectedAbilities).length > 0);
  },
  peopleInterested() {
    // Initialize selectedInterests to all of them if messageFlags is undefined.
    if (!Template.instance().messageFlags.get(selectedInterestsKey)) {
      Template.instance().messageFlags.set(selectedInterestsKey, _.map(Interests.findAll(), interest => interest.name));
    }
    // Find all profiles with the currently selected interests.
    const allPeopleInterested = PeopleInterested.findAll();
    const selectedInterests = Template.instance().messageFlags.get(selectedInterestsKey);
    return _.filter(allPeopleInterested, peopleInterested => _.intersection(peopleInterested.interests,
        selectedInterests).length > 0);
  },
});

Template.Home_Page.events({
  'submit .filter-data-form'(event, instance) {
    event.preventDefault();
    const selectedOptions = _.filter(event.target.Abilities.selectedOptions, (option) => option.selected);
    instance.messageFlags.set(selectedAbilitiesKey, _.map(selectedOptions, (option) => option.value));
  },
});

