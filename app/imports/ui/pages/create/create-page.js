import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Abilities } from '/imports/api/ability/AbilityCollection';
import { Styles } from '/imports/api/style/StyleCollection';
import { Goals } from '/imports/api/goal/GoalCollection';
import { Experiences } from '/imports/api/experience/ExperienceCollection';

const displaySuccessMessage = 'displaySuccessMessage';
const displayErrorMessages = 'displayErrorMessages';
const selectedAbilitiesKey = 'selectedAbilities';
const selectedStylesKey = 'selectedStyles';
const selectedGoalsKey = 'selectedGoals';
const selectedExperiencesKey = 'selectedExperience';
const createContext = Abilities.getSchema().namedContext('Create_Page');
const createContext2 = Styles.getSchema().namedContext('Create_Page');
const createContext3 = Goals.getSchema().namedContext('Create_Page');
const createContext4 = Experiences.getSchema().namedContext('Create_Page');

Template.Create_Page.onCreated(function onCreated() {
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displaySuccessMessage, false);
  this.messageFlags.set(displayErrorMessages, false);
  this.messageFlags.set(selectedAbilitiesKey, undefined);
  this.messageFlags.set(selectedStylesKey, undefined);
  this.messageFlags.set(selectedGoalsKey, undefined);
  this.messageFlags.set(selectedExperiencesKey, undefined);
  this.context = createContext;
  this.context2 = createContext2;
  this.context3 = createContext3;
  this.context4 = createContext4;
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
  'submit .create-ability-form'(event, instance) {
    event.preventDefault();
    const name = event.target.Name.value;
    const description = event.target.Description.value;
    const newAbility = { name, description };

    // Clear out any old validation errors.
    instance.context.reset();
    // Invoke clean so that updatedProfileData reflects what will be inserted.
    const cleanData = Abilities.getSchema().clean(newAbility);
    // Determine validity.
    instance.context.validate(cleanData);

    if (instance.context.isValid()) {
      const id = Abilities.define(newAbility);
      instance.messageFlags.set(displaySuccessMessage, id);
      instance.messageFlags.set(displayErrorMessages, false);
    } else {
      instance.messageFlags.set(displaySuccessMessage, false);
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
  'submit .create-style-form'(event, instance) {
    event.preventDefault();
    const name = event.target.Name.value;
    const description = event.target.Description.value;
    const newStyle = { name, description };

    // Clear out any old validation errors.
    instance.context2.reset();
    // Invoke clean so that updatedProfileData reflects what will be inserted.
    const cleanData = Styles.getSchema().clean(newStyle);
    // Determine validity.
    instance.context2.validate(cleanData);

    if (instance.context2.isValid()) {
      const id = Styles.define(newStyle);
      instance.messageFlags.set(displaySuccessMessage, id);
      instance.messageFlags.set(displayErrorMessages, false);
    } else {
      instance.messageFlags.set(displaySuccessMessage, false);
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
  'submit .create-experience-form'(event, instance) {
    event.preventDefault();
    const name = event.target.Name.value;
    const description = event.target.Description.value;
    const newExperience = { name, description };

    // Clear out any old validation errors.
    instance.context3.reset();
    // Invoke clean so that updatedProfileData reflects what will be inserted.
    const cleanData = Experiences.getSchema().clean(newExperience);
    // Determine validity.
    instance.context3.validate(cleanData);

    if (instance.context2.isValid()) {
      const id = Experiences.define(newExperience);
      instance.messageFlags.set(displaySuccessMessage, id);
      instance.messageFlags.set(displayErrorMessages, false);
    } else {
      instance.messageFlags.set(displaySuccessMessage, false);
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
  'submit .create-goal-form'(event, instance) {
    event.preventDefault();
    const name = event.target.Name.value;
    const description = event.target.Description.value;
    const newGoal = { name, description };

    // Clear out any old validation errors.
    instance.context4.reset();
    // Invoke clean so that updatedProfileData reflects what will be inserted.
    const cleanData = Experiences.getSchema().clean(newGoal);
    // Determine validity.
    instance.context4.validate(cleanData);

    if (instance.context2.isValid()) {
      const id = Experiences.define(newGoal);
      instance.messageFlags.set(displaySuccessMessage, id);
      instance.messageFlags.set(displayErrorMessages, false);
    } else {
      instance.messageFlags.set(displaySuccessMessage, false);
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});
