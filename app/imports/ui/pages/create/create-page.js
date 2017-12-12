import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Abilities } from '/imports/api/ability/AbilityCollection';
// import { Styles } from '/imports/api/style/StyleCollection';
// import { Goals } from '/imports/api/goal/GoalCollection';
// import { Experiences } from '/imports/api/experience/ExperienceCollection';

const displaySuccessMessage = 'displaySuccessMessage';
const displayErrorMessages = 'displayErrorMessages';
const selectedAbilitiesKey = 'selectedAbilities';
/* const selectedStylesKey = 'selectedStyles';
const selectedGoalsKey = 'selectedGoals';
const selectedExperiencesKey = 'selectedExperience'; */
const createContext = Abilities.getSchema().namedContext('Create_Page');
/* const createContext2 = Styles.getSchema().namedContext('Create_Page');
const createContext3 = Goals.getSchema().namedContext('Create_Page');
const createContext4 = Experiences.getSchema().namedContext('Create_Page'); */

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
  /* this.messageFlags.set(selectedStylesKey, undefined);
  this.messageFlags.set(selectedGoalsKey, undefined);
  this.messageFlags.set(selectedExperiencesKey, undefined); */
  this.context = createContext;
  /* this.context2 = createContext2;
  this.context3 = createContext3;
  this.context4 = createContext4; */
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
    const newAbility = { name, description };
    /* const newStyle = { name, description };
    const newGoal = { name, description };
    const newExperience = { name, description }; */

    // Clear out any old validation errors.
    instance.context.reset();
    /* instance.context2.reset();
    instance.context3.reset();
    instance.context4.reset(); */
    // Invoke clean so that updatedProfileData reflects what will be inserted.
    const cleanData = Abilities.getSchema().clean(newAbility);
    /* const cleanData2 = Styles.getSchema().clean(newStyle);
    const cleanData3 = Goals.getSchema().clean(newGoal);
    const cleanData4 = Experiences.getSchema().clean(newExperience); */
    // Determine validity.
    instance.context.validate(cleanData);
    /* instance.context2.validate(cleanData2);
    instance.context3.validate(cleanData3);
    instance.context4.validate(cleanData4); */

    if (instance.context.isValid()) {
      // const docID = Abilities._id;
      // const id = Abilities.insert(docID, { $set: cleanData });
      // Abilities.insert(newAbility);
      const id = Abilities.define(newAbility);
      /* const id2 = Styles.define(newStyle);
      const id3 = Goals.define(newGoal);
      const id4 = Experiences.define(newExperience); */
      instance.messageFlags.set(displaySuccessMessage, id);
      /* instance.messageFlags.set(displaySuccessMessage, id2);
      instance.messageFlags.set(displaySuccessMessage, id3);
      instance.messageFlags.set(displaySuccessMessage, id4); */
      instance.messageFlags.set(displayErrorMessages, false);
    } else {
      instance.messageFlags.set(displaySuccessMessage, false);
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});
