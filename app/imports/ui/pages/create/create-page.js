import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
// import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Abilities } from '/imports/api/ability/AbilityCollection';
/* import { Styles } from '/imports/api/style/StyleCollection';
import { Goals } from '/imports/api/goal/GoalCollection';
import { Experiences } from '/imports/api/experience/ExperienceCollection'; */

const displaySuccessMessage = 'displaySuccessMessage';
const displayErrorMessages = 'displayErrorMessages';
const selectedAbilitiesKey = 'selectedAbilities';
const selectedStylesKey = 'selectedStyles';
const selectedGoalsKey = 'selectedGoals';
const createContext = Abilities.getSchema().namedContext('Create_Page');

const selectedExperiencesKey = 'selectedExperiences';
Template.Create_Page.onCreated(function onCreated() {
  /* this.subscribe(Abilities.getPublicationName());
  this.subscribe(Styles.getPublicationName());
  this.subscribe(Profiles.getPublicationName());
  this.subscribe(Goals.getPublicationName());
  this.subscribe(Experiences.getPublicationName()); */
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displaySuccessMessage, false);
  this.messageFlags.set(displayErrorMessages, false);
  this.messageFlags.set(selectedAbilitiesKey, undefined);
  this.messageFlags.set(selectedStylesKey, undefined);
  this.messageFlags.set(selectedGoalsKey, undefined);
  this.messageFlags.set(selectedExperiencesKey, undefined);
  this.context = createContext;
});

Template.Create_Page.helpers({
  successClass() {
    return Template.instance().messageFlags.get(displaySuccessMessage) ? 'success' : '';
  },
  displaySuccessMessage() {
    return Template.instance().messageFlags.get(displaySuccessMessage);
  },
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
});

Template.Create_Page.events({
  'submit .create-data-form'(event, instance) {
    event.preventDefault();
    // let newAbility = Session.get('abilities');
    const name = event.target.Name.value;
    const description = event.target.Description.value;
    /* const selectedAbilities = _.filter(event.target.Abilities.selectedOptions, (option) => option.selected);
    const abilities = _.map(selectedAbilities, (option) => option.value); */
    // const username = FlowRouter.getParam('username'); // schema requires username.
    /* const selectedStyles = _.filter(event.target.Styles.selectedOptions, (option) => option.selected);
    const styles = _.map(selectedStyles, (option) => option.value);
    const selectedGoals = _.filter(event.target.Goals.selectedOptions, (option) => option.selected);
    const goals = _.map(selectedGoals, (option) => option.value);
    const selectedExperiences = _.filter(event.target.Experiences.selectedOptions, (option) => option.selected);
    const experiences = _.map(selectedExperiences, (option) => option.value); */
    // const updatedAbilitiesData = { abilities, username };
    // const newAbility = { name, description };
    const newAbility = { name, description };

    // Clear out any old validation errors.
    instance.context.reset();
    // Invoke clean so that updatedProfileData reflects what will be inserted.
    const cleanData = Abilities.getSchema().clean(newAbility);
    // Determine validity.
    instance.context.validate(cleanData);

    if (instance.context.isValid()) {
      // const docID = Abilities._id;
      // const id = Abilities.insert(docID, { $set: cleanData });
      Abilities.insert(newAbility);
      // Abilities.insert(docID, cleanData);
      // const id = Abilities.insert(updatedAbilitiesData);
      // const id = Abilities.insert({ createdBy: Meteor.userId(), cleanData});
      // Abilities.insert(cleanData);
      // instance.messageFlags.set(displaySuccessMessage, id);
      instance.messageFlags.set(displayErrorMessages, false);
      FlowRouter.go('Home_Page');
    } else {
      instance.messageFlags.set(displaySuccessMessage, false);
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});
